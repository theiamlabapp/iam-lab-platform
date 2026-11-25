"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  Compass,
  KeyRound,
  Layers,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface AcademyPathway {
  code: string;
  tier: string;
  name: string;
  audience: string;
  focus: string;
  Icon: LucideIcon;
}

const DEFAULT_PATHWAYS: AcademyPathway[] = [
  {
    code: "pathway_foundation",
    tier: "Foundational",
    name: "IAM Foundation",
    audience: "Beginners and career changers",
    focus:
      "Core IAM concepts, identity lifecycle, controls, terminology, and career orientation; no platform training required.",
    Icon: Compass,
  },
  {
    code: "pathway_analyst",
    tier: "Operational",
    name: "IAM Analyst",
    audience: "IT support and early IAM practitioners",
    focus:
      "First hands-on training with a chosen IAM platform; access operations, troubleshooting, enterprise cases, and GRC.",
    Icon: Users,
  },
  {
    code: "pathway_engineer",
    tier: "Engineering",
    name: "IAM Engineer",
    audience: "IAM analysts and engineers",
    focus:
      "SSO, provisioning, application integration, protocols, workflow automation, and troubleshooting.",
    Icon: Workflow,
  },
  {
    code: "pathway_senior_engineer",
    tier: "Advanced Engineering",
    name: "Senior IAM Engineer",
    audience: "Experienced IAM engineers",
    focus:
      "Advanced diagnostics, resilience, platform engineering, CI/CD, PAM engineering, and emerging AI use cases.",
    Icon: KeyRound,
  },
  {
    code: "pathway_architect",
    tier: "Architecture",
    name: "IAM Architect",
    audience: "Senior technical practitioners",
    focus:
      "Solution design, enterprise integration, identity architecture, and Zero Trust.",
    Icon: Layers,
  },
  {
    code: "pathway_consultant_lead",
    tier: "Advisory & Leadership",
    name: "IAM Consultant & Leadership",
    audience: "Consultants and IAM leaders",
    focus:
      "Discovery, advisory delivery, strategy, operating model, and transformation.",
    Icon: Briefcase,
  },
];

/**
 * Interactive 6-Pathway Progression Explorer aligned with client requirements PDF.
 */
export function AcademyPathwayExplorer({
  pathways = DEFAULT_PATHWAYS,
  cmsItems,
}: {
  pathways?: AcademyPathway[];
  cmsItems?: Array<Record<string, unknown>>;
}) {
  const resolvedPathways: AcademyPathway[] =
    Array.isArray(cmsItems) && cmsItems.length > 0
      ? cmsItems.map((item, idx) => {
          const fallback = DEFAULT_PATHWAYS[idx % DEFAULT_PATHWAYS.length];
          return {
            code: String(item.code || fallback.code),
            tier: String(item.tier || fallback.tier),
            name: String(item.name || item.title || fallback.name),
            audience: String(item.audience || fallback.audience),
            focus: String(item.focus || item.description || fallback.focus),
            Icon: fallback.Icon,
          };
        })
      : pathways;

  const [selected, setSelected] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const active = resolvedPathways[selected] || resolvedPathways[0];
  const ActiveIcon = active.Icon;

  return (
    <div className="border border-slate-200 bg-white shadow-sm">
      {/* Horizontal Tier Tabs */}
      <div
        role="tablist"
        aria-label="IAM Academy Pathways"
        className="grid grid-cols-2 border-b border-slate-200 bg-[#F7F6F2] sm:grid-cols-3 lg:grid-cols-6"
      >
        {resolvedPathways.map((p, idx) => {
          const isCurrent = idx === selected;
          const PathwayIcon = p.Icon;
          return (
            <button
              key={p.code}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              onClick={() => setSelected(idx)}
              className={`relative flex flex-col items-start border-b border-r border-slate-200 px-5 py-4 text-left transition-colors last:border-r-0 ${
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
                className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider uppercase ${
                  isCurrent ? "text-[#B07424]" : "text-slate-400"
                }`}
              >
                <PathwayIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{p.tier}</span>
              </span>
              <span
                className={`mt-1.5 text-sm font-bold leading-snug ${
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
            key={active.code}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#D89A43]/40 bg-[#F7F6F2] text-[#B07424]">
                  <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold tracking-[0.18em] text-[#B07424] uppercase">
                    {active.tier} Pathway
                  </span>
                  <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-[#0B1424] sm:text-3xl">
                    {active.name}
                  </h3>
                </div>
              </div>

              <div className="border border-slate-200 bg-[#F7F6F2] px-4 py-2 text-xs font-semibold text-slate-700">
                Suggested audience:{" "}
                <span className="text-[#0B1424]">{active.audience}</span>
              </div>
            </div>

            <div className="mt-8 border-l-2 border-[#D89A43] pl-5">
              <span className="font-mono text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                Primary Focus
              </span>
              <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-700">
                {active.focus}
              </p>
            </div>

            <div className="mt-9 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:items-center">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-[#B07424]"
                  aria-hidden="true"
                />
                <span>
                  Enrolment scope, schedules, and mentor availability are confirmed prior to registration.
                </span>
              </div>

              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-nowrap sm:items-center">
                <Link
                  href={`/contact?type=individual_learning&service=${active.code}`}
                  className="inline-flex items-center justify-center bg-[#0B1424] px-3.5 py-3 text-center text-[11px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#14243B] sm:px-5 sm:text-xs sm:tracking-wider sm:whitespace-nowrap"
                >
                  Enquire About Training &rarr;
                </Link>
                <Link
                  href={`/contact?type=individual_learning&service=${active.code}`}
                  className="inline-flex items-center justify-center border border-slate-300 bg-white px-3.5 py-3 text-center text-[11px] font-bold tracking-wide text-[#0B1424] uppercase transition-colors hover:border-[#D89A43] sm:px-5 sm:text-xs sm:tracking-wider sm:whitespace-nowrap"
                >
                  Book a Career Pathway Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
