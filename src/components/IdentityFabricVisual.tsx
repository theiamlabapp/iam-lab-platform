"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  Network,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

interface FabricDomain {
  id: string;
  code: string;
  tabLabel: string;
  title: string;
  summary: string;
  controls: string[];
  cx: number;
  cy: number;
  Icon: LucideIcon;
}

const FABRIC_DOMAINS: FabricDomain[] = [
  {
    id: "directory",
    code: "SRC",
    tabLabel: "Authoritative Identity",
    title: "Authoritative Identity Core",
    summary:
      "HR sources and enterprise directories aligned into a consistent identity lifecycle, reducing manual joiner-mover-leaver bottlenecks.",
    controls: [
      "HR & Directory Synchronisation",
      "Automated Joiner-Mover-Leaver Flows",
      "SCIM & Connector Provisioning",
    ],
    cx: 155,
    cy: 175,
    Icon: Workflow,
  },
  {
    id: "governance",
    code: "IGA",
    tabLabel: "Identity Governance",
    title: "Identity Governance & Access Control",
    summary:
      "Structured access requests, approvals, recertification campaigns, role design, and oversight across applications.",
    controls: [
      "Access Request & Approval Workflows",
      "Periodic Access Recertification",
      "Role Design & Least-Privilege Oversight",
    ],
    cx: 410,
    cy: 85,
    Icon: Users,
  },
  {
    id: "privilege",
    code: "PAM",
    tabLabel: "Privileged Access",
    title: "Privileged Access Management",
    summary:
      "Controlled privileged workflows, administrative role elevation, and accountable governance protecting sensitive systems.",
    controls: [
      "Privileged Access Controls",
      "Controlled Role Elevation Workflows",
      "Administrative Accountability & Review",
    ],
    cx: 410,
    cy: 265,
    Icon: KeyRound,
  },
  {
    id: "cloud",
    code: "SSO",
    tabLabel: "Authentication",
    title: "Authentication & Access Modernisation",
    summary:
      "Consistent SSO, MFA, conditional access, and application onboarding strengthening how users authenticate.",
    controls: [
      "Single Sign-On (SAML / OIDC)",
      "Multi-Factor & Conditional Access",
      "Application Access Modernisation",
    ],
    cx: 665,
    cy: 175,
    Icon: LockKeyhole,
  },
];

const CONNECTIONS = [
  { id: "c1", d: "M 155 175 Q 282 95 410 85" },
  { id: "c2", d: "M 155 175 Q 282 255 410 265" },
  { id: "c3", d: "M 410 85 L 410 265" },
  { id: "c4", d: "M 410 85 Q 538 95 665 175" },
  { id: "c5", d: "M 410 265 Q 538 255 665 175" },
];

/**
 * Connected Identity Decision Fabric Diagram
 * Enlarged topology SVG, removed extraneous hint text, single horizontal desktop tab bar.
 */
