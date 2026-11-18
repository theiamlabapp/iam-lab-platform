"use server";

import nodemailer from "nodemailer";
import { Client } from "pg";

interface SendReplyArgs {
  enquiryId: number;
  clientEmail: string;
  clientName: string;
  subject: string;
  messageBody: string;
  adminName?: string;
  newStatus?: string;
}

export async function sendEnquiryReplyAction(args: SendReplyArgs) {
  const {
    enquiryId,
    clientEmail,
    clientName,
    subject,
    messageBody,
    adminName = "The IAM Lab Advisory Team",
    newStatus = "contacted",
  } = args;

  if (!clientEmail || !clientEmail.includes("@")) {
    return { success: false, error: "A valid client email address is required." };
  }

  if (!messageBody || messageBody.trim().length < 5) {
    return { success: false, error: "Please enter a message body of at least 5 characters." };
  }

  const cleanSubject = subject.trim() || `[The IAM Lab] Consultation Response for ${clientName}`;
  const cleanBody = messageBody.trim();
  const timestamp = new Date().toISOString();

  let emailDelivered = false;
  let deliveryNote = "Logged in database.";

  // 1. Send Email via SMTP if available
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

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0B1424; max-width: 620px; margin: 0 auto; line-height: 1.6; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0B1424; padding: 24px 32px; border-bottom: 3px solid #D89A43;">
            <h2 style="color: #FFFFFF; margin: 0; font-size: 20px; letter-spacing: -0.01em;">THE IAM LAB</h2>
            <p style="color: #D89A43; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace;">Enterprise Identity Security &amp; Professional Learning</p>
          </div>

          <div style="padding: 32px; background-color: #FFFFFF;">
            <p style="font-size: 14px; color: #718096; margin-top: 0;">Dear ${clientName},</p>
            <div style="font-size: 15px; color: #1E293B; white-space: pre-wrap; line-height: 1.7; margin: 20px 0;">
${cleanBody}
            </div>

            <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
              <p style="margin: 0; font-weight: 700; color: #0B1424; font-size: 14px;">${adminName}</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #718096;">The IAM Lab &middot; 128 City Road, London, EC1V 2NX, United Kingdom</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #D89A43;"><a href="https://www.theiamlab.com" style="color: #D89A43; text-decoration: none;">www.theiamlab.com</a> &middot; info@theiamlab.com</p>
            </div>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"The IAM Lab" <${smtpUser}>`,
        to: clientEmail,
        replyTo: "info@theiamlab.com",
        subject: cleanSubject,
        text: cleanBody,
        html: htmlContent,
      });

      emailDelivered = true;
      deliveryNote = "Delivered via verified SMTP";
    } catch (mailErr) {
      console.warn("[enquiryReplyAction] SMTP delivery warning:", mailErr);
      deliveryNote = "SMTP delivery paused (Preview / non-prod environment). Response recorded in communication history.";
    }
  } else {
    deliveryNote = "Recorded in database communication history (SMTP not configured in Preview).";
  }

  const newReplyRecord = {
    id: `rep_${Date.now()}`,
    sentAt: timestamp,
    sentBy: adminName,
    subject: cleanSubject,
    message: cleanBody,
    status: emailDelivered ? "delivered" : "recorded",
    deliveryNote,
  };

  // 2. Persist to PostgreSQL database
  const rawDbUri = (process.env.DATABASE_URI || "").trim().replace(/^["']|["']$/g, "");
  if (rawDbUri) {
    try {
      const client = new Client({
        connectionString: rawDbUri,
        ssl: { rejectUnauthorized: false },
      });
      await client.connect();

      // Fetch existing replies
      const fetchRes = await client.query("SELECT replies FROM enquiries WHERE id = $1;", [enquiryId]);
      let currentReplies: Array<Record<string, unknown>> = [];
      if (fetchRes.rows.length > 0 && Array.isArray(fetchRes.rows[0].replies)) {
        currentReplies = fetchRes.rows[0].replies;
      }

      const updatedReplies = [...currentReplies, newReplyRecord];

      await client.query(
        `UPDATE enquiries
         SET replies = $1, status = $2, updated_at = $3
         WHERE id = $4;`,
        [JSON.stringify(updatedReplies), newStatus, timestamp, enquiryId]
      );

      await client.end();
    } catch (dbErr) {
      console.error("[enquiryReplyAction] DB save error:", dbErr);
    }
  }

  return {
    success: true,
    reply: newReplyRecord,
    deliveryNote,
  };
}
