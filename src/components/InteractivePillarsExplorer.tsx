"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface PillarItem {
  num: string;
  name: string;
  tagline: string;
  problem: string;
  scope: string[];
  outcomes: string;
  platforms: string[];
  anchor: string;
}

const DEFAULT_PILLARS: PillarItem[] = [
  {
    num: "01",
    name: "IAM Strategy, Assessment & Advisory",
    tagline: "Clarity on identity maturity, risks, and prioritised transformation.",
    problem:
      "Fragmented IAM practices, unclear access ownership, inconsistent controls, and difficulty deciding where to invest security budget first.",
    scope: [
      "Current-state identity architecture & governance maturity audit",
      "Privilege exposure analysis and compliance gap evaluation",
      "Vendor-neutral technology evaluation aligned to existing estate",
      "Prioritised multi-phase transformation roadmap & operating model",
    ],
    outcomes:
      "A clear view of risk, an actionable executive roadmap, and informed architecture and investment decisions.",
    platforms: ["NIST SP 800-207", "ISO 27001", "Existing Cloud & On-Premises Estates"],
    anchor: "/services#strategy",
  },
  {
    num: "02",
    name: "Identity Governance & Access Management",
    tagline: "Verifiable access certification, role models, and audit traceability.",
    problem:
      "Excessive permissions, weak ownership of application access, manual spreadsheet reviews, and insufficient visibility into who can access what.",
    scope: [
      "Access request workflows and multi-tier manager/owner approvals",
      "Automated periodic access recertification campaigns",
      "Role mining, business role models, and least-privilege practices",
      "Segregation of Duties (SoD) controls and toxic combination monitoring",
    ],
    outcomes:
      "Consistent access decisions, verifiable audit traceability, and measurable entitlement risk reduction.",
    platforms: ["Microsoft Entra ID Governance", "SailPoint", "IGA Workflows"],
    anchor: "/services#governance",
  },
  {
    num: "03",
    name: "Identity Lifecycle & Provisioning Automation",
    tagline: "Eliminate slow onboarding delays and lingering departure exposure.",
    problem:
      "Slow manual onboarding tickets, accumulated access across internal transfers, and unrevoked lingering accounts after contractor or employee exits.",
    scope: [
      "HR-driven Joiner-Mover-Leaver (JML) workflow architecture",
      "Automated user provisioning, group rules, and deprovisioning",
      "Dynamic lifecycle synchronization with Microsoft Graph & SCIM 2.0",
      "PowerShell and connector automation across enterprise applications",
    ],
    outcomes:
      "Reliable access transitions, drastic reduction in manual ticket overhead, and immediate revocation on exit.",
    platforms: ["Microsoft Entra ID", "Microsoft Graph", "PowerShell", "SCIM 2.0"],
    anchor: "/services#directory",
  },
  {
    num: "04",
    name: "Authentication, SSO & Access Modernisation",
    tagline: "Consistent, phishing-resistant access across enterprise estates.",
    problem:
      "Inconsistent sign-in policies, credential reuse fatigue, and legacy authentication protocols leaving sensitive portals vulnerable to compromise.",
    scope: [
      "Single Sign-On (SSO) federation via SAML 2.0 & OpenID Connect (OIDC)",
      "Phishing-resistant Multi-Factor Authentication (MFA) & passwordless controls",
      "Risk-informed Conditional Access policy frameworks",
      "Legacy authentication protocol deprecation and application onboarding",
    ],
    outcomes:
      "Consistent user sign-in experience backed by defensible, risk-informed authentication assurance.",
    platforms: ["Microsoft Entra ID", "Okta", "SAML 2.0 / OIDC", "FIDO2"],
    anchor: "/services#auth-sso",
  },
  {
    num: "05",
    name: "Privileged Access Management (PAM)",
    tagline: "Eliminate standing admin privileges and protect critical control planes.",
    problem:
      "Overprivileged accounts, unmanaged administrative credentials, shared passwords, and limited visibility into sensitive privileged operations.",
    scope: [
      "Privileged credential discovery, secure vaulting, and automated rotation",
      "Just-in-Time (JIT) ephemeral elevation & workflow approvals",
      "Privileged session isolation and accountable audit logging",
      "Break-glass emergency access governance and validation",
    ],
    outcomes:
      "Controlled privileged access, zero permanent standing administrators, and clear operational accountability.",
    platforms: ["CyberArk", "Microsoft Entra PIM", "PAM Controls"],
    anchor: "/services#pam",
  },
  {
    num: "06",
    name: "IAM Implementation, Integration & Support",
    tagline: "Scoped technical delivery, troubleshooting, and knowledge transfer.",
    problem:
      "Project delivery bottlenecks, stalled directory integrations, and gaps between high-level architectural blueprints and daily operations.",
    scope: [
      "Scoped configuration and technical troubleshooting of IAM platforms",
      "Custom API integrations and multi-cloud entitlement hardening (AWS/Azure)",
      "Directory hygiene and active hybrid synchronization stabilization",
      "Comprehensive operational runbooks and internal team enablement",
    ],
    outcomes:
      "Defined technical deliverables, resilient operating practices, and sustainable internal skills transfer.",
    platforms: ["Hybrid Directories", "AWS / Azure IAM", "Custom Integrations"],
    anchor: "/services#implementation",
  },
];

