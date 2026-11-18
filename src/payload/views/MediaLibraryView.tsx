"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  category: "hero" | "consulting" | "classroom" | "identity" | "logo";
  alt: string;
  dimensions: string;
  size: string;
  updatedAt: string;
}

const SEEDED_ASSETS: MediaAsset[] = [
  {
    id: "med_1",
    filename: "hero-enterprise.jpg",
    url: "/brand/hero-enterprise.jpg",
    category: "hero",
    alt: "Executive cybersecurity and identity leadership in modern corporate boardroom",
    dimensions: "1920 × 1080",
    size: "680 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_2",
    filename: "team-collaboration.jpg",
    url: "/brand/team-collaboration.jpg",
    category: "consulting",
    alt: "The IAM Lab advisory consultants collaborating on enterprise architecture",
    dimensions: "1920 × 1080",
    size: "740 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_3",
    filename: "cyber-command.jpg",
    url: "/brand/cyber-command.jpg",
    category: "identity",
    alt: "The IAM Lab cyber command center and high-assurance security operations",
    dimensions: "1920 × 1080",
    size: "539 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_4",
    filename: "security-infrastructure.jpg",
    url: "/brand/security-infrastructure.jpg",
    category: "identity",
    alt: "Enterprise technology and secure identity infrastructure",
    dimensions: "1920 × 1080",
    size: "812 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_5",
    filename: "academy-classroom.jpg",
    url: "/brand/academy-classroom.jpg",
    category: "classroom",
    alt: "The IAM Academy professional learning masterclass and practical lab cohort",
    dimensions: "1920 × 1080",
    size: "625 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_6",
    filename: "iam-academy-hero.jpg",
    url: "/brand/iam-academy-hero.jpg",
    category: "classroom",
    alt: "Hands-on identity governance training and directory architecture enablement",
    dimensions: "1920 × 1080",
    size: "587 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_7",
    filename: "enterprise-security.jpg",
    url: "/brand/enterprise-security.jpg",
    category: "identity",
    alt: "High-assurance zero-trust identity and privileged access architecture",
    dimensions: "1920 × 1080",
    size: "515 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_8",
    filename: "office-architecture.jpg",
    url: "/brand/office-architecture.jpg",
    category: "consulting",
    alt: "The IAM Lab London headquarters architecture at 128 City Road",
    dimensions: "1920 × 1080",
    size: "710 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_9",
    filename: "cyber-network.jpg",
    url: "/brand/cyber-network.jpg",
    category: "identity",
    alt: "Global enterprise identity and directory mesh visualization",
    dimensions: "1920 × 1080",
    size: "852 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_10",
    filename: "corporate-hero.jpg",
    url: "/brand/corporate-hero.jpg",
    category: "hero",
    alt: "Enterprise identity governance and access security consultation banner",
    dimensions: "1920 × 1080",
    size: "790 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_11",
    filename: "admin-login-office.jpg",
    url: "/brand/admin-login-office.jpg",
    category: "consulting",
    alt: "Identity and security analysts collaborating in executive workplace",
    dimensions: "1920 × 1080",
    size: "640 KB",
    updatedAt: "18 Nov 2026",
  },
  {
    id: "med_12",
    filename: "the-iam-lab-logo.png",
    url: "/brand/the-iam-lab-logo.png",
    category: "logo",
    alt: "The IAM Lab official brand logo and corporate trademark",
    dimensions: "512 × 512",
    size: "48 KB",
    updatedAt: "18 Nov 2026",
  },
];

