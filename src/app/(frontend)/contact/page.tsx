import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { CustomCmsSections } from "@/components/CustomCmsSections";
import { FadeIn } from "@/components/MotionWrappers";
import {
  findSection,
  getCustomSections,
  getPageData,
  getSiteSettings,
  getWhatsAppHref,
} from "@/lib/getPageData";
import { resolveDraftPreview } from "@/lib/previewHelper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Consultation | Enterprise Advisory & Academy Admissions",
  description:
    "Connect with The IAM Lab for corporate IAM advisory consultations or IAM Academy pathway enquiries. Operating from London, United Kingdom.",
};

const BUILTIN_CONTACT_SECTIONS = new Set(["hero", "contact_tracks", "office_map"]);

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const allowDraft = await resolveDraftPreview(searchParams);
  const [pageData, settings] = await Promise.all([
    getPageData("contact", { allowDraft }),
    getSiteSettings(),
  ]);
  const whatsappHref = getWhatsAppHref(settings.whatsapp_number);

  const heroSec = findSection(pageData, "hero");
  const customSections = getCustomSections(pageData, BUILTIN_CONTACT_SECTIONS);

  return (
    <>
      {allowDraft && pageData?.status === "draft" && (
        <div className="bg-[#D89A43] px-4 py-2 text-center font-mono text-xs font-bold text-[#0B1424] uppercase">
          CMS Draft Preview Active &mdash; Changes below are not yet published publicly
        </div>
      )}

      {/* 1. Private Client Advisory Lounge Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={heroSec?.bgImage || "/brand/contact-advisory.jpg"}
            alt="Quiet private advisory briefing room at The IAM Lab London office"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424]/95 via-[#0B1424]/82 to-[#14243B]/65" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                {heroSec?.badge || "Contact & Consultation"}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroSec?.headline ||
                pageData?.hero_headline ||
                "Let’s discuss your IAM needs."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {heroSec?.subheadline ||
                pageData?.hero_subheadline ||
                "Whether your organisation needs advisory assistance with identity governance, access modernisation, or IAM Academy training enquiries, we welcome an initial conversation."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Dual Pathway Routing + Enterprise Contact Form (Warm White #F7F6F2) */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Two Clear Enquiry Routes & Direct Channels */}
            <div className="space-y-8 lg:col-span-5">
              <div>
                <span className="font-mono text-xs font-bold tracking-wider text-[#B07424] uppercase">
                  Two Dedicated Enquiry Routes
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-[#0B1424]">
                  How can we support your goals?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Choose the track matching your objectives in the form. Enquiries are routed directly to our consulting and admissions specialists.
                </p>
              </div>

              {/* Pathway A — For Organisations */}
              <div className="border-l-4 border-[#0B1424] bg-white p-6 shadow-xs border-y border-r border-slate-200">
                <span className="font-mono text-[10px] font-bold tracking-wider text-[#B07424] uppercase">
                  ROUTE 01 // FOR ORGANISATIONS
                </span>
                <h3 className="mt-2 text-base font-bold text-[#0B1424]">
                  Consulting, Implementation &amp; Assessments
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Discuss consulting architecture, employee enablement, identity risk reviews, or an active modernisation project.
                </p>
                <div className="mt-4">
                  <Link
                    href="/contact?type=enterprise_consulting"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1424] hover:text-[#B07424]"
                  >
                    <span>Request a Business Consultation</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Pathway B — For Individuals */}
              <div className="border-l-4 border-[#D89A43] bg-white p-6 shadow-xs border-y border-r border-slate-200">
                <span className="font-mono text-[10px] font-bold tracking-wider text-[#B07424] uppercase">
                  ROUTE 02 // FOR INDIVIDUALS
                </span>
                <h3 className="mt-2 text-base font-bold text-[#0B1424]">
                  IAM Academy Pathways &amp; Mentorship
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Enquire about structured learning tracks, cohort dates, one-to-one mentorship, or technical study guides.
                </p>
                <div className="mt-4">
                  <Link
                    href="/contact?type=individual_learning"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1424] hover:text-[#B07424]"
                  >
                    <span>Ask About IAM Academy</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Verified Direct Channels */}
              <div className="space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-700">
                <h4 className="font-mono text-xs font-bold tracking-wider text-[#0B1424] uppercase">
                  Official Contact Details
                </h4>
                <div className="flex items-start gap-3">
                  <span className="w-28 shrink-0 font-mono text-xs text-slate-500">Email:</span>
                  <a
                    href={`mailto:${settings.official_email}`}
                    className="font-semibold text-[#0B1424] hover:text-[#B07424]"
                  >
                    {settings.official_email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-28 shrink-0 font-mono text-xs text-slate-500">WhatsApp:</span>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#0B1424] hover:text-[#B07424]"
                  >
                    {settings.whatsapp_number}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-28 shrink-0 font-mono text-xs text-slate-500">Telephone:</span>
                  <span className="text-slate-800">{settings.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-28 shrink-0 font-mono text-xs text-slate-500">Office:</span>
                  <span className="text-slate-800">{settings.address}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Validated Enterprise Consultation Form */}
            <div className="lg:col-span-7">
              <div className="border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
                <div className="mb-8 border-b border-slate-200 pb-6">
                  <span className="font-mono text-xs font-bold tracking-wider text-[#B07424] uppercase">
                    Inbound Enquiry Desk
                  </span>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#0B1424]">
                    Submit your consultation request
                  </h2>
                  <p className="mt-1.5 text-xs text-slate-500">
                    Your details are recorded securely and routed directly to our team for follow-up.
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

      <CustomCmsSections sections={customSections} />

      {/* 3. Full-Width London Headquarters Google Map Section Below Form Before Footer */}
      <section className="border-b border-slate-200 bg-white pt-20 sm:pt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#B07424] uppercase">
                  United Kingdom Advisory Base
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B1424]">
                London Headquarters
              </h2>
              <p className="mt-2 max-w-2xl text-base text-slate-600">
                Operating internationally from London, supporting enterprises and learners across the UK, Africa, Europe, and North America.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2.5 sm:items-end">
              <span className="font-mono text-xs text-slate-600">
                {settings.address}
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0B1424] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#14243B]"
              >
                <span>Open in Google Maps</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative h-[420px] w-full overflow-hidden border-t border-slate-200 bg-slate-100 sm:h-[500px]">
          <iframe
            title="The IAM Lab London Headquarters — 128 City Road, EC1V 2NX"
            src={settings.map_embed_url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-full w-full"
          />
        </div>
      </section>
    </>
  );
}
