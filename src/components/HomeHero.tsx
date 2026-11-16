"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ECOSYSTEM_BADGES = [
  "Microsoft Entra ID",
  "SailPoint",
  "CyberArk",
  "Okta",
  "Ping Identity",
  "Cloud IAM (AWS • Azure • GCP)",
] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-blue-600/10 to-transparent blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-0 -z-10 h-[400px] w-[500px] translate-x-1/3 rounded-full bg-amber-500/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.08] px-4 py-1.5 text-xs font-semibold tracking-widest text-amber-300 uppercase backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Enterprise Identity Security &amp; Professional Learning</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.1]"
          >
            Secure identities.{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              Simplify access.
            </span>{" "}
            Strengthen your business.
          </motion.h1>

          {/* Supporting Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed"
          >
            The IAM Lab helps organisations establish resilient access governance,
            eliminate privilege creep, and automate identity lifecycles &mdash; while
            training the next generation of enterprise IAM practitioners with practical,
            battle-tested capability.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d6a15c] to-[#e4b26f] px-7 py-3.5 text-sm font-semibold text-[#050a14] shadow-[0_10px_25px_rgba(214,161,92,0.25)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c] sm:w-auto"
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
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-amber-400/40 hover:bg-white/[0.08] hover:text-white sm:w-auto"
            >
              <span>Explore IAM Academy</span>
              <span aria-hidden="true" className="text-amber-400">&rarr;</span>
            </Link>
          </motion.div>

          {/* Ecosystem / Capability Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-14 border-t border-white/10 pt-8"
          >
            <p className="font-mono text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Enterprise Platforms &amp; Architecture Standards
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {ECOSYSTEM_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
