"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface AcademyPathway {
  num: string;
  code: string;
  tier: string;
  name: string;
  audience: string;
  focus: string;
  lab: string;
  outcome: string;
}

const DEFAULT_PATHWAYS: AcademyPathway[] = [
  {
    num: "01",
    code: "pathway_foundation",
    tier: "Tier 1 // Foundational",
    name: "IAM Foundation",
    audience: "Beginners, IT support teams & career switchers",
    focus:
      "Core identity concepts, identity lifecycle fundamentals, controls, key terminology, and career orientation across corporate identity programmes.",
    lab: "Mapping authentication vs authorization flows, inspecting enterprise directory structures, and interpreting SAML/OIDC concepts.",
    outcome:
      "Clarity on core IAM principles and confident readiness to begin practical platform training.",
  },
  {
    num: "02",
    code: "pathway_analyst",
    tier: "Tier 2 // Operational",
    name: "IAM Analyst",
    audience: "IT support & early-stage IAM practitioners",
    focus:
      "First hands-on training with a chosen IAM platform; daily access operations, entitlement troubleshooting, enterprise cases, and GRC alignment.",
    lab: "Executing periodic access recertification campaigns, resolving conflicting group entitlements, and auditing dormant user accounts.",
    outcome:
      "Dependable operational competency supporting access governance, user requests, and compliance reviews.",
  },
  {
    num: "03",
    code: "pathway_engineer",
    tier: "Tier 3 // Engineering",
    name: "IAM Engineer",
    audience: "IAM analysts, systems admins & cloud engineers",
    focus:
      "Single Sign-On (SSO) integrations, automated user provisioning, identity protocols (SAML 2.0, OIDC), workflow automation, and troubleshooting.",
    lab: "Onboarding enterprise SaaS via SAML/SCIM, automating Joiner-Mover-Leaver rules via Microsoft Graph and PowerShell.",
    outcome:
      "Production capability integrating enterprise apps cleanly and automating access lifecycle workflows.",
  },
  {
    num: "04",
    code: "pathway_senior_engineer",
    tier: "Tier 4 // Advanced",
    name: "Senior IAM Engineer",
    audience: "Experienced IAM & infrastructure specialists",
    focus:
      "Advanced diagnostics, platform resilience, Privileged Access Management (PAM) engineering, CI/CD governance, and emerging AI identity use cases.",
    lab: "Structuring Just-in-Time elevation policies, hardening service principals, and troubleshooting hybrid federation resilience.",
    outcome:
      "Authoritative engineering depth over critical authentication, governance, and privileged identity planes.",
  },
  {
    num: "05",
    code: "pathway_architect",
    tier: "Tier 5 // Strategic",
    name: "IAM Architect",
    audience: "Senior technical practitioners & tech leads",
    focus:
      "Solution design, cross-system enterprise integration, target identity architecture blueprints, multi-cloud governance, and Zero-Trust alignment.",
    lab: "Authoring an end-to-end target IAM design covering hybrid directories, PAM boundaries, and regulatory control traceability.",
    outcome:
      "Design authority to architect coherent, defensible enterprise IAM ecosystems.",
  },
  {
    num: "06",
    code: "pathway_consultant_lead",
    tier: "Tier 6 // Advisory",
    name: "IAM Consultant & Leadership",
    audience: "Consultants, practice leads & advisory specialists",
    focus:
      "Discovery assessment leadership, advisory delivery, identity strategy formulation, operating model governance, and stakeholder communication.",
    lab: "Structuring executive maturity assessments, defining phased transformation scopes, and translating risk into business decisions.",
    outcome:
      "Advisory fluency to lead organisational identity transformations with clarity and accountability.",
  },
];

/**
 * Interactive 6-Tier Progression Ladder for IAM Academy.
 */
export function AcademyPathwayExplorer({
  pathways = DEFAULT_PATHWAYS,
}: {
  pathways?: AcademyPathway[];
}) {
  const [selected, setSelected] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const active = pathways[selected] || pathways[0];

  return (
    <div className="border border-slate-200 bg-white shadow-sm">
      {/* Horizontal Tier Progress Bar */}
      <div className="grid grid-cols-2 border-b border-slate-200 bg-[#F7F6F2] sm:grid-cols-3 lg:grid-cols-6">
        {pathways.map((p, idx) => {
          const isCurrent = idx === selected;
          return (
            <button
              key={p.num}
              type="button"
              onClick={() => setSelected(idx)}
              className={`relative flex flex-col items-start px-5 py-4 text-left transition-colors border-b border-r border-slate-200 last:border-r-0 ${
                isCurrent ? "bg-white" : "hover:bg-white/60"
              }`}
            >
              {isCurrent && (
                <span
                  className="absolute top-0 right-0 left-0 h-[3px] bg-[#D89A43]"
                  aria-hidden="true"
                />
              )}
              <span
                className={`font-mono text-[10px] font-bold tracking-wider uppercase ${
                  isCurrent ? "text-[#B07424]" : "text-slate-400"
                }`}
              >
                Tier {p.num}
              </span>
              <span
                className={`mt-1 text-sm font-bold leading-snug ${
                  isCurrent ? "text-[#0B1424]" : "text-slate-600"
                }`}
              >
                {p.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Pathway Detail View */}
      <div className="p-7 sm:p-10 lg:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.num}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#B07424] uppercase">
                  {active.tier}
                </span>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#0B1424] sm:text-3xl">
                  {active.name}
                </h3>
              </div>

              <div className="border border-slate-200 bg-[#F7F6F2] px-4 py-2 text-xs font-semibold text-slate-700">
                Suggested Audience: <span className="text-[#0B1424]">{active.audience}</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="font-mono text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                  Core Syllabus &amp; Decision Reasoning
                </span>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  {active.focus}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                <span className="font-mono text-[11px] font-bold tracking-wider text-[#0B1424] uppercase">
                  Practical Scenario &amp; Lab Focus
                </span>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  {active.lab}
                </p>
              </div>

              <div className="border-t border-slate-200 pt-6 lg:col-span-3 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-800 uppercase">
                  Target Capability
                </span>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  {active.outcome}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-[#D89A43]" />
                <span>Includes live mentorship options &amp; practical architecture feedback</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/contact?type=individual_learning&service=${active.code}`}
                  className="inline-flex items-center gap-2 bg-[#0B1424] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#14243B]"
                >
                  <span>Enquire About {active.name} &rarr;</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
