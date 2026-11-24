"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  GraduationCap,
  KeyRound,
  Users,
  Workflow,
} from "lucide-react";

interface HomeHeroProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  bgImage?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

const SERVICE_SLIDER_ITEMS = [
  {
    num: "01",
    label: "IAM Strategy & Advisory",
    summary:
      "Understand identity risks, access gaps, operating processes, and priorities for improvement.",
    href: "/services#strategy",
    ctaLabel: "View Strategy Scope",
    Icon: Compass,
  },
  {
    num: "02",
    label: "Identity Governance",
    summary:
      "Improve access requests, approvals, access reviews, role design, and least-privilege oversight.",
    href: "/services#governance",
    ctaLabel: "View Governance Scope",
    Icon: Users,
  },
  {
    num: "03",
    label: "Lifecycle Automation",
    summary:
      "Reduce manual work across joiner, mover, and leaver provisioning and offboarding workflows.",
    href: "/services#directory",
    ctaLabel: "View Lifecycle Scope",
    Icon: Workflow,
  },
  {
    num: "04",
    label: "Privileged Access (PAM)",
    summary:
      "Strengthen how users and administrators authenticate and govern sensitive privileged systems.",
    href: "/services#pam",
    ctaLabel: "View PAM Scope",
    Icon: KeyRound,
  },
  {
    num: "05",
    label: "IAM Academy",
    summary:
      "Structured career pathways, hands-on platform practice, and mentorship from Foundation to Leadership.",
    href: "/academy",
    ctaLabel: "Explore IAM Academy",
    Icon: GraduationCap,
  },
] as const;

export function HomeHero({
  badge,
  headline,
  subheadline,
  bgImage,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
}: HomeHeroProps = {}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const displayBadge =
    badge || "Identity Security • IAM Consulting • Professional Learning";
  const displayHeadline =
    headline || "Secure identities. Simplify access. Strengthen your business.";
  const displaySubheadline =
    subheadline ||
    "The IAM Lab supports organisations with practical identity and access management expertise — from access governance and identity lifecycle automation to authentication, privileged access and IAM improvement initiatives. We also help professionals build meaningful IAM skills through structured learning and hands-on guidance.";
  const displayBg = bgImage || "/brand/hero-enterprise.jpg";
  const primaryLabel = ctaPrimaryLabel || "Discuss an IAM Project";
  const primaryHref = ctaPrimaryHref || "/contact?type=enterprise_consulting";
  const secondaryLabel = ctaSecondaryLabel || "Explore IAM Academy";
  const secondaryHref = ctaSecondaryHref || "/academy";

  const currentItem = SERVICE_SLIDER_ITEMS[activeSlide] || SERVICE_SLIDER_ITEMS[0];
  const ActiveIcon = currentItem.Icon;

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424]">
      {/* Full-bleed twilight boardroom photography */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={displayBg}
          alt="Senior cybersecurity architects reviewing enterprise topology inside a London boardroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424]/95 via-[#0B1424]/82 to-[#0B1424]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1424] via-transparent to-[#0B1424]/30" />
      </div>

      {/* Subtle animated architectural wireframe meridian arc (right desktop accent) */}
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-0 hidden w-1/2 overflow-hidden opacity-30 lg:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 600 600" className="h-full w-full">
          <motion.circle
            cx="460"
            cy="280"
            r="220"
            fill="none"
            stroke="#D89A43"
            strokeWidth="0.75"
            strokeDasharray="6 10"
            style={{ originX: "460px", originY: "280px" }}
            animate={shouldReduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="460"
            cy="280"
            r="165"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.2"
            strokeWidth="0.75"
            strokeDasharray="3 8"
            style={{ originX: "460px", originY: "280px" }}
            animate={shouldReduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 pb-16 sm:px-8 sm:pt-32 sm:pb-20 lg:px-12 lg:pt-36 lg:pb-24">
        <div className="max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.22em] text-[#D89A43] uppercase">
              {displayBadge}
            </span>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.08]"
          >
            {displayHeadline}
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
          >
            {displaySubheadline}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-stretch gap-3.5 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-4"
          >
            <Link
              href={primaryHref}
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap bg-[#D89A43] px-6 py-3.5 text-xs font-bold tracking-[0.13em] text-[#0B1424] uppercase shadow-lg transition-colors hover:bg-[#e5aa57] sm:px-7"
            >
              {primaryLabel} &rarr;
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap border border-white/25 bg-white/[0.06] px-6 py-3.5 text-xs font-semibold tracking-[0.11em] text-white uppercase backdrop-blur-sm transition-colors hover:border-[#D89A43] hover:text-[#D89A43] sm:px-7"
            >
              {secondaryLabel}
            </Link>
          </motion.div>
        </div>

        {/* Manually Controlled Interactive Numbered Service Slider */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 border-t border-white/15 pt-7 lg:mt-18"
          aria-label="Core Services & Academy Navigator"
        >
          <div
            role="tablist"
            aria-label="Select a capability area"
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5"
          >
            {SERVICE_SLIDER_ITEMS.map((item, idx) => {
              const isSelected = idx === activeSlide;
              return (
                <button
                  key={item.num}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`hero-slide-panel-${item.num}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`group relative flex items-center gap-2.5 border px-3.5 py-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D89A43] ${
                    isSelected
                      ? "border-[#D89A43] bg-[#14243B] shadow-sm"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center font-mono text-[11px] font-bold transition-colors ${
                      isSelected
                        ? "bg-[#D89A43] text-[#0B1424]"
                        : "bg-white/10 text-[#D89A43] group-hover:bg-white/15"
                    }`}
                  >
                    {item.num}
                  </span>
                  <span
                    className={`text-xs font-semibold leading-snug ${
                      isSelected
                        ? "text-white"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={`hero-slide-panel-${currentItem.num}`}
            role="tabpanel"
            className="mt-3 border border-white/15 bg-[#08101E]/90 px-5 py-4 backdrop-blur-sm sm:px-6 sm:py-5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.num}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#D89A43]/40 bg-[#14243B] text-[#D89A43]">
                    <ActiveIcon className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {currentItem.label}
                    </p>
                    <p className="mt-0.5 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                      {currentItem.summary}
                    </p>
                  </div>
                </div>

                <Link
                  href={currentItem.href}
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap border border-[#D89A43]/50 bg-[#14243B] px-4 py-2 text-xs font-bold tracking-wider text-[#D89A43] uppercase transition-colors hover:bg-[#D89A43] hover:text-[#0B1424]"
                >
                  <span>{currentItem.ctaLabel}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
