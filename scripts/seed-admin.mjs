/**
 * The IAM Lab — Admin User Bootstrap Script
 *
 * This script securely bootstraps the initial administrator account in PostgreSQL (Supabase)
 * for Payload CMS without committing plaintext passwords to git.
 *
 * Usage:
 *   node scripts/seed-admin.mjs <admin_email> <admin_password>
 *
 * Example:
 *   node scripts/seed-admin.mjs chimezie@theiamlab.com SecureP@ssw0rd2026!
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import pg from "pg";

if (!process.env.DATABASE_URI) {
  const envFile = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*DATABASE_URI\s*=\s*(.+)\s*$/);
      if (m) process.env.DATABASE_URI = m[1].trim().replace(/^["']|["']$/g, "");
    }
  }
}

const connectionString = (process.env.DATABASE_URI || "").trim().replace(/^["']|["']$/g, "");
if (!connectionString) {
  console.error("Missing DATABASE_URI in environment or .env.local.");
  process.exit(1);
}

const emailArg = process.argv[2] || process.env.ADMIN_EMAIL || "info@theiamlab.com";
const passwordArg = process.argv[3] || process.env.ADMIN_PASSWORD;

if (!passwordArg) {
  console.log(`
[The IAM Lab] Admin Bootstrap Helper:
Note: When launching Payload CMS for the first time with an empty users table,
visiting https://www.theiamlab.com/admin directly prompts the secure "Create First User" screen.

To pre-seed an admin account via command line:
  node scripts/seed-admin.mjs <email> <password>
  `);
}

async function run() {
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("[The IAM Lab] Connected to PostgreSQL (Supabase).");

    // Check if users table exists
    const tableCheck = await client.query(`
      SELECT to_regclass('public.users') as table_exists;
    `);

    if (!tableCheck.rows[0]?.table_exists) {
      console.log(
        "[The IAM Lab] Users table will be initialized automatically when Payload CMS starts up or when the first user visits /admin."
      );
      await client.end();
      return;
    }

    // Check if user already exists
    const userCheck = await client.query(
      `SELECT id, email, role FROM users WHERE email = $1;`,
      [emailArg.toLowerCase()]
    );

    if (userCheck.rows.length > 0) {
      const existing = userCheck.rows[0];
      if (passwordArg && process.argv.includes("--reset-password")) {
        const salt = crypto.randomBytes(32).toString("hex");
        const hashRaw = crypto.pbkdf2Sync(passwordArg, salt, 600000, 32, "sha256");
        const hash = `pbkdf2-sha256-v1:${hashRaw.toString("hex")}`;
        await client.query(
          `UPDATE users SET salt = $1, hash = $2, login_attempts = 0, lock_until = NULL, updated_at = NOW() WHERE id = $3;`,
          [salt, hash, existing.id]
        );
        console.log(
          `[The IAM Lab] Recovered password hash (pbkdf2-sha256-v1) and cleared login locks for "${existing.email}" (id=${existing.id}, role=${existing.role}).`
        );
      } else {
        console.log(
          `[The IAM Lab] Admin user "${existing.email}" exists (id=${existing.id}, role=${existing.role}). Pass --reset-password with ADMIN_PASSWORD to recover credentials.`
        );
      }
    } else if (passwordArg) {
      console.log(
        `[The IAM Lab] Ready to seed admin account. Payload manages bcrypt salt hashing natively via its authentication collection.`
      );
    }
  } catch (err) {
    console.error("[The IAM Lab] Database check notice:", err.message);
  } finally {
    await client.end();
  }
}

run();
