import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Global Site Settings",
  admin: {
    group: "Administration",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
      defaultValue: "The IAM Lab",
      label: "Company / Brand Name",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Secure identities. Simplify access. Strengthen your business.",
      label: "Brand Tagline",
    },
    {
      name: "officialEmail",
      type: "email",
      required: true,
      defaultValue: "info@theiamlab.com",
      label: "Official Inbound Email",
    },
    {
      name: "location",
      type: "text",
      defaultValue: "London, United Kingdom",
      label: "Headquarters Location",
    },
    {
      name: "selarStoreUrl",
      type: "text",
      required: true,
      defaultValue: "https://selar.com/m/chiemezie-uzoma1",
      label: "Official Selar Store URL",
    },
    {
      name: "linkedinUrl",
      type: "text",
      defaultValue: "https://www.linkedin.com/company/theiamlab",
      label: "LinkedIn Profile URL",
    },
    {
      name: "twitterUrl",
      type: "text",
      label: "X (Twitter) Profile URL",
    },
  ],
};
