"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Compass,
  KeyRound,
  LockKeyhole,
  ServerCog,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface PillarItem {
  id: string;
  name: string;
  tagline: string;
  problem: string;
  scope: string;
  outcomes: string;
  platforms: string;
  anchor: string;
  Icon: LucideIcon;
}

const DEFAULT_PILLARS: PillarItem[] = [
  {
    id: "strategy",
    name: "IAM Strategy, Assessment & Advisory",
    tagline: "Understand identity risks, governance maturity, and improvement priorities.",
    problem:
      "Fragmented IAM practices, unclear ownership, inconsistent controls, and difficulty deciding what to improve first.",
    scope:
      "Assess identity processes, technology architecture, risks, governance maturity, and business requirements to define practical improvement priorities and a roadmap.",
    outcomes:
      "A clearer view of risk, a prioritised plan, and more informed architecture or investment decisions.",
    platforms: "Existing directories, cloud identity providers, IGA and PAM environments, according to scope.",
    anchor: "/services#strategy",
    Icon: Compass,
  },
  {
    id: "governance",
    name: "Identity Governance & Access Management",
    tagline: "Structured access requests, approvals, reviews, and least-privilege oversight.",
    problem:
      "Excess permissions, weak ownership of access, manual recertification, and insufficient visibility into who can access what.",
    scope:
      "Support identity governance design, access request workflows, approvals, access review processes, role models, and least-privilege practices.",
    outcomes:
      "More consistent access decisions, traceability, and stronger governance processes.",
    platforms: "Microsoft Entra ID, SailPoint, and relevant governance platforms, subject to confirmed capability.",
    anchor: "/services#governance",
    Icon: Users,
  },
  {
    id: "directory",
    name: "Identity Lifecycle & Provisioning Automation",
    tagline: "Reduce manual overhead across joiner, mover, and leaver processes.",
    problem:
      "Slow onboarding, lingering access after role changes or exits, repetitive tickets, and avoidable manual errors.",
    scope:
      "Assess and improve joiner, mover, and leaver processes, user provisioning and deprovisioning, group management, workflow integration, and automation.",
    outcomes:
      "More reliable access changes, reduced manual intervention, and improved lifecycle controls.",
    platforms: "Microsoft Entra ID, Microsoft Graph, PowerShell, identity directories, and agreed connectors.",
    anchor: "/services#directory",
    Icon: Workflow,
  },
  {
    id: "auth-sso",
    name: "Authentication, SSO & Access Modernisation",
    tagline: "Consistent sign-in controls and risk-informed user access.",
    problem:
      "Inconsistent sign-in controls, fragmented access experiences, and avoidable authentication exposure.",
    scope:
      "Support secure authentication designs, SSO, MFA, conditional access, application onboarding, and access policy improvement.",
    outcomes:
      "Clearer access policies, better sign-in consistency, and risk-informed authentication controls.",
    platforms: "Microsoft Entra ID, Okta, and relevant authentication protocols, subject to the agreed project.",
    anchor: "/services#auth-sso",
    Icon: LockKeyhole,
  },
  {
    id: "pam",
    name: "Privileged Access Management (PAM)",
    tagline: "Controlled privileged workflows and clearer administrative accountability.",
    problem:
      "Overprivileged accounts, unmanaged administrative access, and difficulty monitoring sensitive access.",
    scope:
      "Provide assessment, design, and technical support for privileged identity controls, privileged access workflows, role elevation, and operating processes.",
    outcomes:
      "A more controlled approach to privileged access and clearer accountability.",
    platforms: "CyberArk and Microsoft Entra privileged identity capabilities, where in project scope.",
    anchor: "/services#pam",
    Icon: KeyRound,
  },
  {
    id: "implementation",
    name: "IAM Implementation, Integration & Technical Support",
    tagline: "Scoped platform configuration, integration support, and knowledge transfer.",
    problem:
      "Project delivery bottlenecks, integration issues, and gaps between architecture and day-to-day operations.",
    scope:
      "Provide scoped assistance with IAM platform configuration, integrations, troubleshooting, operational documentation, and knowledge transfer.",
    outcomes:
      "Defined technical deliverables, clearer operating practices, and skills transfer for internal teams.",
    platforms: "Scope confirmed per engagement; technology choices follow client requirements.",
    anchor: "/services#implementation",
    Icon: ServerCog,
  },
];

/**
 * Interactive 6-Pillar Enterprise Explorer
 * Replaces numbered list with 6 clean Lucide icons and concise source-aligned specifications.
 */
export function InteractivePillarsExplorer({
  pillars = DEFAULT_PILLARS,
}: {
  pillars?: PillarItem[];
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const active = pillars[activeIdx] || pillars[0];
  const ActiveIcon = active.Icon;

  return (
    <div className="border border-white/15 bg-[#08101E]">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Navigation Rail */}
        <div
          role="tablist"
          aria-label="Six Core IAM Practice Pillars"
          className="divide-y divide-white/10 border-b border-white/10 lg:col-span-5 lg:border-b-0 lg:border-r"
        >
          {pillars.map((pillar, idx) => {
            const isSelected = idx === activeIdx;
            const PillarIcon = pillar.Icon;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveIdx(idx)}
                className={`group relative flex w-full items-start gap-4 px-6 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D89A43] ${
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
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border transition-colors ${
                    isSelected
                      ? "border-[#D89A43] bg-[#D89A43]/15 text-[#D89A43]"
                      : "border-white/15 bg-white/[0.03] text-slate-400 group-hover:border-white/30 group-hover:text-white"
                  }`}
                >
                  <PillarIcon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`text-sm font-bold tracking-tight sm:text-[15px] ${
                        isSelected
                          ? "text-white"
                          : "text-slate-300 group-hover:text-white"
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

        {/* Right Concise Specification Pane */}
        <div className="relative flex flex-col justify-between p-7 sm:p-10 lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3.5 border-b border-white/10 pb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#D89A43]/50 bg-[#14243B] text-[#D89A43]">
                  <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#D89A43] uppercase">
                    Practice Pillar Overview
                  </span>
                  <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    {active.name}
                  </h3>
                </div>
              </div>

              <div className="border-l-2 border-[#D89A43] pl-4">
                <span className="font-mono text-[10px] font-bold tracking-wider text-[#D89A43] uppercase">
                  Service Focus
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                  {active.scope}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border-l-2 border-rose-400/50 pl-4">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-rose-300 uppercase">
                    Problem Addressed
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {active.problem}
                  </p>
                </div>

                <div className="border-l-2 border-emerald-400/50 pl-4">
                  <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                    Expected Outcomes
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                    {active.outcomes}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-t border-white/10 pt-5 text-xs text-slate-300">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#D89A43]"
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-white">Technology Context:</strong>{" "}
                  {active.platforms}
                </span>
              </div>

              <div className="flex flex-col items-stretch gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between">
                <Link
                  href={active.anchor}
                  className="inline-flex items-center justify-center whitespace-nowrap bg-[#D89A43] px-5 py-2.5 text-xs font-bold tracking-wider text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
                >
                  Inspect Full Scope &rarr;
                </Link>
                <Link
                  href={`/contact?type=enterprise_consulting&service=${active.id}`}
                  className="inline-flex items-center justify-center whitespace-nowrap border border-white/25 px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
                >
                  Request Consultation
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
