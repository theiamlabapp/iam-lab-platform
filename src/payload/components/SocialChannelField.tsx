"use client";

import React from "react";
import { useField } from "@payloadcms/ui";

const PLATFORM_META: Record<
  string,
  { name: string; togglePath: string; placeholder: string }
> = {
  instagramUrl: {
    name: "Instagram",
    togglePath: "showInstagram",
    placeholder: "https://www.instagram.com/theiamlab",
  },
  facebookUrl: {
    name: "Facebook",
    togglePath: "showFacebook",
    placeholder: "https://www.facebook.com/theiamlab",
  },
  tiktokUrl: {
    name: "TikTok",
    togglePath: "showTiktok",
    placeholder: "https://www.tiktok.com/@theiamlab",
  },
  linkedinUrl: {
    name: "LinkedIn",
    togglePath: "showLinkedin",
    placeholder: "https://www.linkedin.com/company/theiamlab",
  },
  twitterUrl: {
    name: "X (Twitter)",
    togglePath: "showTwitter",
    placeholder: "https://x.com/theiamlab",
  },
  youtubeUrl: {
    name: "YouTube",
    togglePath: "showYoutube",
    placeholder: "https://www.youtube.com/@theiamlab",
  },
};

function renderPlatformIcon(urlPath: string) {
  switch (urlPath) {
    case "instagramUrl":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebookUrl":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.6V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V11H7.5v3h2.8v8h3.2z" />
        </svg>
      );
    case "tiktokUrl":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .59.04.88.13V9.4a6.34 6.34 0 0 0-.88-.06A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1Z" />
        </svg>
      );
    case "linkedinUrl":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "twitterUrl":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
        </svg>
      );
  }
}

/**
 * Paired visual social channel control rendering Platform Name, URL input,
 * and modern accessible ON/OFF toggle switch backed directly by existing DB columns.
 */
export function SocialChannelField({ path }: { path: string }) {
  const fieldKey = path.split(".").pop() || path;
  const meta = PLATFORM_META[fieldKey] || {
    name: "Social Channel",
    togglePath: "showInstagram",
    placeholder: "https://...",
  };

  const toggleFieldPath = path.includes(".")
    ? path.replace(/[^.]+$/, meta.togglePath)
    : meta.togglePath;

  const { value: rawUrl, setValue: setUrl } = useField<string>({ path });
  const { value: rawEnabled, setValue: setEnabled } = useField<boolean>({
    path: toggleFieldPath,
  });

  const urlValue = typeof rawUrl === "string" ? rawUrl : "";
  const isEnabled = rawEnabled !== false;
  const hasUrl = urlValue.trim().length > 0;

  return (
    <div className="iam-social-card">
      <div className="iam-social-card-head">
        <div className="iam-social-platform">
          <span className="iam-social-icon-badge" aria-hidden="true">
            {renderPlatformIcon(fieldKey)}
          </span>
          <div>
            <span className="iam-social-name">{meta.name}</span>
            <span className="iam-social-sub">
              {isEnabled
                ? hasUrl
                  ? "ON — Visible in Footer & Contact page"
                  : "ON — Enter a valid URL below to display icon"
                : "OFF — Hidden from public website (URL preserved)"}
            </span>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isEnabled}
          aria-label={`Toggle ${meta.name} visibility`}
          onClick={() => setEnabled(!isEnabled)}
          className={`iam-toggle-switch ${isEnabled ? "iam-toggle-on" : "iam-toggle-off"}`}
        >
          <span className="iam-toggle-track">
            <span className="iam-toggle-thumb" />
          </span>
          <span className="iam-toggle-label">{isEnabled ? "ON" : "OFF"}</span>
        </button>
      </div>

      <div className="iam-social-url-wrap">
        <label htmlFor={`social-${fieldKey}`} className="iam-social-url-label">
          {meta.name} Profile URL
        </label>
        <input
          id={`social-${fieldKey}`}
          type="url"
          value={urlValue}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={meta.placeholder}
          className="iam-social-url-input"
        />
      </div>
    </div>
  );
}

/**
 * Registers paired visibility state in Payload Form context cleanly while visual UI
 * is rendered inside the grouped SocialChannelField card above.
 */
export function HiddenToggleStateField({ path }: { path: string }) {
  useField<boolean>({ path });
  return <div style={{ display: "none" }} aria-hidden="true" />;
}
