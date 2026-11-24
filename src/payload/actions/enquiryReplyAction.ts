"use server";

import nodemailer from "nodemailer";
import { getDbPool } from "@/lib/dbPool";
import { getAuthenticatedStaffUser } from "../access/serverAuth";

interface SendReplyArgs {
  enquiryId: number;
  clientEmail: string;
  clientName: string;
  subject: string;
  messageBody: string;
  adminName?: string;
  newStatus?: string;
  saveAsInternalNoteIfSmtpUnavailable?: boolean;
}

const VALID_STATUSES = new Set([
  "new",
  "contacted",
  "proposal_sent",
  "resolved",
  "archived",
]);

function escapeHtml(val: string): string {
  return val
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * Verifies administrator session, attempts verified SMTP delivery, and persists
 * correspondence accurately in Supabase without ever fabricating delivery confirmation.
 */
export async function sendEnquiryReplyAction(args: SendReplyArgs) {
  const staffUser = await getAuthenticatedStaffUser();
  if (!staffUser) {
    return {
      success: false,
      emailDelivered: false,
      error: "Unauthorized: Active staff session required to respond to enquiries.",
    };
  }

  const {
    enquiryId,
    clientEmail,
    clientName,
    subject,
    messageBody,
    adminName,
    newStatus = "contacted",
    saveAsInternalNoteIfSmtpUnavailable = false,
  } = args;

  const senderDisplayName = adminName || staffUser.name || "The IAM Lab Advisory Team";
  const safeStatus = VALID_STATUSES.has(newStatus) ? newStatus : "contacted";

  if (!clientEmail || !clientEmail.includes("@")) {
    return {
      success: false,
      emailDelivered: false,
      error: "A valid client email address is required.",
    };
  }

  if (!messageBody || messageBody.trim().length < 5) {
    return {
      success: false,
      emailDelivered: false,
      error: "Please enter a response message of at least 5 characters.",
    };
  }

  const cleanSubject =
    subject.trim() || `[The IAM Lab] Consultation Response for ${clientName}`;
  const cleanBody = messageBody.trim();
  const timestamp = new Date().toISOString();

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpConfigured = Boolean(smtpHost && smtpUser && smtpPass);

  let emailDelivered = false;
  let deliveryStatus: "delivered" | "failed" | "logged_only" = "failed";
  let deliveryNote = "";
  let messageId = "";

  if (!smtpConfigured) {
    if (!saveAsInternalNoteIfSmtpUnavailable) {
      return {
        success: false,
        emailDelivered: false,
        smtpMissing: true,
        error:
          "SMTP mail credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) are not configured in this environment. No email was sent. Configure SMTP in Vercel Environment Variables or check 'Save to communication log as draft note' if you only want an internal record.",
      };
    }
    deliveryStatus = "logged_only";
    deliveryNote =
      "Internal correspondence log only — SMTP not configured in this environment (email NOT sent).";
  } else {
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
        connectionTimeout: 10000,
      });

      await transporter.verify();

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0B1424; max-width: 620px; margin: 0 auto; line-height: 1.6; border: 1px solid #E2E8F0; overflow: hidden;">
          <div style="background-color: #0B1424; padding: 24px 32px; border-bottom: 3px solid #D89A43;">
            <h2 style="color: #FFFFFF; margin: 0; font-size: 18px; letter-spacing: 0.04em;">THE IAM LAB</h2>
            <p style="color: #D89A43; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-family: monospace;">Enterprise Identity Security &amp; Professional Learning</p>
          </div>

          <div style="padding: 32px; background-color: #FFFFFF;">
            <p style="font-size: 14px; color: #475569; margin-top: 0;">Dear ${escapeHtml(clientName)},</p>
            <div style="font-size: 15px; color: #0B1424; white-space: pre-wrap; line-height: 1.7; margin: 20px 0;">${escapeHtml(cleanBody)}</div>

            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
              <p style="margin: 0; font-weight: 700; color: #0B1424; font-size: 14px;">${escapeHtml(senderDisplayName)}</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #64748B;">The IAM Lab &middot; 128 City Road, London, EC1V 2NX, United Kingdom</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #B07424;"><a href="https://www.theiamlab.com" style="color: #B07424; text-decoration: none;">www.theiamlab.com</a> &middot; info@theiamlab.com</p>
            </div>
          </div>
        </div>
      `;

      const info = await transporter.sendMail({
        from: `"The IAM Lab" <${smtpUser}>`,
        to: clientEmail,
        replyTo: process.env.NOTIFY_TO_EMAIL || "info@theiamlab.com",
        subject: cleanSubject,
        text: cleanBody,
        html: htmlContent,
      });

      const acceptedList = Array.isArray(info.accepted) ? info.accepted : [];
      if (acceptedList.length === 0) {
        return {
          success: false,
          emailDelivered: false,
          error:
            "SMTP server did not confirm recipient acceptance. Response was NOT marked as delivered.",
        };
      }

      emailDelivered = true;
      deliveryStatus = "delivered";
      messageId = info.messageId || "";
      deliveryNote = `Confirmed sent via SMTP (${messageId || smtpHost})`;
    } catch (mailErr) {
      const errDetail =
        mailErr instanceof Error ? mailErr.message : "Unknown SMTP error";
      console.error("[enquiryReplyAction] SMTP delivery failure:", errDetail);

      return {
        success: false,
        emailDelivered: false,
        error: `Email delivery failed at SMTP provider: ${errDetail}. Original enquiry and history remain unchanged.`,
      };
    }
  }

  const newReplyRecord = {
    id: `rep_${Date.now()}`,
    sentAt: timestamp,
    sentBy: senderDisplayName,
    senderEmail: staffUser.email,
    subject: cleanSubject,
    message: cleanBody,
    status: deliveryStatus,
    emailDelivered,
    messageId,
    deliveryNote,
  };

  const pool = getDbPool();
  if (!pool) {
    return {
      success: false,
      emailDelivered,
      error: "Database pool unavailable — could not record communication.",
    };
  }

  try {
    const fetchRes = await pool.query(
      "SELECT replies FROM enquiries WHERE id = $1;",
      [enquiryId]
    );
    let currentReplies: Array<Record<string, unknown>> = [];
    if (fetchRes.rows.length > 0 && Array.isArray(fetchRes.rows[0].replies)) {
      currentReplies = fetchRes.rows[0].replies;
    }

    const updatedReplies = [...currentReplies, newReplyRecord];

    await pool.query(
      `UPDATE enquiries
       SET replies = $1, status = $2, updated_at = $3
       WHERE id = $4;`,
      [JSON.stringify(updatedReplies), safeStatus, timestamp, enquiryId]
    );
  } catch (dbErr) {
    console.error("[enquiryReplyAction] DB save error:", dbErr);
    return {
      success: false,
      emailDelivered,
      error: "Failed to persist communication log in PostgreSQL.",
    };
  }

  return {
    success: true,
    emailDelivered,
    reply: newReplyRecord,
    deliveryNote,
  };
}
