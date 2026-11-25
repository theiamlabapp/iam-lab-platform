"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotificationRecord {
  id: number;
  enquiryId: number | null;
  title: string;
  message: string;
  enquiryName: string;
  enquiryEmail: string;
  enquiryType: string;
  isRead: boolean;
  createdAt: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  enterprise_consulting: "Enterprise Consulting",
  corporate_training: "Corporate Training",
  individual_learning: "IAM Academy",
  partnership: "Partnership",
  general: "General Enquiry",
};

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Just now";
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

/**
 * Top-right Super Admin header notification bell replacing Payload's inactive profile icon.
 * Displays unread enquiry count, dropdown feed, mark-as-read controls, and direct enquiry routing.
 */
export function NotificationBell() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [markingAll, setMarkingAll] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/notifications?limit=8&page=1", {
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
      setUnreadCount(Number(data.unreadCount ?? 0));
    } catch {
      // keep existing UI state gracefully
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/notifications?limit=8&page=1", {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        if (data) {
          setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
          setUnreadCount(Number(data.unreadCount ?? 0));
        }
        setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    const interval = window.setInterval(() => {
      void fetchNotifications();
    }, 30000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") void fetchNotifications();
    };
    const onExternalUpdate = () => {
      void fetchNotifications();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("iam-notifications-updated", onExternalUpdate);
    return () => {
      active = false;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("iam-notifications-updated", onExternalUpdate);
    };
  }, [fetchNotifications]);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const markSingleRead = async (id: number) => {
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markRead", id }),
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        if (typeof data.unreadCount === "number") {
          setUnreadCount(data.unreadCount);
        } else {
          setUnreadCount((c) => Math.max(0, c - 1));
        }
        window.dispatchEvent(new CustomEvent("iam-notifications-updated"));
      }
    } catch {
      // ignore
    }
  };

  const handleMarkAllRead = async () => {
    if (markingAll || unreadCount === 0) return;
    setMarkingAll(true);
    try {
      const res = await fetch("/api/admin/notifications", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "markAllRead" }),
      });
      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
        window.dispatchEvent(new CustomEvent("iam-notifications-updated"));
      }
    } finally {
      setMarkingAll(false);
    }
  };

  const handleOpenNotification = async (item: NotificationRecord) => {
    if (!item.isRead) {
      await markSingleRead(item.id);
    }
    setOpen(false);
    const target = item.enquiryId
      ? `/admin/collections/enquiries/${item.enquiryId}`
      : "/admin/collections/enquiries";
    router.push(target);
  };

  return (
    <div ref={containerRef} className="iam-notify-wrapper">
      <button
        type="button"
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) fetchNotifications();
        }}
        aria-label={
          unreadCount > 0
            ? `Notifications (${unreadCount} unread)`
            : "Notifications"
        }
        aria-expanded={open}
        aria-haspopup="menu"
        className="iam-notify-bell-btn"
        title="Enquiry Notification Centre"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="iam-notify-badge" aria-live="polite">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="iam-notify-dropdown"
          role="menu"
          aria-label="Recent enquiry notifications"
        >
          <div className="iam-notify-head">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="iam-notify-head-title">Notifications</span>
              {unreadCount > 0 && (
                <span className="iam-pill-amber">{unreadCount} unread</span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                disabled={markingAll}
                className="iam-notify-markall-btn"
              >
                {markingAll ? "Marking..." : "Mark All as Read"}
              </button>
            )}
          </div>

          <div className="iam-notify-list">
            {loading ? (
              <div className="iam-notify-empty">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="iam-notify-empty">
                <p style={{ margin: "0 0 4px 0", fontWeight: 600, color: "#0B1424" }}>
                  No notifications yet
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                  New enquiries from your website appear here automatically.
                </p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`iam-notify-item ${
                    item.isRead ? "iam-notify-item-read" : "iam-notify-item-unread"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleOpenNotification(item)}
                    className="iam-notify-item-trigger"
                    role="menuitem"
                  >
                    <div className="iam-notify-item-top">
                      <span
                        className={`iam-notify-dot ${
                          item.isRead ? "iam-notify-dot-read" : ""
                        }`}
                        aria-hidden="true"
                      />
                      <span className="iam-notify-cat">
                        {CATEGORY_LABELS[item.enquiryType] || "Enquiry"}
                      </span>
                      <span className="iam-notify-time">
                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                    <p className="iam-notify-item-title">{item.title}</p>
                    <p className="iam-notify-item-msg">{item.message}</p>
                  </button>

                  {!item.isRead && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        markSingleRead(item.id);
                      }}
                      title="Mark as read"
                      aria-label={`Mark ${item.title} as read`}
                      className="iam-notify-single-read-btn"
                    >
                      &#10003;
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="iam-notify-footer">
            <Link
              href="/admin/notifications"
              onClick={() => setOpen(false)}
              className="iam-notify-viewall"
            >
              View All Notifications &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
