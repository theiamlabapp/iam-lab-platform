import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { CopyrightYear } from "./CopyrightYear";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0B1424] text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-5">
            <Link
              href="/"
              aria-label="The IAM Lab"
              className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89A43]"
            >
              <BrandLogo surface="card" className="w-[100px] sm:w-[110px]" />
            </Link>

            <p className="text-base font-semibold text-white">
              Secure identities. Simplify access. Strengthen your business.
            </p>

            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              The IAM Lab is an independent Identity and Access Management advisory,
              enterprise security engineering, and practitioner capability enablement brand
              operating globally from London, United Kingdom.
            </p>

            <div className="pt-2">
              <a
                href="mailto:info@theiamlab.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#D89A43] transition-colors hover:text-[#ebd0a3]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
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
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3 lg:col-span-2">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#D89A43] uppercase">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-400 transition-colors hover:text-white">
                  Services &amp; Solutions
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-slate-400 transition-colors hover:text-white">
                  IAM Academy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 transition-colors hover:text-white">
                  Contact &amp; Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Consulting Services */}
          <div className="space-y-3 lg:col-span-3">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#D89A43] uppercase">
              Consulting Pillars
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#strategy" className="text-slate-400 transition-colors hover:text-white">
                  IAM Strategy &amp; Advisory
                </Link>
              </li>
              <li>
                <Link href="/services#governance" className="text-slate-400 transition-colors hover:text-white">
                  Identity Governance (IGA)
                </Link>
              </li>
              <li>
                <Link href="/services#pam" className="text-slate-400 transition-colors hover:text-white">
                  Privileged Access (PAM)
                </Link>
              </li>
              <li>
                <Link href="/services#lifecycle" className="text-slate-400 transition-colors hover:text-white">
                  Lifecycle Automation (JML)
                </Link>
              </li>
              <li>
                <Link href="/services#auth-sso" className="text-slate-400 transition-colors hover:text-white">
                  Access Management &amp; SSO
                </Link>
              </li>
            </ul>
          </div>

          {/* Academy & Resources */}
          <div className="space-y-3 lg:col-span-2">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#D89A43] uppercase">
              Education
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/academy" className="text-slate-400 transition-colors hover:text-white">
                  Career Pathways
                </Link>
              </li>
              <li>
                <a
                  href="https://selar.com/m/chiemezie-uzoma1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Selar Bookstore &rarr;
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="text-slate-500 transition-colors hover:text-slate-300">
                  Staff Console
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; <CopyrightYear /> The IAM Lab. All rights reserved. Registered in England &amp; Wales.
          </p>
          <div className="flex items-center gap-6">
            <span>Enterprise Security</span>
            <span>Zero-Trust Architecture</span>
            <span>London, UK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
