"use client";

import React, { useState } from "react";
import { useField, useDocumentInfo } from "@payloadcms/ui";

const BRAND_IMAGE_OPTIONS = [
  { label: "Executive Boardroom (/brand/hero-enterprise.jpg)", value: "/brand/hero-enterprise.jpg" },
  { label: "Corporate Team Collaboration (/brand/team-collaboration.jpg)", value: "/brand/team-collaboration.jpg" },
  { label: "Cyber Command Center (/brand/cyber-command.jpg)", value: "/brand/cyber-command.jpg" },
  { label: "Security Infrastructure (/brand/security-infrastructure.jpg)", value: "/brand/security-infrastructure.jpg" },
  { label: "Academy Classroom (/brand/academy-classroom.jpg)", value: "/brand/academy-classroom.jpg" },
  { label: "Enterprise Security Architecture (/brand/enterprise-security.jpg)", value: "/brand/enterprise-security.jpg" },
  { label: "Corporate Headquarters (/brand/office-architecture.jpg)", value: "/brand/office-architecture.jpg" },
  { label: "Global Cyber Network (/brand/cyber-network.jpg)", value: "/brand/cyber-network.jpg" },
  { label: "Corporate Hero Banner (/brand/corporate-hero.jpg)", value: "/brand/corporate-hero.jpg" },
];

