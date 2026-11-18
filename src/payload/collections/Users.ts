import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role", "createdAt"],
    group: "Administration",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user && user.role === "admin"),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user && user.role === "admin"),
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
