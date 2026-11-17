"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const PLATFORMS = [
  "Microsoft Entra ID",
  "SailPoint",
  "CyberArk",
  "Okta",
  "Ping Identity",
  "Cloud IAM (AWS • Azure • GCP)",
] as const;

export function HomeHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden border-b border-white/10 bg-[#030712] py-24 sm:py-32 lg:py-40">
      {/* 1. Cinematic Background Photographic Layer with Vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/brand/hero-bg.jpg"
          alt="Enterprise Identity Architecture Background"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-screen scale-105"
        />
        {/* Multi-layered gradient overlays for legibility & atmospheric glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/92 to-[#030712]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/80" />
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6a15c]/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 w-full">
        <div className="max-w-4xl">
          {/* Architectural Technical Eyebrow — NO rounded pill badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.28em] text-[#d6a15c] uppercase"
          >
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
            <span>Enterprise Identity Security &bull; Advisory &bull; Learning</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl lg:leading-[1.08]"
          >
            Secure identities. <br />
            <span className="bg-gradient-to-r from-[#ebd0a3] via-[#d6a15c] to-amber-200 bg-clip-text text-transparent">
              Simplify access.
            </span> <br />
            Strengthen your business.
          </motion.h1>

          {/* Narrative Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed"
          >
            The IAM Lab helps organisations establish resilient access governance,
            eliminate privilege creep, and automate identity lifecycles &mdash; while
            training the next generation of enterprise IAM practitioners with hands-on,
            production-tested engineering capability.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-none border border-[#d6a15c] bg-[#d6a15c] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#030712] shadow-[0_10px_30px_rgba(214,161,92,0.25)] transition-all hover:bg-[#e4b26f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c]"
            >
              <span>Talk to an IAM Specialist</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>

            <Link
              href="/academy"
              className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-none border border-white/25 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-100 backdrop-blur-md transition-all hover:border-[#d6a15c] hover:bg-white/[0.08] hover:text-white"
            >
              <span>Explore IAM Academy</span>
              <span aria-hidden="true" className="text-[#d6a15c]">&rarr;</span>
            </Link>
          </motion.div>

          {/* Technical Telemetry Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-16 border-t border-white/12 pt-8"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#d6a15c] uppercase shrink-0">
                Core Stack &bull;
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-slate-400">
                {PLATFORMS.map((p, idx) => (
                  <span key={p} className="flex items-center gap-2">
                    <span className="text-white/30">{idx > 0 && "/"}</span>
                    <span className="text-slate-300">{p}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
