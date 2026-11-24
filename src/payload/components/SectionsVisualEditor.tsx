"use client";

import React, { useEffect, useState } from "react";
import { useDocumentInfo, useField } from "@payloadcms/ui";

interface PickerAsset {
  id: number | string;
  filename: string;
  url: string;
  category: string;
  alt: string;
}

const ROUTE_DESTINATIONS = [
  { label: "Home Page (/)", value: "/" },
  { label: "About Us (/about)", value: "/about" },
  { label: "Services & Solutions (/services)", value: "/services" },
  { label: "IAM Academy (/academy)", value: "/academy" },
  { label: "Enterprise Consulting Form (/contact?type=enterprise_consulting)", value: "/contact?type=enterprise_consulting" },
  { label: "IAM Academy Enquiry (/contact?type=individual_learning)", value: "/contact?type=individual_learning" },
];

const ADDABLE_SECTION_TEMPLATES: Array<{ label: string; template: Record<string, unknown> }> = [
  {
    label: "Editorial Split / Narrative Block",
    template: {
      type: "editorial_feature",
      badge: "Advisory Insight",
      headline: "Structured Identity Governance for Growing Enterprises",
      subheadline:
        "Clear, phased architecture controls designed around practical day-to-day operational needs.",
      bgImage: "/brand/team-collaboration.jpg",
      ctaPrimary: {
        label: "Talk to an IAM Specialist",
        href: "/contact?type=enterprise_consulting",
      },
    },
  },
  {
    label: "Hero Header Banner",
    template: {
      type: "hero",
      badge: "The IAM Lab",
      headline: "Secure identities. Simplify access.",
      subheadline:
        "Independent Identity and Access Management advisory, technical delivery, and capability development.",
      bgImage: "/brand/hero-enterprise.jpg",
      ctaPrimary: {
        label: "Discuss an IAM Project",
        href: "/contact?type=enterprise_consulting",
      },
    },
  },
  {
    label: "Closing Consultation Banner",
    template: {
      type: "closing_cta",
      badge: "Initiate Conversation",
      headline: "Let’s discuss the identity challenge your organisation is solving.",
      subheadline:
        "Direct consultation with senior IAM practitioners.",
      bgImage: "/brand/executive-consulting.jpg",
      ctaPrimary: {
        label: "Talk to an IAM Specialist",
        href: "/contact?type=enterprise_consulting",
      },
    },
  },
];

function getSectionTitle(sec: Record<string, unknown>, idx: number): string {
  const t = String(sec.type || "custom");
  const map: Record<string, string> = {
    hero: "Hero Header Banner",
    challenges_ledger: "Identity Challenges Ledger",
    advisory_editorial: "Independent Advisory Split",
    workforce_capabilities: "Workforce Capabilities",
    services_list: "Services Highlights",
    academy_feature: "IAM Academy Spotlight",
    closing_cta: "Closing Consultation CTA",
    leadership_profile: "Executive Leadership Profile",
    editorial_feature: "Custom Editorial Block",
  };
  return `${String(idx + 1).padStart(2, "0")} // ${map[t] || t}`;
}

