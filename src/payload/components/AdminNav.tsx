"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  exact?: boolean;
  icon: React.ReactNode;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

interface AdminNavProps {
  user?: {
    email?: string;
    name?: string;
    role?: string;
  };
}

export function AdminNav(props: AdminNavProps) {
  const pathname = usePathname() || "";
  const [mobileOpen, setMobileOpen] = useState(false);

  const navGroups: NavGroup[] = [
    {
      group: "OVERVIEW",
      items: [
        {
          label: "Dashboard",
          href: "/admin",
          exact: true,
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
          ),
        },
      ],
    },
    {
      group: "CONTENT MANAGEMENT",
      items: [
        {
          label: "Website Pages",
          href: "/admin/collections/pages",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          ),
        },
        {
          label: "Media Library",
          href: "/admin/collections/media",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          ),
        },
      ],
    },
    {
      group: "CLIENT MANAGEMENT",
      items: [
        {
          label: "Client Enquiries",
          href: "/admin/collections/enquiries",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          ),
        },
      ],
    },
    {
      group: "ADMINISTRATION",
      items: [
        {
          label: "Users & Administrators",
          href: "/admin/collections/users",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          ),
        },
        {
          label: "Global Site Settings",
          href: "/admin/globals/site-settings",
          icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          ),
        },
      ],
    },
  ];

  const isItemActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="iam-nav-mobile-toggle"
        aria-label="Toggle Navigation Menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {mobileOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          className="iam-nav-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Persistent Sidebar */}
      <aside className={`iam-sidebar ${mobileOpen ? "iam-sidebar-open" : ""}`}>
        {/* Brand Header */}
        <div className="iam-sidebar-brand">
          <Link href="/admin" className="iam-sidebar-brand-link" onClick={() => setMobileOpen(false)}>
            <div className="iam-sidebar-logo-box">
              <Image
                src="/brand/the-iam-lab-logo.png"
                alt="The IAM Lab"
                width={36}
                height={36}
                priority
                className="iam-sidebar-logo"
              />
            </div>
            <div className="iam-sidebar-brand-text">
              <span className="iam-sidebar-brand-title">THE IAM LAB</span>
              <span className="iam-sidebar-brand-sub">Enterprise Console</span>
            </div>
          </Link>
        </div>

        {/* Navigation Groups */}
        <nav className="iam-sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.group} className="iam-nav-group">
              <div className="iam-nav-group-title">{group.group}</div>
              <ul className="iam-nav-list">
                {group.items.map((item) => {
                  const active = isItemActive(item.href, item.exact);
                  return (
                    <li key={item.href} className="iam-nav-item">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`iam-nav-link ${active ? "iam-nav-link-active" : ""}`}
                      >
                        <span className="iam-nav-icon">{item.icon}</span>
                        <span className="iam-nav-label">{item.label}</span>
                        {active && <span className="iam-nav-active-pill" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom User & System Controls */}
        <div className="iam-sidebar-footer">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="iam-sidebar-public-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Live Website</span>
          </Link>

          <div className="iam-sidebar-user-card">
            <div className="iam-sidebar-avatar">A</div>
            <div className="iam-sidebar-user-meta">
              <span className="iam-sidebar-user-name">
                {props.user?.name || "Administrator"}
              </span>
              <span className="iam-sidebar-user-email">
                {props.user?.email || "info@theiamlab.com"}
              </span>
            </div>
          </div>

          <Link href="/admin/logout" className="iam-sidebar-logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default AdminNav;
