import Link from "next/link";
import type { Payload } from "payload";
import React from "react";

interface PageRow {
  id: number | string;
  title: string;
  slug: string;
  status?: string;
  sections?: unknown[];
  updatedAt?: string;
}

const ROUTE_MAP: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  academy: "/academy",
  contact: "/contact",
};

/**
 * Custom Dashboard-aligned List View for Website Pages.
 */
export async function PagesListView(props: { payload?: Payload }) {
  let pages: PageRow[] = [];

  if (props.payload) {
    try {
      const res = await props.payload.find({
        collection: "pages",
        limit: 50,
        sort: "id",
      });
      pages = (res.docs as unknown as PageRow[]) || [];
    } catch (err) {
      console.error("[PagesListView] Load notice:", err);
    }
  }

  const publishedCount = pages.filter((p) => p.status !== "draft").length;
  const draftCount = pages.filter((p) => p.status === "draft").length;
  const totalSections = pages.reduce(
    (sum, p) => sum + (Array.isArray(p.sections) ? p.sections.length : 0),
    0
  );

  return (
    <div className="iam-dash-container">
      {/* Unified Header Matching Approved Dashboard */}
      <div className="iam-dash-intro">
        <div>
          <span className="iam-pill-amber" style={{ marginBottom: "8px", display: "inline-block" }}>
            CONTENT MANAGEMENT SYSTEM
          </span>
          <h1 className="iam-dash-welcome">Website Pages</h1>
          <p className="iam-dash-subwelcome">
            Select any corporate page below to visually edit sections, headlines, images, CTAs, and publishing status.
          </p>
        </div>

        <div className="iam-dash-actions">
          <Link href="/admin" prefetch={false} className="iam-action-btn">
            &larr; Dashboard
          </Link>
          <Link
            href="/admin/collections/pages/create"
            prefetch={false}
            className="iam-action-btn iam-action-primary"
          >
            + Create Page
          </Link>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="iam-metrics-quad iam-metrics-triple">
        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Published Pages</span>
            <span className="iam-pill-green">Live</span>
          </div>
          <div className="iam-metric-value">{publishedCount}</div>
          <div className="iam-metric-footnote">Active routes visible on theiamlab.com</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Draft Pages</span>
            <span className="iam-pill-amber">Review</span>
          </div>
          <div className="iam-metric-value">{draftCount}</div>
          <div className="iam-metric-footnote">Held in draft preview prior to publishing</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Visual Content Sections</span>
            <span className="iam-pill-neutral">Structured</span>
          </div>
          <div className="iam-metric-value">{totalSections}</div>
          <div className="iam-metric-footnote">Hero banners, ledgers, editorial &amp; CTA blocks</div>
        </div>
      </div>

      {/* Pages Table */}
      <div className="iam-table-container">
        <div className="iam-table-head-bar">
          <div>
            <h2 className="iam-table-title">Managed Website Routes</h2>
            <p className="iam-table-desc">
              All edits saved as Published automatically invalidate cache and update live website routes.
            </p>
          </div>
        </div>

        <div className="iam-table-responsive-wrapper">
          <table className="iam-data-table">
            <thead>
              <tr>
                <th>PAGE TITLE</th>
                <th>PUBLIC ROUTE</th>
                <th>SECTIONS</th>
                <th>STATUS</th>
                <th>LAST UPDATED</th>
                <th style={{ textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => {
                const route = ROUTE_MAP[p.slug] || `/${p.slug}`;
                const sectionCount = Array.isArray(p.sections) ? p.sections.length : 0;
                const isDraft = p.status === "draft";
                const updatedStr = p.updatedAt
                  ? new Date(p.updatedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—";

                return (
                  <tr key={p.id}>
                    <td>
                      <div className="iam-td-person">
                        <span className="iam-person-name">{p.title}</span>
                        <span className="iam-person-email">Slug: {p.slug}</span>
                      </div>
                    </td>
                    <td>
                      <code>{route}</code>
                    </td>
                    <td>
                      <span className="iam-cat-badge">
                        {sectionCount} {sectionCount === 1 ? "Section" : "Sections"}
                      </span>
                    </td>
                    <td>
                      <span
                        className="iam-status-badge"
                        style={
                          isDraft
                            ? {
                                backgroundColor: "#FEF3C7",
                                color: "#92400E",
                                borderColor: "#FDE68A",
                              }
                            : {
                                backgroundColor: "#D1FAE5",
                                color: "#065F46",
                                borderColor: "#A7F3D0",
                              }
                        }
                      >
                        {isDraft ? "Draft" : "Published"}
                      </span>
                    </td>
                    <td className="iam-td-date">{updatedStr}</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                        <Link
                          href={isDraft ? `${route}?preview=draft` : route}
                          target="_blank"
                          className="iam-btn-detail"
                          style={{ backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1" }}
                        >
                          {isDraft ? "Preview Draft ↗" : "Live Page ↗"}
                        </Link>
                        <Link
                          href={`/admin/collections/pages/${p.id}`}
                          prefetch={false}
                          className="iam-btn-detail"
                          style={{ backgroundColor: "#0B1424", color: "#FFFFFF" }}
                        >
                          Edit Content &rarr;
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PagesListView;
