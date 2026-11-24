"use server";

import { getDbPool } from "@/lib/dbPool";
import { getAuthenticatedStaffUser } from "../access/serverAuth";

interface UpdateProfileArgs {
  name: string;
  jobTitle?: string;
  phone?: string;
  avatarUrl?: string;
}

/**
 * Fetches live account fields for the currently signed-in administrator/staff account.
 */
export async function getCurrentProfileAction() {
  const sessionUser = await getAuthenticatedStaffUser();
  if (!sessionUser) {
    return { success: false, error: "Unauthorized" };
  }

  const pool = getDbPool();
  if (!pool) {
    return { success: false, error: "Database unavailable" };
  }

  try {
    const res = await pool.query(
      `SELECT id, email, name, role, job_title, phone, avatar_url, created_at, updated_at
       FROM users
       WHERE id = $1
       LIMIT 1;`,
      [sessionUser.id]
    );

    if (res.rows.length === 0) {
      return { success: false, error: "Account record not found." };
    }

    const r = res.rows[0];
    return {
      success: true,
      profile: {
        id: r.id,
        email: r.email as string,
        name: (r.name as string) || "",
        role: (r.role as string) || "admin",
        jobTitle: (r.job_title as string) || "Super Administrator",
        phone: (r.phone as string) || "",
        avatarUrl: (r.avatar_url as string) || "/brand/the-iam-lab-logo-dark.png",
        createdAt: r.created_at ? String(r.created_at) : "",
        updatedAt: r.updated_at ? String(r.updated_at) : "",
      },
    };
  } catch (err) {
    console.error("[getCurrentProfileAction] Error:", err);
    return { success: false, error: "Failed to load profile." };
  }
}

/**
 * Updates the authenticated user's own profile metadata & persisted avatar image URL.
 */
export async function updateProfileAction(args: UpdateProfileArgs) {
  const sessionUser = await getAuthenticatedStaffUser();
  if (!sessionUser) {
    return { success: false, error: "Unauthorized: Please sign in again." };
  }

  const { name, jobTitle, phone, avatarUrl } = args;

  if (!name || name.trim().length < 2) {
    return { success: false, error: "Display name must be at least 2 characters." };
  }

  const pool = getDbPool();
  if (!pool) {
    return { success: false, error: "Database connection unavailable." };
  }

  try {
    const timestamp = new Date().toISOString();

    await pool.query(
      `UPDATE users
       SET name = $1, job_title = $2, phone = $3, avatar_url = $4, updated_at = $5
       WHERE id = $6;`,
      [
        name.trim(),
        jobTitle?.trim() || "Super Administrator",
        phone?.trim() || "",
        avatarUrl || "/brand/the-iam-lab-logo-dark.png",
        timestamp,
        sessionUser.id,
      ]
    );

    return { success: true };
  } catch (err) {
    console.error("[updateProfileAction] Error:", err);
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Database error updating profile.",
    };
  }
}
