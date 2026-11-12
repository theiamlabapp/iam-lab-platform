"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";

const SOCIAL_CHANNELS = [
  {
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "X",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M4 4l16 16M20 4 4 20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      closeRef.current?.focus();

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      <header className="relative z-30 w-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#d6a15c] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#050a14]"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pt-5 pb-2 sm:px-8 sm:pt-7 lg:px-12">
          <a
            href="#top"
            aria-label="The IAM Lab — Home"
            className="inline-flex shrink-0 items-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a15c]"
          >
            <BrandLogo priority surface="card" className="w-[86px] sm:w-[104px]" />
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open brand information menu"
            aria-expanded={open}
            aria-controls="iam-menu-overlay"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition-colors hover:border-[#d6a15c]/55 hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c]"
          >
            <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
              <span className="block h-[1.5px] w-full rounded-full bg-current" />
              <span className="ml-auto block h-[1.5px] w-3.5 rounded-full bg-[#d6a15c]" />
            </span>
          </button>
        </div>
      </header>

      {/* Slide-out Glass Menu Overlay */}
      <div
        id="iam-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="About The IAM Lab"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#02050c]/75 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        <aside
          className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col justify-between border-l border-white/12 bg-[#07101f]/95 p-6 text-slate-200 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out sm:p-9 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <BrandLogo surface="card" className="w-[84px]" />

              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-white transition-colors hover:border-[#d6a15c]/55 hover:bg-white/[0.1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="font-mono text-[11px] font-semibold tracking-[0.24em] text-[#d6a15c] uppercase">
                  About The IAM Lab
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-200">
                  The IAM Lab is an Identity and Access Management consulting
                  and professional learning brand helping organisations
                  strengthen identity security and individuals develop their
                  careers in IAM.
                </p>
              </div>

              <div className="border-l-2 border-[#b27936]/70 pl-4">
                <p className="text-sm font-medium tracking-wide text-slate-300">
                  &ldquo;Secure identities. Simplify access. Strengthen your
                  business.&rdquo;
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="font-mono text-[11px] font-semibold tracking-[0.24em] text-slate-400 uppercase">
                  Direct Enquiries
                </p>
                <a
                  href="mailto:info@theiamlab.com"
                  tabIndex={open ? 0 : -1}
                  className="mt-3 inline-flex items-center gap-2.5 text-base font-medium text-white transition-colors hover:text-[#d6a15c] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a15c]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 text-[#d6a15c]"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>info@theiamlab.com</span>
                </a>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="font-mono text-[11px] font-semibold tracking-[0.24em] text-slate-400 uppercase">
                  Social Channels
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {SOCIAL_CHANNELS.map((social) => (
                    <span
                      key={social.name}
                      aria-label={`${social.name} — launching soon`}
                      title={`${social.name} — launching soon`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 opacity-50"
                    >
                      {social.icon}
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 text-xs text-slate-400">
                  Official social channels launching alongside the full
                  platform.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate-400">
            <span>theiamlab.com</span>
            <span className="font-mono text-[11px] text-[#d6a15c]">
              COMING SOON
            </span>
          </div>
        </aside>
      </div>
    </>
  );
}
