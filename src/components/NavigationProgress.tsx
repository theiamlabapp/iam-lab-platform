"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentKey = `${pathname}?${searchParams?.toString() || ""}`;

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prevKey, setPrevKey] = useState(currentKey);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trickleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
    if (trickleTimerRef.current) {
      clearInterval(trickleTimerRef.current);
      trickleTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  };

  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    if (visible) {
      setVisible(false);
      setProgress(0);
    }
  }

  useEffect(() => {
    clearTimers();
  }, [currentKey]);

  useEffect(() => {
    const startNavigation = () => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      clearTimers();

      delayTimerRef.current = setTimeout(() => {
        setVisible(true);
        setProgress(reduced ? 75 : 22);

        if (!reduced) {
          trickleTimerRef.current = setInterval(() => {
            setProgress((p) => (p < 88 ? p + Math.max(2, (90 - p) * 0.14) : p));
          }, 180);
        }

        // Prevent hanging indefinitely if route transition is cancelled
        safetyTimerRef.current = setTimeout(() => {
          clearTimers();
          setVisible(false);
          setProgress(0);
        }, 8000);
      }, 85);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("#")
      ) {
        return;
      }

      try {
        const dest = new URL(anchor.href, window.location.href);
        if (dest.origin !== window.location.origin) return;
        const currentUrl = new URL(window.location.href);
        // Hash scroll within the same page is synchronous
        if (dest.pathname === currentUrl.pathname && dest.search === currentUrl.search) {
          return;
        }
        startNavigation();
      } catch {
        // ignore invalid URLs
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      clearTimers();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className="pointer-events-none fixed top-0 right-0 left-0 z-[100] h-[3px] bg-[#0B1424]/15"
    >
      <div
        className="h-full bg-gradient-to-r from-[#0B1424] via-[#D89A43] to-[#f0c078] transition-all duration-150 ease-out"
        style={{ width: `${Math.min(100, Math.max(8, progress))}%` }}
      />
    </div>
  );
}
