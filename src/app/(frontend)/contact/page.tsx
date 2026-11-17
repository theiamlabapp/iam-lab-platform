import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Consultation | The IAM Lab",
  description:
    "Connect with The IAM Lab for enterprise identity consulting, access governance advisory, corporate training, or IAM Academy cohort enrollment.",
};

export default function ContactPage() {
  return (
    <>
      {/* 1. Cinematic Hero with Photographic Layer */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/hero-bg.jpg"
            alt="The IAM Lab Contact"
            fill
            priority
            className="object-cover object-center opacity-25 mix-blend-screen scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/92 to-[#030712]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.28em] text-[#d6a15c] uppercase">
              <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
              <span>Direct Engagement &bull; London &bull; Worldwide</span>
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl lg:leading-[1.08]">
              Start a conversation <br />
              <span className="bg-gradient-to-r from-[#ebd0a3] via-[#d6a15c] to-amber-200 bg-clip-text text-transparent">
                with The IAM Lab.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
              Whether your enterprise requires an identity architecture assessment or you are ready to build practitioner skills in our Academy, our team is here to support your objectives.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Form & Direct Coordinates */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Left Column: Direct Coordinates & Channel Briefing */}
            <div className="space-y-8 lg:col-span-5">
              <div className="border border-white/10 bg-[#07101f] p-8">
                <span className="font-mono text-xs font-bold tracking-widest text-[#d6a15c] uppercase">
                  Route A // For Organisations
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">
                  Enterprise Consulting &amp; Advisory
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  IAM maturity assessments, Identity Governance architecture (IGA), Privileged Access Management (PAM), directory modernization, and custom corporate team enablement.
                </p>
              </div>

              <div className="border border-white/10 bg-[#07101f] p-8">
                <span className="font-mono text-xs font-bold tracking-widest text-[#d6a15c] uppercase">
                  Route B // For Individuals
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">
                  IAM Academy &amp; Mentorship
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Cohort schedules, pathway syllabus details, hands-on lab tenant access, and technical career advancement mentorship.
                </p>
              </div>

              {/* Direct Communication Channels */}
              <div className="border border-white/10 bg-[#07101f] p-8 space-y-6">
                <div>
                  <p className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Direct Email
                  </p>
                  <a
                    href="mailto:info@theiamlab.com"
                    className="mt-1 inline-flex items-center gap-2 text-base font-bold text-[#d6a15c] transition-colors hover:text-white"
                  >
                    info@theiamlab.com
                  </a>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Headquarters
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    London, United Kingdom
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <p className="font-mono text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Response SLA
                  </p>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                    All client inquiries and cohort applications are reviewed promptly with a response within 24 to 48 business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="flex h-96 items-center justify-center border border-white/10 bg-[#07101f]">
                    <p className="font-mono text-xs text-slate-400">Loading submission form...</p>
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
