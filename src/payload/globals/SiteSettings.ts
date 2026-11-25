import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";
import { isAdminAccess } from "../access/roles";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Global Site Settings",
  admin: {
    group: "Administration",
    hideAPIURL: true,
    description:
      "Manage brand logos, navigation menu items, contact details, London office location, external links, and contact spam protection.",
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
          label: "Brand Identity & Navigation",
          description: "Core company naming, brand logos, header action button, and website navigation links.",
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
              name: "logoDarkUrl",
              type: "text",
              defaultValue: "/brand/the-iam-lab-logo-dark.png",
              label: "Header Logo (Dark Variant for White Surfaces)",
              admin: {
                components: {
                  Field: "/src/payload/components/MediaSelectorField#MediaSelectorField",
                },
              },
            },
            {
              name: "logoLightUrl",
              type: "text",
              defaultValue: "/brand/the-iam-lab-logo-light.png",
              label: "Footer Logo (Light Variant for Dark Backgrounds)",
              admin: {
                components: {
                  Field: "/src/payload/components/MediaSelectorField#MediaSelectorField",
                },
              },
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
                { label: "Home", href: "/", visible: true },
                { label: "About", href: "/about", visible: true },
                { label: "Services & Solutions", href: "/services", visible: true },
                { label: "IAM Academy", href: "/academy", visible: true },
                { label: "Contact", href: "/contact", visible: true },
              ],
              label: "Website Navigation Menu",
              admin: {
                components: {
                  Field: "/src/payload/components/NavLinksVisualEditor#NavLinksVisualEditor",
                },
              },
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
        {
          label: "Security & Spam Protection",
          description:
            "Manage Google reCAPTCHA on the public Contact form. The private secret key is protected exclusively in server environment variables.",
          fields: [
            {
              name: "recaptchaEnabled",
              type: "checkbox",
              defaultValue: false,
              label: "Enable Google reCAPTCHA on Public Contact Form",
            },
            {
              name: "recaptchaVersion",
              type: "select",
              defaultValue: "v2_checkbox",
              options: [
                {
                  label: "reCAPTCHA v2 (I'm not a robot Checkbox)",
                  value: "v2_checkbox",
                },
                {
                  label: "reCAPTCHA v3 (Score-based Invisible Verification)",
                  value: "v3",
                },
              ],
              label: "Configured Google reCAPTCHA Version",
            },
            {
              name: "recaptchaSiteKey",
              type: "text",
              defaultValue: "6LdwnjEuAAAAANcFI8csi-ssLQ0qO9flyReX3Pzi",
              label: "Google reCAPTCHA Public Site Key",
            },
            {
              name: "recaptchaStatusNotice",
              type: "ui",
              admin: {
                components: {
                  Field: "/src/payload/components/RecaptchaStatusField#RecaptchaStatusField",
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
