import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://payload_app.lqkrwdjtkxghrbiifuif:IamLabSecure2026_PayloadDB@aws-0-eu-west-2.pooler.supabase.com:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

async function run() {
  await client.connect();
  console.log("[Test] Connected to Supabase PostgreSQL!");
  const timestamp = new Date().toISOString();
  const insert = await client.query(
    `INSERT INTO enquiries (enquiry_type, name, email, organisation, phone, service_or_pathway, message, status, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9)
     RETURNING id, name, email, enquiry_type, status, created_at;`,
    [
      "enterprise_consulting",
      "Mr. Chimezie Uzoma Test",
      "info@theiamlab.com",
      "The IAM Lab",
      "+44 7000 000000",
      "service_strategy",
      "Comprehensive test of the enquiry persistence pipeline from website to Supabase PostgreSQL 17.",
      "new",
      timestamp,
    ]
  );
  console.log("[Test] Successfully stored enquiry:", insert.rows[0]);

  const count = await client.query("SELECT count(*) FROM enquiries;");
  console.log("[Test] Total enquiries now in Supabase:", count.rows[0].count);

  await client.end();
}

run().catch((err) => {
  console.error("[Test] Error:", err);
  process.exit(1);
});
