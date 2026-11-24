import fs from "fs";
import path from "path";
import { Client } from "pg";

if (!process.env.DATABASE_URI) {
  const envFile = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*DATABASE_URI\s*=\s*(.+)\s*$/);
      if (m) process.env.DATABASE_URI = m[1].trim().replace(/^["']|["']$/g, "");
    }
  }
}

const rawDbUri = (process.env.DATABASE_URI || "").trim().replace(/^["']|["']$/g, "");
if (!rawDbUri) {
  console.error("Missing DATABASE_URI in environment or .env.local.");
  process.exit(1);
}

const client = new Client({
  connectionString: rawDbUri,
  ssl: { rejectUnauthorized: false },
});

const DEFAULT_MAP_EMBED =
  "https://maps.google.com/maps?q=128+City+Road,+London,+EC1V+2NX,+United+Kingdom&t=m&z=16&ie=UTF8&iwloc=&output=embed";

async function migrate() {
  await client.connect();
  console.log("Connected to Supabase PostgreSQL.");

  // 1. Expand enum_users_role safely for extensible enterprise & Academy RBAC
  for (const roleVal of [
    "super_admin",
    "admin",
    "academy_manager",
    "instructor",
    "editor",
    "learner",
  ]) {
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_enum e
          JOIN pg_type t ON e.enumtypid = t.oid
          WHERE t.typname = 'enum_users_role' AND e.enumlabel = '${roleVal}'
        ) THEN
          ALTER TYPE enum_users_role ADD VALUE '${roleVal}';
        END IF;
      END$$;
    `);
  }
  console.log("Synchronized enum_users_role values.");

  // 2. Pages table enhancements
  await client.query(`
    ALTER TABLE pages ADD COLUMN IF NOT EXISTS status VARCHAR(32) DEFAULT 'published';
    ALTER TABLE pages ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT NOW();
    ALTER TABLE pages ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '[]'::jsonb;
  `);
  console.log("Updated pages table columns.");

  // 3. Enquiries table enhancements
  await client.query(`
    ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS internal_notes TEXT;
    ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS replies JSONB DEFAULT '[]'::jsonb;
  `);
  console.log("Updated enquiries table columns.");

  // 4. Media table enhancements (supports serverless DB-persisted uploads + local brand asset reconciliation)
  await client.query(`
    ALTER TABLE media ADD COLUMN IF NOT EXISTS category VARCHAR(64) DEFAULT 'hero';
    ALTER TABLE media ADD COLUMN IF NOT EXISTS source_type VARCHAR(32) DEFAULT 'brand';
    ALTER TABLE media ADD COLUMN IF NOT EXISTS asset_data BYTEA;
  `);
  console.log("Updated media table columns.");

  // 5. Site settings enhancements & deduplication (single authoritative row)
  await client.query(`
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '128 City Road, London, EC1V 2NX, United Kingdom';
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '+44 20 8090 1234';
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS map_embed_url TEXT;
  `);
  await client.query(`DELETE FROM site_settings WHERE id > 1;`);
  await client.query(
    `UPDATE site_settings
     SET map_embed_url = COALESCE(NULLIF(map_embed_url, ''), $1),
         updated_at = NOW()
     WHERE id = 1;`,
    [DEFAULT_MAP_EMBED]
  );
  console.log("Updated & deduplicated site_settings table.");

  // 6. Users table enhancements
  await client.query(`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS job_title VARCHAR(255) DEFAULT 'Super Administrator';
    ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(100);
    ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
  `);
  console.log("Updated users table columns.");

  await client.end();
  console.log("All database schema updates completed successfully.");
}

migrate().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