/**
 * Interactive 6-Pillar Enterprise Explorer
 * Replaces repetitive 3x2 card grids with a hairline architectural vertical selector & detail pane.
 */
export function InteractivePillarsExplorer({
  pillars = DEFAULT_PILLARS,
}: {
  pillars?: PillarItem[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const active = pillars[activeIdx] || pillars[0];

  return (
    <div className="border border-white/15 bg-[#08101E]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Navigation Rail */}
        <div className="divide-y divide-white/10 border-b border-white/10 lg:col-span-5 lg:border-b-0 lg:border-r">
          {pillars.map((pillar, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={pillar.num}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`group relative flex w-full items-start gap-4 px-6 py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D89A43] ${
                  isSelected
                    ? "bg-[#14243B]/90"
                    : "bg-transparent hover:bg-white/[0.03]"
                }`}
              >
                {isSelected && (
                  <span
                    className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#D89A43]"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`mt-0.5 font-mono text-xs font-bold transition-colors ${
                    isSelected ? "text-[#D89A43]" : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {pillar.num}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`text-sm font-bold tracking-tight sm:text-base ${
                        isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {pillar.name}
                    </h3>
                    <span
                      className={`font-mono text-xs transition-transform ${
                        isSelected
                          ? "translate-x-0 text-[#D89A43]"
                          : "-translate-x-1 text-slate-600 group-hover:translate-x-0 group-hover:text-slate-300"
                      }`}
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {pillar.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Architectural Specification Pane */}
        <div className="relative flex flex-col justify-between p-7 sm:p-10 lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.num}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#D89A43] uppercase">
                    Pillar {active.num} {"//"} Specification
                  </span>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    {active.name}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border-l-2 border-rose-400/50 pl-4">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-rose-300 uppercase">
                    Challenge Addressed
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {active.problem}
                  </p>
                </div>

                <div className="border-l-2 border-emerald-400/50 pl-4">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                    Expected Outcome
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                    {active.outcomes}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <span className="font-mono text-[10px] font-bold tracking-wider text-[#D89A43] uppercase">
                  Core Deliverables &amp; Advisory Scope
                </span>
                <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {active.scope.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#D89A43]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div className="flex flex-wrap gap-2">
                  {active.platforms.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={active.anchor}
                  className="inline-flex items-center gap-2 bg-[#D89A43] px-5 py-2.5 text-xs font-bold tracking-wider text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
                >
                  <span>Explore Pillar Scope</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
