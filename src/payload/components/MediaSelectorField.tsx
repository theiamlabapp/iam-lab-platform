"use client";

import React, { useEffect, useState } from "react";
import { useField } from "@payloadcms/ui";

interface PickerAsset {
  id: number | string;
  filename: string;
  url: string;
  category: string;
  alt: string;
}

export function MediaSelectorField({
  path,
  field,
}: {
  path: string;
  field?: { label?: string | Record<string, string>; admin?: { description?: string } };
}) {
  const { value = "", setValue } = useField<string>({ path });
  const [assets, setAssets] = useState<PickerAsset[]>([]);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const label =
    typeof field?.label === "string"
      ? field.label
      : path.toLowerCase().includes("light")
      ? "Footer Logo (Light Variant)"
      : "Header Logo (Dark Variant)";

  const isLightOnDark = path.toLowerCase().includes("light");

  const loadAssets = async () => {
    try {
      const res = await fetch("/api/admin/media", { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.assets)) setAssets(data.assets);
    } catch {
      // keep existing
    }
  };

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/media", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (mounted && data && Array.isArray(data.assets)) {
          setAssets(data.assets);
        }
      })
      .catch(() => {
        // ignore
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErrorText(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", `${label} — The IAM Lab`);
      fd.append("category", "logo");
      const res = await fetch("/api/admin/media", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Upload failed");
      if (data.asset?.url) {
        setValue(data.asset.url);
        await loadAssets();
        setOpen(false);
      }
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const activeUrl = String(value || (isLightOnDark ? "/brand/the-iam-lab-logo-light.png" : "/brand/the-iam-lab-logo-dark.png"));
  const activeAsset = assets.find((a) => a.url === activeUrl);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          fontWeight: 700,
          color: "#0B1424",
          marginBottom: "8px",
        }}
      >
        {label}
      </label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #CBD5E1",
          backgroundColor: "#F8FAFC",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "140px",
              height: "68px",
              borderRadius: "6px",
              border: "1px solid #CBD5E1",
              backgroundColor: isLightOnDark ? "#0B1424" : "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src={activeUrl}
              alt={label}
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>

          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#0B1424" }}>
              {activeAsset?.filename || (isLightOnDark ? "Light Footer Trademark" : "Dark Header Trademark")}
            </div>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "3px" }}>
              {isLightOnDark
                ? "Displayed across dark Midnight Navy footer surfaces."
                : "Displayed across white sticky navigation bar surfaces."}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            loadAssets();
            setOpen(true);
          }}
          style={{
            backgroundColor: "#0B1424",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "6px",
            padding: "9px 16px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Choose or Upload Logo
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(11, 20, 36, 0.78)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              maxWidth: "780px",
              width: "100%",
              maxHeight: "86vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderBottom: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0B1424" }}>
                  Select {label}
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748B" }}>
                  Choose an existing brand logo or upload a transparent PNG/WebP file.
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <label
                  style={{
                    backgroundColor: "#0B1424",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    padding: "8px 14px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: uploading ? "wait" : "pointer",
                  }}
                >
                  {uploading ? "Uploading..." : "+ Upload New Logo"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleUpload}
                    style={{ display: "none" }}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    backgroundColor: "#F1F5F9",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Close &times;
                </button>
              </div>
            </div>

            {errorText && (
              <div style={{ margin: "12px 24px 0", padding: "10px 14px", borderRadius: "6px", backgroundColor: "#FEF2F2", color: "#991B1B", fontSize: "12px" }}>
                {errorText}
              </div>
            )}

            <div
              style={{
                padding: "20px 24px",
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                gap: "14px",
              }}
            >
              {assets
                .filter((a) => a.category === "logo" || a.category === "brand" || assets.length < 6)
                .concat(assets.filter((a) => a.category !== "logo" && a.category !== "brand"))
                .map((asset) => (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      setValue(asset.url);
                      setOpen(false);
                    }}
                    style={{
                      padding: 0,
                      border:
                        activeUrl === asset.url ? "2px solid #D89A43" : "1px solid #E2E8F0",
                      borderRadius: "6px",
                      overflow: "hidden",
                      backgroundColor: "#FFFFFF",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        height: "96px",
                        backgroundColor: isLightOnDark ? "#0B1424" : "#F8FAFC",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                      }}
                    >
                      <img
                        src={asset.url}
                        alt={asset.alt}
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                      />
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#0B1424",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {asset.filename}
                      </div>
                      <div style={{ fontSize: "10px", color: "#64748B", marginTop: "2px" }}>
                        {asset.category === "logo" ? "Brand Trademark" : asset.category}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaSelectorField;