export function SectionsVisualEditor({ path }: { path: string }) {
  const { value = [], setValue } = useField<any[]>({ path });
  const { initialData } = useDocumentInfo();

  const slug = (initialData?.slug as string) || "home";
  const sections: any[] = Array.isArray(value) ? value : [];

  const [activeTab, setActiveTab] = useState<number>(0);

  const updateSection = (sectionIndex: number, field: string, val: any) => {
    const updated = [...sections];
    if (!updated[sectionIndex]) {
      updated[sectionIndex] = {};
    }
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      [field]: val,
    };
    setValue(updated);
  };

  const updateNestedCta = (
    sectionIndex: number,
    ctaKey: "ctaPrimary" | "ctaSecondary",
    field: "label" | "href",
    val: string
  ) => {
    const updated = [...sections];
    const sec = updated[sectionIndex] || {};
    const cta = sec[ctaKey] || {};
    updated[sectionIndex] = {
      ...sec,
      [ctaKey]: {
        ...cta,
        [field]: val,
      },
    };
    setValue(updated);
  };

  const updateItem = (sectionIndex: number, itemIndex: number, field: string, val: any) => {
    const updated = [...sections];
    const sec = updated[sectionIndex] || {};
    const items = [...(sec.items || [])];
    items[itemIndex] = {
      ...items[itemIndex],
      [field]: val,
    };
    updated[sectionIndex] = {
      ...sec,
      items,
    };
    setValue(updated);
  };

  const addItem = (sectionIndex: number, defaultItem: any) => {
    const updated = [...sections];
    const sec = updated[sectionIndex] || {};
    const items = [...(sec.items || []), defaultItem];
    updated[sectionIndex] = {
      ...sec,
      items,
    };
    setValue(updated);
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...sections];
    const sec = updated[sectionIndex] || {};
    const items = [...(sec.items || [])];
    items.splice(itemIndex, 1);
    updated[sectionIndex] = {
      ...sec,
      items,
    };
    setValue(updated);
  };

  if (sections.length === 0) {
    return (
      <div
        style={{
          padding: "24px",
          backgroundColor: "#F8FAFC",
          border: "1px dashed #CBD5E1",
          borderRadius: "8px",
          textAlign: "center",
          color: "#64748B",
        }}
      >
        <p style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: 600 }}>
          No structured sections currently configured for this page.
        </p>
        <button
          type="button"
          onClick={() => {
            setValue([
              {
                type: "hero",
                badge: "Enterprise Identity & Access Management",
                headline: initialData?.hero_headline || "Secure identities. Simplify access. Strengthen your business.",
                subheadline:
                  initialData?.hero_subheadline ||
                  "Independent Identity and Access Management advisory for high-assurance enterprises.",
                bgImage: "/brand/hero-enterprise.jpg",
                ctaPrimary: { label: "Request Consultation", href: "/contact?type=enterprise_consulting" },
                ctaSecondary: { label: "Explore IAM Academy", href: "/academy" },
              },
            ]);
          }}
          style={{
            backgroundColor: "#0B1424",
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            border: "none",
          }}
        >
          Initialize Section Editor
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "16px",
        marginBottom: "24px",
        borderRadius: "8px",
        border: "1px solid #CBD5E1",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* Editor Header */}
      <div
        style={{
          backgroundColor: "#0B1424",
          color: "#FFFFFF",
          padding: "16px 20px",
          borderBottom: "2px solid #D89A43",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#D89A43",
                display: "inline-block",
              }}
            />
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Visual Page Section Editor &middot; {slug.toUpperCase()}
            </h3>
          </div>
          <p
            style={{
              margin: "4px 0 0 16px",
              fontSize: "12px",
              color: "#94A3B8",
            }}
          >
            Client-friendly content management. Edit headings, copy, images, and CTAs visually with live previews.
          </p>
        </div>

        <span
          style={{
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 700,
            backgroundColor: "#14243B",
            color: "#D89A43",
            border: "1px solid rgba(216, 154, 67, 0.3)",
          }}
        >
          {sections.length} Active Sections
        </span>
      </div>

      {/* Section Navigation Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #E2E8F0",
          backgroundColor: "#F8FAFC",
          overflowX: "auto",
        }}
      >
        {sections.map((sec, idx) => {
          const isActive = activeTab === idx;
          const sectionLabel =
            sec.type === "hero"
              ? "01 // Hero Header"
              : sec.type === "challenges_ledger"
              ? "02 // Challenges Ledger"
              : sec.type === "services_list"
              ? "03 // Services"
              : sec.type === "leadership_profile"
              ? "04 // Leadership"
              : `Section ${idx + 1} (${sec.type || "Custom"})`;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              style={{
                padding: "12px 18px",
                fontSize: "12px",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#0B1424" : "#64748B",
                backgroundColor: isActive ? "#FFFFFF" : "transparent",
                border: "none",
                borderBottom: isActive ? "2px solid #D89A43" : "2px solid transparent",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              {sectionLabel}
            </button>
          );
        })}
      </div>

      {/* Active Section Content Panel */}
      <div style={{ padding: "24px" }}>
        {sections[activeTab] && (
          <div>
            {/* HERO SECTION VIEW */}
            {sections[activeTab].type === "hero" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Introductory Badge / Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={sections[activeTab].badge || ""}
                    onChange={(e) => updateSection(activeTab, "badge", e.target.value)}
                    placeholder="e.g. Enterprise Identity & Access Management"
                    style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={sections[activeTab].headline || ""}
                    onChange={(e) => updateSection(activeTab, "headline", e.target.value)}
                    placeholder="e.g. Secure identities. Simplify access. Strengthen your business."
                    style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px", fontWeight: 600 }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Supporting Subheadline / Description
                  </label>
                  <textarea
                    rows={3}
                    value={sections[activeTab].subheadline || ""}
                    onChange={(e) => updateSection(activeTab, "subheadline", e.target.value)}
                    placeholder="Executive description of The IAM Lab's core value proposition..."
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px", lineHeight: 1.6 }}
                  />
                </div>

                {/* Background Image Selection & Live Preview */}
                <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "16px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#0B1424", textTransform: "uppercase", marginBottom: "8px" }}>
                    Background Photograph Selection &amp; Preview
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: "16px", alignItems: "center" }}>
                    <div>
                      <select
                        value={sections[activeTab].bgImage || "/brand/hero-enterprise.jpg"}
                        onChange={(e) => updateSection(activeTab, "bgImage", e.target.value)}
                        style={{ width: "100%", height: "38px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px", backgroundColor: "#FFFFFF" }}
                      >
                        {BRAND_IMAGE_OPTIONS.map((img) => (
                          <option key={img.value} value={img.value}>
                            {img.label}
                          </option>
                        ))}
                      </select>
                      <p style={{ margin: "6px 0 0 0", fontSize: "11px", color: "#64748B" }}>
                        Selected asset: <code style={{ color: "#0B1424", fontWeight: 600 }}>{sections[activeTab].bgImage || "/brand/hero-enterprise.jpg"}</code>
                      </p>
                    </div>

                    <div style={{ height: "100px", borderRadius: "6px", overflow: "hidden", border: "1px solid #CBD5E1", position: "relative", backgroundColor: "#0B1424" }}>
                      <img
                        src={sections[activeTab].bgImage || "/brand/hero-enterprise.jpg"}
                        alt="Background Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Call-to-Action Controls */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "14px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#D89A43", textTransform: "uppercase" }}>Primary Button</span>
                    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Button Label"
                        value={sections[activeTab].ctaPrimary?.label || ""}
                        onChange={(e) => updateNestedCta(activeTab, "ctaPrimary", "label", e.target.value)}
                        style={{ height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                      />
                      <input
                        type="text"
                        placeholder="Destination Link"
                        value={sections[activeTab].ctaPrimary?.href || ""}
                        onChange={(e) => updateNestedCta(activeTab, "ctaPrimary", "href", e.target.value)}
                        style={{ height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                      />
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "6px", padding: "14px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Secondary Button</span>
                    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Button Label"
                        value={sections[activeTab].ctaSecondary?.label || ""}
                        onChange={(e) => updateNestedCta(activeTab, "ctaSecondary", "label", e.target.value)}
                        style={{ height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                      />
                      <input
                        type="text"
                        placeholder="Destination Link"
                        value={sections[activeTab].ctaSecondary?.href || ""}
                        onChange={(e) => updateNestedCta(activeTab, "ctaSecondary", "href", e.target.value)}
                        style={{ height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CHALLENGES LEDGER VIEW */}
            {sections[activeTab].type === "challenges_ledger" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={sections[activeTab].title || ""}
                      onChange={(e) => updateSection(activeTab, "title", e.target.value)}
                      style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Section Badge
                    </label>
                    <input
                      type="text"
                      value={sections[activeTab].badge || ""}
                      onChange={(e) => updateSection(activeTab, "badge", e.target.value)}
                      style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Supporting Description
                  </label>
                  <textarea
                    rows={2}
                    value={sections[activeTab].subtitle || ""}
                    onChange={(e) => updateSection(activeTab, "subtitle", e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                  />
                </div>

                {/* Repeatable Challenge Cards */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#0B1424" }}>
                      Enterprise Challenge Pillars ({(sections[activeTab].items || []).length})
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        addItem(activeTab, {
                          num: `0${(sections[activeTab].items || []).length + 1}`,
                          title: "New Challenge Pillar",
                          context: "Contextual risk description",
                          friction: "Friction and vulnerability details",
                          resolution: "Architectural resolution approach",
                        })
                      }
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
                      + Add Challenge Item
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {(sections[activeTab].items || []).map((item: any, itemIdx: number) => (
                      <div
                        key={itemIdx}
                        style={{
                          backgroundColor: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                          borderRadius: "6px",
                          padding: "16px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                          <span style={{ fontSize: "12px", fontWeight: 700, color: "#D89A43" }}>
                            PILLAR {item.num || `0${itemIdx + 1}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(activeTab, itemIdx)}
                            style={{
                              backgroundColor: "transparent",
                              color: "#EF4444",
                              border: "none",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "10px", marginBottom: "10px" }}>
                          <input
                            type="text"
                            placeholder="01"
                            value={item.num || ""}
                            onChange={(e) => updateItem(activeTab, itemIdx, "num", e.target.value)}
                            style={{ height: "34px", padding: "0 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", fontWeight: 700 }}
                          />
                          <input
                            type="text"
                            placeholder="Challenge Title"
                            value={item.title || ""}
                            onChange={(e) => updateItem(activeTab, itemIdx, "title", e.target.value)}
                            style={{ height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", fontWeight: 600 }}
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: "2px" }}>
                              Operational Friction
                            </label>
                            <textarea
                              rows={2}
                              value={item.friction || ""}
                              onChange={(e) => updateItem(activeTab, itemIdx, "friction", e.target.value)}
                              style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "11px" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", marginBottom: "2px" }}>
                              Architectural Resolution
                            </label>
                            <textarea
                              rows={2}
                              value={item.resolution || ""}
                              onChange={(e) => updateItem(activeTab, itemIdx, "resolution", e.target.value)}
                              style={{ width: "100%", padding: "6px 8px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "11px" }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SERVICES LIST VIEW */}
            {sections[activeTab].type === "services_list" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={sections[activeTab].title || ""}
                    onChange={(e) => updateSection(activeTab, "title", e.target.value)}
                    style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#0B1424" }}>
                      Service Pillars ({(sections[activeTab].items || []).length})
                    </h4>
                    <button
                      type="button"
                      onClick={() =>
                        addItem(activeTab, {
                          num: `0${(sections[activeTab].items || []).length + 1}`,
                          title: "New Service Capability",
                          desc: "Service scope and enterprise deliverables.",
                        })
                      }
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
                      + Add Service
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {(sections[activeTab].items || []).map((srv: any, srvIdx: number) => (
                      <div
                        key={srvIdx}
                        style={{
                          backgroundColor: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                          borderRadius: "6px",
                          padding: "14px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#D89A43" }}>
                            SERVICE {srv.num || `0${srvIdx + 1}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(activeTab, srvIdx)}
                            style={{ backgroundColor: "transparent", color: "#EF4444", border: "none", fontSize: "11px", cursor: "pointer" }}
                          >
                            Delete
                          </button>
                        </div>
                        <input
                          type="text"
                          value={srv.title || ""}
                          onChange={(e) => updateItem(activeTab, srvIdx, "title", e.target.value)}
                          placeholder="Service Title"
                          style={{ width: "100%", height: "34px", padding: "0 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px", fontWeight: 600, marginBottom: "8px" }}
                        />
                        <textarea
                          rows={2}
                          value={srv.desc || ""}
                          onChange={(e) => updateItem(activeTab, srvIdx, "desc", e.target.value)}
                          placeholder="Service Description and Scope"
                          style={{ width: "100%", padding: "6px 10px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "12px" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LEADERSHIP / ABOUT PROFILE VIEW */}
            {sections[activeTab].type === "leadership_profile" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Leader Name
                    </label>
                    <input
                      type="text"
                      value={sections[activeTab].name || ""}
                      onChange={(e) => updateSection(activeTab, "name", e.target.value)}
                      style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={sections[activeTab].role || ""}
                      onChange={(e) => updateSection(activeTab, "role", e.target.value)}
                      style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Executive Biography
                  </label>
                  <textarea
                    rows={4}
                    value={sections[activeTab].bio || ""}
                    onChange={(e) => updateSection(activeTab, "bio", e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px", lineHeight: 1.6 }}
                  />
                </div>
              </div>
            )}

            {/* GENERIC / CUSTOM SECTION FALLBACK */}
            {sections[activeTab].type !== "hero" &&
              sections[activeTab].type !== "challenges_ledger" &&
              sections[activeTab].type !== "services_list" &&
              sections[activeTab].type !== "leadership_profile" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={sections[activeTab].headline || sections[activeTab].title || ""}
                      onChange={(e) => updateSection(activeTab, "headline", e.target.value)}
                      style={{ width: "100%", height: "38px", padding: "0 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Supporting Content
                    </label>
                    <textarea
                      rows={4}
                      value={sections[activeTab].subheadline || sections[activeTab].desc || ""}
                      onChange={(e) => updateSection(activeTab, "subheadline", e.target.value)}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "4px", border: "1px solid #CBD5E1", fontSize: "13px" }}
                    />
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SectionsVisualEditor;
