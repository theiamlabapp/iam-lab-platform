"use client";

import React from "react";
import { useField } from "@payloadcms/ui";

export interface VisualNavItem {
  label: string;
  href: string;
  visible?: boolean;
}

const DEFAULT_NAV: VisualNavItem[] = [
  { label: "Home", href: "/", visible: true },
  { label: "About", href: "/about", visible: true },
  { label: "Services & Solutions", href: "/services", visible: true },
  { label: "IAM Academy", href: "/academy", visible: true },
  { label: "Contact", href: "/contact", visible: true },
];

const STANDARD_DESTINATIONS = [
  { label: "Home Page (/)", value: "/" },
  { label: "About Us (/about)", value: "/about" },
  { label: "Services & Solutions (/services)", value: "/services" },
  { label: "IAM Academy (/academy)", value: "/academy" },
  { label: "Contact & Consultation (/contact)", value: "/contact" },
  { label: "Business Consultation Form (/contact?type=enterprise_consulting#contact-form)", value: "/contact?type=enterprise_consulting#contact-form" },
  { label: "Selar Bookstore (External)", value: "https://selar.com/m/chiemezie-uzoma1" },
];

function isValidDestination(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  return trimmed.startsWith("/") || trimmed.startsWith("https://") || trimmed.startsWith("http://");
}

export function NavLinksVisualEditor({ path }: { path: string }) {
  const { value, setValue } = useField<VisualNavItem[]>({ path });

  const items: VisualNavItem[] =
    Array.isArray(value) && value.length > 0
      ? value.map((v) => ({
          label: String(v?.label ?? ""),
          href: String(v?.href ?? "/"),
          visible: v?.visible !== false,
        }))
      : DEFAULT_NAV;

  const commit = (next: VisualNavItem[]) => {
    setValue(next);
  };

  const updateItem = (idx: number, patch: Partial<VisualNavItem>) => {
    const next = items.map((item, i) => (i === idx ? { ...item, ...patch } : item));
    commit(next);
  };

  const moveItem = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(idx, 1);
    next.splice(target, 0, moved);
    commit(next);
  };

  const removeItem = (idx: number) => {
    if (items.length <= 1) return;
    const next = items.filter((_, i) => i !== idx);
    commit(next);
  };

  const addItem = () => {
    commit([...items, { label: "New Menu Link", href: "/services", visible: true }]);
  };

  const visibleItems = items.filter(
    (item) => item.visible !== false && item.label.trim().length > 0 && isValidDestination(item.href)
  );

  return (
    <div
      style={{
        marginTop: "8px",
        marginBottom: "20px",
        border: "1px solid #CBD5E1",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      {/* Visual Editor Header */}
      <div
        style={{
          backgroundColor: "#0B1424",
          color: "#FFFFFF",
          padding: "14px 18px",
          borderBottom: "2px solid #D89A43",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#FFFFFF" }}>
            Header &amp; Footer Navigation Menu ({items.length} Items)
          </h4>
          <p style={{ margin: "3px 0 0 0", fontSize: "12px", color: "#94A3B8" }}>
            Add, rename, reorder, or temporarily hide navigation items visually.
          </p>
        </div>

        <button
          type="button"
          onClick={addItem}
          style={{
            backgroundColor: "#D89A43",
            color: "#0B1424",
            border: "none",
            borderRadius: "6px",
            padding: "7px 14px",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          + Add Menu Item
        </button>
      </div>

      {/* Live Navigation Preview Strip */}
      <div
        style={{
          padding: "12px 18px",
          backgroundColor: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Live Menu Preview:
        </span>
        {visibleItems.length > 0 ? (
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {visibleItems.map((nav, i) => (
              <span
                key={`${nav.href}-${i}`}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#0B1424",
                  borderBottom: i === 0 ? "2px solid #D89A43" : "2px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {nav.label}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: "12px", color: "#991B1B" }}>
            No visible valid menu items configured.
          </span>
        )}
      </div>

      {/* Repeater Rows */}
      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.map((item, idx) => {
          const isStandard = STANDARD_DESTINATIONS.some((d) => d.value === item.href);
          const emptyLabel = item.label.trim().length === 0;
          const badUrl = !isValidDestination(item.href);

          return (
            <div
              key={idx}
              style={{
                border: emptyLabel || badUrl ? "1px solid #FECACA" : "1px solid #E2E8F0",
                borderRadius: "6px",
                padding: "14px",
                backgroundColor: item.visible === false ? "#F8FAFC" : "#FFFFFF",
                opacity: item.visible === false ? 0.72 : 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#B07424" }}>
                  POSITION {idx + 1}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#334155", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={item.visible !== false}
                      onChange={(e) => updateItem(idx, { visible: e.target.checked })}
                    />
                    <span>Show in Menu</span>
                  </label>

                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveItem(idx, -1)}
                    style={{
                      padding: "4px 9px",
                      fontSize: "11px",
                      fontWeight: 600,
                      borderRadius: "4px",
                      border: "1px solid #CBD5E1",
                      backgroundColor: "#F8FAFC",
                      cursor: idx === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    &uarr; Up
                  </button>

                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() => moveItem(idx, 1)}
                    style={{
                      padding: "4px 9px",
                      fontSize: "11px",
                      fontWeight: 600,
                      borderRadius: "4px",
                      border: "1px solid #CBD5E1",
                      backgroundColor: "#F8FAFC",
                      cursor: idx === items.length - 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    &darr; Down
                  </button>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      style={{
                        padding: "4px 9px",
                        fontSize: "11px",
                        fontWeight: 600,
                        borderRadius: "4px",
                        border: "1px solid #FECACA",
                        backgroundColor: "#FEF2F2",
                        color: "#991B1B",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Menu Label *
                  </label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateItem(idx, { label: e.target.value })}
                    placeholder="e.g. Services & Solutions"
                    style={{
                      width: "100%",
                      height: "36px",
                      padding: "0 10px",
                      borderRadius: "4px",
                      border: emptyLabel ? "1px solid #EF4444" : "1px solid #CBD5E1",
                      fontSize: "13px",
                      boxSizing: "border-box",
                    }}
                  />
                  {emptyLabel && (
                    <span style={{ fontSize: "11px", color: "#991B1B" }}>
                      Menu label cannot be empty.
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                    Destination Page
                  </label>
                  <select
                    value={isStandard ? item.href : "__custom__"}
                    onChange={(e) => {
                      if (e.target.value !== "__custom__") {
                        updateItem(idx, { href: e.target.value });
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "36px",
                      padding: "0 8px",
                      borderRadius: "4px",
                      border: "1px solid #CBD5E1",
                      fontSize: "12px",
                      backgroundColor: "#FFFFFF",
                      marginBottom: "6px",
                    }}
                  >
                    {STANDARD_DESTINATIONS.map((dest) => (
                      <option key={dest.value} value={dest.value}>
                        {dest.label}
                      </option>
                    ))}
                    <option value="__custom__">Custom URL / Route...</option>
                  </select>

                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => updateItem(idx, { href: e.target.value })}
                    placeholder="/services or https://..."
                    style={{
                      width: "100%",
                      height: "32px",
                      padding: "0 10px",
                      borderRadius: "4px",
                      border: badUrl ? "1px solid #EF4444" : "1px solid #CBD5E1",
                      fontSize: "12px",
                      boxSizing: "border-box",
                    }}
                  />
                  {badUrl && (
                    <span style={{ fontSize: "11px", color: "#991B1B" }}>
                      Destination must start with / or https://
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NavLinksVisualEditor;
