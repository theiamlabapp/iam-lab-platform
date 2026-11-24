"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCurrentProfileAction,
  updateProfileAction,
} from "../actions/updateProfileAction";

interface MediaChoice {
  filename: string;
  url: string;
}

export function AccountView() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("info@theiamlab.com");
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/brand/the-iam-lab-logo-dark.png");
  const [mediaChoices, setMediaChoices] = useState<MediaChoice[]>([]);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    async function hydrate() {
      try {
        const [profileRes, mediaRes] = await Promise.all([
          getCurrentProfileAction(),
          fetch("/api/admin/media", { credentials: "include" }).then((r) =>
            r.ok ? r.json() : { assets: [] }
          ),
        ]);

        if (!mounted) return;
        if (profileRes.success && profileRes.profile) {
          setEmail(profileRes.profile.email);
          setRole(profileRes.profile.role);
          setName(profileRes.profile.name || "Administrator");
          setJobTitle(profileRes.profile.jobTitle || "Super Administrator");
          setPhone(profileRes.profile.phone || "");
          setAvatarUrl(
            profileRes.profile.avatarUrl || "/brand/the-iam-lab-logo-dark.png"
          );
        }

        if (Array.isArray(mediaRes?.assets)) {
          setMediaChoices(
            mediaRes.assets.slice(0, 6).map((a: { filename: string; url: string }) => ({
              filename: a.filename,
              url: a.url,
            }))
          );
        }
      } catch (err) {
        console.error("[AccountView] Load error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    hydrate();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    setFeedback(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", `${name || "Administrator"} profile portrait`);
      fd.append("category", "consulting");

      const res = await fetch("/api/admin/media", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Avatar upload failed");

      const uploadedUrl = data.asset.url as string;
      setAvatarUrl(uploadedUrl);
      await updateProfileAction({
        name: name || "Administrator",
        jobTitle,
        phone,
        avatarUrl: uploadedUrl,
      });

      setFeedback({
        type: "success",
        text: "Profile image uploaded, stored in database, and applied to your profile.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Could not upload profile photo.",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setSaving(true);

    try {
      const res = await updateProfileAction({
        name,
        jobTitle,
        phone,
        avatarUrl,
      });

      if (res.success) {
        setFeedback({
          type: "success",
          text: "Administrator profile details saved to Supabase PostgreSQL.",
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
        text: err instanceof Error ? err.message : "Network error updating profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const roleDisplayLabel =
    role === "super_admin"
      ? "Super Administrator"
      : role === "admin"
        ? "Administrator"
        : role.replace(/_/g, " ");

  return (
    <div className="iam-dash-container" style={{ maxWidth: "960px" }}>
      {/* Header Bar matching Approved Dashboard */}
      <div className="iam-dash-intro">
        <div>
          <span className="iam-pill-amber" style={{ marginBottom: "8px", display: "inline-block" }}>
            SECURITY &amp; IDENTITY PROFILE
          </span>
          <h1 className="iam-dash-welcome">Administrator Account &amp; Profile</h1>
          <p className="iam-dash-subwelcome">
            Manage your display identity, uploaded portrait, contact details, and role clearance.
          </p>
        </div>

        <div className="iam-dash-actions">
          <Link href="/admin" className="iam-action-btn">
            &larr; Dashboard
          </Link>
        </div>
      </div>

      {feedback && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            fontSize: "13px",
            marginBottom: "20px",
            backgroundColor: feedback.type === "success" ? "#ECFDF5" : "#FEF2F2",
            color: feedback.type === "success" ? "#065F46" : "#991B1B",
            border:
              feedback.type === "success"
                ? "1px solid #A7F3D0"
                : "1px solid #FECACA",
          }}
        >
          {feedback.text}
        </div>
      )}

      {loading ? (
        <div className="iam-table-container" style={{ padding: "48px", textAlign: "center", color: "#64748B" }}>
          Loading live administrator record...
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "8px",
            padding: "32px",
          }}
        >
          {/* Avatar Upload & Selection */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              paddingBottom: "28px",
              borderBottom: "1px solid #F1F5F9",
              marginBottom: "28px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #D89A43",
                backgroundColor: "#F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={avatarUrl || "/brand/the-iam-lab-logo-dark.png"}
                alt="Administrator profile avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ flex: 1, minWidth: "240px" }}>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: "#0B1424" }}>
                Profile Portrait
              </h3>
              <p style={{ margin: "0 0 12px 0", fontSize: "12px", color: "#64748B" }}>
                Upload a custom headshot (PNG/JPG/WebP) or choose from saved enterprise assets.
              </p>

              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" }}>
                <label
                  style={{
                    backgroundColor: "#0B1424",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    padding: "7px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: uploadingAvatar ? "wait" : "pointer",
                  }}
                >
                  {uploadingAvatar ? "Uploading Photo..." : "Upload New Photo"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarUpload}
                    style={{ display: "none" }}
                  />
                </label>

                {mediaChoices.slice(0, 3).map((opt) => (
                  <button
                    key={opt.url}
                    type="button"
                    onClick={() => setAvatarUrl(opt.url)}
                    style={{
                      backgroundColor: avatarUrl === opt.url ? "#14243B" : "#F8FAFC",
                      color: avatarUrl === opt.url ? "#FFFFFF" : "#475569",
                      border: "1px solid #CBD5E1",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {opt.filename}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Account Credentials Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
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
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                Authoritative Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #E2E8F0", backgroundColor: "#F8FAFC", color: "#64748B", fontSize: "13px", boxSizing: "border-box", cursor: "not-allowed" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                Professional Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                Contact Phone / WhatsApp
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          {/* Access Role Notice */}
          <div
            style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "6px",
              padding: "16px 20px",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#0B1424", textTransform: "uppercase" }}>
                Active Clearance &amp; Session
              </span>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748B" }}>
                Assigned Role: <strong style={{ color: "#0B1424" }}>{roleDisplayLabel}</strong> &middot; Protected by HTTP-only encrypted session
              </p>
            </div>

            <span className="iam-pill-green">VERIFIED SESSION</span>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                backgroundColor: saving ? "#718096" : "#0B1424",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                padding: "11px 26px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Saving..." : "Save Profile Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AccountView;
