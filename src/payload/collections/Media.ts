import type { CollectionConfig } from "payload";
import { isAdminAccess, isEditorialAccess } from "../access/roles";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    disableLocalStorage: true,
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  admin: {
    group: "Content Management",
    hideAPIURL: true,
    components: {
      views: {
        list: {
          Component: "/src/payload/views/MediaLibraryView#MediaLibraryView",
        },
      },
    },
  },
  access: {
    read: () => true,
    create: isEditorialAccess,
    update: isEditorialAccess,
    delete: isAdminAccess,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alternative Text",
    },
    {
      name: "caption",
      type: "text",
      label: "Caption / Description",
    },
    {
      name: "category",
      type: "select",
      defaultValue: "hero",
      options: [
        { label: "Hero Photography", value: "hero" },
        { label: "Advisory & Consulting", value: "consulting" },
        { label: "IAM Academy", value: "classroom" },
        { label: "Identity Operations", value: "identity" },
        { label: "Profile Portraits", value: "portrait" },
        { label: "Brand Logos", value: "logo" },
      ],
      label: "Asset Category",
    },
    {
      name: "sourceType",
      type: "text",
      defaultValue: "uploaded",
      admin: {
        readOnly: true,
      },
    },
  ],
};
