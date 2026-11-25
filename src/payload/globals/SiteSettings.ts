import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";
import { isAdminAccess } from "../access/roles";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Global Site Settings",
  admin: {
    group: "Administration",
    description:
      "Authoritative brand details, contact channels, London headquarters location, and external resource URLs.",
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath("/", "layout");
        } catch {
          // ignore outside HTTP request
        }
      },
    ],
  },
  access: {
    read: () => true,
    update: isAdminAccess,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Brand Identity",
          description: "Core company naming and tagline across the public site.",
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
              defaultValue:
                "Secure identities. Simplify access. Strengthen your business.",
              label: "Official Brand Tagline",
            },
            {
              name: "logoLightUrl",
              type: "text",
              defaultValue: "/brand/the-iam-lab-logo-light.png",
              label: "Footer Logo Asset Path (Light Variant for Dark Backgrounds)",
            },
            {
              name: "logoDarkUrl",
              type: "text",
              defaultValue: "/brand/the-iam-lab-logo-dark.png",
              label: "Header Logo Asset Path (Dark Variant for White Surfaces)",
            },
            {
              name: "headerCtaLabel",
              type: "text",
              defaultValue: "Talk to an IAM Specialist",
              label: "Header Primary CTA Button Text",
            },
            {
              name: "footerCopyrightSuffix",
              type: "text",
              defaultValue: "All rights reserved.",
              label: "Footer Copyright Suffix Text",
            },
            {
              name: "navLinks",
              type: "json",
              defaultValue: [
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Services & Solutions", href: "/services" },
                { label: "IAM Academy", href: "/academy" },
                { label: "Contact", href: "/contact" },
              ],
              label: "Navigation Menu Items (JSON Array of { label, href })",
            },
          ],
        },
        {
          label: "Contact & Office",
          description:
            "Displayed on the Contact page, Footer, and outbound emails.",
          fields: [
            {
              name: "officialEmail",
              type: "email",
              required: true,
              defaultValue: "info@theiamlab.com",
              label: "Official Business Email",
            },
            {
              name: "phone",
              type: "text",
              defaultValue: "+44 20 8090 1234",
              label: "Telephone / Contact Number",
            },
            {
              name: "whatsappNumber",
              type: "text",
              defaultValue: "+234 803 865 2760",
              label: "Official WhatsApp Number (International Format)",
            },
            {
              name: "location",
              type: "text",
              defaultValue: "London, United Kingdom",
              label: "Headquarters City / Region",
            },
            {
              name: "address",
              type: "text",
              defaultValue: "128 City Road, London, EC1V 2NX, United Kingdom",
              label: "Official Registered Street Address",
            },
            {
              name: "mapEmbedUrl",
              type: "text",
              defaultValue:
                "https://maps.google.com/maps?q=128+City+Road,+London,+EC1V+2NX,+United+Kingdom&t=m&z=16&ie=UTF8&iwloc=&output=embed",
              label: "Google Maps Embed URL",
            },
          ],
        },
        {
          label: "External Channels",
          description: "Verified Selar store and approved social profile links.",
          fields: [
            {
              name: "selarStoreUrl",
              type: "text",
              required: true,
              defaultValue: "https://selar.com/m/chiemezie-uzoma1",
              label: "Official Selar Bookstore URL",
            },
            {
              name: "linkedinUrl",
              type: "text",
              label: "Official LinkedIn Page URL (Publish once confirmed by client)",
            },
            {
              name: "instagramUrl",
              type: "text",
              label: "Official Instagram Profile URL (Optional)",
            },
            {
              name: "twitterUrl",
              type: "text",
              label: "X (Twitter) Profile URL (Optional)",
            },
          ],
        },
      ],
    },
  ],
};
