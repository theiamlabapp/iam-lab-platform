"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpenCheck,
  ClipboardList,
  FileCheck2,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

export interface DeliveryStage {
  id: string;
  title: string;
  detail: string;
  output: string;
  Icon: LucideIcon;
}

const DEFAULT_STAGES: DeliveryStage[] = [
  {
    id: "discovery",
    title: "Discovery call",
    detail:
      "Understand your organisation's identity environment, immediate security concerns, and operational objectives.",
    output: "Aligned Problem Framing",
    Icon: PhoneCall,
  },
  {
    id: "scope",
    title: "Scope and requirements",
    detail:
      "Define clear technical boundaries, target identity systems, stakeholders, and practical priorities.",
    output: "Agreed Scope Definition",
    Icon: ClipboardList,
  },
  {
    id: "proposal",
    title: "Proposal and agreed deliverables",
    detail:
      "Establish a transparent engagement structure, milestone plan, and technology approach tailored to your environment.",
    output: "Clear Delivery Plan",
    Icon: FileCheck2,
  },
  {
    id: "delivery",
    title: "Delivery and knowledge transfer",
    detail:
      "Execute agreed technical work alongside practical documentation and skills transfer for your internal team.",
    output: "Controls & Team Enablement",
    Icon: BookOpenCheck,
  },
];

/**
 * Interactive 4-stage service delivery workflow aligned with the client brief.
 * Uses semantic Lucide icons rather than arbitrary numbered labels or decorative dots.
 */
export function DeliveryTimeline({
  stages = DEFAULT_STAGES,
  cmsItems,
  theme = "light",
}: {
  stages?: DeliveryStage[];
  cmsItems?: Array<Record<string, unknown>>;
  theme?: "light" | "dark";
}) {
  const resolvedStages: DeliveryStage[] =
    Array.isArray(cmsItems) && cmsItems.length > 0
      ? cmsItems.map((item, idx) => {
          const fallback = DEFAULT_STAGES[idx % DEFAULT_STAGES.length];
          return {
            id: String(item.id || fallback.id),
            title: String(item.title || item.name || fallback.title),
            detail: String(item.detail || item.description || fallback.detail),
            output: String(item.output || item.focusOutput || fallback.output),
            Icon: fallback.Icon,
          };
        })
      : stages;

  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <div>
      {/* Animated Connecting Track on Desktop */}
      <div className="relative mb-6 hidden lg:block">
        <div
          className={`h-[2px] w-full ${
            isDark ? "bg-white/10" : "bg-slate-200"
          }`}
        />
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-[#D89A43]"
          initial={shouldReduceMotion ? undefined : { width: "25%" }}
          animate={{
            width: `${((activeStep + 1) / resolvedStages.length) * 100}%`,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Interactive Stages Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200/20">
        {resolvedStages.map((s, idx) => {
          const isCurrent = idx === activeStep;
          const StageIcon = s.Icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`group flex flex-col justify-between text-left transition-all lg:px-7 ${
                isDark
                  ? `border-t-2 p-6 lg:border-t-0 ${
                      isCurrent
                        ? "border-[#D89A43] bg-white/[0.04]"
                        : "border-white/10 hover:bg-white/[0.02]"
                    }`
                  : `border-t-2 p-6 lg:border-t-0 ${
                      isCurrent
                        ? "border-[#D89A43] bg-[#FFFFFF] shadow-sm"
                        : "border-slate-200 hover:bg-white/70"
                    }`
              }`}
            >
              <div>
                <div
                  className={`flex h-10 w-10 items-center justify-center border transition-colors ${
                    isCurrent
                      ? "border-[#D89A43] bg-[#D89A43]/15 text-[#D89A43]"
                      : isDark
                        ? "border-white/15 bg-white/[0.03] text-slate-300 group-hover:border-[#D89A43]/50"
                        : "border-slate-200 bg-white text-[#0B1424] group-hover:border-[#D89A43]"
                  }`}
                >
                  <StageIcon className="h-4.5 w-4.5" aria-hidden="true" />
                </div>

                <h3
                  className={`mt-4 text-lg font-bold tracking-tight ${
                    isDark ? "text-white" : "text-[#0B1424]"
                  }`}
                >
                  {s.title}
                </h3>

                <p
                  className={`mt-2.5 text-sm leading-relaxed ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {s.detail}
                </p>
              </div>

              <div
                className={`mt-6 border-t pt-3 ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <span
                  className={`block font-mono text-[10px] tracking-wider uppercase ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Focus Output
                </span>
                <span
                  className={`mt-1 block text-xs font-semibold ${
                    isCurrent
                      ? isDark
                        ? "text-[#D89A43]"
                        : "text-[#B07424]"
                      : isDark
                        ? "text-slate-200"
                        : "text-[#0B1424]"
                  }`}
                >
                  {s.output}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
