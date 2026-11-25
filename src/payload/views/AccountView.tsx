"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MediaChoice {
  filename: string;
  url: string;
  category?: string;
  sourceType?: string;
}

export function AccountView() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [portraitChoices, setPortraitChoices] = useState<MediaChoice[]>([]);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const syncSidebarIdentity = (nextName: string, nextAvatar: string) => {
    try {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("iam-profile-updated", {
            detail: { name: nextName, avatarUrl: nextAvatar },
          })
        );
      }
      router.refresh();
    } catch {
      // ignore client refresh errors
    }
  };

  useEffect(() => {
    let mounted = true;
    async function hydrate() {
      try {
        const [profileRes, mediaRes] = await Promise.all([
          fetch("/api/admin/profile", { credentials: "include" }).then(async (r) => ({
            ok: r.ok,
            data: await r.json().catch(() => ({})),
          })),
          fetch("/api/admin/media", { credentials: "include" }).then((r) =>
            r.ok ? r.json() : { assets: [] }
          ),
        ]);

        if (!mounted) return;

        if (profileRes.ok && profileRes.data?.profile) {
          const p = profileRes.data.profile;
          setEmail(p.email || "");
          setRole(p.role || "admin");
          setName(p.name || "");
          setJobTitle(p.jobTitle || "");
          setPhone(p.phone || "");
          setAvatarUrl(p.avatarUrl || "");
        } else {
          setFeedback({
            type: "error",
            text:
              profileRes.data?.error ||
              "Unable to load your profile session. Please sign in again.",
          });
        }

        if (Array.isArray(mediaRes?.assets)) {
          setPortraitChoices(
            mediaRes.assets
              .filter(
                (a: MediaChoice) =>
                  a.category === "portrait" && a.sourceType === "uploaded"
              )
              .slice(0, 4)
              .map((a: MediaChoice) => ({
                filename: a.filename,
                url: a.url,
              }))
          );
        }
      } catch (err) {
        console.error("[AccountView] Load error:", err);
        if (mounted) {
          setFeedback({
            type: "error",
            text: "Network error loading profile details.",
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    hydrate();
    return () => {
      mounted = false;
    };
  }, []);

  const persistProfile = async (overrides?: {
    name?: string;
    jobTitle?: string;
    phone?: string;
    avatarUrl?: string;
  }) => {
    const nextName = (overrides?.name ?? name).trim();
    const nextTitle = (overrides?.jobTitle ?? jobTitle).trim();
    const nextPhone = (overrides?.phone ?? phone).trim();
    const nextAvatar = overrides?.avatarUrl !== undefined ? overrides.avatarUrl : avatarUrl;

    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: nextName,
        jobTitle: nextTitle,
        phone: nextPhone,
        avatarUrl: nextAvatar,
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Unable to save profile.");
    }
    syncSidebarIdentity(nextName, nextAvatar);
    return data.profile;
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    setFeedback(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", `${name || email || "Administrator"} portrait`);
      fd.append("category", "portrait");

      const res = await fetch("/api/admin/media", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Portrait upload failed");

      const uploadedUrl = String(data.asset.url || "");
      setAvatarUrl(uploadedUrl);
      setPortraitChoices((prev) =>
        [{ filename: String(data.asset.filename || "Portrait"), url: uploadedUrl }, ...prev].slice(
          0,
          4
        )
      );

      await persistProfile({
        name: name || email.split("@")[0] || "Administrator",
        avatarUrl: uploadedUrl,
      });

      setFeedback({
        type: "success",
        text: "Profile portrait uploaded and saved across your account.",
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

  const handleRemoveAvatar = async () => {
    setFeedback(null);
    setSaving(true);
    try {
      setAvatarUrl("");
      await persistProfile({ avatarUrl: "" });
      setFeedback({
        type: "success",
        text: "Profile portrait removed. Using initial-based badge.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Could not remove portrait.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setSaving(true);

    try {
      await persistProfile();
      setFeedback({
        type: "success",
        text: "Administrator profile details saved cleanly.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof Error ? err.message : "Unable to update profile.",
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

  const avatarInitial = (name || email || "A")[0].toUpperCase();

  return (
    <div className="iam-dash-container" style={{ maxWidth: "960px" }}>
      <div className="iam-dash-intro">
        <div>
          <span className="iam-pill-amber" style={{ marginBottom: "8px", display: "inline-block" }}>
            SECURITY &amp; IDENTITY PROFILE
          </span>
          <h1 className="iam-dash-welcome">Administrator Account &amp; Profile</h1>
          <p className="iam-dash-subwelcome">
            Manage your display name, uploaded profile portrait, contact details, and session status.
          </p>
        </div>

        <div className="iam-dash-actions">
          <Link href="/admin" prefetch={false} className="iam-action-btn">
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
          {/* Profile Portrait Section */}
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
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #D89A43",
                backgroundColor: "#0B1424",
                color: "#D89A43",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name || "Profile portrait"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span>{avatarInitial}</span>
              )}
            </div>

            <div style={{ flex: 1, minWidth: "240px" }}>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: "#0B1424" }}>
                Profile Portrait
              </h3>
              <p style={{ margin: "0 0 12px 0", fontSize: "12px", color: "#64748B" }}>
                Upload your personal headshot (PNG/JPG/WebP). Separate from website logos.
              </p>

              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <label
                  style={{
                    backgroundColor: "#0B1424",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    padding: "8px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: uploadingAvatar ? "wait" : "pointer",
                  }}
                >
                  {uploadingAvatar ? "Uploading Photo..." : avatarUrl ? "Replace Portrait" : "Upload New Photo"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarUpload}
                    style={{ display: "none" }}
                  />
                </label>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    disabled={saving}
                    style={{
                      backgroundColor: "#F8FAFC",
                      color: "#64748B",
                      border: "1px solid #CBD5E1",
                      borderRadius: "6px",
                      padding: "7px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Remove Portrait
                  </button>
                )}

                {portraitChoices.map((opt) => (
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

          {/* Account Details Grid */}
          <div className="iam-form-grid-2" style={{ gap: "20px", marginBottom: "24px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                Full Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter full display name"
                style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                Account Email (Read-only)
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
                placeholder="e.g. Super Administrator"
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
                placeholder="Optional direct phone or WhatsApp"
                style={{ width: "100%", height: "40px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>
          </div>

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
