import type { SiteSettingsData } from "@/lib/getPageData";

function isValidHttpUrl(raw?: string | null): string | null {
  const trimmed = String(raw || "").trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
    return null;
  } catch {
    return null;
  }
}

interface SocialItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

/**
 * Renders enabled, URL-validated enterprise social media channels horizontally
 * in matching Footer (dark) and Contact page (light) styling.
 */
export function SocialLinksBar({
  settings,
  theme = "dark",
  showHeading = false,
}: {
  settings: SiteSettingsData;
  theme?: "dark" | "light";
  showHeading?: boolean;
}) {
  const channels: SocialItem[] = [];

  const instagram =
    settings.show_instagram !== false ? isValidHttpUrl(settings.instagram_url) : null;
  if (instagram) {
    channels.push({
      id: "instagram",
      label: "Instagram",
      href: instagram,
      icon: (
        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    });
  }

  const facebook =
    settings.show_facebook !== false ? isValidHttpUrl(settings.facebook_url) : null;
  if (facebook) {
    channels.push({
      id: "facebook",
      label: "Facebook",
      href: facebook,
      icon: (
        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7.5v3h2.8v8h3.2z" />
        </svg>
      ),
    });
  }

  const tiktok =
    settings.show_tiktok !== false ? isValidHttpUrl(settings.tiktok_url) : null;
  if (tiktok) {
    channels.push({
      id: "tiktok",
      label: "TikTok",
      href: tiktok,
      icon: (
        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.04.88.13V9.4a6.34 6.34 0 0 0-.88-.06A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1Z" />
        </svg>
      ),
    });
  }

  const linkedin =
    settings.show_linkedin !== false ? isValidHttpUrl(settings.linkedin_url) : null;
  if (linkedin) {
    channels.push({
      id: "linkedin",
      label: "LinkedIn",
      href: linkedin,
      icon: (
        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    });
  }

  const twitter =
    settings.show_twitter !== false ? isValidHttpUrl(settings.twitter_url) : null;
  if (twitter) {
    channels.push({
      id: "x",
      label: "X (Twitter)",
      href: twitter,
      icon: (
        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    });
  }

  const youtube =
    settings.show_youtube !== false ? isValidHttpUrl(settings.youtube_url) : null;
  if (youtube) {
    channels.push({
      id: "youtube",
      label: "YouTube",
      href: youtube,
      icon: (
        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      ),
    });
  }

  if (channels.length === 0) return null;

  const isDark = theme === "dark";

  return (
    <div className={showHeading ? "border-t border-slate-200 pt-5" : "pt-2"}>
      {showHeading && (
        <p className="mb-3 font-mono text-[11px] font-bold tracking-wider text-slate-500 uppercase">
          Official Social Channels
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2.5">
        {channels.map((ch) => (
          <a
            key={ch.id}
            href={ch.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow The IAM Lab on ${ch.label}`}
            title={`Follow The IAM Lab on ${ch.label}`}
            className={
              isDark
                ? "inline-flex h-9 w-9 items-center justify-center border border-white/15 bg-white/[0.04] text-slate-300 transition-colors hover:border-[#D89A43] hover:bg-[#D89A43]/15 hover:text-[#D89A43]"
                : "inline-flex h-9 w-9 items-center justify-center border border-slate-300 bg-white text-[#0B1424] transition-colors hover:border-[#D89A43] hover:bg-[#0B1424] hover:text-[#D89A43]"
            }
          >
            {ch.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
