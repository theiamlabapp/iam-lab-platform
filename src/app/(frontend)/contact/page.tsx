import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Consultation | Enterprise Advisory & Academy Admissions",
  description:
    "Schedule an executive IAM consultation or apply for upcoming IAM Academy learning cohorts. Operating globally from London, United Kingdom.",
};

export default function ContactPage() {
  return (
    <>
      {/* 1. Premium Photographic Introduction */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/team-collaboration.jpg"
            alt="The IAM Lab consultation and advisory team"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424] via-[#0B1424]/90 to-[#14243B]/80" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Initiate Discovery
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connect with The IAM Lab.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Direct access to senior identity architects for corporate advisory reviews, vendor evaluations, or academy enrollment enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Dual Pathway Briefing & Verified Company Details */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Two Pathways & Company Details */}
            <div className="space-y-10 lg:col-span-5">
              <div>
                <span className="font-mono text-xs font-bold text-[#D89A43] uppercase">
                  TWO DEDICATED TRACKS
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[#0B1424]">
                  How can we support your goals?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Select your track in the form on the right. Submissions are reviewed directly by our principal advisory and admissions team.
                </p>
              </div>

              {/* Pathway A */}
              <div className="border border-slate-200 bg-[#FFFFFF] p-6 shadow-sm">
                <span className="font-mono text-xs font-bold text-[#0B1424] uppercase">
                  PATHWAY 01 // ENTERPRISE ADVISORY
                </span>
                <h3 className="mt-2 text-base font-bold text-[#0B1424]">
                  Corporate Consulting &amp; Architecture
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  For CISOs, Heads of Architecture, and IT leaders seeking maturity reviews, PAM/IGA implementation, or directory migrations.
                </p>
                <div className="mt-3">
                  <Link
                    href="/contact?type=enterprise_consulting"
                    className="text-xs font-bold text-[#D89A43] hover:underline"
                  >
                    Select Corporate Track &rarr;
                  </Link>
                </div>
              </div>

              {/* Pathway B */}
              <div className="border border-slate-200 bg-[#FFFFFF] p-6 shadow-sm">
                <span className="font-mono text-xs font-bold text-[#0B1424] uppercase">
                  PATHWAY 02 // IAM ACADEMY
                </span>
                <h3 className="mt-2 text-base font-bold text-[#0B1424]">
                  Individual Learning &amp; Mentorship
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  For engineers and analysts seeking structured training, hands-on enterprise tenant labs, and 1-on-1 career coaching.
                </p>
                <div className="mt-3">
                  <Link
                    href="/contact?type=individual_learning"
                    className="text-xs font-bold text-[#D89A43] hover:underline"
                  >
                    Select Academy Track &rarr;
                  </Link>
                </div>
              </div>

              {/* Verified Company Information */}
              <div className="border-t border-slate-200 pt-8 space-y-4 text-sm text-slate-700">
                <h4 className="font-mono text-xs font-bold text-[#0B1424] uppercase">
                  Direct Inbound Contact
                </h4>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-slate-500 w-24">Email:</span>
                  <a href="mailto:info@theiamlab.com" className="font-semibold text-[#0B1424] hover:text-[#D89A43]">
                    info@theiamlab.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-slate-500 w-24">Headquarters:</span>
                  <span className="text-slate-800">London, United Kingdom</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-slate-500 w-24">Operating Hours:</span>
                  <span className="text-slate-800">Mon &ndash; Fri &middot; 09:00 &ndash; 17:30 UTC</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-slate-500 w-24">Publications:</span>
                  <a
                    href="https://selar.com/m/chiemezie-uzoma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#0B1424] hover:text-[#D89A43]"
                  >
                    Selar Bookstore &rarr;
                  </a>
                </div>
              </div>

              {/* Confidentiality Commitment */}
              <div className="border border-white/10 bg-[#0B1424] p-6 text-slate-300">
                <span className="font-mono text-[11px] font-bold text-[#D89A43] uppercase">
                  Confidentiality Commitment
                </span>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  All communications, architecture scopes, and discovery materials are treated under strict professional non-disclosure. We never disclose client identities, tenancy details, or project scopes without prior written consent.
                </p>
              </div>
            </div>

            {/* Right Column: The Validated Enterprise Form */}
            <div className="lg:col-span-7">
              <div className="border border-slate-200 bg-[#FFFFFF] p-8 sm:p-12 shadow-md">
                <div className="border-b border-slate-200 pb-6 mb-8">
                  <span className="font-mono text-xs font-bold text-[#D89A43] uppercase">
                    INBOUND ENQUIRY FORM
                  </span>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#0B1424]">
                    Submit your consultation request
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Your submission will be securely persisted and assigned directly to a specialist.
                  </p>
                </div>

                <Suspense
                  fallback={
                    <div className="py-16 text-center text-sm text-slate-500">
                      Loading consultation form...
                    </div>
                  }
                >
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
