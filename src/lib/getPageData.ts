import { connection } from "next/server";
import { queryWithRetry } from "./dbPool";

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

export interface NavLinkItem {
  label: string;
  href: string;
  visible?: boolean;
}

export interface SiteSettingsData {
  company_name: string;
  tagline: string;
  official_email: string;
  location: string;
  address: string;
  phone: string;
  whatsapp_number: string;
  map_embed_url: string;
  selar_store_url: string;
  linkedin_url: string;
  instagram_url: string;
  twitter_url: string;
  facebook_url: string;
  tiktok_url: string;
  youtube_url: string;
  show_instagram: boolean;
  show_facebook: boolean;
  show_tiktok: boolean;
  show_linkedin: boolean;
  show_twitter: boolean;
  show_youtube: boolean;
  logo_light_url: string;
  logo_dark_url: string;
  header_cta_label: string;
  footer_copyright_suffix: string;
  nav_links: NavLinkItem[];
  recaptcha_enabled: boolean;
  recaptcha_version: "v2_checkbox" | "v3";
  recaptcha_site_key: string;
}

export const OFFICIAL_WHATSAPP_FALLBACK = "+234 803 865 2760";

export function getWhatsAppHref(
  whatsappNumber?: string,
  message = "Hello The IAM Lab team, I would like to speak with an IAM specialist."
): string {
  const digits = (whatsappNumber || OFFICIAL_WHATSAPP_FALLBACK).replace(/\D/g, "");
  const safeDigits = digits.length >= 8 ? digits : "2348038652760";
  return `https://wa.me/${safeDigits}?text=${encodeURIComponent(message)}`;
}

/**
 * Ensures any "Talk to an IAM Specialist" button or explicit "whatsapp" route
 * consistently opens the verified WhatsApp link across all pages and CMS blocks.
 */
export function resolveCtaHref(
  rawHref: unknown,
  rawLabel: unknown,
  whatsappHref: string,
  fallback = "/contact"
): string {
  const label = String(rawLabel || "").trim().toLowerCase();
  const href = String(rawHref || "").trim();
  if (label === "talk to an iam specialist" || href.toLowerCase() === "whatsapp") {
    return whatsappHref;
  }
  return href || fallback;
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  company_name: "The IAM Lab",
  tagline: "Secure identities. Simplify access. Strengthen your business.",
  official_email: "info@theiamlab.com",
  location: "London, United Kingdom",
  address: "128 City Road, London, EC1V 2NX, United Kingdom",
  phone: "+44 20 8090 1234",
  whatsapp_number: OFFICIAL_WHATSAPP_FALLBACK,
  map_embed_url:
    "https://maps.google.com/maps?q=128+City+Road,+London,+EC1V+2NX,+United+Kingdom&t=m&z=16&ie=UTF8&iwloc=&output=embed",
  selar_store_url: "https://selar.com/m/chiemezie-uzoma1",
  linkedin_url: "",
  instagram_url: "",
  twitter_url: "",
  facebook_url: "",
  tiktok_url: "",
  youtube_url: "",
  show_instagram: true,
  show_facebook: true,
  show_tiktok: true,
  show_linkedin: true,
  show_twitter: true,
  show_youtube: true,
  logo_light_url: "/brand/the-iam-lab-logo-light.png",
  logo_dark_url: "/brand/the-iam-lab-logo-dark.png",
  header_cta_label: "Talk to an IAM Specialist",
  footer_copyright_suffix: "All rights reserved.",
  nav_links: [
    { label: "Home", href: "/", visible: true },
    { label: "About", href: "/about", visible: true },
    { label: "Services & Solutions", href: "/services", visible: true },
    { label: "IAM Academy", href: "/academy", visible: true },
    { label: "Contact", href: "/contact", visible: true },
  ],
  recaptcha_enabled: false,
  recaptcha_version: "v2_checkbox",
  recaptcha_site_key: "6LdwnjEuAAAAANcFI8csi-ssLQ0qO9flyReX3Pzi",
};

/**
 * Fetches structured CMS page data from PostgreSQL. Supports authenticated draft preview.
 */