export function IdentityFabricVisual({
  cmsDomains,
}: {
  cmsDomains?: Array<Record<string, unknown>>;
} = {}) {
  const [selectedId, setSelectedId] = useState<string>("governance");
  const shouldReduceMotion = useReducedMotion();

  const resolvedDomains: FabricDomain[] =
    Array.isArray(cmsDomains) && cmsDomains.length > 0
      ? FABRIC_DOMAINS.map((fallback, idx) => {
          const override = cmsDomains[idx];
          if (!override) return fallback;
          const rawControls = override.controls;
          const controls = Array.isArray(rawControls)
            ? rawControls.map((c) => String(c))
            : typeof rawControls === "string" && rawControls.trim()
            ? rawControls
                .split(/[\n,]/)
                .map((s) => s.trim())
                .filter(Boolean)
            : fallback.controls;
          return {
            ...fallback,
            tabLabel: String(override.tabLabel || override.shortTitle || fallback.tabLabel),
            title: String(override.title || override.name || fallback.title),
            summary: String(override.summary || override.description || fallback.summary),
            controls,
          };
        })
      : FABRIC_DOMAINS;

  const activeDomain =
    resolvedDomains.find((d) => d.id === selectedId) || resolvedDomains[1] || resolvedDomains[0];
  const ActiveIcon = activeDomain.Icon;

  return (
    <div className="relative overflow-hidden border border-white/15 bg-[#08101E]">
      {/* Subtle architectural meridian backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(216,154,67,0.16), transparent 62%), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
        {/* Top/Left: Enlarged Interactive SVG Constellation */}
        <div className="relative border-b border-white/10 p-5 sm:p-8 lg:col-span-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2.5">
            <Network className="h-4.5 w-4.5 text-[#D89A43]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] text-[#D89A43] uppercase">
              Connected Identity Decision Fabric
            </span>
          </div>

          <div className="relative mt-4 w-full min-h-[260px] sm:min-h-[340px] lg:min-h-[370px]">
            <svg
              viewBox="0 0 820 350"
              preserveAspectRatio="xMidYMid meet"
              className="h-full w-full min-h-[260px] sm:min-h-[340px] lg:min-h-[370px]"
              role="img"
              aria-label="Interactive Identity Control Architecture Topology"
            >
              <defs>
                <linearGradient id="fabricGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D89A43" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#D89A43" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Rotating Subtle Meridian Ring */}
              <motion.g
                style={{ originX: "410px", originY: "175px" }}
                animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="410"
                  cy="175"
                  r="142"
                  fill="none"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1.2"
                  strokeDasharray="6 8"
                />
                <ellipse
                  cx="410"
                  cy="175"
                  rx="142"
                  ry="54"
                  fill="none"
                  stroke="rgba(216,154,67,0.14)"
                  strokeWidth="1.2"
                />
              </motion.g>

              {/* Secondary Counter-Rotating Orbit */}
              <motion.g
                style={{ originX: "410px", originY: "175px" }}
                animate={shouldReduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
              >
                <ellipse
                  cx="410"
                  cy="175"
                  rx="104"
                  ry="142"
                  fill="none"
                  stroke="rgba(96,165,250,0.09)"
                  strokeWidth="1.2"
                  strokeDasharray="3 6"
                />
              </motion.g>

              {/* Connection Arcs + Traveling Signal Pulse */}
              {CONNECTIONS.map((conn, idx) => (
                <g key={conn.id}>
                  <path
                    d={conn.d}
                    fill="none"
                    stroke="url(#fabricGold)"
                    strokeWidth="2"
                  />
                  {!shouldReduceMotion && (
                    <motion.path
                      d={conn.d}
                      fill="none"
                      stroke="#D89A43"
                      strokeWidth="2.5"
                      strokeDasharray="12 140"
                      initial={{ strokeDashoffset: 152 }}
                      animate={{ strokeDashoffset: -152 }}
                      transition={{
                        duration: 3.4,
                        delay: idx * 0.45,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </g>
              ))}

              {/* Proportionally Enlarged Control Plane Nodes */}
              {FABRIC_DOMAINS.map((node) => {
                const active = node.id === selectedId;
                return (
                  <g
                    key={node.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedId(node.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedId(node.id);
                      }
                    }}
                  >
                    {active && !shouldReduceMotion && (
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy}
                        r="38"
                        fill="rgba(216,154,67,0.16)"
                        animate={{ scale: [1, 1.24, 1], opacity: [0.55, 0.15, 0.55] }}
                        transition={{ duration: 2.6, repeat: Infinity }}
                      />
                    )}
                    <rect
                      x={node.cx - 96}
                      y={node.cy - 28}
                      width="192"
                      height="56"
                      rx="4"
                      fill={active ? "#14243B" : "#0B1424"}
                      stroke={active ? "#D89A43" : "rgba(255,255,255,0.28)"}
                      strokeWidth={active ? "2" : "1.2"}
                    />
                    <text
                      x={node.cx - 78}
                      y={node.cy - 5}
                      fill="#D89A43"
                      fontSize="11.5"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      {node.code}
                    </text>
                    <text
                      x={node.cx - 78}
                      y={node.cy + 14}
                      fill="#FFFFFF"
                      fontSize="13.5"
                      fontFamily="sans-serif"
                      fontWeight="700"
                    >
                      {node.title.split(" ").slice(0, 2).join(" ")}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right: Active Control Domain Inspector */}
        <div className="flex flex-col justify-between bg-[#0B1424]/85 p-6 sm:p-8 lg:col-span-4">
          <div>
            <div className="flex items-center gap-2.5">
              <ActiveIcon className="h-4.5 w-4.5 text-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#D89A43] uppercase">
                Active Control Domain
              </span>
            </div>

            <h3 className="mt-3 text-xl font-bold text-white">
              {activeDomain.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {activeDomain.summary}
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Core Architectural Focus
              </p>
              <ul className="mt-3 space-y-2.5">
                {activeDomain.controls.map((ctrl) => (
                  <li
                    key={ctrl}
                    className="flex items-center gap-2.5 text-xs font-medium text-slate-200"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0 text-[#D89A43]"
                      aria-hidden="true"
                    />
                    <span>{ctrl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom: Full-Width Horizontal Domain Controls (2x2 Grid on Mobile, Single Row on Desktop) */}
        <div className="border-t border-white/10 bg-[#0B1424] px-3 py-3.5 sm:px-8 sm:py-4 lg:col-span-12">
          <div
            role="tablist"
            aria-label="Identity Fabric Domain Selectors"
            className="grid grid-cols-2 gap-2 lg:flex lg:flex-nowrap lg:items-center lg:justify-between"
          >
            {resolvedDomains.map((d) => {
              const TabIcon = d.Icon;
              const isSelected = d.id === selectedId;
              return (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(d.id)}
                  className={`inline-flex min-w-0 items-center justify-center gap-1.5 border px-2 py-2 font-mono text-[10px] tracking-tight whitespace-nowrap uppercase transition-colors sm:gap-2 sm:px-3 sm:text-[11px] lg:flex-1 ${
                    isSelected
                      ? "border-[#D89A43] bg-[#D89A43]/15 font-bold text-[#D89A43]"
                      : "border-white/15 bg-transparent text-slate-300 hover:border-white/40 hover:text-white"
                  }`}
                >
                  <TabIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{d.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
