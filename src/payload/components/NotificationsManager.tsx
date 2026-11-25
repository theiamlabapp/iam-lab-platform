"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationRow {
  id: number;
  enquiryId: number | null;
  title: string;
  message: string;
  enquiryName: string;
  enquiryEmail: string;
  enquiryType: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  enterprise_consulting: "Enterprise Consulting",
  corporate_training: "Corporate Training",
  individual_learning: "IAM Academy",
  partnership: "Partnership",
  general: "General Enquiry",
};

export function NotificationsManager() {
  const router = useRouter();
  const [items, setItems] = useState<NotificationRow[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [totalAll, setTotalAll] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  const loadNotifications = useCallback(async (targetPage: number, targetFilter: string) => {
    setLoading(true);
    setErrorText(null);
    try {
      const res = await fetch(
        `/api/admin/notifications?page=${targetPage}&limit=12&filter=${targetFilter}`,
        { credentials: "include", cache: "no-store" }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Unable to fetch notifications.");
      setItems(Array.isArray(data.notifications) ? data.notifications : []);
      setUnreadCount(Number(data.unreadCount ?? 0));
      setReadCount(Number(data.readCount ?? 0));
      setTotalAll(Number(data.totalAll ?? 0));
      setTotalPages(Math.max(1, Number(data.totalPages ?? 1)));
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : "Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch(
      `/api/admin/notifications?page=${page}&limit=12&filter=${filter}`,
      { credentials: "include", cache: "no-store" }
    )
      .then(async (res) => ({
        ok: res.ok,
        data: await res.json().catch(() => ({})),
      }))
      .then(({ ok, data }) => {
        if (!active) return;
        if (!ok) {
          setErrorText(data.error || "Unable to fetch notifications.");
        } else {
          setErrorText(null);
          setItems(Array.isArray(data.notifications) ? data.notifications : []);
          setUnreadCount(Number(data.unreadCount ?? 0));
          setReadCount(Number(data.readCount ?? 0));
          setTotalAll(Number(data.totalAll ?? 0));
          setTotalPages(Math.max(1, Number(data.totalPages ?? 1)));
        }
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setErrorText(err instanceof Error ? err.message : "Failed to load notifications.");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, filter]);

  const handleAction = async (
    action: "markRead" | "markUnread" | "markAllRead",
    id?: number
  ) => {
    setBusyAction(id ? `${action}-${id}` : action);
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id }),
      });
      if (res.ok) {
        await loadNotifications(page, filter);
        window.dispatchEvent(new CustomEvent("iam-notifications-updated"));
      }
    } finally {
      setBusyAction(null);
    }
  };

  const openEnquiry = async (row: NotificationRow) => {
    if (!row.isRead) {
      await fetch("/api/admin/notifications", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markRead", id: row.id }),
      }).catch(() => null);
      window.dispatchEvent(new CustomEvent("iam-notifications-updated"));
    }
    router.push(
      row.enquiryId
        ? `/admin/collections/enquiries/${row.enquiryId}`
        : "/admin/collections/enquiries"
    );
  };

  return (
    <div className="iam-dash-container">
      <div className="iam-dash-intro">
        <div>
          <span
            className="iam-pill-amber"
            style={{ marginBottom: "8px", display: "inline-block" }}
          >
            CLIENT NOTIFICATION CENTRE
          </span>
          <h1 className="iam-dash-welcome">Enquiry Notifications</h1>
          <p className="iam-dash-subwelcome">
            Real-time alert log of inbound website consultations and academy applications, synchronised directly with PostgreSQL.
          </p>
        </div>

        <div className="iam-dash-actions">
          <Link href="/admin" className="iam-action-btn">
            &larr; Dashboard
          </Link>
          <button
            type="button"
            onClick={() => handleAction("markAllRead")}
            disabled={unreadCount === 0 || busyAction === "markAllRead"}
            className="iam-action-btn iam-action-primary"
            style={{
              opacity: unreadCount === 0 ? 0.55 : 1,
              cursor: unreadCount === 0 ? "default" : "pointer",
            }}
          >
            {busyAction === "markAllRead"
              ? "Marking All..."
              : `Mark All as Read (${unreadCount})`}
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="iam-metrics-quad iam-metrics-triple">
        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Unread Alerts</span>
            <span className="iam-pill-amber">Action</span>
          </div>
          <div className="iam-metric-value">{unreadCount}</div>
          <div className="iam-metric-footnote">Enquiries awaiting acknowledgement</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Read / Reviewed</span>
            <span className="iam-pill-green">Done</span>
          </div>
          <div className="iam-metric-value">{readCount}</div>
          <div className="iam-metric-footnote">Acknowledged by administration team</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Total Logged</span>
            <span className="iam-pill-neutral">History</span>
          </div>
          <div className="iam-metric-value">{totalAll}</div>
          <div className="iam-metric-footnote">Persistent Supabase notification trail</div>
        </div>
      </div>

      {errorText && (
        <div
          style={{
            marginBottom: "18px",
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "#FEF2F2",
            border: "1px solid #FECACA",
            color: "#991B1B",
            fontSize: "13px",
            fontWeight: 600,
          }}
        >
          {errorText}
        </div>
      )}

      <div className="iam-table-container">
        <div
          className="iam-table-head-bar"
          style={{ flexWrap: "wrap", gap: "12px" }}
        >
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "all" as const, label: `All (${totalAll})` },
              { id: "unread" as const, label: `Unread (${unreadCount})` },
              { id: "read" as const, label: `Read (${readCount})` },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setFilter(tab.id);
                    setPage(1);
                  }}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: active ? 700 : 500,
                    border: active ? "1px solid #0B1424" : "1px solid #CBD5E1",
                    backgroundColor: active ? "#0B1424" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#475569",
                    cursor: "pointer",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => loadNotifications(page, filter)}
            className="iam-action-btn"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="iam-table-empty-state">
            <p className="iam-empty-title">Loading notifications...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="iam-table-empty-state">
            <p className="iam-empty-title">
              {filter === "unread"
                ? "All notifications have been read"
                : "No notifications match this filter"}
            </p>
            <p className="iam-empty-sub">
              Website consultation and IAM Academy submissions trigger notifications automatically once persisted.
            </p>
          </div>
        ) : (
          <div>
            {items.map((row) => {
              const dateLabel = row.createdAt
                ? new Date(row.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "—";

              return (
                <div
                  key={row.id}
                  className="iam-notify-page-row"
                  style={{
                    backgroundColor: row.isRead ? "#FFFFFF" : "#FFFBF2",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        className={`iam-notify-dot ${
                          row.isRead ? "iam-notify-dot-read" : ""
                        }`}
                      />
                      <span className="iam-cat-badge">
                        {CATEGORY_LABELS[row.enquiryType] || "Enquiry"}
                      </span>
                      {!row.isRead && <span className="iam-pill-amber">Unread</span>}
                      <span style={{ fontSize: "11px", color: "#64748B" }}>
                        {dateLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openEnquiry(row)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        textAlign: "left",
                        cursor: "pointer",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#0B1424",
                      }}
                    >
                      {row.title}
                    </button>

                    <p
                      style={{
                        margin: "4px 0 6px 0",
                        fontSize: "13px",
                        color: "#475569",
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {row.message}
                    </p>

                    <div style={{ fontSize: "12px", color: "#64748B" }}>
                      {row.enquiryName} &middot; {row.enquiryEmail}
                    </div>
                  </div>

                  <div className="iam-notify-row-actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleAction(row.isRead ? "markUnread" : "markRead", row.id)
                      }
                      disabled={busyAction !== null}
                      className="iam-action-btn"
                    >
                      {row.isRead ? "Mark Unread" : "Mark as Read"}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEnquiry(row)}
                      className="iam-action-btn iam-action-primary"
                    >
                      Open Enquiry &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Server-side Pagination Controls */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              borderTop: "1px solid #E2E8F0",
              backgroundColor: "#F8FAFC",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>
              Page {page} of {totalPages}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="iam-action-btn"
                style={{ opacity: page <= 1 ? 0.5 : 1 }}
              >
                &larr; Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="iam-action-btn"
                style={{ opacity: page >= totalPages ? 0.5 : 1 }}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
