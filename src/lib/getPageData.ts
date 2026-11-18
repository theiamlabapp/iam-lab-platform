import { Client } from "pg";

export interface PageData {
  id: number;
  title: string;
  slug: string;
  meta_description?: string;
  hero_headline?: string;
  hero_subheadline?: string;
  status: string;
  sections?: Array<Record<string, unknown>>;
  content?: Record<string, unknown>;
  updated_at?: string;
}

export async function getPageData(slug: string): Promise<PageData | null> {
  const rawDbUri = (process.env.DATABASE_URI || "").trim().replace(/^["']|["']$/g, "");
  if (!rawDbUri) return null;

  let client: Client | null = null;
  try {
    client = new Client({
      connectionString: rawDbUri,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 3000,
    });
    await client.connect();

    const res = await client.query(
      `SELECT id, title, slug, meta_description, hero_headline, hero_subheadline, status, sections, content, updated_at
       FROM pages
       WHERE slug = $1 AND (status = 'published' OR status IS NULL)
       LIMIT 1;`,
      [slug]
    );

    if (res.rows.length > 0) {
      return res.rows[0] as PageData;
    }
    return null;
  } catch (err) {
    // Graceful fallback to static page content
    console.warn(`[getPageData] Database lookup fallback for slug "${slug}":`, err instanceof Error ? err.message : err);
    return null;
  } finally {
    if (client) {
      try {
        await client.end();
      } catch {
        // ignore disconnect errors
      }
    }
  }
}
