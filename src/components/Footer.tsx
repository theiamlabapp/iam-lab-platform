import Link from "next/link";
import { getSiteSettings, getWhatsAppHref } from "@/lib/getPageData";
import { BrandLogo } from "./BrandLogo";
import { CopyrightYear } from "./CopyrightYear";
import { SocialLinksBar } from "./SocialLinksBar";

export async function Footer() {
  const settings = await getSiteSettings();
  const whatsappHref = getWhatsAppHref(settings.whatsapp_number);

  return (
    <footer className="border-t border-white/10 bg-[#0B1424] text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-5">
            <Link
              href="/"
              aria-label="The IAM Lab"
              className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89A43]"
            >
              <BrandLogo
                variant="light"
                surface="plain"
                srcOverride={settings.logo_light_url}
                className="w-[98px] sm:w-[112px]"
              />
            </Link>

            <p className="text-base font-semibold text-white">
              {settings.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs text-slate-400">
              <span>{settings.address}</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 transition-colors hover:text-[#D89A43]"
              >
                WhatsApp: {settings.whatsapp_number}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href={`mailto:${settings.official_email}`}
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
                <span>{settings.official_email}</span>
              </a>

              <SocialLinksBar settings={settings} theme="dark" />
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3 lg:col-span-2">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#D89A43] uppercase">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {settings.nav_links.map((nav) => (
                <li key={nav.href}>
                  <Link href={nav.href} className="text-slate-400 transition-colors hover:text-white">
                    {nav.label}
                  </Link>
                </li>
              ))}
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
                <Link href="/services#directory" className="text-slate-400 transition-colors hover:text-white">
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
                  href={settings.selar_store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Selar Bookstore &rarr;
                </a>
              </li>
              <li>
                <Link href="/contact?type=individual_learning" className="text-slate-400 transition-colors hover:text-white">
                  Ask About Academy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>
            Copyright <CopyrightYear /> {settings.company_name}. {settings.footer_copyright_suffix}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span>
              Powered by{" "}
              <a
                href="https://mujteknify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#D89A43] transition-colors hover:text-[#ebd0a3]"
              >
                MUJTEKNIFY
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
