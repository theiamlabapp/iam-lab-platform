"use client";

import React, { useState } from "react";
import Link from "next/link";
import { updateProfileAction } from "../actions/updateProfileAction";

interface AccountViewProps {
  user?: {
    email?: string;
    name?: string;
    role?: string;
  };
}

export function AccountView(props: AccountViewProps) {
  const currentEmail = props.user?.email || "info@theiamlab.com";
  const [name, setName] = useState(props.user?.name || "The IAM Lab Super Administrator");
  const [jobTitle, setJobTitle] = useState("Principal IAM Architect & Super Administrator");
  const [phone, setPhone] = useState("+44 20 8090 1234");
  const [avatarUrl, setAvatarUrl] = useState("/brand/the-iam-lab-logo.png");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setSaving(true);

    try {
      const res = await updateProfileAction({
        email: currentEmail,
        name,
        jobTitle,
        phone,
        avatarUrl,
      });

      if (res.success) {
        setFeedback({
          type: "success",
          text: "Administrator profile details updated successfully.",
        });
      } else {
        setFeedback({
          type: "error",
          text: res.error || "Failed to update profile.",
        });
      }
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Network error during profile update.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        padding: "24px 32px 64px 32px",
        maxWidth: "900px",
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
          marginBottom: "28px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#D89A43" }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#D89A43", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Security &amp; Identity Administration
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "#0B1424", letterSpacing: "-0.02em" }}>
            Administrator Profile &amp; Account
          </h1>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748B" }}>
            Manage your display credentials, contact information, and enterprise session identity.
          </p>
        </div>

        <Link
          href="/admin"
          style={{
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
          &larr; Dashboard
        </Link>
      </div>

      {feedback && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            fontSize: "13px",
            marginBottom: "20px",
            backgroundColor: feedback.type === "success" ? "#F0FDF4" : "#FEF2F2",
            color: feedback.type === "success" ? "#166534" : "#991B1B",
            border:
              feedback.type === "success" ? "1px solid #BBF7D0" : "1px solid #FECACA",
          }}
        >
          {feedback.text}
        </div>
      )}

      {/* Main Profile Form Card */}
      <form
        onSubmit={handleSave}
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          padding: "32px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {/* Avatar Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            paddingBottom: "28px",
            borderBottom: "1px solid #F1F5F9",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #D89A43",
              backgroundColor: "#0B1424",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={avatarUrl}
              alt="Avatar preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: "#0B1424" }}>
              Profile Photo
            </h3>
            <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748B" }}>
              Displayed in the navigation bar and on outbound advisory communications.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { label: "Brand Shield Logo", url: "/brand/the-iam-lab-logo.png" },
                { label: "Executive Office", url: "/brand/admin-login-office.jpg" },
                { label: "Cyber Command", url: "/brand/cyber-command.jpg" },
              ].map((opt) => (
                <button
                  key={opt.url}
                  type="button"
                  onClick={() => setAvatarUrl(opt.url)}
                  style={{
                    backgroundColor: avatarUrl === opt.url ? "#0B1424" : "#F8FAFC",
                    color: avatarUrl === opt.url ? "#FFFFFF" : "#475569",
                    border: "1px solid #CBD5E1",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
              Full Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
              Authoritative Email (Immutable)
            </label>
            <input
              type="email"
              value={currentEmail}
              disabled
              style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC", color: "#64748B", fontSize: "13px", boxSizing: "border-box", cursor: "not-allowed" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
              Professional Role / Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
              Contact Telephone / WhatsApp
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
            />
          </div>
        </div>

        {/* Security & Access Level Box */}
        <div
          style={{
            backgroundColor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "6px",
            padding: "16px 20px",
            marginBottom: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#0B1424", textTransform: "uppercase" }}>
              Access Clearance Level
            </span>
            <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748B" }}>
              Role: <strong style={{ color: "#0B1424" }}>Super Administrator</strong> &middot; Full Tenant &amp; CMS Permissions
            </p>
          </div>

          <span
            style={{
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 700,
              backgroundColor: "#D1FAE5",
              color: "#065F46",
            }}
          >
            ACTIVE &amp; ENFORCED
          </span>
        </div>

        {/* Save Button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              backgroundColor: saving ? "#718096" : "#0B1424",
              color: "#FFFFFF",
              border: "1px solid #14243B",
              borderRadius: "6px",
              padding: "12px 28px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: saving ? "not-allowed" : "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {saving ? "Saving Changes..." : "Save Profile Details"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountView;
