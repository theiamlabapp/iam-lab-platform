"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export interface MediaAsset {
  id: number | string;
  filename: string;
  url: string;
  category: string;
  sourceType?: string;
  alt: string;
  caption?: string;
  dimensions: string;
  sizeLabel: string;
  usedIn?: string[];
  updatedAt?: string;
}

export function MediaLibraryView() {
  const searchParams = useSearchParams();
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(
    () => searchParams?.get("action") === "upload"
  );
  const [statusBanner, setStatusBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadCategory, setUploadCategory] = useState("hero");
  const [uploading, setUploading] = useState(false);

  // Edit / Replace state inside inspector modal
  const [editFilename, setEditFilename] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editCategory, setEditCategory] = useState("hero");
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [savingMeta, setSavingMeta] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadAssets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media", { credentials: "include" });
      if (!res.ok) throw new Error("Unable to fetch media repository");
      const data = await res.json();
      setAssets(Array.isArray(data.assets) ? data.assets : []);
    } catch (err) {
      setStatusBanner({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load assets.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/media", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to fetch media repository");
        return res.json();
      })
      .then((data) => {
        if (mounted) {
          setAssets(Array.isArray(data.assets) ? data.assets : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setStatusBanner({
            type: "error",
            text: err instanceof Error ? err.message : "Failed to load assets.",
          });
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const openInspector = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setEditFilename(asset.filename);
    setEditAlt(asset.alt || "");
    setEditCaption(asset.caption || "");
    setEditCategory(asset.category || "hero");
    setReplaceFile(null);
  };

  const handleCopyUrl = (url: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setStatusBanner({ type: "success", text: `Copied asset URL: ${url}` });
      setTimeout(() => setStatusBanner(null), 3500);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploading(true);
    setStatusBanner(null);

    try {
      const fd = new FormData();
      fd.append("file", uploadFile);
      fd.append("alt", uploadAlt.trim() || uploadFile.name);
      fd.append("caption", uploadCaption.trim());
      fd.append("category", uploadCategory);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setStatusBanner({
        type: "success",
        text: `Uploaded "${data.asset.filename}" and stored permanently in PostgreSQL.`,
      });
      setUploadFile(null);
      setUploadAlt("");
      setUploadCaption("");
      setShowUploadModal(false);
      await loadAssets();
    } catch (err) {
      setStatusBanner({
        type: "error",
        text: err instanceof Error ? err.message : "Image upload failed.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAssetEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;
    setSavingMeta(true);
    setStatusBanner(null);

    try {
      let res: Response;
      if (replaceFile) {
        const fd = new FormData();
        fd.append("file", replaceFile);
        fd.append("alt", editAlt);
        fd.append("caption", editCaption);
        fd.append("category", editCategory);
        res = await fetch(`/api/admin/media/${selectedAsset.id}`, {
          method: "PATCH",
          credentials: "include",
          body: fd,
        });
      } else {
        res = await fetch(`/api/admin/media/${selectedAsset.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: editFilename,
            alt: editAlt,
            caption: editCaption,
            category: editCategory,
          }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update asset");

      setStatusBanner({
        type: "success",
        text: replaceFile
          ? `Replaced image for "${selectedAsset.filename}" and updated active page references.`
          : `Saved metadata changes for "${editFilename}".`,
      });
      setSelectedAsset(null);
      await loadAssets();
    } catch (err) {
      setStatusBanner({
        type: "error",
        text: err instanceof Error ? err.message : "Error saving asset changes.",
      });
    } finally {
      setSavingMeta(false);
    }
  };

  const handleDeleteAsset = async (force = false) => {
    if (!selectedAsset) return;
    setDeleting(true);
    setStatusBanner(null);

    try {
      const url = force
        ? `/api/admin/media/${selectedAsset.id}?force=true`
        : `/api/admin/media/${selectedAsset.id}`;

      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (res.status === 409 && !force) {
        const proceed = window.confirm(
          `${data.error}\n\nProceed with removal anyway?`
        );
        if (proceed) {
          await handleDeleteAsset(true);
          return;
        }
        setDeleting(false);
        return;
      }

      if (!res.ok) throw new Error(data.error || "Failed to delete asset");

      setStatusBanner({
        type: "success",
        text: `Removed asset "${selectedAsset.filename}" safely.`,
      });
      setSelectedAsset(null);
      await loadAssets();
    } catch (err) {
      setStatusBanner({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to delete asset.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const filtered = assets.filter((asset) => {
    const matchesCategory =
      filterCategory === "all" || asset.category === filterCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      asset.filename.toLowerCase().includes(q) ||
      asset.alt.toLowerCase().includes(q) ||
      (asset.caption || "").toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const uploadedCount = assets.filter((a) => a.sourceType === "uploaded").length;
  const brandCount = assets.filter((a) => a.sourceType !== "uploaded").length;

  return (
    <div className="iam-dash-container">
      {/* Header Bar Matching Approved Dashboard */}
      <div className="iam-dash-intro">
        <div>
          <span className="iam-pill-amber" style={{ marginBottom: "8px", display: "inline-block" }}>
            ENTERPRISE ASSET REPOSITORY
          </span>
          <h1 className="iam-dash-welcome">Media Library</h1>
          <p className="iam-dash-subwelcome">
            Manage reconciled brand photography and newly uploaded CMS assets with persistent PostgreSQL storage.
          </p>
        </div>

        <div className="iam-dash-actions">
          <Link href="/admin" className="iam-action-btn">
            &larr; Dashboard
          </Link>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="iam-action-btn iam-action-primary"
            style={{ cursor: "pointer" }}
          >
            + Upload New Image
          </button>
        </div>
      </div>

      {statusBanner && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            fontSize: "13px",
            marginBottom: "20px",
            backgroundColor:
              statusBanner.type === "success" ? "#ECFDF5" : "#FEF2F2",
            color: statusBanner.type === "success" ? "#065F46" : "#991B1B",
            border:
              statusBanner.type === "success"
                ? "1px solid #A7F3D0"
                : "1px solid #FECACA",
          }}
        >
          {statusBanner.text}
        </div>
      )}

      {/* Metrics Strip */}
      <div className="iam-metrics-quad iam-metrics-triple">
        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Total Reconciled Assets</span>
            <span className="iam-pill-green">Active</span>
          </div>
          <div className="iam-metric-value">{assets.length}</div>
          <div className="iam-metric-footnote">Immediately selectable in Section Editors</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Brand Photography &amp; Logos</span>
            <span className="iam-pill-neutral">Core</span>
          </div>
          <div className="iam-metric-value">{brandCount}</div>
          <div className="iam-metric-footnote">Synchronized from /public/brand</div>
        </div>

        <div className="iam-metric-item">
          <div className="iam-metric-head">
            <span className="iam-metric-title">Custom Uploaded Assets</span>
            <span className="iam-pill-amber">Cloud DB</span>
          </div>
          <div className="iam-metric-value">{uploadedCount}</div>
          <div className="iam-metric-footnote">Stored permanently in Supabase PostgreSQL</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="iam-table-container"
        style={{ padding: "16px 20px", marginBottom: "24px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {[
              { id: "all", label: "All Assets" },
              { id: "hero", label: "Hero Photography" },
              { id: "consulting", label: "Advisory & Office" },
              { id: "classroom", label: "IAM Academy" },
              { id: "identity", label: "Identity Operations" },
              { id: "portrait", label: "Profile Portraits" },
              { id: "logo", label: "Brand Logos" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: filterCategory === cat.id ? 700 : 500,
                  border:
                    filterCategory === cat.id
                      ? "1px solid #0B1424"
                      : "1px solid #E2E8F0",
                  backgroundColor:
                    filterCategory === cat.id ? "#0B1424" : "#FFFFFF",
                  color: filterCategory === cat.id ? "#FFFFFF" : "#64748B",
                  cursor: "pointer",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by filename, alt text, or caption..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "280px",
              flex: "1 1 200px",
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

      {/* Responsive Visual Grid */}
      {loading ? (
        <div style={{ padding: "64px", textAlign: "center", color: "#64748B", fontSize: "14px" }}>
          Loading synchronized media repository...
        </div>
      ) : filtered.length === 0 ? (
        <div className="iam-table-container iam-table-empty-state">
          <p className="iam-empty-title">No matching assets found</p>
          <p className="iam-empty-sub">
            Clear your search filters or upload a new image using the button above.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((asset) => (
            <div
              key={asset.id}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "172px",
                  backgroundColor:
                    asset.filename.includes("-dark") ? "#F1F5F9" : "#0B1424",
                  cursor: "pointer",
                }}
                onClick={() => openInspector(asset)}
              >
                <img
                  src={asset.url}
                  alt={asset.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: asset.category === "logo" ? "contain" : "cover",
                    padding: asset.category === "logo" ? "20px" : "0",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: 700,
                    backgroundColor: "rgba(11, 20, 36, 0.85)",
                    color: "#D89A43",
                  }}
                >
                  {asset.dimensions}
                </span>
                {asset.sourceType === "uploaded" && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: 700,
                      backgroundColor: "#D89A43",
                      color: "#0B1424",
                    }}
                  >
                    UPLOADED
                  </span>
                )}
              </div>

              <div
                style={{
                  padding: "14px 16px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#0B1424",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {asset.filename}
                    </span>
                    <span style={{ fontSize: "11px", color: "#64748B", shrink: 0 } as React.CSSProperties}>
                      {asset.sizeLabel}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "11px",
                      color: "#64748B",
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {asset.alt}
                  </p>

                  {asset.usedIn && asset.usedIn.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                      {asset.usedIn.map((refLabel) => (
                        <span
                          key={refLabel}
                          style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            color: "#065F46",
                            backgroundColor: "#ECFDF5",
                            border: "1px solid #A7F3D0",
                            padding: "1px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          {refLabel}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "10px",
                    borderTop: "1px solid #F1F5F9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(asset.url)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#B07424",
                      border: "none",
                      padding: 0,
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Copy Path &rarr;
                  </button>

                  <button
                    type="button"
                    onClick={() => openInspector(asset)}
                    style={{
                      backgroundColor: "#0B1424",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "4px",
                      padding: "5px 12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Manage / Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD NEW IMAGE MODAL */}
      {showUploadModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(11, 20, 36, 0.75)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowUploadModal(false)}
        >
          <form
            onSubmit={handleUploadSubmit}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              maxWidth: "540px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E2E8F0", paddingBottom: "14px", marginBottom: "20px" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0B1424" }}>
                  Upload Image Asset
                </h2>
                <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748B" }}>
                  PNG, JPG, or WebP up to 8 MB. Available immediately inside Page Section Editors.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                style={{ backgroundColor: "#F1F5F9", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
              >
                Close
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                  Select Image File *
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  required
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  style={{ width: "100%", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                  Alternative Text (Alt Description) *
                </label>
                <input
                  type="text"
                  required
                  value={uploadAlt}
                  onChange={(e) => setUploadAlt(e.target.value)}
                  placeholder="Describe what the photograph depicts for accessibility"
                  style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>

              <div className="iam-form-grid-2" style={{ gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    style={{ width: "100%", height: "38px", padding: "0 10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="hero">Hero Photography</option>
                    <option value="consulting">Advisory &amp; Office</option>
                    <option value="classroom">IAM Academy</option>
                    <option value="identity">Identity Operations</option>
                    <option value="portrait">Profile Portraits</option>
                    <option value="logo">Brand Logos</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                    Optional Caption
                  </label>
                  <input
                    type="text"
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    placeholder="Editorial caption"
                    style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="submit"
                disabled={uploading || !uploadFile}
                style={{
                  backgroundColor: uploading ? "#718096" : "#0B1424",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 22px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: uploading ? "wait" : "pointer",
                }}
              >
                {uploading ? "Uploading to Database..." : "Upload & Save Asset"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* INSPECT / EDIT / REPLACE / SAFE DELETE MODAL */}
      {selectedAsset && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(11, 20, 36, 0.8)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setSelectedAsset(null)}
        >
          <form
            onSubmit={handleSaveAssetEdit}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              maxWidth: "820px",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "200px",
                flexShrink: 0,
                backgroundColor: selectedAsset.filename.includes("-dark") ? "#F1F5F9" : "#0B1424",
              }}
            >
              <img
                src={selectedAsset.url}
                alt={selectedAsset.alt}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #E2E8F0", paddingBottom: "14px", marginBottom: "16px", gap: "12px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0B1424" }}>
                    {selectedAsset.filename}
                  </h3>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#64748B" }}>
                    {selectedAsset.dimensions} &middot; {selectedAsset.sizeLabel} &middot; Path: <code>{selectedAsset.url}</code>
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                    {selectedAsset.usedIn && selectedAsset.usedIn.length > 0 ? (
                      selectedAsset.usedIn.map((slug) => (
                        <span
                          key={slug}
                          style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            fontWeight: 600,
                            backgroundColor: "#FEF3C7",
                            color: "#92400E",
                            border: "1px solid #FDE68A",
                          }}
                        >
                          Used on Page: {slug}
                        </span>
                      ))
                    ) : (
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 600,
                          backgroundColor: "#F1F5F9",
                          color: "#64748B",
                        }}
                      >
                        Unreferenced / Library Only
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  style={{ backgroundColor: "#F1F5F9", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "12px", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}
                >
                  Close &times;
                </button>
              </div>

              <div className="iam-form-grid-2" style={{ gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Asset Filename
                  </label>
                  <input
                    type="text"
                    value={editFilename}
                    disabled={selectedAsset.sourceType !== "uploaded"}
                    onChange={(e) => setEditFilename(e.target.value)}
                    style={{
                      width: "100%",
                      height: "36px",
                      padding: "0 10px",
                      borderRadius: "6px",
                      border: "1px solid #CBD5E1",
                      fontSize: "12px",
                      boxSizing: "border-box",
                      backgroundColor: selectedAsset.sourceType === "uploaded" ? "#FFFFFF" : "#F8FAFC",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    style={{ width: "100%", height: "36px", padding: "0 10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "12px", backgroundColor: "#FFFFFF" }}
                  >
                    <option value="hero">Hero Photography</option>
                    <option value="consulting">Advisory &amp; Office</option>
                    <option value="classroom">IAM Academy</option>
                    <option value="identity">Identity Operations</option>
                    <option value="portrait">Profile Portraits</option>
                    <option value="logo">Brand Logos</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  Alternative Text (Accessibility)
                </label>
                <input
                  type="text"
                  required
                  value={editAlt}
                  onChange={(e) => setEditAlt(e.target.value)}
                  style={{ width: "100%", height: "36px", padding: "0 10px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "12px", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "4px" }}>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  Replace Asset Image File (Optional)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => setReplaceFile(e.target.files?.[0] || null)}
                  style={{ fontSize: "12px" }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #E2E8F0",
                padding: "14px 24px",
                backgroundColor: "#F8FAFC",
                flexShrink: 0,
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => handleDeleteAsset(false)}
                  style={{
                    backgroundColor: "#FEF2F2",
                    color: "#991B1B",
                    border: "1px solid #FECACA",
                    borderRadius: "6px",
                    padding: "8px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {deleting ? "Removing..." : "Delete Asset Safely"}
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(selectedAsset.url)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#0B1424",
                      border: "1px solid #CBD5E1",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Copy URL
                  </button>
                  <button
                    type="submit"
                    disabled={savingMeta}
                    style={{
                      backgroundColor: "#0B1424",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 20px",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {savingMeta ? "Saving..." : "Save Changes"}
                  </button>
                </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MediaLibraryView;
