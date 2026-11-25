"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";

export interface NavbarLinkItem {
  href: string;
  label: string;
}

const DEFAULT_NAV_LINKS: NavbarLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services & Solutions" },
  { href: "/academy", label: "IAM Academy" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({
  whatsappHref,
  navLinks = DEFAULT_NAV_LINKS,
  ctaLabel = "Talk to an IAM Specialist",
  logoSrc,
  officialEmail = "info@theiamlab.com",
  whatsappDisplay = "+234 803 865 2760",
}: {
  whatsappHref?: string;
  navLinks?: NavbarLinkItem[];
  ctaLabel?: string;
  logoSrc?: string;
  officialEmail?: string;
  whatsappDisplay?: string;
} = {}) {
  const specialistHref =
    whatsappHref ||
    "https://wa.me/2348038652760?text=Hello%20The%20IAM%20Lab%20team%2C%20I%20would%20like%20to%20speak%20with%20an%20IAM%20specialist.";
  const links = navLinks.length > 0 ? navLinks : DEFAULT_NAV_LINKS;
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
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(11,20,36,0.04)] transition-colors">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#D89A43] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:uppercase focus:text-[#0B1424]"
        >
          Skip to main content
        </a>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:px-12">
          <Link
            href="/"
            aria-label="The IAM Lab — Home"
            className="inline-flex shrink-0 items-center py-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89A43]"
          >
            <BrandLogo
              priority
              variant="dark"
              surface="plain"
              srcOverride={logoSrc}
              className="w-[82px] sm:w-[96px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden items-center gap-8 lg:flex xl:gap-10"
          >
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-1 text-[12px] font-semibold tracking-[0.09em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89A43] ${
                    isActive
                      ? "text-[#0B1424]"
                      : "text-slate-600 hover:text-[#0B1424]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-[17px] left-0 right-0 h-[2.5px] bg-[#D89A43]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Mobile Trigger */}
          <div className="flex items-center gap-3">
            <a
              href={specialistHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center border border-[#D89A43] bg-[#D89A43] px-5 py-2.5 text-[11px] font-bold tracking-[0.12em] text-[#0B1424] uppercase shadow-xs transition-all hover:bg-[#c58832] hover:border-[#c58832] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1424] sm:inline-flex"
            >
              {ctaLabel}
            </a>

            <button
              ref={triggerBtnRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu-drawer"
              className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 bg-white text-[#0B1424] transition-colors hover:border-[#D89A43] lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Clean White Theme) */}
      {mobileOpen && (
        <div
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex flex-col bg-white text-[#0B1424] lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <BrandLogo
              variant="dark"
              surface="plain"
              srcOverride={logoSrc}
              className="w-[84px]"
            />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close mobile navigation"
              className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 text-[#0B1424] hover:border-[#D89A43]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <nav className="flex flex-col divide-y divide-slate-100">
              {links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between py-4 text-base font-bold tracking-wide uppercase transition-colors ${
                      isActive ? "text-[#B07424]" : "text-[#0B1424] hover:text-[#B07424]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[#D89A43]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-10 border-t border-slate-200 pt-8">
              <a
                href={specialistHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center bg-[#D89A43] px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-[#0B1424] uppercase hover:bg-[#c58832]"
              >
                {ctaLabel}
              </a>
              <p className="mt-6 text-xs text-slate-500">
                {officialEmail} &middot; WhatsApp {whatsappDisplay}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
