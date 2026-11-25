"use client";

import React, { useEffect, useState } from "react";
import { useDocumentInfo, useField } from "@payloadcms/ui";
import { AdminComponentErrorBoundary } from "./AdminComponentErrorBoundary";

interface PickerAsset {
  id: number | string;
  filename: string;
  url: string;
  category: string;
  alt: string;
}

const ROUTE_DESTINATIONS = [
  { label: "Talk to an IAM Specialist (WhatsApp)", value: "whatsapp" },
  { label: "Home Page (/)", value: "/" },
  { label: "About Us (/about)", value: "/about" },
  { label: "Services & Solutions (/services)", value: "/services" },
  { label: "IAM Academy (/academy)", value: "/academy" },
  {
    label: "Business Consultation Form (/contact?type=enterprise_consulting#contact-form)",
    value: "/contact?type=enterprise_consulting#contact-form",
  },
  {
    label: "Individual Learning Form (/contact?type=individual_learning#contact-form)",
    value: "/contact?type=individual_learning#contact-form",
  },
  {
    label: "Selar Bookstore (https://selar.com/m/chiemezie-uzoma1)",
    value: "https://selar.com/m/chiemezie-uzoma1",
  },
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
        href: "whatsapp",
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
        href: "/contact?type=enterprise_consulting#contact-form",
      },
    },
  },
  {
    label: "Closing Consultation Banner",
    template: {
      type: "closing_cta",
      badge: "Initiate Conversation",
      headline: "Let’s discuss the identity challenge your organisation is solving.",
      subheadline: "Direct consultation with senior IAM practitioners.",
      bgImage: "/brand/executive-consulting.jpg",
      ctaPrimary: {
        label: "Talk to an IAM Specialist",
        href: "whatsapp",
      },
    },
  },
];

function getSectionTitle(sec: Record<string, unknown>, idx: number): string {
  const t = String(sec.type || "custom");
  const map: Record<string, string> = {
    hero: "Hero Banner",
    challenges_ledger: "Identity Challenges",
    identity_fabric: "Identity Fabric Diagram",
    advisory_editorial: "Practical Approach Split",
    workforce_capabilities: "Engineering & Depth",
    services_list: "Services & Practice Pillars",
    delivery_timeline: "Delivery Model Stages",
    academy_feature: "IAM Academy Feature",
    closing_cta: "Closing CTA Banner",
    mission_vision: "Mission, Vision & Approach",
    leadership_profile: "Executive Leadership",
    principles_list: "What Guides Our Work",
    industries_sectors: "Industries & Markets",
    future_capability: "Future Capability Notice",
    learning_pathways: "Academy Pathways",
    learning_formats: "Academy Learning Formats",
    selar_bookstore: "Selar Bookstore Card",
    integrity_notice: "Learning Integrity Notice",
    faqs_list: "Academy FAQs",
    contact_tracks: "Enquiry Route Cards",
    form_intro: "Consultation Form Header",
    office_map: "London Headquarters Map",
    editorial_feature: "Custom Editorial Block",
  };
  return `${String(idx + 1).padStart(2, "0")} · ${map[t] || t}`;
}

function getNewItemTemplate(secType: string, nextIdx: number): Record<string, unknown> {
  switch (secType) {
    case "leadership_profile":
      return {
        name: "Leadership Member",
        role: "Role / Title",
        initials: "LM",
        photoUrl: "",
        bio: "Short biography aligned with approved profile details.",
      };
    case "services_list":
      return {
        id: `service-${nextIdx}`,
        shortTitle: "Service Tab",
        name: "Service Title",
        service: "Summary of consulting scope.",
        problem: "Key identity problem addressed.",
        outcomes: "Clear expected business outcomes.",
        suitableFor: "Intended organisational teams.",
        technologyContext: "Target directories or platforms in scope.",
        image: "/brand/service-strategy.jpg",
        imageAlt: "Enterprise IAM consulting scene",
      };
    case "faqs_list":
      return {
        question: "Frequently asked question?",
        answer: "Clear concise answer for learners and organisations.",
      };
    case "learning_pathways":
      return {
        code: `pathway_${nextIdx}`,
        tier: "Stage Tier",
        name: "Pathway Name",
        audience: "Target learners",
        focus: "Key topics and practical scenario focus.",
      };
    case "principles_list":
      return {
        id: `principle_${nextIdx}`,
        title: "Guiding Principle",
        description: "How this principle informs client engagements.",
      };
    case "industries_sectors":
      return {
        id: `sector_${nextIdx}`,
        context: "Target Sector",
        sector: "Sector Name",
        focus: "Relevant identity governance and access focus.",
      };
    case "delivery_timeline":
      return {
        id: `stage_${nextIdx}`,
        title: `Stage ${nextIdx}`,
        detail: "Description of milestone deliverables and governance.",
        output: "Agreed Stage Output",
      };
    default:
      return {
        num: `0${nextIdx}`,
        title: "New Item Heading",
        description: "Concise item description",
      };
  }
}

