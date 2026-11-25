import Link from "next/link";
import type { Payload } from "payload";
import React from "react";
import {
  EnquiriesFilterTable,
  type EnquiryItem,
} from "../components/EnquiriesFilterTable";

/**
 * Custom Dashboard-aligned List View for Client Enquiries.
 */
export async function EnquiriesListView(props: { payload?: Payload }) {
  let items: EnquiryItem[] = [];

  if (props.payload) {
    try {
      const res = await props.payload.find({
        collection: "enquiries",
        limit: 100,
        sort: "-createdAt",
      });
      items = (res.docs || []).map((doc) => {
        const raw = doc as unknown as Record<string, unknown>;
        return {
          id: doc.id,
          name: String(raw.name || "Client"),
          email: String(raw.email || ""),
          organisation: raw.organisation ? String(raw.organisation) : undefined,
          enquiryType: String(raw.enquiryType || "general"),
          status: String(raw.status || "new"),
          createdAt: raw.createdAt ? String(raw.createdAt) : "",
          repliesCount: Array.isArray(raw.replies) ? raw.replies.length : 0,
        };
      });
    } catch (err) {
      console.error("[EnquiriesListView] Fetch error:", err);
    }
  }

  const newCount = items.filter((i) => i.status === "new").length;
  const activeCount = items.filter(
    (i) => i.status === "contacted" || i.status === "proposal_sent"
  ).length;
  const resolvedCount = items.filter((i) => i.status === "resolved").length;

  return (
    <div className="iam-dash-container">
      <div className="iam-dash-intro">
        <div>
          <span className="iam-pill-amber" style={{ marginBottom: "8px", display: "inline-block" }}>
            CLIENT MANAGEMENT &amp; INTAKE
          </span>
          <h1 className="iam-dash-welcome">Client Enquiries</h1>
          <p className="iam-dash-subwelcome">
            Review consultation requests and IAM Academy applications, track status, and reply directly via verified SMTP.
          </p>
        </div>

        <div className="iam-dash-actions">
          <Link href="/admin" prefetch={false} className="iam-action-btn">
            &larr; Dashboard
          </Link>
        </div>
      </div>

      <div className="iam-metrics-quad">
        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">New / Unread</span>
            <span className="iam-pill-amber">Priority</span>
          </div>
          <div className="iam-metric-value">{newCount}</div>
          <div className="iam-metric-footnote">Awaiting specialist outreach</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Active Discussions</span>
            <span className="iam-pill-neutral">In Progress</span>
          </div>
          <div className="iam-metric-value">{activeCount}</div>
          <div className="iam-metric-footnote">In discussion or proposal issued</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Resolved / Closed</span>
            <span className="iam-pill-green">Completed</span>
          </div>
          <div className="iam-metric-value">{resolvedCount}</div>
          <div className="iam-metric-footnote">Successfully handled leads</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Total Recorded</span>
            <span className="iam-pill-neutral">Supabase</span>
          </div>
          <div className="iam-metric-value">{items.length}</div>
          <div className="iam-metric-footnote">Persistent enquiry archive</div>
        </div>
      </div>

      <EnquiriesFilterTable items={items} />
    </div>
  );
}

export default EnquiriesListView;
