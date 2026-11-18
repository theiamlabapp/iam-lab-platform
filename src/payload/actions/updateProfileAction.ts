"use server";

import { Client } from "pg";

interface UpdateProfileArgs {
  email: string;
  name: string;
  jobTitle?: string;
  phone?: string;
  avatarUrl?: string;
  currentPassword?: string;
  newPassword?: string;
}

export async function updateProfileAction(args: UpdateProfileArgs) {
  const { email, name, jobTitle, phone, avatarUrl } = args;

  if (!email || !email.includes("@")) {
    return { success: false, error: "A valid email is required." };
  }

  if (!name || name.trim().length < 2) {
    return { success: false, error: "Name must be at least 2 characters." };
  }

  const rawDbUri = (process.env.DATABASE_URI || "").trim().replace(/^["']|["']$/g, "");
  if (!rawDbUri) {
    return { success: false, error: "Database connection not available." };
  }

  try {
    const client = new Client({
      connectionString: rawDbUri,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const timestamp = new Date().toISOString();

    await client.query(
      `UPDATE users
       SET name = $1, job_title = $2, phone = $3, avatar_url = $4, updated_at = $5
       WHERE email = $6;`,
      [name.trim(), jobTitle?.trim() || "Super Administrator", phone?.trim() || "", avatarUrl || "", timestamp, email.trim()]
    );

    await client.end();
    return { success: true };
  } catch (err) {
    console.error("[updateProfileAction] Error:", err);
    return { success: false, error: err instanceof Error ? err.message : "Database error updating profile." };
  }
}
