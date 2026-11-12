import { BrandLogo } from "./BrandLogo";
import { CopyrightYear } from "./CopyrightYear";

const FOOTER_LINKS = [
  { label: "Home", href: "#top" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "Positioning", href: "#positioning" },
  { label: "Coming Soon", href: "#coming-soon" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b1320] text-slate-300">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-md space-y-4">
            <a
              href="#top"
              aria-label="The IAM Lab — Return to top"
              className="inline-flex rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b27936]"
            >
              <BrandLogo surface="card" className="w-[104px] sm:w-[116px]" />
            </a>

            <div>
              <p className="text-sm font-semibold text-white">The IAM Lab</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                Secure identities. Simplify access. Strengthen your business.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:items-end">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-6 gap-y-2.5"
            >
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 transition-colors hover:text-[#d6a15c] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b27936]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <p className="font-mono text-xs tracking-wide text-slate-400">
              theiamlab.com
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            &copy; <CopyrightYear /> The IAM Lab. All rights reserved.
          </p>
          <p>
            Identity &amp; Access Management Consulting &middot; Professional
            Learning
          </p>
        </div>
      </div>
    </footer>
  );
}
