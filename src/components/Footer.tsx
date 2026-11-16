import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { CopyrightYear } from "./CopyrightYear";

export function Footer() {
  return (
    <footer className="border-t border-[#1e293b] bg-[#07101f] text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-5 lg:col-span-4">
            <Link
              href="/"
              aria-label="The IAM Lab"
              className="inline-flex rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a15c]"
            >
              <BrandLogo surface="card" className="w-[104px] sm:w-[116px]" />
            </Link>

            <p className="text-base font-medium text-white">
              Secure identities. Simplify access. Strengthen your business.
            </p>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              The IAM Lab is an Identity and Access Management consulting,
              identity security, and professional learning brand supporting
              organisations and developing practitioners.
            </p>

            <div className="pt-1">
              <a
                href="mailto:info@theiamlab.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#d6a15c] transition-colors hover:text-[#ebd0a3]"
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
          <div className="space-y-4 lg:col-span-2">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#d6a15c] uppercase">
              Navigation
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  About The IAM Lab
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Services &amp; Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/academy"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  IAM Academy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Contact &amp; Consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-slate-500 transition-colors hover:text-[#d6a15c]"
                >
                  <span>CMS Portal</span>
                  <span className="rounded bg-white/10 px-1 py-0.5 font-mono text-[10px]">
                    Admin
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Consulting Services */}
          <div className="space-y-4 lg:col-span-3">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#d6a15c] uppercase">
              Corporate Services
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>IAM Strategy &amp; Advisory</li>
              <li>Identity Governance (IGA)</li>
              <li>Lifecycle &amp; Provisioning Automation</li>
              <li>Authentication &amp; SSO Modernisation</li>
              <li>Privileged Access Management (PAM)</li>
              <li>Implementation &amp; Technical Support</li>
            </ul>
          </div>

          {/* Learning & Resources */}
          <div className="space-y-4 lg:col-span-3">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#d6a15c] uppercase">
              Professional Learning
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/academy"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  6 IAM Learning Pathways
                </Link>
              </li>
              <li>
                <Link
                  href="/academy#formats"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Mentorship &amp; Labs
                </Link>
              </li>
              <li>
                <a
                  href="https://selar.com/m/chiemezie-uzoma1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#d6a15c] hover:underline"
                >
                  <span>Browse Books &amp; Resources</span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-3 w-3"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12L12 4M12 4H6M12 4V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <Link
                  href="/contact?type=individual"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Career Pathway Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            &copy; <CopyrightYear /> The IAM Lab. Delivered by MUJTEKNIFY
            LIMITED. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <span>Identity Security &middot; Access Management &middot; Education</span>
            <span className="font-mono text-[11px] text-[#d6a15c]">
              www.theiamlab.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
