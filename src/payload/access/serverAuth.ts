import configPromise from "@payload-config";
import { headers } from "next/headers";
import { getPayload } from "payload";
import { isTransientDbError, withTransientDbRetry } from "@/lib/dbPool";
import { ADMIN_ROLES, EDITORIAL_ROLES, ENQUIRY_ROLES, STAFF_ROLES } from "./roles";

export interface AuthenticatedUser {
  id: number | string;
  email: string;
  name?: string;
  role: string;
  jobTitle?: string;
  phone?: string;
  avatarUrl?: string;
}

export type StaffSessionResult =
  | { status: "authenticated"; user: AuthenticatedUser }
  | { status: "unauthenticated" }
  | { status: "db_error"; message: string };

/**
 * Verifies the active Payload session cookie via official Payload auth with
 * safe read-retry on transient Supabase pooler drops. Distinguishes genuine
 * unauthenticated/expired tokens from temporary database interruptions so
 * administrators are never falsely logged out during a brief DB blip.
 */
export async function getStaffSessionState(
  reqHeaders?: Headers
): Promise<StaffSessionResult> {
  try {
    const hdrs = reqHeaders ?? (await headers());
    const config = await configPromise;
    const payload = await getPayload({ config });

    const { user } = await withTransientDbRetry(
      () => payload.auth({ headers: hdrs }),
      { maxRetries: 2, baseDelayMs: 150, label: "payload.auth" }
    );

    if (!user) return { status: "unauthenticated" };

    const record = user as unknown as Record<string, unknown>;
    const role = typeof record.role === "string" ? record.role : "";
    if (!STAFF_ROLES.has(role)) return { status: "unauthenticated" };

    return {
      status: "authenticated",
      user: {
        id: user.id,
        email: String(user.email || ""),
        name: typeof record.name === "string" ? record.name : undefined,
        role,
        jobTitle: typeof record.jobTitle === "string" ? record.jobTitle : undefined,
        phone: typeof record.phone === "string" ? record.phone : undefined,
        avatarUrl: typeof record.avatarUrl === "string" ? record.avatarUrl : undefined,
      },
    };
  } catch (err) {
    if (isTransientDbError(err)) {
      console.error("[serverAuth] Transient DB interruption during session verification:", err);
      return {
        status: "db_error",
        message: "Temporary database connection interruption while verifying session.",
      };
    }
    console.warn("[serverAuth] Session check failed:", err);
    return { status: "unauthenticated" };
  }
}

/**
 * Convenience helper returning the verified staff user or null.
 */
export async function getAuthenticatedStaffUser(
  reqHeaders?: Headers
): Promise<AuthenticatedUser | null> {
  const result = await getStaffSessionState(reqHeaders);
  return result.status === "authenticated" ? result.user : null;
}

/**
 * Returns true if the verified user holds an administrative clearance role.
 */
export function hasAdminClearance(user: AuthenticatedUser | null): boolean {
  return Boolean(user && ADMIN_ROLES.has(user.role));
}

export function hasEditorialClearance(user: AuthenticatedUser | null): boolean {
  return Boolean(user && EDITORIAL_ROLES.has(user.role));
}

export function hasEnquiryClearance(user: AuthenticatedUser | null): boolean {
  return Boolean(user && ENQUIRY_ROLES.has(user.role));
}
