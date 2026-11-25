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
    hideAPIURL: true,
    components: {
      views: {
        list: {
          Component: "/src/payload/views/PagesListView#PagesListView",
        },
      },
    },
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (!data || typeof data !== "object") return data;

        const nextData = { ...data };
        const orig = (originalDoc || {}) as Record<string, unknown>;
        const rawSections = Array.isArray(nextData.sections)
          ? nextData.sections
          : Array.isArray(orig.sections)
          ? orig.sections
          : null;

        if (!rawSections || rawSections.length === 0) return nextData;

        const origSections = Array.isArray(orig.sections) ? orig.sections : [];
        const heroIdx = rawSections.findIndex(
          (s) => s && typeof s === "object" && (s as Record<string, unknown>).type === "hero"
        );
        if (heroIdx === -1) return nextData;

        const nextHeroSec = { ...(rawSections[heroIdx] as Record<string, unknown>) };
        const origHeroSec = (
          origSections[heroIdx] && typeof origSections[heroIdx] === "object"
            ? origSections[heroIdx]
            : {}
        ) as Record<string, unknown>;

        // Keep top-level Hero Headline / Subheadline and sections[hero] 100% synchronised
        if (
          typeof nextData.heroHeadline === "string" &&
          nextData.heroHeadline !== orig.heroHeadline
        ) {
          nextHeroSec.headline = nextData.heroHeadline;
        } else if (
          typeof nextHeroSec.headline === "string" &&
          nextHeroSec.headline !== origHeroSec.headline
        ) {
          nextData.heroHeadline = nextHeroSec.headline;
        } else if (typeof nextHeroSec.headline === "string" && !nextData.heroHeadline) {
          nextData.heroHeadline = nextHeroSec.headline;
        }

        if (
          typeof nextData.heroSubheadline === "string" &&
          nextData.heroSubheadline !== orig.heroSubheadline
        ) {
          nextHeroSec.subheadline = nextData.heroSubheadline;
        } else if (
          typeof nextHeroSec.subheadline === "string" &&
          nextHeroSec.subheadline !== origHeroSec.subheadline
        ) {
          nextData.heroSubheadline = nextHeroSec.subheadline;
        } else if (typeof nextHeroSec.subheadline === "string" && !nextData.heroSubheadline) {
          nextData.heroSubheadline = nextHeroSec.subheadline;
        }

        const updatedSections = [...rawSections];
        updatedSections[heroIdx] = nextHeroSec;
        nextData.sections = updatedSections;
        return nextData;
      },
    ],
    afterChange: [
      ({ doc }) => {
        try {
          revalidatePath("/", "layout");
          revalidatePath("/");
          revalidatePath("/about");
          revalidatePath("/services");
          revalidatePath("/academy");
          revalidatePath("/contact");
          if (doc?.slug && doc.slug !== "home") {
            revalidatePath(`/${String(doc.slug)}`);
          }
        } catch {
          // Ignore revalidation warnings outside HTTP request context
        }
      },
    ],
    afterDelete: [
      () => {
        try {
          revalidatePath("/", "layout");
          revalidatePath("/");
          revalidatePath("/about");
          revalidatePath("/services");
          revalidatePath("/academy");
          revalidatePath("/contact");
        } catch {
          // Ignore outside HTTP context
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
