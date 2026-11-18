import React from "react";
import Link from "next/link";
import type { Payload } from "payload";

interface DashboardViewProps {
  payload?: Payload;
  user?: {
    id: number | string;
    email: string;
    name?: string;
    role?: string;
  };
}

interface EnquiryDoc {
  id: number | string;
  name: string;
  email: string;
  organisation?: string;
  enquiryType: string;
  status: "new" | "contacted" | "proposal_sent" | "resolved" | "archived";
  createdAt: string;
}

export async function DashboardView(props: DashboardViewProps) {
  const { payload, user } = props;

  let totalEnquiries = 0;
  let newEnquiries = 0;
  let publishedPages = 0;
  let totalMedia = 0;
  let recentEnquiries: EnquiryDoc[] = [];

  if (payload) {
    try {
      const [enquiriesAll, enquiriesNew, pagesAll, mediaAll] = await Promise.all([
        payload.find({
          collection: "enquiries",
          limit: 8,
          sort: "-createdAt",
        }),
        payload.find({
          collection: "enquiries",
          where: { status: { equals: "new" } },
          limit: 1,
        }),
        payload.find({
          collection: "pages",
          limit: 1,
        }),
        payload.find({
          collection: "media",
          limit: 1,
        }),
      ]);

      totalEnquiries = enquiriesAll.totalDocs;
      recentEnquiries = (enquiriesAll.docs as unknown as EnquiryDoc[]) || [];
      newEnquiries = enquiriesNew.totalDocs;
      publishedPages = pagesAll.totalDocs;
      totalMedia = mediaAll.totalDocs;
    } catch (err) {
      console.error("[DashboardView] Database query notice:", err);
    }
  }

  const categoryLabels: Record<string, string> = {
    enterprise_consulting: "Enterprise Consulting",
    corporate_training: "Corporate Training",
    individual_learning: "IAM Academy",
    partnership: "Partnership Exploration",
    general: "General Enquiry",
  };

  const statusBadges: Record<
    string,
    { label: string; bg: string; text: string; border: string }
  > = {
    new: {
      label: "New",
      bg: "#FEF3C7",
      text: "#92400E",
      border: "#FDE68A",
    },
    contacted: {
      label: "In Discussion",
      bg: "#DBEAFE",
      text: "#1E40AF",
      border: "#BFDBFE",
    },
    proposal_sent: {
      label: "Proposal Sent",
      bg: "#F3E8FF",
      text: "#6B21A8",
      border: "#E9D5FF",
    },
    resolved: {
      label: "Resolved",
      bg: "#D1FAE5",
      text: "#065F46",
      border: "#A7F3D0",
    },
    archived: {
      label: "Archived",
      bg: "#F1F5F9",
      text: "#475569",
      border: "#E2E8F0",
    },
  };

  const userName = user?.name || "Administrator";

  return (
    <div className="iam-dash-container">
      {/* 1. Welcome Heading & Administrative Context */}
      <div className="iam-dash-intro">
        <div className="iam-dash-intro-copy">
          <h1 className="iam-dash-welcome">Good to see you again, {userName}</h1>
          <p className="iam-dash-subwelcome">
            Overview of client discovery enquiries, published web pages, and brand assets.
          </p>
        </div>

        {/* Shortcuts */}
        <div className="iam-dash-actions">
          <Link href="/admin/collections/enquiries" className="iam-action-btn iam-action-primary">
            <span>Review Enquiries</span>
          </Link>
          <Link href="/admin/collections/pages" className="iam-action-btn">
            <span>Manage Pages</span>
          </Link>
          <Link href="/admin/collections/media/create" className="iam-action-btn">
            <span>Upload Media</span>
          </Link>
          <Link href="/admin/globals/site-settings" className="iam-action-btn">
            <span>Site Settings</span>
          </Link>
        </div>
      </div>

      {/* 2. Four Compact Metrics (Real DB Data) */}
      <div className="iam-metrics-quad">
        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">New Enquiries</span>
            {newEnquiries > 0 && <span className="iam-pill-amber">{newEnquiries} Action</span>}
          </div>
          <div className="iam-metric-value">{newEnquiries}</div>
          <div className="iam-metric-footnote">Awaiting initial consultation outreach</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Total Enquiries</span>
            <span className="iam-pill-neutral">Cumulative</span>
          </div>
          <div className="iam-metric-value">{totalEnquiries}</div>
          <div className="iam-metric-footnote">All recorded business and academy leads</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Published Pages</span>
            <span className="iam-pill-green">Active</span>
          </div>
          <div className="iam-metric-value">{publishedPages}</div>
          <div className="iam-metric-footnote">Live corporate website pages</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Media Assets</span>
            <span className="iam-pill-neutral">Storage</span>
          </div>
          <div className="iam-metric-value">{totalMedia}</div>
          <div className="iam-metric-footnote">Brand images, graphics and documents</div>
        </div>
      </div>

      {/* 3. Prominent Recent Client Enquiries Table */}
      <div className="iam-table-container">
        <div className="iam-table-head-bar">
          <div>
            <h2 className="iam-table-title">Recent Client Enquiries</h2>
            <p className="iam-table-desc">
              Live consultation briefs and IAM Academy applicant submissions from the website.
            </p>
          </div>
          <Link href="/admin/collections/enquiries" className="iam-table-all-link">
            View All ({totalEnquiries}) &rarr;
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="iam-table-empty-state">
            <p className="iam-empty-title">No client enquiries received yet</p>
            <p className="iam-empty-sub">
              Submissions through the public contact and academy forms appear here immediately.
            </p>
          </div>
        ) : (
          <div className="iam-table-responsive-wrapper">
            <table className="iam-data-table">
              <thead>
                <tr>
                  <th>REF</th>
                  <th>CLIENT / APPLICANT</th>
                  <th>ORGANISATION</th>
                  <th>CATEGORY</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th style={{ textAlign: "right" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => {
                  const badge = statusBadges[enq.status] || statusBadges.new;
                  const dateStr = enq.createdAt
                    ? new Date(enq.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr key={enq.id}>
                      <td className="iam-td-ref">
                        <code>#ENQ-{String(enq.id).padStart(3, "0")}</code>
                      </td>
                      <td>
                        <div className="iam-td-person">
                          <span className="iam-person-name">{enq.name}</span>
                          <span className="iam-person-email">{enq.email}</span>
                        </div>
                      </td>
                      <td className="iam-td-org">
                        {enq.organisation || <span style={{ color: "#94a3b8" }}>Individual</span>}
                      </td>
                      <td>
                        <span className="iam-cat-badge">
                          {categoryLabels[enq.enquiryType] || enq.enquiryType}
                        </span>
                      </td>
                      <td className="iam-td-date">{dateStr}</td>
                      <td>
                        <span
                          className="iam-status-badge"
                          style={{
                            backgroundColor: badge.bg,
                            color: badge.text,
                            borderColor: badge.border,
                          }}
                        >
                          {badge.label}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Link
                          href={`/admin/collections/enquiries/${enq.id}`}
                          className="iam-btn-detail"
                        >
                          View Details &rarr;
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Restrained Recent Activity & System Status */}
      <div className="iam-activity-footer-grid">
        <div className="iam-activity-card">
          <h3 className="iam-activity-title">Platform &amp; Infrastructure Status</h3>
          <div className="iam-activity-list">
            <div className="iam-activity-row">
              <span className="iam-activity-label">Database Engine</span>
              <span className="iam-activity-val">Supabase PostgreSQL 17 (London eu-west-2)</span>
            </div>
            <div className="iam-activity-row">
              <span className="iam-activity-label">CMS Framework</span>
              <span className="iam-activity-val">Payload CMS 3.93 &middot; Next.js 16 App Router</span>
            </div>
            <div className="iam-activity-row">
              <span className="iam-activity-label">Authenticated Account</span>
              <span className="iam-activity-val">{user?.email || "info@theiamlab.com"}</span>
            </div>
            <div className="iam-activity-row">
              <span className="iam-activity-label">Public Domain</span>
              <span className="iam-activity-val">theiamlab.com</span>
            </div>
          </div>
        </div>

        <div className="iam-activity-card">
          <h3 className="iam-activity-title">Content Governance Guidelines</h3>
          <p className="iam-activity-desc">
            All updates made to <strong>Website Pages</strong> or <strong>Global Site Settings</strong> take effect across public frontend routes. Keep metadata descriptions within 155 characters for optimal search engine indexing.
          </p>
          <div style={{ marginTop: "12px" }}>
            <Link href="/" target="_blank" className="iam-link-public">
              View Live Website &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
