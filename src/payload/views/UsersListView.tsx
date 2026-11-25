import Link from "next/link";
import type { Payload } from "payload";
import React from "react";

interface UserRow {
  id: number | string;
  name?: string;
  email: string;
  role?: string;
  jobTitle?: string;
  avatarUrl?: string;
  createdAt?: string;
}

const ROLE_STYLES: Record<
  string,
  { label: string; bg: string; color: string; border: string }
> = {
  super_admin: {
    label: "Super Administrator",
    bg: "#0B1424",
    color: "#D89A43",
    border: "#D89A43",
  },
  admin: {
    label: "Administrator",
    bg: "#14243B",
    color: "#FFFFFF",
    border: "#14243B",
  },
  academy_manager: {
    label: "Academy Manager",
    bg: "#FEF3C7",
    color: "#92400E",
    border: "#FDE68A",
  },
  instructor: {
    label: "Instructor / Mentor",
    bg: "#DBEAFE",
    color: "#1E40AF",
    border: "#BFDBFE",
  },
  editor: {
    label: "Content Editor",
    bg: "#E0E7FF",
    color: "#3730A3",
    border: "#C7D2FE",
  },
  learner: {
    label: "Academy Learner",
    bg: "#F1F5F9",
    color: "#475569",
    border: "#CBD5E1",
  },
};

/**
 * Custom Dashboard-aligned List View for Users, Roles & Extensible RBAC Governance.
 */
export async function UsersListView(props: { payload?: Payload }) {
  let users: UserRow[] = [];

  if (props.payload) {
    try {
      const res = await props.payload.find({
        collection: "users",
        limit: 50,
        sort: "id",
      });
      users = (res.docs as unknown as UserRow[]) || [];
    } catch (err) {
      console.error("[UsersListView] Fetch error:", err);
    }
  }

  const adminCount = users.filter(
    (u) => u.role === "admin" || u.role === "super_admin"
  ).length;
  const academyCount = users.filter(
    (u) =>
      u.role === "academy_manager" ||
      u.role === "instructor" ||
      u.role === "learner"
  ).length;

  return (
    <div className="iam-dash-container">
      <div className="iam-dash-intro">
        <div>
          <span className="iam-pill-amber" style={{ marginBottom: "8px", display: "inline-block" }}>
            IDENTITY &amp; ACCESS GOVERNANCE
          </span>
          <h1 className="iam-dash-welcome">Users &amp; Administrators</h1>
          <p className="iam-dash-subwelcome">
            Manage platform administrators and extensible role-based permissions ready for future IAM Academy cohorts.
          </p>
        </div>

        <div className="iam-dash-actions">
          <Link href="/admin" prefetch={false} className="iam-action-btn">
            &larr; Dashboard
          </Link>
          <Link href="/admin/account" prefetch={false} className="iam-action-btn">
            My Profile
          </Link>
          <Link
            href="/admin/collections/users/create"
            prefetch={false}
            className="iam-action-btn iam-action-primary"
          >
            + Add Account
          </Link>
        </div>
      </div>

      {/* RBAC Overview Strip */}
      <div className="iam-metrics-quad iam-metrics-triple">
        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Total Registered Users</span>
            <span className="iam-pill-neutral">Active</span>
          </div>
          <div className="iam-metric-value">{users.length}</div>
          <div className="iam-metric-footnote">Authenticated platform accounts</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Administrative Clearance</span>
            <span className="iam-pill-green">Enforced</span>
          </div>
          <div className="iam-metric-value">{adminCount}</div>
          <div className="iam-metric-footnote">Super Admin &amp; Administrator accounts</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Academy Role Architecture</span>
            <span className="iam-pill-amber">Extensible</span>
          </div>
          <div className="iam-metric-value">{academyCount}</div>
          <div className="iam-metric-footnote">6 Role Tiers Provisioned (Admin &rarr; Learner)</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="iam-table-container">
        <div className="iam-table-head-bar">
          <div>
            <h2 className="iam-table-title">Platform Directory</h2>
            <p className="iam-table-desc">
              Strict least-privilege separation: Admin roles control collections while future Instructor and Learner roles remain isolated.
            </p>
          </div>
        </div>

        <div className="iam-table-responsive-wrapper">
          <table className="iam-data-table" style={{ minWidth: "880px" }}>
            <thead>
              <tr>
                <th>USER</th>
                <th>EMAIL</th>
                <th>JOB TITLE</th>
                <th>ACCESS ROLE</th>
                <th>CREATED</th>
                <th style={{ textAlign: "right" }}>MANAGE</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const roleInfo =
                  ROLE_STYLES[u.role || "admin"] || ROLE_STYLES.admin;
                const initial = (u.name || u.email || "A")[0].toUpperCase();
                const createdStr = u.createdAt
                  ? new Date(u.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—";

                return (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "#0B1424",
                            color: "#D89A43",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: 700,
                            border: "1px solid #D89A43",
                            flexShrink: 0,
                          }}
                        >
                          {u.avatarUrl ? (
                            <img
                              src={u.avatarUrl}
                              alt={u.name || u.email}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            initial
                          )}
                        </div>
                        <span className="iam-person-name">
                          {u.name || "Administrator"}
                        </span>
                      </div>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>{u.email}</td>
                    <td className="iam-td-org">
                      {u.jobTitle || "Super Administrator"}
                    </td>
                    <td>
                      <span
                        className="iam-status-badge"
                        style={{
                          backgroundColor: roleInfo.bg,
                          color: roleInfo.color,
                          borderColor: roleInfo.border,
                        }}
                      >
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="iam-td-date">{createdStr}</td>
                    <td style={{ textAlign: "right" }}>
                      <Link
                        href={`/admin/collections/users/${u.id}`}
                        prefetch={false}
                        className="iam-btn-detail"
                        style={{ backgroundColor: "#0B1424", color: "#FFFFFF" }}
                      >
                        Manage &rarr;
                      </Link>
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

export default UsersListView;
