import pg from "pg";

const client = new pg.Client({
  connectionString:
    "postgresql://payload_app.lqkrwdjtkxghrbiifuif:IamLabSecure2026_PayloadDB@aws-0-eu-west-2.pooler.supabase.com:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await client.connect();
  console.log("Connected as payload_app");

  await client.query(`
    INSERT INTO site_settings (
      company_name, tagline, official_email, location, selar_store_url, linkedin_url, created_at, updated_at
    ) VALUES (
      'The IAM Lab',
      'Secure identities. Simplify access. Strengthen your business.',
      'info@theiamlab.com',
      'London, United Kingdom',
      'https://selar.com/m/chiemezie-uzoma1',
      'https://www.linkedin.com/company/theiamlab',
      NOW(),
      NOW()
    );
  `);
  console.log("Site settings seeded.");

  await client.query("GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;");
  await client.query("GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;");
  console.log("Granted permissions to postgres role.");

  await client.end();
}

main().catch(console.error);
