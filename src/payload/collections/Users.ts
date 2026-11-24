import type { CollectionConfig } from "payload";
import { isAdminAccess, isAuthenticatedOrSelf } from "../access/roles";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: {
    singular: "User Account",
    plural: "Users & Administrators",
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role", "jobTitle", "createdAt"],
    group: "Administration",
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