export async function getPageData(
  slug: string,
  options?: { allowDraft?: boolean }
): Promise<PageData | null> {
  try {
    await connection();
  } catch {
    // Allow non-request invocation safely
  }

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

    const res = await queryWithRetry(query, [slug], `getPageData:${slug}`);
    if (res && res.rows.length > 0) {
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
  try {
    await connection();
  } catch {
    // Allow non-request invocation safely
  }

  try {
    const res = await queryWithRetry(
      `SELECT company_name, tagline, official_email, location, address, phone, whatsapp_number, map_embed_url, selar_store_url, linkedin_url, instagram_url, twitter_url, facebook_url, tiktok_url, youtube_url, show_instagram, show_facebook, show_tiktok, show_linkedin, show_twitter, show_youtube, logo_light_url, logo_dark_url, header_cta_label, footer_copyright_suffix, nav_links, recaptcha_enabled, recaptcha_version, recaptcha_site_key
       FROM site_settings
       ORDER BY id ASC
       LIMIT 1;`,
      undefined,
      "getSiteSettings"
    );
    if (!res || res.rows.length === 0) return DEFAULT_SITE_SETTINGS;

    const r = res.rows[0];
    const parsedNav = Array.isArray(r.nav_links) && r.nav_links.length > 0
      ? r.nav_links
          .filter((item: unknown): item is NavLinkItem => Boolean(item && typeof item === "object" && "label" in item && "href" in item))
          .map((item: NavLinkItem) => ({
            label: String(item.label),
            href: String(item.href),
            visible: item.visible !== false,
          }))
          .filter((item: NavLinkItem) => item.visible !== false && item.label.trim().length > 0)
      : DEFAULT_SITE_SETTINGS.nav_links;

    return {
      company_name: r.company_name || DEFAULT_SITE_SETTINGS.company_name,
      tagline: r.tagline || DEFAULT_SITE_SETTINGS.tagline,
      official_email: r.official_email || DEFAULT_SITE_SETTINGS.official_email,
      location: r.location || DEFAULT_SITE_SETTINGS.location,
      address: r.address || DEFAULT_SITE_SETTINGS.address,
      phone: r.phone || DEFAULT_SITE_SETTINGS.phone,
      whatsapp_number: r.whatsapp_number || DEFAULT_SITE_SETTINGS.whatsapp_number,
      map_embed_url:
        r.map_embed_url && !String(r.map_embed_url).includes("/maps/embed?pb=")
          ? r.map_embed_url
          : DEFAULT_SITE_SETTINGS.map_embed_url,
      selar_store_url: r.selar_store_url || DEFAULT_SITE_SETTINGS.selar_store_url,
      linkedin_url: r.linkedin_url ? String(r.linkedin_url).trim() : "",
      instagram_url: r.instagram_url ? String(r.instagram_url).trim() : "",
      twitter_url: r.twitter_url ? String(r.twitter_url).trim() : "",
      facebook_url: r.facebook_url ? String(r.facebook_url).trim() : "",
      tiktok_url: r.tiktok_url ? String(r.tiktok_url).trim() : "",
      youtube_url: r.youtube_url ? String(r.youtube_url).trim() : "",
      show_instagram: r.show_instagram !== false,
      show_facebook: r.show_facebook !== false,
      show_tiktok: r.show_tiktok !== false,
      show_linkedin: r.show_linkedin !== false,
      show_twitter: r.show_twitter !== false,
      show_youtube: r.show_youtube !== false,
      logo_light_url: r.logo_light_url || DEFAULT_SITE_SETTINGS.logo_light_url,
      logo_dark_url: r.logo_dark_url || DEFAULT_SITE_SETTINGS.logo_dark_url,
      header_cta_label: r.header_cta_label || DEFAULT_SITE_SETTINGS.header_cta_label,
      footer_copyright_suffix:
        r.footer_copyright_suffix || DEFAULT_SITE_SETTINGS.footer_copyright_suffix,
      nav_links: parsedNav.length > 0 ? parsedNav : DEFAULT_SITE_SETTINGS.nav_links,
      recaptcha_enabled: Boolean(r.recaptcha_enabled),
      recaptcha_version: r.recaptcha_version === "v3" ? "v3" : "v2_checkbox",
      recaptcha_site_key:
        typeof r.recaptcha_site_key === "string" && r.recaptcha_site_key.trim()
          ? r.recaptcha_site_key.trim()
          : DEFAULT_SITE_SETTINGS.recaptcha_site_key,
    };
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
