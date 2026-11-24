import configPromise from "@payload-config";
import { headers } from "next/headers";
import { getPayload } from "payload";
import { ADMIN_ROLES, STAFF_ROLES } from "./roles";

export interface AuthenticatedUser {
  id: number | string;
  email: string;
  name?: string;
  role: string;
  jobTitle?: string;
  phone?: string;
  avatarUrl?: string;
}

/**
 * Verifies the active Payload session cookie via official Payload auth and returns
 * the authenticated user only if they belong to a permitted staff or admin role.
 */
export async function getAuthenticatedStaffUser(
  reqHeaders?: Headers
): Promise<AuthenticatedUser | null> {
  try {
    const hdrs = reqHeaders ?? (await headers());
    const config = await configPromise;
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: hdrs });

    if (!user) return null;
    const record = user as unknown as Record<string, unknown>;
    const role = typeof record.role === "string" ? record.role : "";
    if (!STAFF_ROLES.has(role)) return null;

    return {
      id: user.id,
      email: String(user.email || ""),
      name: typeof record.name === "string" ? record.name : undefined,
      role,
      jobTitle: typeof record.jobTitle === "string" ? record.jobTitle : undefined,
      phone: typeof record.phone === "string" ? record.phone : undefined,
      avatarUrl: typeof record.avatarUrl === "string" ? record.avatarUrl : undefined,
    };
  } catch (err) {
    console.warn("[serverAuth] Session check failed:", err);
    return null;
  }
}

/**
 * Returns true if the verified user holds an administrative clearance role.
 */
export function hasAdminClearance(user: AuthenticatedUser | null): boolean {
  return Boolean(user && ADMIN_ROLES.has(user.role));
}