export function SectionsVisualEditor({ path }: { path: string }) {
  const { value = [], setValue } = useField<Array<Record<string, unknown>>>({ path });
  const { initialData } = useDocumentInfo();

  const slug = String(initialData?.slug || "home");
  const liveRoute = slug === "home" ? "/" : `/${slug}`;
  const sections: Array<Record<string, unknown>> = Array.isArray(value) ? value : [];

  const [activeTab, setActiveTab] = useState(0);
  const [mediaAssets, setMediaAssets] = useState<PickerAsset[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [pickerTargetField, setPickerTargetField] = useState<string>("bgImage");
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [quickUploadBusy, setQuickUploadBusy] = useState(false);

  const loadMediaChoices = async () => {
    try {
      const res = await fetch("/api/admin/media", { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.assets)) setMediaAssets(data.assets);
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
          setMediaAssets(data.assets);
        }
      })
      .catch(() => {
        // keep existing
      });
    return () => {
      mounted = false;
    };
  }, []);

  const safeActiveIdx = Math.min(activeTab, Math.max(0, sections.length - 1));
  const currentSec = sections[safeActiveIdx];

  const updateSection = (idx: number, field: string, val: unknown) => {
    const next = [...sections];
    next[idx] = { ...(next[idx] || {}), [field]: val };
    setValue(next);
  };

  const updateNestedCta = (
    idx: number,
    ctaKey: "ctaPrimary" | "ctaSecondary",
    field: "label" | "href",
    val: string
  ) => {
    const next = [...sections];
    const sec = next[idx] || {};
    const prevCta = (sec[ctaKey] as Record<string, string>) || {};
    next[idx] = {
      ...sec,
      [ctaKey]: { ...prevCta, [field]: val },
    };
    setValue(next);
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    const [moved] = next.splice(idx, 1);
    next.splice(target, 0, moved);
    setValue(next);
    setActiveTab(target);
  };

  const removeSection = (idx: number) => {
    if (sections.length <= 1) return;
    const next = [...sections];
    next.splice(idx, 1);
    setValue(next);
    setActiveTab(Math.max(0, idx - 1));
  };

  const addSection = (template: Record<string, unknown>) => {
    const next = [...sections, { ...template }];
    setValue(next);
    setActiveTab(next.length - 1);
    setShowAddMenu(false);
  };

  const updateItem = (
    secIdx: number,
    itemIdx: number,
    field: string,
    val: string
  ) => {
    const next = [...sections];
    const sec = next[secIdx] || {};
    const items = Array.isArray(sec.items) ? [...sec.items] : [];
    items[itemIdx] = { ...(items[itemIdx] as Record<string, unknown>), [field]: val };
    next[secIdx] = { ...sec, items };
    setValue(next);
  };

  const addItem = (secIdx: number, itemTemplate: Record<string, unknown>) => {
    const next = [...sections];
    const sec = next[secIdx] || {};
    const items = Array.isArray(sec.items) ? [...sec.items] : [];
    items.push(itemTemplate);
    next[secIdx] = { ...sec, items };
    setValue(next);
  };

  const removeItem = (secIdx: number, itemIdx: number) => {
    const next = [...sections];
    const sec = next[secIdx] || {};
    const items = Array.isArray(sec.items) ? [...sec.items] : [];
    items.splice(itemIdx, 1);
    next[secIdx] = { ...sec, items };
    setValue(next);
  };

  const handleQuickMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setQuickUploadBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("alt", file.name.replace(/\.[^.]+$/, ""));
      fd.append("category", "hero");
      const res = await fetch("/api/admin/media", {
        method: "POST",
        credentials: "include",
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.asset?.url) {
        updateSection(safeActiveIdx, pickerTargetField, data.asset.url);
        await loadMediaChoices();
        setShowMediaPicker(false);
      }
    } finally {
      setQuickUploadBusy(false);
    }
  };

  const openPicker = (fieldName = "bgImage") => {
    setPickerTargetField(fieldName);
    loadMediaChoices();
    setShowMediaPicker(true);
  };

  if (sections.length === 0) {
    return (
      <div
        style={{
          padding: "28px",
          backgroundColor: "#F8FAFC",
          border: "1px dashed #CBD5E1",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 14px 0", fontSize: "14px", fontWeight: 600, color: "#0B1424" }}>
          This page has no structured visual sections yet.
        </p>
        <button
          type="button"
          onClick={() => addSection(ADDABLE_SECTION_TEMPLATES[1].template)}
          style={{
            backgroundColor: "#0B1424",
            color: "#FFFFFF",
            padding: "9px 18px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          + Initialize Hero Section
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "12px",
        marginBottom: "24px",
        borderRadius: "8px",
        border: "1px solid #CBD5E1",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Top Executive Bar */}
      <div
        style={{
          backgroundColor: "#0B1424",
          color: "#FFFFFF",
          padding: "16px 20px",
          borderBottom: "2px solid #D89A43",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#D89A43" }} />
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#FFFFFF" }}>
              Visual Content Studio &middot; {slug.toUpperCase()} ({sections.length} Sections)
            </h3>
          </div>
          <p style={{ margin: "4px 0 0 16px", fontSize: "12px", color: "#94A3B8" }}>
            Edit text, reorder or add sections, swap photos via Media Picker, then click Save at the top of the page.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href={`${liveRoute}?preview=draft`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "7px 14px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
              backgroundColor: "#14243B",
              color: "#D89A43",
              border: "1px solid rgba(216, 154, 67, 0.45)",
              textDecoration: "none",
            }}
          >
            Preview Draft Page &rarr;
          </a>

          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowAddMenu(!showAddMenu)}
              style={{
                padding: "7px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 700,
                backgroundColor: "#D89A43",
                color: "#0B1424",
                border: "none",
                cursor: "pointer",
              }}
            >
              + Add Section
            </button>

            {showAddMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "110%",
                  width: "250px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CBD5E1",
                  borderRadius: "6px",
                  boxShadow: "0 12px 28px rgba(11, 20, 36, 0.2)",
                  zIndex: 100,
                  overflow: "hidden",
                }}
              >
                {ADDABLE_SECTION_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.label}
                    type="button"
                    onClick={() => addSection(tpl.template)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 14px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#0B1424",
                      backgroundColor: "#FFFFFF",
                      border: "none",
                      borderBottom: "1px solid #F1F5F9",
                      cursor: "pointer",
                    }}
                  >
                    + {tpl.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Tabs List */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2px",
          borderBottom: "1px solid #E2E8F0",
          backgroundColor: "#F8FAFC",
        }}
      >
        {sections.map((sec, idx) => {
          const isActive = idx === safeActiveIdx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              style={{
                padding: "12px 16px",
                fontSize: "12px",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#0B1424" : "#64748B",
                backgroundColor: isActive ? "#FFFFFF" : "transparent",
                border: "none",
                borderBottom: isActive ? "2.5px solid #D89A43" : "2.5px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {getSectionTitle(sec, idx)}
            </button>
          );
        })}
      </div>

      {/* Section Workspace */}
      {currentSec && (
        <div style={{ padding: "24px" }}>
          {/* Reorder & Remove Toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "14px",
              marginBottom: "18px",
              borderBottom: "1px solid #F1F5F9",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0B1424" }}>
              Editing Section: <code style={{ color: "#B07424" }}>{String(currentSec.type)}</code>
            </span>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                type="button"
                disabled={safeActiveIdx === 0}
                onClick={() => moveSection(safeActiveIdx, -1)}
                style={{ padding: "5px 10px", fontSize: "11px", fontWeight: 600, backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "4px", cursor: safeActiveIdx === 0 ? "not-allowed" : "pointer" }}
              >
                &larr; Move Earlier
              </button>
              <button
                type="button"
                disabled={safeActiveIdx === sections.length - 1}
                onClick={() => moveSection(safeActiveIdx, 1)}
                style={{ padding: "5px 10px", fontSize: "11px", fontWeight: 600, backgroundColor: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: "4px", cursor: safeActiveIdx === sections.length - 1 ? "not-allowed" : "pointer" }}
              >
                Move Later &rarr;
              </button>
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Remove this section from the page?")) {
                      removeSection(safeActiveIdx);
                    }
                  }}
                  style={{ padding: "5px 10px", fontSize: "11px", fontWeight: 600, backgroundColor: "#FEF2F2", color: "#991B1B", border: "1px solid #FECACA", borderRadius: "4px", cursor: "pointer" }}
                >
                  Remove Section
                </button>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Shared Headline / Title / Badge / Copy */}
            {"badge" in currentSec || currentSec.type === "hero" || currentSec.type === "editorial_feature" ? (
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                  Eyebrow Label / Badge
                </label>
                <input
                  type="text"
                  value={String(currentSec.badge || "")}
                  onChange={(e) => updateSection(safeActiveIdx, "badge", e.target.value)}
                  style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>
            ) : null}

            {currentSec.type === "leadership_profile" ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Leader Full Name
                  </label>
                  <input
                    type="text"
                    value={String(currentSec.name || "")}
                    onChange={(e) => updateSection(safeActiveIdx, "name", e.target.value)}
                    style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={String(currentSec.role || "")}
                    onChange={(e) => updateSection(safeActiveIdx, "role", e.target.value)}
                    style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Executive Biography
                  </label>
                  <textarea
                    rows={4}
                    value={String(currentSec.bio || "")}
                    onChange={(e) => updateSection(safeActiveIdx, "bio", e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", lineHeight: 1.6, boxSizing: "border-box" }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={String(currentSec.headline ?? currentSec.title ?? "")}
                    onChange={(e) =>
                      updateSection(
                        safeActiveIdx,
                        currentSec.type === "challenges_ledger" ? "title" : "headline",
                        e.target.value
                      )
                    }
                    style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: 600, boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Supporting Subheadline / Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={String(currentSec.subheadline ?? currentSec.subtitle ?? "")}
                    onChange={(e) =>
                      updateSection(
                        safeActiveIdx,
                        currentSec.type === "challenges_ledger" ? "subtitle" : "subheadline",
                        e.target.value
                      )
                    }
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", lineHeight: 1.6, boxSizing: "border-box" }}
                  />
                </div>

                {"body" in currentSec || currentSec.type === "advisory_editorial" || currentSec.type === "editorial_feature" ? (
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Extended Editorial Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={String(currentSec.body || "")}
                      onChange={(e) => updateSection(safeActiveIdx, "body", e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", lineHeight: 1.6, boxSizing: "border-box" }}
                    />
                  </div>
                ) : null}
              </>
            )}

            {/* Background Image Picker Card */}
            {("bgImage" in currentSec ||
              currentSec.type === "hero" ||
              currentSec.type === "advisory_editorial" ||
              currentSec.type === "workforce_capabilities" ||
              currentSec.type === "academy_feature" ||
              currentSec.type === "closing_cta" ||
              currentSec.type === "editorial_feature") && (
              <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "220px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#0B1424", textTransform: "uppercase", marginBottom: "6px" }}>
                      Section Photography / Background Image
                    </label>
                    <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748B" }}>
                      Active Path: <code>{String(currentSec.bgImage || "/brand/hero-enterprise.jpg")}</code>
                    </p>
                    <button
                      type="button"
                      onClick={() => openPicker("bgImage")}
                      style={{
                        backgroundColor: "#0B1424",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 16px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Choose or Upload from Media Library
                    </button>
                  </div>

                  <div style={{ width: "200px", height: "112px", borderRadius: "6px", overflow: "hidden", border: "1px solid #CBD5E1", backgroundColor: "#0B1424" }}>
                    <img
                      src={String(currentSec.bgImage || "/brand/hero-enterprise.jpg")}
                      alt="Selected section visual preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Primary & Secondary Call-To-Actions */}
            {(currentSec.type === "hero" ||
              currentSec.type === "closing_cta" ||
              currentSec.type === "editorial_feature") && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "14px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#B07424", textTransform: "uppercase" }}>
                    Primary CTA Button
                  </span>
                  <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Button Text"
                      value={String((currentSec.ctaPrimary as Record<string, string>)?.label || "")}
                      onChange={(e) => updateNestedCta(safeActiveIdx, "ctaPrimary", "label", e.target.value)}
                      style={{ height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                    />
                    <select
                      value={String((currentSec.ctaPrimary as Record<string, string>)?.href || "")}
                      onChange={(e) => updateNestedCta(safeActiveIdx, "ctaPrimary", "href", e.target.value)}
                      style={{ height: "34px", padding: "0 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", backgroundColor: "#FFFFFF" }}
                    >
                      <option value="">-- Choose Destination Route --</option>
                      {ROUTE_DESTINATIONS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {currentSec.type === "hero" && (
                  <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "14px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>
                      Secondary CTA Button
                    </span>
                    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Button Text"
                        value={String((currentSec.ctaSecondary as Record<string, string>)?.label || "")}
                        onChange={(e) => updateNestedCta(safeActiveIdx, "ctaSecondary", "label", e.target.value)}
                        style={{ height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                      />
                      <select
                        value={String((currentSec.ctaSecondary as Record<string, string>)?.href || "")}
                        onChange={(e) => updateNestedCta(safeActiveIdx, "ctaSecondary", "href", e.target.value)}
                        style={{ height: "34px", padding: "0 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", backgroundColor: "#FFFFFF" }}
                      >
                        <option value="">-- Choose Destination Route --</option>
                        {ROUTE_DESTINATIONS.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Repeatable Items (e.g. Challenges Ledger) */}
            {Array.isArray(currentSec.items) && (
              <div style={{ marginTop: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#0B1424" }}>
                    Structured Items ({currentSec.items.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const nextNum = Array.isArray(currentSec.items) ? currentSec.items.length + 1 : 1;
                      addItem(safeActiveIdx, {
                        num: `0${nextNum}`,
                        title: "New Item Heading",
                        context: "Domain Context",
                        friction: "Operational challenge details",
                        resolution: "Architectural resolution",
                      });
                    }}
                    style={{
                      backgroundColor: "#0B1424",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    + Add Item
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(currentSec.items as Array<Record<string, unknown>>).map((item, iIdx) => (
                    <div
                      key={iIdx}
                      style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "14px" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#B07424" }}>
                          ITEM {String(item.num || `0${iIdx + 1}`)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(safeActiveIdx, iIdx)}
                          style={{ backgroundColor: "transparent", color: "#991B1B", border: "none", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                        >
                          Remove Item
                        </button>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "8px", marginBottom: "8px" }}>
                        <input
                          type="text"
                          value={String(item.num || "")}
                          onChange={(e) => updateItem(safeActiveIdx, iIdx, "num", e.target.value)}
                          style={{ height: "34px", padding: "0 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", fontWeight: 700 }}
                        />
                        <input
                          type="text"
                          value={String(item.title || "")}
                          onChange={(e) => updateItem(safeActiveIdx, iIdx, "title", e.target.value)}
                          style={{ height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", fontWeight: 600 }}
                        />
                      </div>

                      {"friction" in item && (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                          <textarea
                            rows={2}
                            placeholder="Operational Friction"
                            value={String(item.friction || "")}
                            onChange={(e) => updateItem(safeActiveIdx, iIdx, "friction", e.target.value)}
                            style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "11px" }}
                          />
                          <textarea
                            rows={2}
                            placeholder="Architectural Resolution"
                            value={String(item.resolution || "")}
                            onChange={(e) => updateItem(safeActiveIdx, iIdx, "resolution", e.target.value)}
                            style={{ padding: "6px 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "11px" }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MEDIA LIBRARY VISUAL PICKER MODAL */}
      {showMediaPicker && (
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
          onClick={() => setShowMediaPicker(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              maxWidth: "860px",
              width: "100%",
              maxHeight: "88vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#0B1424" }}>
                  Select Image from Media Library
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748B" }}>
                  Choose any brand photograph or upload a fresh asset directly.
                </p>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <label style={{ backgroundColor: "#0B1424", color: "#FFFFFF", borderRadius: "6px", padding: "7px 14px", fontSize: "12px", fontWeight: 600, cursor: quickUploadBusy ? "wait" : "pointer" }}>
                  {quickUploadBusy ? "Uploading..." : "+ Quick Upload Image"}
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleQuickMediaUpload} style={{ display: "none" }} />
                </label>
                <button
                  type="button"
                  onClick={() => setShowMediaPicker(false)}
                  style={{ backgroundColor: "#F1F5F9", border: "none", borderRadius: "4px", padding: "7px 12px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                >
                  Close &times;
                </button>
              </div>
            </div>

            <div style={{ padding: "20px 24px", overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
              {mediaAssets
                .filter((a) => a.category !== "logo")
                .map((asset) => (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      updateSection(safeActiveIdx, pickerTargetField, asset.url);
                      setShowMediaPicker(false);
                    }}
                    style={{
                      padding: 0,
                      border:
                        currentSec?.bgImage === asset.url
                          ? "2px solid #D89A43"
                          : "1px solid #E2E8F0",
                      borderRadius: "6px",
                      overflow: "hidden",
                      backgroundColor: "#FFFFFF",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ height: "106px", backgroundColor: "#0B1424" }}>
                      <img
                        src={asset.url}
                        alt={asset.alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#0B1424", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {asset.filename}
                      </div>
                      <div style={{ fontSize: "10px", color: "#64748B", marginTop: "2px" }}>
                        {asset.category}
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

export default SectionsVisualEditor;
