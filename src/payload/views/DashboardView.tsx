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
  let inReviewEnquiries = 0;
  let publishedPages = 0;
  let totalMedia = 0;
  let totalAdmins = 0;
  let recentEnquiries: EnquiryDoc[] = [];

  if (payload) {
    try {
      const [
        enquiriesAll,
        enquiriesNew,
        enquiriesInReview,
        pagesAll,
        mediaAll,
        usersAll,
      ] = await Promise.all([
        payload.find({
          collection: "enquiries",
          limit: 10,
          sort: "-createdAt",
        }),
        payload.find({
          collection: "enquiries",
          where: { status: { equals: "new" } },
          limit: 1,
        }),
        payload.find({
          collection: "enquiries",
          where: { status: { in: ["contacted", "proposal_sent"] } },
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
        payload.find({
          collection: "users",
          limit: 1,
        }),
      ]);

      totalEnquiries = enquiriesAll.totalDocs;
      recentEnquiries = (enquiriesAll.docs as unknown as EnquiryDoc[]) || [];
      newEnquiries = enquiriesNew.totalDocs;
      inReviewEnquiries = enquiriesInReview.totalDocs;
      publishedPages = pagesAll.totalDocs;
      totalMedia = mediaAll.totalDocs;
      totalAdmins = usersAll.totalDocs;
    } catch (err) {
      console.error("[DashboardView] Failed to fetch live database metrics:", err);
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
      label: "New (Unread)",
      bg: "rgba(217, 119, 6, 0.12)",
      text: "#d97706",
      border: "rgba(217, 119, 6, 0.3)",
    },
    contacted: {
      label: "In Discussion",
      bg: "rgba(37, 99, 235, 0.12)",
      text: "#2563eb",
      border: "rgba(37, 99, 235, 0.3)",
    },
    proposal_sent: {
      label: "Proposal Sent",
      bg: "rgba(147, 51, 234, 0.12)",
      text: "#9333ea",
      border: "rgba(147, 51, 234, 0.3)",
    },
    resolved: {
      label: "Resolved / Closed",
      bg: "rgba(16, 185, 129, 0.12)",
      text: "#059669",
      border: "rgba(16, 185, 129, 0.3)",
    },
    archived: {
      label: "Archived",
      bg: "rgba(100, 116, 139, 0.12)",
      text: "#64748b",
      border: "rgba(100, 116, 139, 0.3)",
    },
  };

  const userName = user?.name || "Super Administrator";
  const userEmail = user?.email || "info@theiamlab.com";

  return (
    <div className="the-iam-lab-dashboard">
      {/* 1. Welcome Header & System Security Posture */}
      <div className="iam-dash-header">
        <div className="iam-dash-header-main">
          <div className="iam-dash-badge">
            <span className="iam-dash-badge-pulse" />
            <span>ENTERPRISE MANAGEMENT CONSOLE</span>
          </div>
          <h1 className="iam-dash-title">Good to see you again, {userName}</h1>
          <p className="iam-dash-subtitle">
            Here&apos;s an overview of The IAM Lab digital platform, client inbound
            enquiries, and digital content infrastructure.
          </p>
        </div>

        <div className="iam-dash-telemetry">
          <div className="iam-dash-telemetry-row">
            <span className="iam-dash-telemetry-label">DATABASE</span>
            <span className="iam-dash-telemetry-val">Supabase PostgreSQL 17 (London eu-west-2)</span>
          </div>
          <div className="iam-dash-telemetry-row">
            <span className="iam-dash-telemetry-label">SESSION</span>
            <span className="iam-dash-telemetry-val">Active ({userEmail})</span>
          </div>
          <div className="iam-dash-telemetry-row">
            <span className="iam-dash-telemetry-label">ENCRYPTION</span>
            <span className="iam-dash-telemetry-val">TLS 1.3 / JWT HttpOnly Secure</span>
          </div>
        </div>
      </div>

      {/* 2. Real Database Metric KPI Cards */}
      <div className="iam-dash-metrics-grid">
        <div className="iam-metric-card iam-metric-highlight">
          <div className="iam-metric-top">
            <span className="iam-metric-label">NEW ENQUIRIES</span>
            <span className="iam-metric-tag iam-tag-amber">Requires Attention</span>
          </div>
          <div className="iam-metric-num">{newEnquiries}</div>
          <p className="iam-metric-desc">
            Inbound prospective client leads awaiting initial contact.
          </p>
          <Link href="/admin/collections/enquiries" className="iam-metric-link">
            Review New Leads &rarr;
          </Link>
        </div>

        <div className="iam-metric-card">
          <div className="iam-metric-top">
            <span className="iam-metric-label">TOTAL ENQUIRIES</span>
            <span className="iam-metric-tag iam-tag-neutral">Cumulative</span>
          </div>
          <div className="iam-metric-num">{totalEnquiries}</div>
          <p className="iam-metric-desc">
            Consulting briefs and IAM Academy candidate applications.
          </p>
          <Link href="/admin/collections/enquiries" className="iam-metric-link">
            View All Enquiries &rarr;
          </Link>
        </div>

        <div className="iam-metric-card">
          <div className="iam-metric-top">
            <span className="iam-metric-label">IN DISCUSSION</span>
            <span className="iam-metric-tag iam-tag-blue">Active Pipeline</span>
          </div>
          <div className="iam-metric-num">{inReviewEnquiries}</div>
          <p className="iam-metric-desc">
            Enquiries currently in active consulting discovery or proposal stages.
          </p>
          <Link href="/admin/collections/enquiries" className="iam-metric-link">
            Inspect Pipeline &rarr;
          </Link>
        </div>

        <div className="iam-metric-card">
          <div className="iam-metric-top">
            <span className="iam-metric-label">PUBLISHED PAGES</span>
            <span className="iam-metric-tag iam-tag-green">Live Frontend</span>
          </div>
          <div className="iam-metric-num">{publishedPages}</div>
          <p className="iam-metric-desc">
            Live public pages manageable through the CMS.
          </p>
          <Link href="/admin/collections/pages" className="iam-metric-link">
            Edit Page Content &rarr;
          </Link>
        </div>

        <div className="iam-metric-card">
          <div className="iam-metric-top">
            <span className="iam-metric-label">MEDIA ASSETS</span>
            <span className="iam-metric-tag iam-tag-neutral">Storage</span>
          </div>
          <div className="iam-metric-num">{totalMedia}</div>
          <p className="iam-metric-desc">
            Uploaded brand photography, logos, and curriculum PDFs.
          </p>
          <Link href="/admin/collections/media" className="iam-metric-link">
            Manage Media &rarr;
          </Link>
        </div>

        <div className="iam-metric-card">
          <div className="iam-metric-top">
            <span className="iam-metric-label">SUPER ADMINISTRATORS</span>
            <span className="iam-metric-tag iam-tag-neutral">Access Control</span>
          </div>
          <div className="iam-metric-num">{totalAdmins}</div>
          <p className="iam-metric-desc">
            Authorised admin accounts with full platform governance privileges.
          </p>
          <Link href="/admin/collections/users" className="iam-metric-link">
            Manage Administrators &rarr;
          </Link>
        </div>
      </div>

      {/* 3. Quick Actions Ribbon */}
      <div className="iam-dash-quickactions">
        <h2 className="iam-quick-title">Administrative Quick Actions</h2>
        <div className="iam-quick-buttons">
          <Link href="/admin/collections/enquiries" className="iam-quick-btn iam-quick-btn-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Review Client Enquiries</span>
          </Link>

          <Link href="/admin/collections/pages" className="iam-quick-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Manage Website Pages</span>
          </Link>

          <Link href="/admin/collections/media/create" className="iam-quick-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Upload New Media</span>
          </Link>

          <Link href="/admin/globals/site-settings" className="iam-quick-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Update Global Site Settings</span>
          </Link>
        </div>
      </div>

      {/* 4. Recent Enquiries Data Table */}
      <div className="iam-dash-table-card">
        <div className="iam-table-header">
          <div>
            <h2 className="iam-table-title">Recent Inbound Client Enquiries</h2>
            <p className="iam-table-subtitle">
              Live records persisted into Supabase PostgreSQL from the public corporate enquiry form.
            </p>
          </div>
          <Link href="/admin/collections/enquiries" className="iam-table-viewall">
            View All ({totalEnquiries}) &rarr;
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="iam-table-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <p className="iam-empty-title">No client enquiries received yet</p>
            <p className="iam-empty-desc">
              When prospective enterprise clients or academy applicants submit the contact form, submissions appear here in real-time.
            </p>
          </div>
        ) : (
          <div className="iam-table-scroll">
            <table className="iam-table">
              <thead>
                <tr>
                  <th>REF</th>
                  <th>CLIENT / APPLICANT</th>
                  <th>ORGANISATION</th>
                  <th>CATEGORY</th>
                  <th>DATE (UTC)</th>
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
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—";

                  return (
                    <tr key={enq.id}>
                      <td className="iam-cell-ref">
                        <code>#ENQ-{String(enq.id).padStart(3, "0")}</code>
                      </td>
                      <td>
                        <div className="iam-cell-client">
                          <span className="iam-client-name">{enq.name}</span>
                          <span className="iam-client-email">{enq.email}</span>
                        </div>
                      </td>
                      <td className="iam-cell-org">
                        {enq.organisation || <span style={{ color: "#94a3b8" }}>Individual</span>}
                      </td>
                      <td className="iam-cell-cat">
                        <span className="iam-category-tag">
                          {categoryLabels[enq.enquiryType] || enq.enquiryType}
                        </span>
                      </td>
                      <td className="iam-cell-date">{dateStr}</td>
                      <td>
                        <span
                          className="iam-status-pill"
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
                          className="iam-btn-inspect"
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

      {/* 5. Enterprise Footprint & Governance Footer */}
      <div className="iam-dash-footer">
        <div>
          <span className="iam-footer-brand">THE IAM LAB</span>
          <span className="iam-footer-copy">
            &middot; Enterprise Identity & Access Management Advisory &middot; London, United Kingdom
          </span>
        </div>
        <div className="iam-footer-links">
          <Link href="/" target="_blank" className="iam-footer-link">
            Public Website &rarr;
          </Link>
          <Link href="https://selar.com/m/chiemezie-uzoma1" target="_blank" className="iam-footer-link">
            Selar Bookstore &rarr;
          </Link>
          <Link href="/admin/collections/users" className="iam-footer-link">
            Security Controls &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
