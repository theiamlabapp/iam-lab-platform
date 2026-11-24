"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface DeliveryStage {
  step: string;
  phase: string;
  title: string;
  detail: string;
  output: string;
}

const DEFAULT_STAGES: DeliveryStage[] = [
  {
    step: "01",
    phase: "Discovery",
    title: "Discovery & Needs Assessment",
    detail:
      "Focused consultation evaluating your current identity architecture, operational bottlenecks, and compliance priorities.",
    output: "Current-State Risk & Priority Summary",
  },
  {
    step: "02",
    phase: "Scoping",
    title: "Scope & Requirements",
    detail:
      "Rigorous definition of target directories, system boundaries, user cohorts, and measurable technical acceptance criteria.",
    output: "Agreed Architectural Scope Brief",
  },
  {
    step: "03",
    phase: "Architecture",
    title: "Formal Proposal & Design",
    detail:
      "Target blueprint formulation, technology alignment tailored to your stack, milestone timetable, and transparent statement of work.",
    output: "Target IAM Design & Milestone SOW",
  },
  {
    step: "04",
    phase: "Handover",
    title: "Delivery & Knowledge Transfer",
    detail:
      "Hands-on platform engineering, staging verification, production rollout, runbooks, and structured capability enablement for your internal team.",
    output: "Production Controls & Team Runbooks",
  },
];

/**
 * Animated interactive 4-stage delivery methodology timeline.
 */
export function DeliveryTimeline({
  stages = DEFAULT_STAGES,
  theme = "light",
}: {
  stages?: DeliveryStage[];
  theme?: "light" | "dark";
}) {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <div>
      {/* Animated Connecting Track on Desktop */}
      <div className="relative hidden lg:block mb-6">
        <div
          className={`h-[2px] w-full ${
            isDark ? "bg-white/10" : "bg-slate-200"
          }`}
        />
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-[#D89A43]"
          initial={shouldReduceMotion ? undefined : { width: "25%" }}
          animate={{
            width: `${((activeStep + 1) / stages.length) * 100}%`,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Interactive Stages Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-slate-200/20">
        {stages.map((s, idx) => {
          const isCurrent = idx === activeStep;
          return (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`group flex flex-col justify-between text-left transition-all lg:px-6 lg:first:pl-0 lg:last:pr-0 ${
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
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isDark ? "text-[#D89A43]" : "text-[#B07424]"
                    }`}
                  >
                    STAGE // {s.step}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full transition-transform ${
                      isCurrent
                        ? "scale-125 bg-[#D89A43]"
                        : isDark
                          ? "bg-white/20"
                          : "bg-slate-300"
                    }`}
                  />
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
                  className={`block font-mono text-[10px] uppercase tracking-wider ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Key Deliverable
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
