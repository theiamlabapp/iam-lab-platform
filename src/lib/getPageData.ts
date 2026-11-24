import { getDbPool } from "./dbPool";

export interface PageSection extends Record<string, unknown> {
  type: string;
  badge?: string;
  headline?: string;
  title?: string;
  subheadline?: string;
  subtitle?: string;
  body?: string;
  desc?: string;
  bgImage?: string;
  ctaPrimary?: { label?: string; href?: string };
  ctaSecondary?: { label?: string; href?: string };
  items?: Array<Record<string, unknown>>;
}

export interface PageData {
  id: number;
  title: string;
  slug: string;
  meta_description?: string;
  hero_headline?: string;
  hero_subheadline?: string;
  status: string;
  sections?: PageSection[];
  content?: Record<string, unknown>;
  updated_at?: string;
}

export interface SiteSettingsData {
  company_name: string;
  tagline: string;
  official_email: string;
  location: string;
  address: string;
  phone: string;
  map_embed_url: string;
  selar_store_url: string;
  linkedin_url: string;
  twitter_url: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  company_name: "The IAM Lab",
  tagline: "Secure identities. Simplify access. Strengthen your business.",
  official_email: "info@theiamlab.com",
  location: "London, United Kingdom",
  address: "128 City Road, London, EC1V 2NX, United Kingdom",
  phone: "+44 20 8090 1234",
  map_embed_url:
    "https://maps.google.com/maps?q=128+City+Road,+London,+EC1V+2NX,+United+Kingdom&t=m&z=16&ie=UTF8&iwloc=&output=embed",
  selar_store_url: "https://selar.com/m/chiemezie-uzoma1",
  linkedin_url: "https://www.linkedin.com/company/theiamlab",
  twitter_url: "",
};

/**
 * Fetches structured CMS page data from PostgreSQL. Supports authenticated draft preview.
 */
export async function getPageData(
  slug: string,
  options?: { allowDraft?: boolean }
): Promise<PageData | null> {
  const pool = getDbPool();
  if (!pool) return null;

  try {
    const query = options?.allowDraft
      ? `SELECT id, title, slug, meta_description, hero_headline, hero_subheadline, status, sections, content, updated_at
         FROM pages
         WHERE slug = $1
         LIMIT 1;`
      : `SELECT id, title, slug, meta_description, hero_headline, hero_subheadline, status, sections, content, updated_at
         FROM pages
         WHERE slug = $1 AND (status = 'published' OR status IS NULL)
         LIMIT 1;`;

    const res = await pool.query(query, [slug]);
    if (res.rows.length > 0) {
      return res.rows[0] as PageData;
    }
    return null;
  } catch (err) {
    console.warn(
      `[getPageData] Database lookup fallback for slug "${slug}":`,
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

/**
 * Finds the first matching structured section by its `type` discriminator.
 */
export function findSection(
  pageData: PageData | null,
  type: string
): PageSection | undefined {
  if (!pageData?.sections || !Array.isArray(pageData.sections)) return undefined;
  return pageData.sections.find((s) => s && s.type === type);
}

/**
 * Returns additional custom editorial sections added via the Visual CMS Page Editor.
 */
export function getCustomSections(
  pageData: PageData | null,
  builtinTypes: Set<string>
): PageSection[] {
  if (!pageData?.sections || !Array.isArray(pageData.sections)) return [];
  return pageData.sections.filter(
    (s) => s && typeof s.type === "string" && !builtinTypes.has(s.type)
  );
}

/**
 * Fetches global site settings from Supabase with safe static defaults.
 */
export async function getSiteSettings(): Promise<SiteSettingsData> {
  const pool = getDbPool();
  if (!pool) return DEFAULT_SITE_SETTINGS;

  try {
    const res = await pool.query(
      `SELECT company_name, tagline, official_email, location, address, phone, map_embed_url, selar_store_url, linkedin_url, twitter_url
       FROM site_settings
       ORDER BY id ASC
       LIMIT 1;`
    );
    if (res.rows.length === 0) return DEFAULT_SITE_SETTINGS;

    const r = res.rows[0];
    return {
      company_name: r.company_name || DEFAULT_SITE_SETTINGS.company_name,
      tagline: r.tagline || DEFAULT_SITE_SETTINGS.tagline,
      official_email: r.official_email || DEFAULT_SITE_SETTINGS.official_email,
      location: r.location || DEFAULT_SITE_SETTINGS.location,
      address: r.address || DEFAULT_SITE_SETTINGS.address,
      phone: r.phone || DEFAULT_SITE_SETTINGS.phone,
      map_embed_url:
        r.map_embed_url && !String(r.map_embed_url).includes("/maps/embed?pb=")
          ? r.map_embed_url
          : DEFAULT_SITE_SETTINGS.map_embed_url,
      selar_store_url: r.selar_store_url || DEFAULT_SITE_SETTINGS.selar_store_url,
      linkedin_url: r.linkedin_url || DEFAULT_SITE_SETTINGS.linkedin_url,
      twitter_url: r.twitter_url || "",
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
