import { Client } from "pg";

const rawDbUri = (
  process.env.DATABASE_URI ||
  "postgresql://payload_app.lqkrwdjtkxghrbiifuif:IamLabSecure2026_PayloadDB@aws-0-eu-west-2.pooler.supabase.com:5432/postgres"
).trim().replace(/^["']|["']$/g, "");

const client = new Client({
  connectionString: rawDbUri,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  await client.connect();
  console.log("Connected to Supabase PostgreSQL.");

  // 1. Pages table enhancements
  await client.query(`
    ALTER TABLE pages ADD COLUMN IF NOT EXISTS status VARCHAR(32) DEFAULT 'published';
    ALTER TABLE pages ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ DEFAULT NOW();
    ALTER TABLE pages ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '[]'::jsonb;
  `);
  console.log("Updated pages table columns.");

  // 2. Enquiries table enhancements (replies, notes)
  await client.query(`
    ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS internal_notes TEXT;
    ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS replies JSONB DEFAULT '[]'::jsonb;
  `);
  console.log("Updated enquiries table columns.");

  // 3. Site settings enhancements
  await client.query(`
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS address TEXT DEFAULT '128 City Road, London, EC1V 2NX, United Kingdom';
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS phone TEXT DEFAULT '+44 20 8090 1234';
    ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS map_embed_url TEXT;
  `);
  console.log("Updated site_settings table columns.");

  // 4. Users table enhancements (avatar, job_title)
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
