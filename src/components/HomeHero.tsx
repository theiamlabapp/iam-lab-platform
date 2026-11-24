"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

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

const DOMAIN_BAR = [
  { code: "01", label: "IAM Strategy & Advisory", href: "/services#strategy" },
  { code: "02", label: "Identity Governance (IGA)", href: "/services#governance" },
  { code: "03", label: "Privileged Access (PAM)", href: "/services#pam" },
  { code: "04", label: "IAM Academy & Mentorship", href: "/academy" },
];

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
  const shouldReduceMotion = useReducedMotion();

  const displayBadge = badge || "Identity Security • IAM Consulting • Professional Learning";
  const displayHeadline =
    headline || "Secure identities. Simplify access. Strengthen your business.";
  const displaySubheadline =
    subheadline ||
    "The IAM Lab supports organisations with practical Identity and Access Management expertise — from access governance and lifecycle automation to authentication, privileged access, and capability enablement.";
  const displayBg = bgImage || "/brand/hero-enterprise.jpg";
  const primaryLabel = ctaPrimaryLabel || "Discuss an IAM Project";
  const primaryHref = ctaPrimaryHref || "/contact?type=enterprise_consulting";
  const secondaryLabel = ctaSecondaryLabel || "Explore IAM Academy";
  const secondaryHref = ctaSecondaryHref || "/academy";

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424]">
      {/* Full-bleed twilight boardroom & enterprise skyline photography */}
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
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 pb-20 sm:px-8 sm:pt-32 sm:pb-24 lg:px-12 lg:pt-36 lg:pb-28">
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
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href={primaryHref}
              className="inline-flex min-h-[50px] items-center justify-center bg-[#D89A43] px-8 py-3.5 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase shadow-lg transition-colors hover:bg-[#e5aa57]"
            >
              {primaryLabel} &rarr;
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex min-h-[50px] items-center justify-center border border-white/25 bg-white/[0.06] px-8 py-3.5 text-xs font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
            >
              {secondaryLabel}
            </Link>
          </motion.div>
        </div>

        {/* Architectural Horizon Anchor Strip (CrowdStrike / Idira inspired clean utility rail) */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-16 border-t border-white/15 pt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8"
        >
          {DOMAIN_BAR.map((item) => (
            <Link
              key={item.code}
              href={item.href}
              className="group flex items-baseline justify-between gap-3 border-b border-white/10 pb-3 transition-colors hover:border-[#D89A43] lg:border-b-0 lg:pb-0"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] font-bold text-[#D89A43]">
                  {item.code}
                </span>
                <span className="text-xs font-semibold text-slate-200 transition-colors group-hover:text-white">
                  {item.label}
                </span>
              </div>
              <span
                className="font-mono text-xs text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-[#D89A43]"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HomeHero;
