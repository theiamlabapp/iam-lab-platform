import type { Access, AccessArgs } from "payload";

/**
 * Role-based access control definitions aligned with The IAM Lab's
 * multi-role roadmap (Super Admin, Admin, Academy Manager, Instructor, Editor, Learner).
 */
export const ADMIN_ROLES = new Set(["super_admin", "admin"]);
export const EDITORIAL_ROLES = new Set(["super_admin", "admin", "editor", "academy_manager"]);
export const ENQUIRY_ROLES = new Set(["super_admin", "admin", "academy_manager"]);
export const STAFF_ROLES = new Set([
  "super_admin",
  "admin",
  "academy_manager",
  "instructor",
  "editor",
]);

function getUserRole(args: AccessArgs): string | null {
  const user = args?.req?.user as { role?: unknown } | null | undefined;
  return typeof user?.role === "string" ? user.role : null;
}

export const isAdminAccess: Access = (args) => {
  const role = getUserRole(args);
  return Boolean(role && ADMIN_ROLES.has(role));
};

export const isEditorialAccess: Access = (args) => {
  const role = getUserRole(args);
  return Boolean(role && EDITORIAL_ROLES.has(role));
};

export const isEnquiryAccess: Access = (args) => {
  const role = getUserRole(args);
  return Boolean(role && ENQUIRY_ROLES.has(role));
};

export const isStaffAccess: Access = (args) => {
  const role = getUserRole(args);
  return Boolean(role && STAFF_ROLES.has(role));
};

export const isAuthenticatedOrSelf: Access = (args) => {
  const user = args?.req?.user as { id?: string | number; role?: unknown } | null | undefined;
  if (!user) return false;
  if (typeof user.role === "string" && ADMIN_ROLES.has(user.role)) return true;
  return {
    id: {
      equals: user.id,
    },
  };
};
