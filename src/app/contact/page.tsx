import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contact & Consultation | The IAM Lab",
  description:
    "Get in touch with The IAM Lab for enterprise Identity and Access Management consulting, governance reviews, or IAM Academy cohort applications.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070c14] text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-white/[0.06] py-16 lg:py-24">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-0 right-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                INITIATE A CONVERSATION
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Let&apos;s discuss your identity architecture or career growth.
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Whether you are a CISO planning an identity governance overhaul, an IT director addressing privileged access risks, or an individual professional applying for our IAM Academy cohorts—we look forward to collaborating with you.
              </p>
            </div>
          </div>
        </section>

        {/* MAIN INTERACTIVE SECTION: FORM & CONTACT DETAILS */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* LEFT COLUMN: FORM */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
                  <h2 className="text-2xl font-semibold text-white">
                    Submit an Enquiry
                  </h2>
                  <p className="mt-2 text-sm text-slate-300">
                    Please provide sufficient context regarding your requirements so our technical specialists can prepare meaningfully for our discussion.
                  </p>

                  <div className="mt-8">
                    <Suspense
                      fallback={
                        <div className="flex h-96 items-center justify-center text-sm text-slate-400">
                          Loading enquiry form...
                        </div>
                      }
                    >
                      <ContactForm />
                    </Suspense>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: CONTACT DETAILS & ENGAGEMENT INFO */}
              <div className="space-y-8 lg:col-span-5">
                {/* Official Channels */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-white">
                    Direct Official Channels
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Reach our technical advisory and administrative office directly.
                  </p>

                  <dl className="mt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Official Email
                        </dt>
                        <dd className="mt-0.5">
                          <a
                            href="mailto:info@theiamlab.com"
                            className="font-mono text-sm font-medium text-sky-300 hover:underline"
                          >
                            info@theiamlab.com
                          </a>
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Location & Advisory Coverage
                        </dt>
                        <dd className="mt-0.5 text-sm text-slate-200">
                          London, United Kingdom
                          <span className="block text-xs text-slate-400">
                            Available for remote UK and international advisory engagements.
                          </span>
                        </dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Operating Hours & Response SLA
                        </dt>
                        <dd className="mt-0.5 text-sm text-slate-200">
                          Monday – Friday: 9:00 AM – 5:00 PM GMT
                          <span className="block text-xs text-slate-400">
                            Standard response window: 24 to 48 business hours.
                          </span>
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                {/* Instant Digital Store Callout */}
                <div className="rounded-2xl border border-amber-400/25 bg-amber-950/10 p-6 sm:p-8">
                  <span className="font-mono text-xs font-semibold tracking-wider uppercase text-amber-400">
                    Instant Digital Access
                  </span>
                  <h4 className="mt-2 text-base font-semibold text-white">
                    Need Immediate Self-Paced Guides?
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    If you are preparing for an interview or studying for certifications, you do not need to wait for cohort enrollment. Download instant study guides and templates directly from Chiemezie Uzoma&apos;s Selar store.
                  </p>
                  <a
                    href="https://selar.com/m/chiemezie-uzoma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 hover:underline"
                  >
                    <span>Visit Selar Digital Store</span>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>

                {/* Confidentiality & Security Assurance */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Enterprise Confidentiality
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    We treat all architectural details, directory configurations, and corporate discussions with strict technical confidentiality. Mutual Non-Disclosure Agreements (NDAs) are gladly executed prior to deep-dive architecture reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
