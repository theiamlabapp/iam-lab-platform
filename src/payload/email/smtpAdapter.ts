import nodemailer from "nodemailer";
import type { EmailAdapter, SendEmailOptions } from "payload";

/**
 * Payload 3 Email Adapter sharing the exact Nodemailer SMTP & Resend configuration
 * used by /api/contact and /api/notify.
 */
export const smtpEmailAdapter: EmailAdapter = () => {
  const fromAddress = (
    process.env.NOTIFY_FROM_EMAIL ||
    process.env.SMTP_USER ||
    "info@theiamlab.com"
  ).trim();
  const fromName = "The IAM Lab";

  return {
    name: "nodemailer-smtp",
    defaultFromAddress: fromAddress,
    defaultFromName: fromName,
    sendEmail: async (message: SendEmailOptions) => {
      const host = process.env.SMTP_HOST?.trim();
      const user = process.env.SMTP_USER?.trim();
      const pass = process.env.SMTP_PASS;

      if (host && user && pass) {
        const port = Number(process.env.SMTP_PORT || "465");
        const secure =
          process.env.SMTP_SECURE !== undefined
            ? process.env.SMTP_SECURE === "true"
            : port === 465;

        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
        });

        await transporter.verify();

        const info = await transporter.sendMail({
          from: `"${fromName}" <${user}>`,
          to: message.to,
          cc: message.cc,
          bcc: message.bcc,
          replyTo: message.replyTo,
          subject: message.subject,
          text: message.text,
          html: message.html,
        });

        return info;
      }

      const resendApiKey = process.env.RESEND_API_KEY?.trim();
      if (resendApiKey) {
        const toList = Array.isArray(message.to)
          ? message.to.map(String)
          : message.to
            ? [String(message.to)]
            : [];
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `${fromName} <${fromAddress}>`,
            to: toList,
            subject: message.subject || "The IAM Lab — Administrator Notification",
            html: message.html,
            text: message.text,
          }),
        });
        if (!res.ok) {
          throw new Error(`Resend API error: ${res.status}`);
        }
        return await res.json();
      }

      console.error(
        "[smtpEmailAdapter] Email delivery skipped/failed: SMTP_HOST, SMTP_USER, and SMTP_PASS (or RESEND_API_KEY) are missing in this environment."
      );
      throw new Error(
        "Email delivery is not configured for this environment. Enable SMTP_* variables in Vercel Preview."
      );
    },
  };
};
