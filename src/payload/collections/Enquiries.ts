import type { CollectionConfig } from "payload";
import { isAdminAccess, isStaffAccess } from "../access/roles";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  labels: {
    singular: "Client Enquiry",
    plural: "Client Enquiries",
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: [
      "name",
      "email",
      "enquiryType",
      "organisation",
      "status",
      "createdAt",
    ],
    description:
      "Inbound corporate consulting requests and IAM Academy cohort applications.",
    group: "Client Management",
    components: {
      views: {
        list: {
          Component: "/src/payload/views/EnquiriesListView#EnquiriesListView",
        },
      },
    },
  },
  access: {
    read: isStaffAccess,
    create: () => true, // Public contact form submission
    update: isStaffAccess,
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
      name: "email",
      type: "email",
      required: true,
      label: "Work Email",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone / WhatsApp Number",
    },
    {
      name: "organisation",
      type: "text",
      label: "Organisation / Current Role",
    },
    {
      name: "enquiryType",
      type: "select",
      required: true,
      defaultValue: "enterprise_consulting",
      options: [
        { label: "Enterprise Consulting", value: "enterprise_consulting" },
        { label: "Corporate Training & Enablement", value: "corporate_training" },
        { label: "Individual Learning & Mentorship", value: "individual_learning" },
        { label: "Partnership Exploration", value: "partnership" },
        { label: "General Enquiry", value: "general" },
      ],
      label: "Enquiry Category",
    },
    {
      name: "serviceOrPathway",
      type: "text",
      label: "Selected Service / Learning Pathway",
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Enquiry Details / Project Scope",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New (Unread)", value: "new" },
        { label: "Contacted / In Discussion", value: "contacted" },
        { label: "Proposal Sent", value: "proposal_sent" },
        { label: "Resolved / Closed", value: "resolved" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
      label: "Lead Status",
    },
    {
      name: "internalNotes",
      type: "textarea",
      admin: {
        position: "sidebar",
      },
      label: "Internal Team Notes",
    },
    {
      name: "replies",
      type: "json",
      defaultValue: [],
      label: "Communication History",
      admin: {
        description:
          "Log of responses and direct outreach sent to this client enquiry.",
        components: {
          Field:
            "/src/payload/components/EnquiryCommunicationWorkspace#EnquiryCommunicationWorkspace",
        },
      },
    },
  ],
  timestamps: true,
};