const ITEM_FIELD_CONFIG: Array<{
  key: string;
  label: string;
  multiline?: boolean;
  isImage?: boolean;
}> = [
  { key: "badge", label: "Badge / Eyebrow Label" },
  { key: "code", label: "Code Identifier" },
  { key: "tier", label: "Tier Label" },
  { key: "shortTitle", label: "Tab / Short Label" },
  { key: "tabLabel", label: "Diagram Tab Label" },
  { key: "context", label: "Context Label" },
  { key: "sector", label: "Industry Sector" },
  { key: "name", label: "Name / Heading" },
  { key: "title", label: "Title" },
  { key: "label", label: "Card Label" },
  { key: "role", label: "Role / Title" },
  { key: "initials", label: "Monogram Initials" },
  { key: "audience", label: "Target Audience" },
  { key: "output", label: "Focus Output Label" },
  { key: "ctaLabel", label: "Button Label" },
  { key: "href", label: "Destination Link" },
  { key: "image", label: "Section Photograph", isImage: true },
  { key: "photoUrl", label: "Portrait Photograph (Optional)", isImage: true },
  { key: "imageAlt", label: "Image Alternative Text (Accessibility)" },
  { key: "summary", label: "Summary", multiline: true },
  { key: "description", label: "Description", multiline: true },
  { key: "detail", label: "Detail", multiline: true },
  { key: "desc", label: "Description", multiline: true },
  { key: "bio", label: "Executive Biography", multiline: true },
  { key: "focus", label: "Focus Areas / Description", multiline: true },
  { key: "service", label: "Service Scope", multiline: true },
  { key: "problem", label: "Problem Addressed", multiline: true },
  { key: "outcomes", label: "Expected Outcomes", multiline: true },
  { key: "suitableFor", label: "Suitable For", multiline: true },
  { key: "technologyContext", label: "Technology Context", multiline: true },
  { key: "friction", label: "Operational Challenge", multiline: true },
  { key: "resolution", label: "Architectural Resolution", multiline: true },
  { key: "question", label: "FAQ Question", multiline: true },
  { key: "answer", label: "FAQ Answer", multiline: true },
];

function normalizeSectionsValue(raw: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(raw)) {
    return raw.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
  }
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"));
      }
    } catch {
      return [];
    }
  }
  return [];
}

