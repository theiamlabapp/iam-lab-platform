"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  direction = "up",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = 20;
  const initial = {
    opacity: 0,
    x: direction === "left" ? -offset : direction === "right" ? offset : 0,
    y: direction === "up" ? offset : direction === "down" ? -offset : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Technical Identity Architecture Node Diagram
 * Interactive zero-trust visualization
 */
export function IdentityNetworkVisual({ className = "" }: { className?: string }) {
  const nodes = [
    { id: "idp", label: "Enterprise IdP", x: "15%", y: "45%", color: "#D99A3D" },
    { id: "pam", label: "Privileged Access (PAM)", x: "42%", y: "20%", color: "#3B82F6" },
    { id: "iga", label: "Identity Governance (IGA)", x: "42%", y: "70%", color: "#10B981" },
    { id: "ztna", label: "Zero Trust Policy Engine", x: "70%", y: "45%", color: "#D99A3D" },
    { id: "target", label: "Critical Cloud Assets", x: "90%", y: "45%", color: "#6366F1" },
  ];

  return (
    <div className={`relative h-64 w-full overflow-hidden rounded-lg border border-white/10 bg-[#0B1424] p-4 ${className}`}>
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
        <span className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Identity Fabric &middot; Active Governance Topology
        </span>
      </div>

      <svg className="absolute inset-0 h-full w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="iamLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D99A3D" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#D99A3D" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Connection lines */}
        <line x1="15%" y1="45%" x2="42%" y2="20%" stroke="url(#iamLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="15%" y1="45%" x2="42%" y2="70%" stroke="url(#iamLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="42%" y1="20%" x2="70%" y2="45%" stroke="url(#iamLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="42%" y1="70%" x2="70%" y2="45%" stroke="url(#iamLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="70%" y1="45%" x2="90%" y2="45%" stroke="url(#iamLineGrad)" strokeWidth="2" />
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded border border-white/20 bg-[#14243B]/90 px-3 py-1.5 shadow-lg backdrop-blur-sm"
          style={{ left: node.x, top: node.y }}
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: node.color }} />
            <span className="font-mono text-[11px] font-medium text-slate-200">{node.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
