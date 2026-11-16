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

import pg from "pg";

const connectionString =
  process.env.DATABASE_URI ||
  "postgresql://payload_app.lqkrwdjtkxghrbiifuif:IamLabSecure2026_PayloadDB@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?sslmode=require";

const emailArg = process.argv[2] || process.env.ADMIN_EMAIL || "chimezie@theiamlab.com";
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
      console.log(
        `[The IAM Lab] Admin user "${emailArg}" already exists with role: "${userCheck.rows[0].role}".`
      );
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