export function MediaLibraryView() {
  const [assets, setAssets] = useState<MediaAsset[]>(SEEDED_ASSETS);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const filtered = assets.filter((asset) => {
    const matchesCategory = filterCategory === "all" || asset.category === filterCategory;
    const matchesSearch =
      asset.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.alt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyUrl = (url: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopyFeedback(`Copied ${url} to clipboard!`);
      setTimeout(() => setCopyFeedback(null), 3000);
    }
  };

  return (
    <div
      style={{
        padding: "24px 32px 64px 32px",
        maxWidth: "1400px",
        margin: "0 auto",
        color: "#0B1424",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderBottom: "1px solid #E2E8F0",
          paddingBottom: "20px",
          marginBottom: "24px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#D89A43" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#D89A43", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Enterprise Asset Repository
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "#0B1424", letterSpacing: "-0.02em" }}>
            Media &amp; Visual Asset Library
          </h1>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748B" }}>
            High-resolution corporate photography, identity network diagrams, and official brand assets.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {copyFeedback && (
            <span style={{ fontSize: "12px", color: "#059669", fontWeight: 600, backgroundColor: "#ECFDF5", padding: "6px 12px", borderRadius: "4px" }}>
              {copyFeedback}
            </span>
          )}
          <Link
            href="/admin"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              backgroundColor: "#FFFFFF",
              color: "#0B1424",
              border: "1px solid #CBD5E1",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {["all", "hero", "consulting", "classroom", "identity", "logo"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: filterCategory === cat ? 700 : 500,
                border: filterCategory === cat ? "1px solid #0B1424" : "1px solid #E2E8F0",
                backgroundColor: filterCategory === cat ? "#0B1424" : "#FFFFFF",
                color: filterCategory === cat ? "#FFFFFF" : "#64748B",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.15s ease",
              }}
            >
              {cat === "all" ? "All Assets" : cat}
            </button>
          ))}
        </div>

        <div style={{ width: "280px" }}>
          <input
            type="text"
            placeholder="Search by filename or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: "36px",
              padding: "0 12px",
              borderRadius: "6px",
              border: "1px solid #CBD5E1",
              fontSize: "13px",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Responsive Visual Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "36px",
        }}
      >
        {filtered.map((asset) => (
          <div
            key={asset.id}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {/* Image Thumbnail */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "170px",
                backgroundColor: "#0B1424",
                cursor: "pointer",
              }}
              onClick={() => setSelectedAsset(asset)}
            >
              <img
                src={asset.url}
                alt={asset.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: asset.category === "logo" ? "contain" : "cover",
                  padding: asset.category === "logo" ? "20px" : "0",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  backgroundColor: "rgba(11, 20, 36, 0.85)",
                  color: "#D89A43",
                  backdropFilter: "blur(4px)",
                }}
              >
                {asset.dimensions}
              </span>
            </div>

            {/* Asset Meta Info */}
            <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#0B1424" }}>
                    {asset.filename}
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 500 }}>
                    {asset.size}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "11px",
                    color: "#64748B",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {asset.alt}
                </p>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "10px",
                  borderTop: "1px solid #F1F5F9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleCopyUrl(asset.url)}
                  style={{
                    backgroundColor: "transparent",
                    color: "#D89A43",
                    border: "none",
                    padding: "4px 0",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Copy URL &rarr;
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedAsset(asset)}
                  style={{
                    backgroundColor: "#F1F5F9",
                    color: "#0B1424",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Detail Modal */}
      {selectedAsset && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(11, 20, 36, 0.8)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setSelectedAsset(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
              maxWidth: "800px",
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "relative", width: "100%", height: "400px", backgroundColor: "#0B1424" }}>
              <img
                src={selectedAsset.url}
                alt={selectedAsset.alt}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 700, color: "#0B1424" }}>
                    {selectedAsset.filename}
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                    Resolution: {selectedAsset.dimensions} &middot; File Size: {selectedAsset.size} &middot; Updated: {selectedAsset.updatedAt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  style={{
                    backgroundColor: "#F1F5F9",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Close &times;
                </button>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  Persistent Asset Path (for Website &amp; CMS use)
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    readOnly
                    value={selectedAsset.url}
                    style={{ flex: 1, height: "36px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", fontFamily: "monospace" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(selectedAsset.url)}
                    style={{
                      backgroundColor: "#0B1424",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "4px",
                      padding: "0 16px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  Accessibility Alternative Text (Alt Text)
                </label>
                <p style={{ margin: 0, fontSize: "13px", color: "#334155", lineHeight: 1.5 }}>
                  {selectedAsset.alt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaLibraryView;
