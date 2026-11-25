import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Client } from "pg";
import { getSiteSettings } from "@/lib/getPageData";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DEFAULT_TARGET_EMAIL = "info@theiamlab.com";

function escapeHtml(val: string): string {
  return val
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  // Honeypot check
  if (typeof body.company_hp === "string" && body.company_hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const {
    enquiryType,
    name,
    email,
    organisation = "",
    phone = "",
    serviceOrPathway = "",
    message,
    privacyAccepted,
    recaptchaToken = "",
  } = body as Record<string, string | boolean>;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json(
      { ok: false, message: "Full name is required." },
      { status: 400 }
    );
  }

  if (
    !email ||
    typeof email !== "string" ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    return NextResponse.json(
      { ok: false, message: "A valid email address is required." },
      { status: 400 }
    );
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { ok: false, message: "Message must be at least 10 characters." },
      { status: 400 }
    );
  }

  if (!privacyAccepted) {
    return NextResponse.json(
      { ok: false, message: "Privacy notice acknowledgement is required." },
      { status: 400 }
    );
  }

  // Server-side Google reCAPTCHA check when enabled in Global Site Settings
  const siteSettings = await getSiteSettings();
  if (siteSettings.recaptcha_enabled) {
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const remoteIp = forwardedFor.split(",")[0]?.trim() || undefined;
    const verification = await verifyRecaptchaToken({
      token: typeof recaptchaToken === "string" ? recaptchaToken : "",
      expectedVersion: siteSettings.recaptcha_version,
      expectedAction: "contact_submit",
      remoteIp,
    });
    if (!verification.valid) {
      const status = verification.reason?.includes("not configured") ? 503 : 400;
      return NextResponse.json(
        {
          ok: false,
          message:
            verification.reason ||
            "Security verification failed. Please retry and submit again.",
        },
        { status }
      );
    }
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanType = String(enquiryType || "general").trim();
  const cleanOrg = String(organisation || "").trim();
  const cleanPhone = String(phone || "").trim();
  const cleanService = String(serviceOrPathway || "").trim();
  const cleanMsg = String(message).trim();
  const timestamp = new Date().toISOString();

  // 1. Persist to PostgreSQL if DATABASE_URI is available
  const rawDbUri = (process.env.DATABASE_URI || "").trim().replace(/^["']|["']$/g, "");
  if (rawDbUri) {
    try {
      const client = new Client({
        connectionString: rawDbUri,
        ssl: { rejectUnauthorized: false },
      });
      await client.connect();

      const validEnquiryTypes = [
        "enterprise_consulting",
        "corporate_training",
        "individual_learning",
        "partnership",
        "general",
      ];
      const safeType = validEnquiryTypes.includes(cleanType)
        ? cleanType
        : "general";

      const insertRes = await client.query(
        `INSERT INTO enquiries (enquiry_type, name, email, organisation, phone, service_or_pathway, message, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9)
         RETURNING id;`,
        [
          safeType,
          cleanName,
          cleanEmail,
          cleanOrg,
          cleanPhone,
          cleanService,
          cleanMsg,
          "new",
          timestamp,
        ]
      );

      const createdEnquiryId = Number(insertRes.rows[0]?.id || 0);
      if (createdEnquiryId > 0) {
        await client.query(`
          CREATE TABLE IF NOT EXISTS notifications (
            id SERIAL PRIMARY KEY,
            enquiry_id INTEGER UNIQUE REFERENCES enquiries(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            enquiry_name VARCHAR(255) NOT NULL DEFAULT '',
            enquiry_email VARCHAR(255) NOT NULL DEFAULT '',
            enquiry_type VARCHAR(64) NOT NULL DEFAULT 'general',
            is_read BOOLEAN NOT NULL DEFAULT false,
            read_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );
        `);

        const typeLabelMap: Record<string, string> = {
          enterprise_consulting: "Enterprise Consulting",
          corporate_training: "Corporate Training",
          individual_learning: "IAM Academy",
          partnership: "Partnership Exploration",
          general: "General Enquiry",
        };
        const categoryLabel = typeLabelMap[safeType] || "Website Enquiry";
        const snippetSource = cleanOrg
          ? `${cleanOrg} — ${cleanMsg}`
          : cleanMsg;
        const snippet =
          snippetSource.length > 140
            ? `${snippetSource.slice(0, 137)}...`
            : snippetSource;

        await client.query(
          `INSERT INTO notifications (enquiry_id, title, message, enquiry_name, enquiry_email, enquiry_type, is_read, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, false, $7, $7)
           ON CONFLICT (enquiry_id) DO NOTHING;`,
          [
            createdEnquiryId,
            `New ${categoryLabel} from ${cleanName}`,
            snippet,
            cleanName,
            cleanEmail,
            safeType,
            timestamp,
          ]
        );
      }

      await client.end();
    } catch (dbErr) {
      console.error("Database enquiry storage warning:", dbErr);
      // Non-fatal: continue to email delivery
    }
  }

  // 2. Prepare Email Notification to info@theiamlab.com
  const targetEmail = process.env.NOTIFY_TO_EMAIL || DEFAULT_TARGET_EMAIL;
  const subject = `[The IAM Lab Enquiry] ${cleanType} from ${cleanName}`;
  const textContent = [
    `New enquiry received on theiamlab.com:`,
    ``,
    `Category: ${cleanType}`,
    `Name: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Organisation: ${cleanOrg || "N/A"}`,
    `Phone/WhatsApp: ${cleanPhone || "N/A"}`,
    `Service/Pathway: ${cleanService || "N/A"}`,
    `Submitted (UTC): ${timestamp}`,
    ``,
    `Message:`,
    cleanMsg,
  ].join("\n");

  const htmlContent = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0b1320; line-height: 1.6; max-width: 600px;">
      <h2 style="color: #0b1320; margin-bottom: 8px;">New Website Enquiry</h2>
      <p style="color: #64748b; font-size: 13px; margin-top: 0;">Received on theiamlab.com &middot; ${escapeHtml(timestamp)}</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 12px; background: #f8f6f1; font-weight: bold; width: 140px; border: 1px solid #e2e8f0;">Category:</td>
          <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(cleanType)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; background: #f8f6f1; font-weight: bold; border: 1px solid #e2e8f0;">Name:</td>
          <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(cleanName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; background: #f8f6f1; font-weight: bold; border: 1px solid #e2e8f0;">Email:</td>
          <td style="padding: 8px 12px; border: 1px solid #e2e8f0;"><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; background: #f8f6f1; font-weight: bold; border: 1px solid #e2e8f0;">Organisation:</td>
          <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(cleanOrg || "None provided")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; background: #f8f6f1; font-weight: bold; border: 1px solid #e2e8f0;">Phone/WhatsApp:</td>
          <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(cleanPhone || "None provided")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px; background: #f8f6f1; font-weight: bold; border: 1px solid #e2e8f0;">Service / Pathway:</td>
          <td style="padding: 8px 12px; border: 1px solid #e2e8f0;">${escapeHtml(cleanService || "Not specified")}</td>
        </tr>
      </table>

      <h3 style="color: #0b1320; margin-bottom: 8px;">Message:</h3>
      <div style="padding: 16px; background: #f8f9fa; border: 1px solid #e2e8f0; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(cleanMsg)}</div>
    </div>
  `;

  // Option A: SMTP Delivery
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const port = Number(process.env.SMTP_PORT || "465");
      const secure =
        process.env.SMTP_SECURE !== undefined
          ? process.env.SMTP_SECURE === "true"
          : port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"The IAM Lab Enquiries" <${smtpUser}>`,
        to: targetEmail,
        replyTo: cleanEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });

      return NextResponse.json({ ok: true });
    } catch (mailErr) {
      console.error("SMTP delivery error:", mailErr);
    }
  }

  // Option B: Resend HTTP API
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromAddress =
        process.env.NOTIFY_FROM_EMAIL || `The IAM Lab <${targetEmail}>`;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [targetEmail],
          reply_to: cleanEmail,
          subject,
          text: textContent,
          html: htmlContent,
        }),
      });
      return NextResponse.json({ ok: true });
    } catch (resendErr) {
      console.error("Resend API delivery error:", resendErr);
    }
  }

  // Successful submission recorded
  return NextResponse.json({ ok: true, stored: true });
}
