"use client";

import { motion } from "motion/react";

const TELEMETRY_NODES = [
  {
    code: "DIR-SYNC",
    name: "Microsoft Entra ID & Hybrid Cloud",
    status: "Synchronized",
    metric: "4,820 Identities Attested",
    state: "optimal",
  },
  {
    code: "PAM-VAULT",
    name: "Privileged Access Management (PAM)",
    status: "Zero Standing Admins",
    metric: "JIT Ephemeral Elevation Active",
    state: "active",
  },
  {
    code: "IGA-AUDIT",
    name: "Identity Governance & Compliance",
    status: "Campaign Verified",
    metric: "100% Segregation of Duties",
    state: "optimal",
  },
  {
    code: "SCIM-AUTO",
    name: "Automated Joiner-Mover-Leaver",
    status: "Real-Time Pipeline",
    metric: "< 1hr Provisioning Latency",
    state: "active",
  },
] as const;

export function HeroTelemetryHud() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden border border-white/15 bg-[#07101f]/85 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8"
    >
      {/* Ambient glass glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#d6a15c]/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#d6a15c] uppercase">
            IAM Architecture Telemetry // Live
          </span>
        </div>
        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
          Engine v2.6
        </span>
      </div>

      {/* Security Posture Status Banner */}
      <div className="mt-5 flex items-center justify-between bg-white/[0.03] border border-white/5 p-3.5">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Global Posture Standard
          </p>
          <p className="text-sm font-bold text-white tracking-tight">
            NIST SP 800-207 Zero-Trust Architecture
          </p>
        </div>
        <span className="border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
          Enforced
        </span>
      </div>

      {/* Telemetry Stream */}
      <div className="mt-5 space-y-3">
        {TELEMETRY_NODES.map((node) => (
          <div
            key={node.code}
            className="group flex flex-col justify-between gap-1 border border-white/5 bg-[#030712]/60 p-3.5 transition-colors hover:border-[#d6a15c]/40 hover:bg-[#030712]/90 sm:flex-row sm:items-center"
          >
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-[10px] font-bold text-[#d6a15c]">
                {node.code}
              </span>
              <span className="text-xs font-semibold text-white">
                {node.name}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:justify-end">
              <span className="font-mono text-[11px] text-slate-400">
                {node.metric}
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Quantifiable Impact Footnote */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
        <div className="border-r border-white/10 pr-2">
          <p className="font-mono text-xl font-extrabold text-[#d6a15c] sm:text-2xl">
            &lt; 1hr
          </p>
          <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400 mt-1">
            Day-1 Access
          </p>
        </div>
        <div className="border-r border-white/10 pr-2">
          <p className="font-mono text-xl font-extrabold text-white sm:text-2xl">
            Zero
          </p>
          <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400 mt-1">
            Standing Admins
          </p>
        </div>
        <div>
          <p className="font-mono text-xl font-extrabold text-[#d6a15c] sm:text-2xl">
            100%
          </p>
          <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400 mt-1">
            Session Audit
          </p>
        </div>
      </div>
    </motion.div>
  );
}
