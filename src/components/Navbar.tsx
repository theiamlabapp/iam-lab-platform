"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services & Solutions" },
  { href: "/academy", label: "IAM Academy" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (mobileOpen) {
      wasOpenRef.current = true;
      closeBtnRef.current?.focus();

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
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
      triggerBtnRef.current?.focus();
    }
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030712]/85 backdrop-blur-xl transition-colors">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#d6a15c] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#050a14]"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="The IAM Lab — Return to homepage"
            className="inline-flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a15c]"
          >
            <BrandLogo priority surface="card" className="w-[84px] sm:w-[98px]" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-7 lg:flex xl:gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a15c] ${
                    isActive ? "font-semibold text-white" : "text-slate-300"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] rounded-full bg-[#d6a15c] shadow-[0_0_8px_rgba(214,161,92,0.6)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact?type=enterprise_consulting"
              className="hidden items-center justify-center rounded-lg bg-[#d6a15c] px-4 py-2.5 text-xs font-semibold text-[#050a14] shadow-sm transition-all hover:bg-[#e4b26f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c] sm:inline-flex sm:text-sm"
            >
              Talk to an IAM Specialist
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#d6a15c] px-3.5 py-2 text-xs font-semibold text-[#050a14] sm:hidden"
            >
              Contact
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              ref={triggerBtnRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white transition-colors hover:border-[#d6a15c]/55 hover:bg-white/[0.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c] lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-50 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#02050c]/75 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        <aside
          className={`absolute top-0 right-0 flex h-dvh max-h-dvh w-full max-w-sm flex-col border-l border-white/12 bg-[#07101f]/98 text-slate-200 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Top */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
            <BrandLogo surface="card" className="w-[80px]" />

            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              tabIndex={mobileOpen ? 0 : -1}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-white transition-colors hover:border-[#d6a15c]/55 hover:bg-white/[0.1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c]"
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

          {/* Drawer Content with full scrollability */}
          <div className="drawer-scroll flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-6 py-6">
            <nav className="space-y-1.5" aria-label="Mobile Navigation Links">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    tabIndex={mobileOpen ? 0 : -1}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#111c2f] font-semibold text-[#d6a15c]"
                        : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="text-xs text-slate-500">
                      &rarr;
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-white/10 pt-6">
              <Link
                href="/contact?type=enterprise_consulting"
                tabIndex={mobileOpen ? 0 : -1}
                className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#d6a15c] px-4 py-3 text-sm font-semibold text-[#050a14] shadow-sm transition-all hover:bg-[#e4b26f]"
              >
                Talk to an IAM Specialist
              </Link>

              <div className="mt-6 space-y-2 text-xs text-slate-400">
                <p className="font-semibold text-slate-300">Direct Inquiries:</p>
                <a
                  href="mailto:info@theiamlab.com"
                  tabIndex={mobileOpen ? 0 : -1}
                  className="inline-flex items-center gap-1.5 text-sm text-[#d6a15c] hover:underline"
                >
                  info@theiamlab.com
                </a>
                <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
                  &ldquo;Secure identities. Simplify access. Strengthen your
                  business.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
