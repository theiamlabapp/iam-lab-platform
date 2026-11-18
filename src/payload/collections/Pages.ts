import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "Content Management",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user && user.role === "admin"),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Page Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug (e.g. home, about, services, academy, contact)",
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "SEO Meta Description",
    },
    {
      name: "heroHeadline",
      type: "text",
      label: "Hero Headline",
    },
    {
      name: "heroSubheadline",
      type: "textarea",
      label: "Hero Subheadline",
    },
    {
      name: "content",
      type: "richText",
      label: "Page Content",
    },
  ],
  timestamps: true,
};
