"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  GraduationCap,
  KeyRound,
  Users,
  Workflow,
  type LucideIcon,
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
  carouselItems?: Array<Record<string, unknown>>;
}

interface HeroServiceCard {
  id: string;
  label: string;
  summary: string;
  href: string;
  Icon: LucideIcon;
}

const HERO_SERVICE_CARDS: HeroServiceCard[] = [
  {
    id: "strategy",
    label: "IAM Strategy & Advisory",
    summary:
      "Assess identity risks, governance maturity, and improvement priorities with a practical roadmap.",
    href: "/services#strategy",
    Icon: Compass,
  },
  {
    id: "governance",
    label: "Identity Governance",
    summary:
      "Strengthen access requests, approvals, access reviews, role models, and least-privilege oversight.",
    href: "/services#governance",
    Icon: Users,
  },
  {
    id: "lifecycle",
    label: "Lifecycle Automation",
    summary:
      "Streamline joiner, mover, and leaver provisioning across directories and business systems.",
    href: "/services#directory",
    Icon: Workflow,
  },
  {
    id: "pam",
    label: "Privileged Access (PAM)",
    summary:
      "Introduce structured privileged access controls, role elevation workflows, and clear accountability.",
    href: "/services#pam",
    Icon: KeyRound,
  },
  {
    id: "academy",
    label: "IAM Academy",
    summary:
      "Structured career pathways, practical scenario labs, mentorship, and curated IAM resources.",
    href: "/academy",
    Icon: GraduationCap,
  },
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
  carouselItems,
}: HomeHeroProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  const resolvedCards: HeroServiceCard[] =
    Array.isArray(carouselItems) && carouselItems.length > 0
      ? carouselItems.map((item, idx) => {
          const fallback = HERO_SERVICE_CARDS[idx % HERO_SERVICE_CARDS.length];
          return {
            id: String(item.id || fallback.id),
            label: String(item.label || item.title || item.name || fallback.label),
            summary: String(item.summary || item.description || fallback.summary),
            href: String(item.href || fallback.href),
            Icon: fallback.Icon,
          };
        })
      : HERO_SERVICE_CARDS;

  const displayBadge =
    badge || "Identity Security • IAM Consulting • Professional Learning";
  const displayHeadline =
    headline || "Secure identities. Simplify access. Strengthen your business.";
  const displaySubheadline =
    subheadline ||
    "The IAM Lab supports organisations with practical identity and access management expertise, from access governance and identity lifecycle automation to authentication, privileged access and IAM improvement initiatives. We also help professionals build meaningful IAM skills through structured learning and hands-on guidance.";
  const displayBg = bgImage || "/brand/hero-enterprise.jpg";
  const primaryLabel = ctaPrimaryLabel || "Discuss an IAM Project";
  const primaryHref = ctaPrimaryHref || "/contact?type=enterprise_consulting";
  const secondaryLabel = ctaSecondaryLabel || "Explore IAM Academy";
  const secondaryHref = ctaSecondaryHref || "/academy";

  // Smooth continuous auto-scrolling marquee state with pause-on-hover/focus & swipe/drag
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const isPausedRef = useRef(false);
  const dragRef = useRef<{ active: boolean; startX: number; moved: boolean }>({
    active: false,
    startX: 0,
    moved: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (firstSetRef.current) {
        setWidthRef.current = firstSetRef.current.scrollWidth;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let rafId = 0;
    let lastTime = performance.now();
    const speedPxPerSec = 36;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const setWidth = setWidthRef.current;
      if (
        !isPausedRef.current &&
        !dragRef.current.active &&
        setWidth > 0 &&
        trackRef.current
      ) {
        offsetRef.current += speedPxPerSec * dt;
        if (offsetRef.current >= setWidth) {
          offsetRef.current -= setWidth;
        }
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [shouldReduceMotion]);

  const applyOffset = (nextOffset: number) => {
    const setWidth = setWidthRef.current;
    if (setWidth > 0) {
      let wrapped = nextOffset % setWidth;
      if (wrapped < 0) wrapped += setWidth;
      offsetRef.current = wrapped;
    } else {
      offsetRef.current = Math.max(0, nextOffset);
    }
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
    }
  };

  const stepCarousel = (direction: -1 | 1) => {
    const stepSize = 336;
    applyOffset(offsetRef.current + direction * stepSize);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    dragRef.current = { active: true, startX: e.clientX, moved: false };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 4) dragRef.current.moved = true;
    dragRef.current.startX = e.clientX;
    applyOffset(offsetRef.current - dx);
  };

  const handlePointerUpOrLeave = () => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      setIsDragging(false);
    }
  };

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

      {/* Subtle animated architectural wireframe meridian arc */}
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

      {/* Single Static Hero Content + Automated Service Card Carousel */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-20 pb-14 sm:px-8 sm:pt-28 sm:pb-16 lg:px-12 lg:pt-32 lg:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#D89A43] uppercase">
              {displayBadge}
            </span>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-[1.9rem] leading-[1.12] font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.08]"
          >
            {displayHeadline}
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-200 sm:text-lg"
          >
            {displaySubheadline}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-stretch gap-3.5 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-4"
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

        {/* Continuous Horizontal Moving 5-Card Service Carousel */}
        <div
          className="mt-12 border-t border-white/15 pt-7 lg:mt-16"
          aria-label="Core Services & Academy Carousel"
          onMouseEnter={() => {
            isPausedRef.current = true;
          }}
          onMouseLeave={() => {
            isPausedRef.current = false;
            handlePointerUpOrLeave();
          }}
          onFocusCapture={() => {
            isPausedRef.current = true;
          }}
          onBlurCapture={() => {
            isPausedRef.current = false;
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-[#D89A43] uppercase">
              Practice Areas &amp; Capability
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepCarousel(-1)}
                aria-label="Previous service card"
                className="inline-flex h-8 w-8 items-center justify-center border border-white/20 bg-white/[0.04] text-white transition-colors hover:border-[#D89A43] hover:text-[#D89A43] focus-visible:outline-2 focus-visible:outline-[#D89A43]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => stepCarousel(1)}
                aria-label="Next service card"
                className="inline-flex h-8 w-8 items-center justify-center border border-white/20 bg-white/[0.04] text-white transition-colors hover:border-[#D89A43] hover:text-[#D89A43] focus-visible:outline-2 focus-visible:outline-[#D89A43]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className={`relative overflow-hidden select-none touch-pan-y ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUpOrLeave}
            onPointerCancel={handlePointerUpOrLeave}
          >
            {shouldReduceMotion ? (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {resolvedCards.map((card) => {
                  const CardIcon = card.Icon;
                  return (
                    <Link
                      key={card.id}
                      href={card.href}
                      className="flex min-h-[168px] w-[275px] shrink-0 flex-col justify-between border border-white/15 bg-[#08101E]/85 p-5 transition-colors hover:border-[#D89A43]/70 sm:w-[300px]"
                    >
                      <div>
                        <div className="flex h-9 w-9 items-center justify-center border border-[#D89A43]/40 bg-[#14243B] text-[#D89A43]">
                          <CardIcon className="h-4 w-4" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-sm font-bold text-white">
                          {card.label}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                          {card.summary}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div ref={trackRef} className="flex w-max will-change-transform">
                <div ref={firstSetRef} className="flex shrink-0 gap-4 pr-4">
                  {resolvedCards.map((card) => {
                    const CardIcon = card.Icon;
                    return (
                      <Link
                        key={`primary-${card.id}`}
                        href={card.href}
                        onClick={(e) => {
                          if (dragRef.current.moved) e.preventDefault();
                        }}
                        className="group flex min-h-[172px] w-[272px] shrink-0 flex-col justify-between border border-white/15 bg-[#08101E]/85 p-5 backdrop-blur-sm transition-colors hover:border-[#D89A43]/75 hover:bg-[#14243B]/75 sm:w-[304px] lg:w-[320px]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex h-9 w-9 items-center justify-center border border-[#D89A43]/40 bg-[#14243B] text-[#D89A43] transition-colors group-hover:bg-[#D89A43] group-hover:text-[#0B1424]">
                              <CardIcon className="h-4 w-4" aria-hidden="true" />
                            </div>
                            <span
                              className="font-mono text-xs text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-[#D89A43]"
                              aria-hidden="true"
                            >
                              &rarr;
                            </span>
                          </div>
                          <h3 className="mt-4 text-sm font-bold tracking-tight text-white sm:text-[15px]">
                            {card.label}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                            {card.summary}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
                  {resolvedCards.map((card) => {
                    const CardIcon = card.Icon;
                    return (
                      <Link
                        key={`clone-${card.id}`}
                        href={card.href}
                        tabIndex={-1}
                        onClick={(e) => {
                          if (dragRef.current.moved) e.preventDefault();
                        }}
                        className="group flex min-h-[172px] w-[272px] shrink-0 flex-col justify-between border border-white/15 bg-[#08101E]/85 p-5 backdrop-blur-sm transition-colors hover:border-[#D89A43]/75 hover:bg-[#14243B]/75 sm:w-[304px] lg:w-[320px]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex h-9 w-9 items-center justify-center border border-[#D89A43]/40 bg-[#14243B] text-[#D89A43] transition-colors group-hover:bg-[#D89A43] group-hover:text-[#0B1424]">
                              <CardIcon className="h-4 w-4" aria-hidden="true" />
                            </div>
                            <span className="font-mono text-xs text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-[#D89A43]">
                              &rarr;
                            </span>
                          </div>
                          <h3 className="mt-4 text-sm font-bold tracking-tight text-white sm:text-[15px]">
                            {card.label}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                            {card.summary}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
