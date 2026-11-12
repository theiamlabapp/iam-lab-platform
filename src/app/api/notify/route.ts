import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DEFAULT_TARGET_EMAIL = "info@theiamlab.com";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  if (/[\r\n]/.test(trimmed)) return false;
  return EMAIL_PATTERN.test(trimmed);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const body =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};

  // Silent honeypot drop for automated spam submissions
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const subscriberEmail = body.email.trim();
  const targetEmail = process.env.NOTIFY_TO_EMAIL || DEFAULT_TARGET_EMAIL;
  const timestamp = new Date().toISOString();

  const subject = `The IAM Lab — Launch Notification Request (${subscriberEmail})`;
  const textContent = [
    "New launch notification request received from theiamlab.com",
    "",
    `Subscriber Email: ${subscriberEmail}`,
    `Submitted At (UTC): ${timestamp}`,
    "",
    "Reply directly to this email or keep this address on record for full launch notification.",
  ].join("\n");

  const htmlContent = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #0b1320; line-height: 1.6; max-width: 560px;">
      <h2 style="margin: 0 0 12px; color: #0b1320;">New Launch Notification Request</h2>
      <p style="margin: 0 0 16px; color: #334155;">
        A visitor requested to be notified when <strong>The IAM Lab</strong> launches:
      </p>
      <div style="padding: 14px 16px; border-radius: 8px; background: #f8f6f1; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 6px;"><strong>Email:</strong> ${escapeHtml(subscriberEmail)}</p>
        <p style="margin: 0; font-size: 13px; color: #64748b;"><strong>Submitted (UTC):</strong> ${escapeHtml(timestamp)}</p>
      </div>
    </div>
  `;

  // Primary option: Webmail SMTP via Nodemailer
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
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"The IAM Lab Website" <${smtpUser}>`,
        to: targetEmail,
        replyTo: subscriberEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });

      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Unable to deliver notification right now. Please email info@theiamlab.com directly.",
        },
        { status: 502 }
      );
    }
  }

  // Secondary option: Resend HTTP API if configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromAddress =
        process.env.NOTIFY_FROM_EMAIL || `The IAM Lab <${targetEmail}>`;
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [targetEmail],
          reply_to: subscriberEmail,
          subject,
          text: textContent,
          html: htmlContent,
        }),
      });

      if (!resendRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Unable to deliver notification right now. Please email info@theiamlab.com directly.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Unable to deliver notification right now. Please email info@theiamlab.com directly.",
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    {
      ok: false,
      configured: false,
      message:
        "Server mail delivery is awaiting webmail SMTP configuration in deployment settings.",
    },
    { status: 503 }
  );
}
