import nodemailer from "nodemailer";
import type { EmailAdapter, SendEmailOptions } from "payload";

/**
 * Payload 3 Email Adapter backed by environment-configured Nodemailer SMTP.
 * Enables official Payload password reset (/admin/forgot -> /admin/reset/[token])
 * and account verification emails without third-party SaaS lock-in.
 */
export const smtpEmailAdapter: EmailAdapter = () => {
  const fromAddress = (process.env.SMTP_USER || "info@theiamlab.com").trim();
  const fromName = "The IAM Lab";

  return {
    name: "nodemailer-smtp",
    defaultFromAddress: fromAddress,
    defaultFromName: fromName,
    sendEmail: async (message: SendEmailOptions) => {
      const host = process.env.SMTP_HOST?.trim();
      const port = Number(process.env.SMTP_PORT || "587");
      const secure = process.env.SMTP_SECURE === "true" || port === 465;
      const user = process.env.SMTP_USER?.trim();
      const pass = process.env.SMTP_PASS;

      if (!host || !user || !pass) {
        console.warn(
          "[smtpEmailAdapter] SMTP credentials are not configured in this environment. Enable SMTP_HOST, SMTP_USER, and SMTP_PASS (including for Vercel Preview if using Forgot Password on Preview)."
        );
        throw new Error(
          "Email delivery service is not configured for this environment. Please contact your system administrator or enable SMTP environment variables."
        );
      }

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
        from: message.from || `"${fromName}" <${fromAddress}>`,
        to: message.to,
        cc: message.cc,
        bcc: message.bcc,
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
        html: message.html,
      });

      return info;
    },
  };
};