function SectionsVisualEditorInner({
  path,
  docSlug,
}: {
  path: string;
  docSlug: string;
}) {
  const { value = [], setValue } = useField<Array<Record<string, unknown>>>({ path });

  const slug = docSlug;
  const liveRoute = slug === "home" ? "/" : `/${slug}`;
  const sections = normalizeSectionsValue(value);

  const [activeTab, setActiveTab] = useState(0);
  const [mediaAssets, setMediaAssets] = useState<PickerAsset[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<{
    field: string;
    itemIdx?: number;
  }>({ field: "bgImage" });
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

  const updateArrayFieldItem = (
    secIdx: number,
    arrayKey: string,
    itemIdx: number,
    field: string,
    val: unknown
  ) => {
    const next = [...sections];
    const sec = next[secIdx] || {};
    const items = Array.isArray(sec[arrayKey]) ? [...(sec[arrayKey] as Array<Record<string, unknown>>)] : [];
    items[itemIdx] = { ...(items[itemIdx] || {}), [field]: val };
    next[secIdx] = { ...sec, [arrayKey]: items };
    setValue(next);
  };

  const addArrayFieldItem = (
    secIdx: number,
    arrayKey: string,
    itemTemplate: Record<string, unknown>
  ) => {
    const next = [...sections];
    const sec = next[secIdx] || {};
    const items = Array.isArray(sec[arrayKey]) ? [...(sec[arrayKey] as Array<Record<string, unknown>>)] : [];
    items.push(itemTemplate);
    next[secIdx] = { ...sec, [arrayKey]: items };
    setValue(next);
  };

  const removeArrayFieldItem = (
    secIdx: number,
    arrayKey: string,
    itemIdx: number
  ) => {
    const next = [...sections];
    const sec = next[secIdx] || {};
    const items = Array.isArray(sec[arrayKey]) ? [...(sec[arrayKey] as Array<Record<string, unknown>>)] : [];
    items.splice(itemIdx, 1);
    next[secIdx] = { ...sec, [arrayKey]: items };
    setValue(next);
  };

  const applyPickedUrl = (url: string) => {
    if (typeof pickerTarget.itemIdx === "number") {
      updateArrayFieldItem(
        safeActiveIdx,
        "items",
        pickerTarget.itemIdx,
        pickerTarget.field,
        url
      );
    } else {
      updateSection(safeActiveIdx, pickerTarget.field, url);
    }
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
        applyPickedUrl(data.asset.url);
        await loadMediaChoices();
        setShowMediaPicker(false);
      }
    } finally {
      setQuickUploadBusy(false);
    }
  };

  const openPicker = (fieldName = "bgImage", itemIdx?: number) => {
    setPickerTarget({ field: fieldName, itemIdx });
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
            Edit headlines, copy, service cards, pathways, FAQs, and imagery below, then click Save at the top.
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
                padding: "11px 14px",
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
              {getSectionTitle(currentSec, safeActiveIdx)}
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

            {"headline" in currentSec || "title" in currentSec || currentSec.type !== "identity_fabric" ? (
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
                      currentSec.type === "challenges_ledger" && !("headline" in currentSec)
                        ? "title"
                        : "headline",
                      e.target.value
                    )
                  }
                  style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: 600, boxSizing: "border-box" }}
                />
              </div>
            ) : null}

            {"subheadline" in currentSec || "subtitle" in currentSec ? (
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
                      currentSec.type === "challenges_ledger" && !("subheadline" in currentSec)
                        ? "subtitle"
                        : "subheadline",
                      e.target.value
                    )
                  }
                  style={{ width: "100%", padding: "10px 12px", borderRadius: "6px", border: "1px solid #CBD5E1", fontSize: "13px", lineHeight: 1.6, boxSizing: "border-box" }}
                />
              </div>
            ) : null}

            {("body" in currentSec || currentSec.type === "advisory_editorial" || currentSec.type === "editorial_feature") && (
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
            )}

            {/* Mission / Vision / Engagement Approach extra fields on About */}
            {currentSec.type === "mission_vision" && (
              <div className="iam-form-grid-2" style={{ gap: "12px", backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", padding: "14px", borderRadius: "6px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Vision Heading
                  </label>
                  <input
                    type="text"
                    value={String(currentSec.visionLabel || "Our Vision")}
                    onChange={(e) => updateSection(safeActiveIdx, "visionLabel", e.target.value)}
                    style={{ width: "100%", height: "36px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                  />
                  <textarea
                    rows={3}
                    value={String(currentSec.visionBody || "")}
                    onChange={(e) => updateSection(safeActiveIdx, "visionBody", e.target.value)}
                    style={{ marginTop: "8px", width: "100%", padding: "8px 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Engagement Approach Heading
                  </label>
                  <input
                    type="text"
                    value={String(currentSec.approachLabel || "Our Approach to Engagement")}
                    onChange={(e) => updateSection(safeActiveIdx, "approachLabel", e.target.value)}
                    style={{ width: "100%", height: "36px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                  />
                  <textarea
                    rows={3}
                    value={String(currentSec.approachBody || "")}
                    onChange={(e) => updateSection(safeActiveIdx, "approachBody", e.target.value)}
                    style={{ marginTop: "8px", width: "100%", padding: "8px 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", boxSizing: "border-box" }}
                  />
                </div>
              </div>
            )}

            {/* Background Image Picker Card */}
            {("bgImage" in currentSec ||
              currentSec.type === "hero" ||
              currentSec.type === "advisory_editorial" ||
              currentSec.type === "workforce_capabilities" ||
              currentSec.type === "academy_feature" ||
              currentSec.type === "mission_vision" ||
              currentSec.type === "learning_formats" ||
              currentSec.type === "closing_cta" ||
              currentSec.type === "editorial_feature") && (
              <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "220px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#0B1424", textTransform: "uppercase", marginBottom: "6px" }}>
                      Section Photography / Background Image
                    </label>
                    <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748B" }}>
                      Selected image: <strong>{String(currentSec.bgImage || "/brand/hero-enterprise.jpg").split("/").pop()}</strong>
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

            {/* Secondary Image Picker for Academy Feature Split */}
            {"secondaryImage" in currentSec && (
              <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "220px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#0B1424", textTransform: "uppercase", marginBottom: "6px" }}>
                      Feature Showcase Image
                    </label>
                    <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#64748B" }}>
                      Selected image: <strong>{String(currentSec.secondaryImage || "/brand/iam-academy-hero.jpg").split("/").pop()}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => openPicker("secondaryImage")}
                      style={{ backgroundColor: "#0B1424", color: "#FFFFFF", border: "none", borderRadius: "6px", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}
                    >
                      Swap Showcase Photo
                    </button>
                  </div>
                  <div style={{ width: "200px", height: "112px", borderRadius: "6px", overflow: "hidden", border: "1px solid #CBD5E1", backgroundColor: "#0B1424" }}>
                    <img src={String(currentSec.secondaryImage || "/brand/iam-academy-hero.jpg")} alt="Feature showcase preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Primary & Secondary Call-To-Actions */}
            {("ctaPrimary" in currentSec ||
              "ctaSecondary" in currentSec ||
              currentSec.type === "hero" ||
              currentSec.type === "closing_cta" ||
              currentSec.type === "editorial_feature") && (
              <div className="iam-form-grid-2" style={{ gap: "14px" }}>
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

                {(currentSec.type === "hero" || "ctaSecondary" in currentSec) && (
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

            {/* Hero Carousel Cards Visual Editor */}
            {Array.isArray(currentSec.carouselItems) && (
              <div style={{ marginTop: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#0B1424" }}>
                    Hero Carousel Cards ({currentSec.carouselItems.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      addArrayFieldItem(safeActiveIdx, "carouselItems", {
                        id: `card-${(currentSec.carouselItems as unknown[]).length + 1}`,
                        label: "New Practice Area",
                        summary: "Concise description shown on hero carousel card.",
                        href: "/services",
                      })
                    }
                    style={{ backgroundColor: "#0B1424", color: "#FFFFFF", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                  >
                    + Add Carousel Card
                  </button>
                </div>

                <div className="iam-form-grid-2" style={{ gap: "10px" }}>
                  {(currentSec.carouselItems as Array<Record<string, unknown>>).map((card, cIdx) => (
                    <div key={cIdx} style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#B07424" }}>
                          CARD 0{cIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeArrayFieldItem(safeActiveIdx, "carouselItems", cIdx)}
                          style={{ background: "none", border: "none", color: "#991B1B", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                        >
                          Remove
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Card Title"
                        value={String(card.label || "")}
                        onChange={(e) => updateArrayFieldItem(safeActiveIdx, "carouselItems", cIdx, "label", e.target.value)}
                        style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", fontWeight: 600, marginBottom: "6px", boxSizing: "border-box" }}
                      />
                      <textarea
                        rows={2}
                        placeholder="Card Summary"
                        value={String(card.summary || "")}
                        onChange={(e) => updateArrayFieldItem(safeActiveIdx, "carouselItems", cIdx, "summary", e.target.value)}
                        style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "11px", marginBottom: "6px", boxSizing: "border-box" }}
                      />
                      <input
                        type="text"
                        placeholder="Destination Link (e.g. /services#strategy)"
                        value={String(card.href || "")}
                        onChange={(e) => updateArrayFieldItem(safeActiveIdx, "carouselItems", cIdx, "href", e.target.value)}
                        style={{ width: "100%", height: "30px", padding: "0 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "11px", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Structured Section Items (Universal Visual Editor for Services, Pathways, Leaders, FAQs, Challenges, Pillars, Fabric, etc.) */}
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
                      addArrayFieldItem(
                        safeActiveIdx,
                        "items",
                        getNewItemTemplate(String(currentSec.type || ""), nextNum)
                      );
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

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {(currentSec.items as Array<Record<string, unknown>>).map((item, iIdx) => (
                    <div
                      key={iIdx}
                      style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "14px" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#B07424" }}>
                          ITEM {String(item.num || `0${iIdx + 1}`)} &middot;{" "}
                          {String(item.shortTitle || item.name || item.title || item.sector || item.question || "")}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeArrayFieldItem(safeActiveIdx, "items", iIdx)}
                          style={{ backgroundColor: "transparent", color: "#991B1B", border: "none", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                        >
                          Remove Item
                        </button>
                      </div>

                      <div className="iam-form-grid-2" style={{ gap: "10px" }}>
                        {ITEM_FIELD_CONFIG.filter((cfg) => cfg.key in item).map((cfg) => {
                          if (cfg.isImage) {
                            const imgVal = String(item[cfg.key] || "");
                            return (
                              <div key={cfg.key} style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "4px", padding: "10px" }}>
                                <div>
                                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>
                                    {cfg.label}
                                  </div>
                                  <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px", marginBottom: "6px" }}>
                                    <strong>{imgVal ? imgVal.split("/").pop() : "No photo selected"}</strong>
                                  </div>
                                  <div style={{ display: "flex", gap: "8px" }}>
                                    <button
                                      type="button"
                                      onClick={() => openPicker(cfg.key, iIdx)}
                                      style={{ backgroundColor: "#0B1424", color: "#FFFFFF", border: "none", borderRadius: "4px", padding: "6px 12px", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}
                                    >
                                      Select Photo
                                    </button>
                                    {imgVal && (
                                      <button
                                        type="button"
                                        onClick={() => updateArrayFieldItem(safeActiveIdx, "items", iIdx, cfg.key, "")}
                                        style={{ backgroundColor: "#F1F5F9", color: "#475569", border: "none", borderRadius: "4px", padding: "6px 10px", fontSize: "11px", cursor: "pointer" }}
                                      >
                                        Clear
                                      </button>
                                    )}
                                  </div>
                                </div>
                                {imgVal && (
                                  <img
                                    src={imgVal}
                                    alt="Item preview"
                                    style={{ width: "120px", height: "68px", objectFit: "cover", borderRadius: "4px", border: "1px solid #CBD5E1" }}
                                  />
                                )}
                              </div>
                            );
                          }

                          return (
                            <div
                              key={cfg.key}
                              style={cfg.multiline ? { gridColumn: "1 / -1" } : undefined}
                            >
                              <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                                {cfg.label}
                              </label>
                              {cfg.multiline ? (
                                <textarea
                                  rows={2}
                                  value={String(item[cfg.key] || "")}
                                  onChange={(e) =>
                                    updateArrayFieldItem(safeActiveIdx, "items", iIdx, cfg.key, e.target.value)
                                  }
                                  style={{ width: "100%", padding: "7px 9px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", lineHeight: 1.5, boxSizing: "border-box" }}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={String(item[cfg.key] || "")}
                                  onChange={(e) =>
                                    updateArrayFieldItem(safeActiveIdx, "items", iIdx, cfg.key, e.target.value)
                                  }
                                  style={{ width: "100%", height: "34px", padding: "0 9px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", boxSizing: "border-box" }}
                                />
                              )}
                            </div>
                          );
                        })}

                        {/* Identity Fabric Bullet List Editor */}
                        {"controls" in item && Array.isArray(item.controls) && (
                          <div style={{ gridColumn: "1 / -1" }}>
                            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                              Core Architectural Controls (One per line)
                            </label>
                            <textarea
                              rows={3}
                              value={(item.controls as unknown[]).map((c) => String(c)).join("\n")}
                              onChange={(e) =>
                                updateArrayFieldItem(
                                  safeActiveIdx,
                                  "items",
                                  iIdx,
                                  "controls",
                                  e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
                                )
                              }
                              style={{ width: "100%", padding: "7px 9px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", lineHeight: 1.5, boxSizing: "border-box" }}
                            />
                          </div>
                        )}
                      </div>
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
                      applyPickedUrl(asset.url);
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

export function SectionsVisualEditor({ path }: { path: string }) {
  const { initialData, id: docId } = useDocumentInfo();
  const docSlug = String(initialData?.slug || "home");
  return (
    <AdminComponentErrorBoundary componentName="Website Pages Visual Editor">
      <SectionsVisualEditorInner
        key={`${String(docId ?? "new")}-${docSlug}`}
        path={path}
        docSlug={docSlug}
      />
    </AdminComponentErrorBoundary>
  );
}

export default SectionsVisualEditor;
