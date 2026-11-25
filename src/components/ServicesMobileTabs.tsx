"use client";

import { useEffect, useState } from "react";

export interface ServiceMobileTabItem {
  id: string;
  label: string;
}

const DEFAULT_TABS: ServiceMobileTabItem[] = [
  { id: "strategy", label: "Strategy & Advisory" },
  { id: "governance", label: "Identity Governance" },
  { id: "directory", label: "Lifecycle Automation" },
  { id: "auth-sso", label: "Authentication & SSO" },
  { id: "pam", label: "Privileged Access" },
  { id: "implementation", label: "Implementation & Support" },
];

export function ServicesMobileTabs({
  tabs = DEFAULT_TABS,
}: {
  tabs?: ServiceMobileTabItem[];
}) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id || "strategy");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-130px 0px -55% 0px",
        threshold: [0.1, 0.3],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <nav
      aria-label="Consulting Services Quick Navigation"
      className="sticky top-[68px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md sm:top-[76px] lg:hidden"
    >
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
        <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab, idx) => {
            const isActive = activeId === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={() => setActiveId(tab.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[11px] font-semibold tracking-wide whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-[#D89A43] ${
                  isActive
                    ? "border-[#D89A43] bg-[#0B1424] text-white"
                    : "border-slate-200 bg-[#F7F6F2] text-[#0B1424] hover:border-[#D89A43]/60"
                }`}
              >
                <span className={isActive ? "text-[#D89A43]" : "text-slate-400"}>
                  0{idx + 1}
                </span>
                <span>{tab.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
