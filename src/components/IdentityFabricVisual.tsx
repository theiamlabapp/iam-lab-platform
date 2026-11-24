"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FabricDomain {
  id: string;
  code: string;
  title: string;
  summary: string;
  controls: string[];
  cx: number;
  cy: number;
}

const FABRIC_DOMAINS: FabricDomain[] = [
  {
    id: "directory",
    code: "SRC-01",
    title: "Authoritative Identity Core",
    summary:
      "HR systems and cloud directories synchronized into one clean source of truth, eliminating fragmented identities.",
    controls: ["Workday / SAP HR Sync", "Active Directory Consolidation", "SCIM 2.0 Provisioning"],
    cx: 150,
    cy: 155,
  },
  {
    id: "governance",
    code: "IGA-02",
    title: "Governance & Policy Plane",
    summary:
      "Automated access request workflows, separation of duties (SoD), and verifiable compliance reviews.",
    controls: ["Access Recertification", "SoD Conflict Guardrails", "Least-Privilege Role Models"],
    cx: 400,
    cy: 80,
  },
  {
    id: "privilege",
    code: "PAM-03",
    title: "Zero Standing Privilege Vault",
    summary:
      "Ephemeral Just-in-Time elevation replacing shared domain administrator credentials and orphan service tokens.",
    controls: ["Just-in-Time Elevation", "Session Recording & Isolation", "Automated Secret Rotation"],
    cx: 400,
    cy: 235,
  },
  {
    id: "cloud",
    code: "ZTA-04",
    title: "Hybrid & Cloud Access Boundary",
    summary:
      "Phishing-resistant authentication and risk-adaptive conditional access governing every SaaS and workload.",
    controls: ["FIDO2 / Passwordless MFA", "SAML 2.0 / OIDC Federation", "Workload & API Identity"],
    cx: 650,
    cy: 155,
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
 * Interactive Zero-Trust Identity Network & Orbital Control Visualization
 * Placed behind/alongside the structural enterprise identity challenges section.
 */
export function IdentityFabricVisual() {
  const [selectedId, setSelectedId] = useState<string>("governance");
  const shouldReduceMotion = useReducedMotion();

  const activeDomain =
    FABRIC_DOMAINS.find((d) => d.id === selectedId) || FABRIC_DOMAINS[1];

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
        {/* Left: Interactive SVG Constellation & Orbital Globe Mesh */}
        <div className="relative border-b border-white/10 p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#D89A43]" />
              <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-[#D89A43] uppercase">
                Connected Identity Fabric &middot; Decision Topology
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">
              Select a control plane node
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

              {/* Rotating Subtle Globe Meridian Ring */}
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
                    <circle
                      cx={node.cx - 56}
                      cy={node.cy}
                      r="3.5"
                      fill={active ? "#D89A43" : "#60A5FA"}
                    />
                    <text
                      x={node.cx - 44}
                      y={node.cy - 4}
                      fill="#D89A43"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="700"
                    >
                      {node.code}
                    </text>
                    <text
                      x={node.cx - 44}
                      y={node.cy + 10}
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
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#D89A43] uppercase">
              {activeDomain.code} {"//"} Active Control Domain
            </span>
            <h3 className="mt-3 text-xl font-bold text-white">
              {activeDomain.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {activeDomain.summary}
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Implemented Architectural Controls
              </p>
              <ul className="mt-3 space-y-2">
                {activeDomain.controls.map((ctrl) => (
                  <li
                    key={ctrl}
                    className="flex items-center gap-2.5 text-xs font-medium text-slate-200"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-[#D89A43]" />
                    <span>{ctrl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
            {FABRIC_DOMAINS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedId(d.id)}
                className={`border px-2.5 py-1 font-mono text-[10px] uppercase transition-colors ${
                  d.id === selectedId
                    ? "border-[#D89A43] bg-[#D89A43]/15 font-bold text-[#D89A43]"
                    : "border-white/15 bg-transparent text-slate-400 hover:border-white/40 hover:text-white"
                }`}
              >
                {d.code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
