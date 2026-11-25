"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
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
  description: string;
  anchor: string;
  Icon: LucideIcon;
}

const DEFAULT_PILLARS: PillarItem[] = [
  {
    id: "strategy",
    name: "IAM Strategy, Assessment & Advisory",
    description:
      "Assess identity processes, technology architecture, risks, governance maturity, and business requirements to define practical improvement priorities and a clear roadmap.",
    anchor: "/services#strategy",
    Icon: Compass,
  },
  {
    id: "governance",
    name: "Identity Governance & Access Management",
    description:
      "Support identity governance design, access request workflows, approvals, access review processes, role models, and least-privilege practices across applications.",
    anchor: "/services#governance",
    Icon: Users,
  },
  {
    id: "directory",
    name: "Identity Lifecycle & Provisioning Automation",
    description:
      "Assess and improve joiner, mover, and leaver processes, user provisioning and deprovisioning, group management, workflow integration, and process automation.",
    anchor: "/services#directory",
    Icon: Workflow,
  },
  {
    id: "auth-sso",
    name: "Authentication, SSO & Access Modernisation",
    description:
      "Support secure authentication designs, single sign-on (SSO), multi-factor authentication (MFA), conditional access, application onboarding, and access policy improvement.",
    anchor: "/services#auth-sso",
    Icon: LockKeyhole,
  },
  {
    id: "pam",
    name: "Privileged Access Management (PAM)",
    description:
      "Provide assessment, design, and technical support for privileged identity controls, privileged access workflows, role elevation, and related operating processes.",
    anchor: "/services#pam",
    Icon: KeyRound,
  },
  {
    id: "implementation",
    name: "IAM Implementation, Integration & Technical Support",
    description:
      "Provide scoped assistance with IAM platform configuration, integrations, troubleshooting, operational documentation, and knowledge transfer for internal teams.",
    anchor: "/services#implementation",
    Icon: ServerCog,
  },
];

/**
 * Interactive Six Core Practice Pillars Explorer
 * Simplified to show: 1) Service Name, 2) Short source-supported explanation, 3) Single INSPECT FULL SCOPE CTA.
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
                className={`group relative flex w-full items-center gap-4 px-6 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#D89A43] ${
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
                  className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-colors ${
                    isSelected
                      ? "border-[#D89A43] bg-[#D89A43]/15 text-[#D89A43]"
                      : "border-white/15 bg-white/[0.03] text-slate-400 group-hover:border-white/30 group-hover:text-white"
                  }`}
                >
                  <PillarIcon className="h-4 w-4" aria-hidden="true" />
                </div>
                <span
                  className={`flex-1 text-sm font-bold tracking-tight sm:text-[15px] ${
                    isSelected
                      ? "text-white"
                      : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {pillar.name}
                </span>
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
              </button>
            );
          })}
        </div>

        {/* Right Simplified Specification Pane */}
        <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:col-span-7 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl space-y-6"
            >
              <div className="flex h-12 w-12 items-center justify-center border border-[#D89A43]/50 bg-[#14243B] text-[#D89A43]">
                <ActiveIcon className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                {active.name}
              </h3>

              <p className="text-base leading-relaxed text-slate-300">
                {active.description}
              </p>

              <div className="pt-2">
                <Link
                  href={active.anchor}
                  className="inline-flex items-center justify-center whitespace-nowrap bg-[#D89A43] px-6 py-3 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
                >
                  INSPECT FULL SCOPE &rarr;
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
