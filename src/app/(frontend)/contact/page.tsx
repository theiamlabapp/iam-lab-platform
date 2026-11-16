import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Contact & Consultation | The IAM Lab",
  description:
    "Connect with The IAM Lab for enterprise identity consulting, access governance advisory, corporate training, or IAM Academy cohort enrollment.",
};

export default function ContactPage() {
  return (
    <>
      {/* 1. Contact Hero */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-blue-600/10 to-transparent blur-[120px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Get In Touch
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Start a conversation with The IAM Lab.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Whether your enterprise requires an identity architecture assessment or you are ready to build practitioner skills in our Academy, we are here to support your goals.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Contact Form & Direct Coordinates */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Contact Info & Guidance */}
            <div className="space-y-8 lg:col-span-5">
              <SectionHeader
                theme="dark"
                eyebrow="Direct Enquiries"
                title="How can we assist you?"
                description="Please select the appropriate enquiry type on the form so we can connect you with the right specialist immediately."
              />

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#07101f]/80 p-6">
                  <span className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">
                    Route A &bull; For Organisations
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white">
                    Enterprise Consulting &amp; Advisory
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    IAM strategy assessments, IGA architecture, PAM deployments, cloud identity modernization, and custom corporate team enablement.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#07101f]/80 p-6">
                  <span className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">
                    Route B &bull; For Individuals
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white">
                    IAM Academy &amp; Mentorship
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    Cohort schedules, pathway syllabus details, hands-on lab access, and technical career advancement mentorship.
                  </p>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="rounded-2xl border border-white/10 bg-[#07101f]/50 p-6 space-y-4">
                <div>
                  <p className="font-mono text-xs font-semibold text-slate-400 uppercase">
                    Email Inquiries
                  </p>
                  <a
                    href="mailto:info@theiamlab.com"
                    className="mt-1 inline-flex items-center gap-2 text-base font-medium text-amber-300 transition-colors hover:text-amber-200"
                  >
                    info@theiamlab.com
                  </a>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="font-mono text-xs font-semibold text-slate-400 uppercase">
                    Headquarters
                  </p>
                  <p className="mt-1 text-sm text-slate-200">
                    London, United Kingdom
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="font-mono text-xs font-semibold text-slate-400 uppercase">
                    Response Commitment
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Our team reviews all inquiries promptly and responds within 24 to 48 business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Interactive Form wrapped in Suspense for search params */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="flex h-96 items-center justify-center rounded-2xl border border-white/10 bg-[#07101f]/50">
                    <p className="text-sm text-slate-400">Loading form...</p>
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
