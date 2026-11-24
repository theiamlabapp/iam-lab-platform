import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";
import { isAdminAccess, isEditorialAccess } from "../access/roles";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Website Pages",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
    group: "Content Management",
    components: {
      views: {
        list: {
          Component: "/src/payload/views/PagesListView#PagesListView",
        },
      },
    },
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        try {
          revalidatePath("/", "layout");
          if (doc?.slug === "home") {
            revalidatePath("/");
          } else if (doc?.slug) {
            revalidatePath(`/${String(doc.slug)}`);
          }
        } catch {
          // Ignore revalidation warnings outside HTTP request context
        }
      },
    ],
  },
  access: {
    read: () => true,
    create: isEditorialAccess,
    update: isEditorialAccess,
    delete: isAdminAccess,
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
      label: "URL Route Slug (home, about, services, academy, contact)",
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
      label: "Page Notes / Summary Copy",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Published (Live on Website)", value: "published" },
        { label: "Draft (Internal Review)", value: "draft" },
      ],
      admin: {
        position: "sidebar",
      },
      label: "Publishing Status",
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
      label: "Publication Date",
    },
    {
      name: "sections",
      type: "json",
      label: "Structured Page Sections",
      admin: {
        description:
          "Visual CMS editor: edit copy, headings, background photography, CTAs, and section order without writing code.",
        components: {
          Field:
            "/src/payload/components/SectionsVisualEditor#SectionsVisualEditor",
        },
      },
    },
  ],
  timestamps: true,
};
