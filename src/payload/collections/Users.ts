import type { CollectionConfig } from "payload";
import { isAdminAccess, isAuthenticatedOrSelf } from "../access/roles";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
    forgotPassword: {
      generateEmailSubject: () => "The IAM Lab — Administrator Password Reset",
      generateEmailHTML: (args) => {
        const token = args?.token || "";
        const reqHdrs = args?.req?.headers as
          | { get?: (k: string) => string | null }
          | undefined;
        const forwardedHost =
          reqHdrs?.get?.("x-forwarded-host") || reqHdrs?.get?.("host") || "";
        const forwardedProto = reqHdrs?.get?.("x-forwarded-proto") || "https";
        const requestOrigin = forwardedHost
          ? `${forwardedProto}://${forwardedHost}`
          : "";
        const baseUrl = (
          requestOrigin ||
          process.env.NEXT_PUBLIC_SERVER_URL ||
          (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "https://www.theiamlab.com")
        ).replace(/\/+$/, "");
        const resetUrl = `${baseUrl}/admin/reset/${token}`;
        return `
          <div style="font-family: sans-serif; color: #0B1424; max-width: 560px; margin: 0 auto; padding: 24px;">
            <h2 style="margin-bottom: 12px;">The IAM Lab — Password Reset</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
              A password reset was requested for your administrator account. Use the button below to choose a new password:
            </p>
            <p style="margin: 24px 0;">
              <a href="${resetUrl}" style="display: inline-block; background: #0B1424; color: #FFFFFF; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                Reset Administrator Password
              </a>
            </p>
            <p style="font-size: 12px; color: #64748B;">
              If you did not request this reset, you can safely ignore this message.
            </p>
          </div>
        `;
      },
    },
  },
  labels: {
    singular: "User Account",
    plural: "Users & Administrators",
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role", "jobTitle", "createdAt"],
    group: "Administration",
    hideAPIURL: true,
    components: {
      views: {
        list: {
          Component: "/src/payload/views/UsersListView#UsersListView",
        },
      },
    },
  },
  access: {
    read: isAuthenticatedOrSelf,
    create: isAdminAccess,
    update: isAuthenticatedOrSelf,
    delete: isAdminAccess,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Full Name",
    },
    {
      name: "jobTitle",
      type: "text",
      defaultValue: "Super Administrator",
      label: "Professional Title / Role",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "admin",
      access: {
        update: ({ req: { user } }) =>
          Boolean(
            user &&
              typeof user.role === "string" &&
              (user.role === "admin" || user.role === "super_admin")
          ),
      },
      options: [
        { label: "Super Administrator", value: "super_admin" },
        { label: "Administrator", value: "admin" },
        { label: "Academy Manager", value: "academy_manager" },
        { label: "Instructor / Mentor", value: "instructor" },
        { label: "Content Editor", value: "editor" },
        { label: "Learner (Future Academy Portal)", value: "learner" },
      ],
      label: "Access Role",
    },
    {
      name: "phone",
      type: "text",
      label: "Direct Phone / WhatsApp",
    },
    {
      name: "avatarUrl",
      type: "text",
      label: "Profile Avatar URL",
    },
  ],
};
