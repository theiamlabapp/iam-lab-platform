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
      name: "address",
      type: "text",
      defaultValue: "128 City Road, London, EC1V 2NX, United Kingdom",
      label: "Official Physical / Registered Address",
    },
    {
      name: "phone",
      type: "text",
      defaultValue: "+44 20 8090 1234",
      label: "Telephone / Contact Number",
    },
    {
      name: "mapEmbedUrl",
      type: "text",
      defaultValue:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.4093836881775!2d-0.09138762381987588!3d51.528574171817935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca78326e031%3A0xb35a3962b9a7852a!2s128%20City%20Rd%2C%20London%20EC1V%202NX!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk",
      label: "Google Maps Embed URL",
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
