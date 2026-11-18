import { Client } from 'pg';

const connectionString = 'postgresql://payload_app.lqkrwdjtkxghrbiifuif:IamLabSecure2026_PayloadDB@aws-0-eu-west-2.pooler.supabase.com:5432/postgres';

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Connected to The IAM Lab Supabase database successfully.');

    const tables = await client.query(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_schema NOT IN ('information_schema', 'pg_catalog') 
      ORDER BY table_schema, table_name;
    `);
    console.log('--- TABLES IN DATABASE ---');
    console.table(tables.rows);

    const users = await client.query('SELECT id, name, email, role, created_at FROM users;');
    console.log('--- USERS ---');
    console.table(users.rows);

    const enquiries = await client.query('SELECT id, name, email, enquiry_type, status, created_at FROM enquiries ORDER BY id DESC LIMIT 5;');
    console.log('--- ENQUIRIES ---');
    console.table(enquiries.rows);

    try {
      const pages = await client.query('SELECT id, title, slug FROM pages;');
      console.log('--- PAGES ---');
      console.table(pages.rows);
    } catch (e) {
      console.log('Pages table query notice:', e.message);
    }

    try {
      const media = await client.query('SELECT id, filename, alt FROM media;');
      console.log('--- MEDIA ---');
      console.table(media.rows);
    } catch (e) {
      console.log('Media table query notice:', e.message);
    }

    const cols = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'pages' 
      ORDER BY ordinal_position;
    `);
    console.log('--- PAGES COLUMNS ---');
    console.table(cols.rows);

    const mediaCols = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'media' 
      ORDER BY ordinal_position;
    `);
    console.log('--- MEDIA COLUMNS ---');
    console.table(mediaCols.rows);

    await client.end();
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

main();
