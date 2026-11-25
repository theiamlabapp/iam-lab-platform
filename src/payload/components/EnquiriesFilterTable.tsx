"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

export interface EnquiryItem {
  id: number | string;
  name: string;
  email: string;
  organisation?: string;
  enquiryType: string;
  status: string;
  createdAt: string;
  repliesCount: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  enterprise_consulting: "Enterprise Consulting",
  corporate_training: "Corporate Training",
  individual_learning: "IAM Academy",
  partnership: "Partnership Exploration",
  general: "General Enquiry",
};

const STATUS_BADGES: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  new: { label: "New", bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
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

export function EnquiriesFilterTable({ items }: { items: EnquiryItem[] }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((enq) => {
      if (statusFilter !== "all" && enq.status !== statusFilter) return false;
      if (categoryFilter !== "all" && enq.enquiryType !== categoryFilter) {
        return false;
      }
      if (!q) return true;
      return (
        enq.name.toLowerCase().includes(q) ||
        enq.email.toLowerCase().includes(q) ||
        (enq.organisation || "").toLowerCase().includes(q)
      );
    });
  }, [items, statusFilter, categoryFilter, searchQuery]);

  return (
    <div className="iam-table-container">
      {/* Filter Controls Bar */}
      <div
        className="iam-table-head-bar"
        style={{ flexWrap: "wrap", gap: "12px" }}
      >
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Enquiries" },
            { id: "new", label: "New" },
            { id: "contacted", label: "In Discussion" },
            { id: "proposal_sent", label: "Proposal Sent" },
            { id: "resolved", label: "Resolved" },
            { id: "archived", label: "Archived" },
          ].map((tab) => {
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: active ? 700 : 500,
                  border: active ? "1px solid #0B1424" : "1px solid #E2E8F0",
                  backgroundColor: active ? "#0B1424" : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#64748B",
                  cursor: "pointer",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by enquiry category"
            style={{
              height: "36px",
              padding: "0 10px",
              borderRadius: "6px",
              border: "1px solid #CBD5E1",
              fontSize: "12px",
              backgroundColor: "#FFFFFF",
              color: "#0B1424",
            }}
          >
            <option value="all">All Categories</option>
            <option value="enterprise_consulting">Enterprise Consulting</option>
            <option value="corporate_training">Corporate Training</option>
            <option value="individual_learning">IAM Academy</option>
            <option value="partnership">Partnership Exploration</option>
            <option value="general">General Enquiry</option>
          </select>

          <input
            type="text"
            placeholder="Search client name, email, org..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "260px",
              flex: "1 1 180px",
              height: "36px",
              padding: "0 12px",
              borderRadius: "6px",
              border: "1px solid #CBD5E1",
              fontSize: "12px",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="iam-table-empty-state">
          <p className="iam-empty-title">No enquiries match these filters</p>
          <p className="iam-empty-sub">
            Adjust status tabs, category filters, or clear the search query.
          </p>
        </div>
      ) : (
        <div className="iam-table-responsive-wrapper">
          <table className="iam-data-table" style={{ minWidth: "900px" }}>
            <thead>
              <tr>
                <th>REF</th>
                <th>CLIENT / APPLICANT</th>
                <th>ORGANISATION</th>
                <th>CATEGORY</th>
                <th>REPLIES</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th style={{ textAlign: "right" }}>WORKSPACE</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((enq) => {
                const badge = STATUS_BADGES[enq.status] || STATUS_BADGES.new;
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
                      {enq.organisation || (
                        <span style={{ color: "#94A3B8" }}>Individual</span>
                      )}
                    </td>
                    <td>
                      <span className="iam-cat-badge">
                        {CATEGORY_LABELS[enq.enquiryType] || enq.enquiryType}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569" }}>
                        {enq.repliesCount}
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
                        prefetch={false}
                        className="iam-btn-detail"
                        style={{ backgroundColor: "#0B1424", color: "#FFFFFF" }}
                      >
                        Open Workspace &rarr;
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
  );
}
