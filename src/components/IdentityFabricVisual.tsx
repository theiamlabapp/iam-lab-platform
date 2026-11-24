"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  Network,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

interface FabricDomain {
  id: string;
  code: string;
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
    title: "Authoritative Identity Core",
    summary:
      "HR sources and enterprise directories aligned into a consistent identity lifecycle, reducing manual joiner-mover-leaver bottlenecks.",
    controls: [
      "HR & Directory Synchronisation",
      "Automated Joiner-Mover-Leaver Flows",
      "SCIM & Connector Provisioning",
    ],
    cx: 150,
    cy: 155,
    Icon: Workflow,
  },
  {
    id: "governance",
    code: "IGA",
    title: "Identity Governance & Access Control",
    summary:
      "Structured access requests, approvals, recertification campaigns, role design, and oversight across applications.",
    controls: [
      "Access Request & Approval Workflows",
      "Periodic Access Recertification",
      "Role Design & Least-Privilege Oversight",
    ],
    cx: 400,
    cy: 80,
    Icon: Users,
  },
  {
    id: "privilege",
    code: "PAM",
    title: "Privileged Access Management",
    summary:
      "Controlled privileged workflows, administrative role elevation, and accountable governance protecting sensitive systems.",
    controls: [
      "Privileged Access Controls",
      "Controlled Role Elevation Workflows",
      "Administrative Accountability & Review",
    ],
    cx: 400,
    cy: 235,
    Icon: KeyRound,
  },
  {
    id: "cloud",
    code: "SSO",
    title: "Authentication & Access Modernisation",
    summary:
      "Consistent SSO, MFA, conditional access, and application onboarding strengthening how users authenticate.",
    controls: [
      "Single Sign-On (SAML / OIDC)",
      "Multi-Factor & Conditional Access",
      "Application Access Modernisation",
    ],
    cx: 650,
    cy: 155,
    Icon: LockKeyhole,
  },
];

const CONNECTIONS = [
  { id: "c1", d: "M 150 155 Q 275 85 400 80" },
  { id: "c2", d: "M 150 155 Q 275 225 400 235" },
  { id: "c3", d: "M 400 80 L 400 235" },
  { id: "c4", d: "M 400 80 Q 525 85 650 155" },
  { id: "c5", d: "M 400 235 Q 525 225 650 155" },
];

/**
 * Interactive Connected Identity Control Fabric
 * Replaced generic bullet dots with meaningful domain & control Lucide icons.
 */
export function IdentityFabricVisual() {
  const [selectedId, setSelectedId] = useState<string>("governance");
  const shouldReduceMotion = useReducedMotion();

  const activeDomain =
    FABRIC_DOMAINS.find((d) => d.id === selectedId) || FABRIC_DOMAINS[1];
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
        {/* Left: Interactive SVG Constellation & Orbital Mesh */}
        <div className="relative border-b border-white/10 p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Network className="h-4 w-4 text-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-[#D89A43] uppercase">
                Connected Identity Fabric
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">
              Select a domain node
            </span>
          </div>

          <div className="relative mt-4 aspect-[8/3.6] min-h-[220px] w-full">
            <svg
              viewBox="0 0 800 310"
              className="h-full w-full"
              role="img"
              aria-label="Interactive Identity Control Architecture Topology"
            >
              <defs>
                <linearGradient id="fabricGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D89A43" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#D89A43" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.45" />
                </linearGradient>
              </defs>

              {/* Rotating Subtle Meridian Ring */}
              <motion.g
                style={{ originX: "400px", originY: "155px" }}
                animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="400"
                  cy="155"
                  r="128"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                  strokeDasharray="6 8"
                />
                <ellipse
                  cx="400"
                  cy="155"
                  rx="128"
                  ry="48"
                  fill="none"
                  stroke="rgba(216,154,67,0.12)"
                  strokeWidth="1"
                />
              </motion.g>

              {/* Secondary Counter-Rotating Orbit */}
              <motion.g
                style={{ originX: "400px", originY: "155px" }}
                animate={shouldReduceMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
              >
                <ellipse
                  cx="400"
                  cy="155"
                  rx="92"
                  ry="128"
                  fill="none"
                  stroke="rgba(96,165,250,0.08)"
                  strokeWidth="1"
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
                    strokeWidth="1.5"
                  />
                  {!shouldReduceMotion && (
                    <motion.path
                      d={conn.d}
                      fill="none"
                      stroke="#D89A43"
                      strokeWidth="2"
                      strokeDasharray="10 140"
                      initial={{ strokeDashoffset: 150 }}
                      animate={{ strokeDashoffset: -150 }}
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

              {/* Interactive Control Plane Nodes */}
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
                        r="30"
                        fill="rgba(216,154,67,0.14)"
                        animate={{ scale: [1, 1.25, 1], opacity: [0.55, 0.15, 0.55] }}
                        transition={{ duration: 2.6, repeat: Infinity }}
                      />
                    )}
                    <rect
                      x={node.cx - 72}
                      y={node.cy - 22}
                      width="144"
                      height="44"
                      rx="3"
                      fill={active ? "#14243B" : "#0B1424"}
                      stroke={active ? "#D89A43" : "rgba(255,255,255,0.22)"}
                      strokeWidth={active ? "1.6" : "1"}
                    />
                    <text
                      x={node.cx - 56}
                      y={node.cy - 4}
                      fill="#D89A43"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      {node.code}
                    </text>
                    <text
                      x={node.cx - 56}
                      y={node.cy + 11}
                      fill="#FFFFFF"
                      fontSize="10.5"
                      fontFamily="sans-serif"
                      fontWeight="600"
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
        <div className="flex flex-col justify-between bg-[#0B1424]/85 p-6 sm:p-8 lg:col-span-5">
          <div>
            <div className="flex items-center gap-2.5">
              <ActiveIcon className="h-4 w-4 text-[#D89A43]" aria-hidden="true" />
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

          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
            {FABRIC_DOMAINS.map((d) => {
              const TabIcon = d.Icon;
              const isSelected = d.id === selectedId;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedId(d.id)}
                  className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[10px] uppercase transition-colors ${
                    isSelected
                      ? "border-[#D89A43] bg-[#D89A43]/15 font-bold text-[#D89A43]"
                      : "border-white/15 bg-transparent text-slate-400 hover:border-white/40 hover:text-white"
                  }`}
                >
                  <TabIcon className="h-3 w-3" aria-hidden="true" />
                  <span>{d.title.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ShieldCheck };
