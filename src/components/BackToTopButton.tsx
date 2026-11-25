"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 360);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#D89A43]/60 bg-[#0B1424] text-[#D89A43] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D89A43] hover:bg-[#14243B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D89A43] focus:ring-offset-2 sm:right-6 sm:bottom-6 sm:h-13 sm:w-13 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}
