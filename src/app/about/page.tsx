import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About Us | The IAM Lab",
  description:
    "Learn about The IAM Lab, our mission, core guiding principles, and leadership in enterprise Identity and Access Management consulting and professional education.",
  alternates: {
    canonical: "/about",
  },
};

const GUIDING_PRINCIPLES = [
  {
    num: "01",
    title: "Security with Purpose",
    description:
      "Focus on risks and business outcomes rather than technology for its own sake. Identity controls must empower business velocity while establishing verifiable access guardrails.",
  },
  {
    num: "02",
    title: "Practical Learning",
    description:
      "Build understanding through real-world scenarios and hands-on application. We teach the underlying architectural reasons why solutions work, not mere button-clicking.",
  },
  {
    num: "03",
    title: "Integrity and Clarity",
    description:
      "Communicate honestly about scope, capability and expected outcomes. We offer direct, transparent advice without inflated transformation jargon or vendor bias.",
  },
  {
    num: "04",
    title: "Continuous Improvement",
    description:
      "Make identity processes easier to maintain, audit and improve over time. We engineer sustainable processes that internal teams can operate and defend independently.",
  },
] as const;

const TARGET_INDUSTRIES = [
  {
    title: "Financial Services & Banking",
    description:
      "Strict regulatory recertification, separation of duties (SoD), audit readiness, and privileged administrative governance.",
  },
  {
    title: "Technology & High-Growth SaaS",
    description:
      "Automated multi-tenant onboarding, developer privileged access, conditional access SSO, and fast-moving cloud infrastructure.",
  },
  {
    title: "Healthcare & Life Sciences",
    description:
      "Confidential data access policies, role-based clinician provisioning, patient privacy compliance, and multi-facility directories.",
  },
  {
    title: "Education & Public Sector",
    description:
      "High-volume student/staff lifecycle shifts, federated access, diverse departmental entitlements, and cost-effective automation.",
  },
  {
    title: "Professional Services",
    description:
      "Client data segregation, external partner collaboration, project-based access lifecycles, and credential protection.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fefefe] text-[#0b1320]">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[#0b1320]/8 bg-gradient-to-b from-[#fefefe] via-[#f8f9fa] to-[#f8f6f1] py-16 sm:py-24">
          <div
            className="bg-architectural-grid pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b27936]/30 bg-[#f8f6f1] px-3.5 py-1 text-xs font-semibold text-[#8c5c23]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#b27936]" />
                ABOUT THE IAM LAB
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[#0b1320] leading-[1.1] sm:text-5xl lg:text-6xl">
                Practical Identity Security Expertise. Grounded in Enterprise Reality.
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-[#475569] sm:text-xl sm:leading-[1.7]">
                The IAM Lab is an identity and access management initiative
                focused on enterprise identity security, practical consulting
                and professional development. We bring together technical IAM
                experience, structured learning and a commitment to solving real
                access management challenges.
              </p>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
              <div className="rounded-2xl border border-[#0b1320]/10 bg-[#f8f9fa] p-8 sm:p-10">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#8c5c23] uppercase">
                  OUR MISSION
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-[#0b1320] sm:text-3xl">
                  Enabling Control and Confidence in Modern Access
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#475569]">
                  To help organisations manage digital identities and access
                  more securely and effectively, while equipping IAM
                  professionals with the understanding, practice and confidence
                  to grow.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1e293b] bg-[#07101f] p-8 text-white sm:p-10">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#d6a15c] uppercase">
                  OUR VISION
                </span>
                <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  A Global Centre of Practical IAM Excellence
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  To become a trusted home for practical identity security
                  expertise and professional IAM development, with strong
                  relevance to organisations and talent across Africa and
                  international markets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT GUIDES OUR WORK */}
        <section className="border-y border-[#0b1320]/8 bg-[#f8f6f1] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeader
              eyebrow="OUR CORE PHILOSOPHY"
              title="What Guides Our Work"
              description="Four foundational tenets govern every consulting engagement, learning curriculum, and advisory recommendation we deliver."
            />

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {GUIDING_PRINCIPLES.map((item) => (
                <div
                  key={item.num}
                  className="rounded-2xl border border-[#0b1320]/10 bg-white p-7 shadow-sm transition-all hover:border-[#b27936]/50 sm:p-8"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#b27936]/30 bg-[#f8f6f1] font-mono text-xs font-bold text-[#8c5c23]">
                    {item.num}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-[#0b1320]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeader
              eyebrow="COMPANY LEADERSHIP"
              title="Experienced Direction. Practical Oversight."
              description="The IAM Lab was founded by practitioners with extensive technical background in enterprise identity administration, governance, and technology delivery."
            />

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Chiemezie Uzoma */}
              <div className="rounded-2xl border border-[#0b1320]/10 bg-[#f8f9fa] p-8 sm:p-10">
                <div className="flex items-center justify-between border-b border-[#0b1320]/8 pb-5">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#0b1320]">
                      Chiemezie Uzoma
                    </h3>
                    <p className="mt-1 font-mono text-xs font-semibold text-[#8c5c23] uppercase tracking-wider">
                      Co-Founder &amp; Chief Executive Officer
                    </p>
                  </div>
                  <span className="rounded-full border border-[#0b1320]/10 bg-white px-3 py-1 text-xs font-medium text-[#0b1320]">
                    Executive Lead
                  </span>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-[#475569] sm:text-base">
                  Leads IAM consulting, technical strategy, identity security
                  initiatives and professional learning. His background spans
                  enterprise identity administration, governance, privileged
                  access, Microsoft Entra ID, Okta, SailPoint, CyberArk and
                  identity automation.
                </p>

                <div className="mt-6 border-t border-[#0b1320]/8 pt-5 text-xs text-[#64748b]">
                  <p className="font-semibold text-[#0b1320]">Key Disciplines:</p>
                  <p className="mt-1">
                    Enterprise IAM Architecture &middot; Access Governance &middot; Cloud IdP &middot; PAM Engineering
                  </p>
                </div>
              </div>

              {/* Jennifer Uzoma */}
              <div className="rounded-2xl border border-[#0b1320]/10 bg-[#f8f9fa] p-8 sm:p-10">
                <div className="flex items-center justify-between border-b border-[#0b1320]/8 pb-5">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#0b1320]">
                      Jennifer Uzoma
                    </h3>
                    <p className="mt-1 font-mono text-xs font-semibold text-[#8c5c23] uppercase tracking-wider">
                      Co-Founder &amp; Director of Operations
                    </p>
                  </div>
                  <span className="rounded-full border border-[#0b1320]/10 bg-white px-3 py-1 text-xs font-medium text-[#0b1320]">
                    Operations Lead
                  </span>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-[#475569] sm:text-base">
                  Leads operational coordination, programme administration,
                  client experience and partnership support for The IAM Lab.
                  Ensures high-standard delivery across corporate advisory
                  engagements and structured mentorship pathways.
                </p>

                <div className="mt-6 border-t border-[#0b1320]/8 pt-5 text-xs text-[#64748b]">
                  <p className="font-semibold text-[#0b1320]">Key Disciplines:</p>
                  <p className="mt-1">
                    Programme Administration &middot; Client Experience &middot; Partnership Coordination &middot; Operational Governance
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-dashed border-[#0b1320]/15 bg-[#f8f6f1]/60 p-4 text-center text-xs text-[#64748b]">
              <p>
                Notice: Detailed executive biographies, photographic assets, and
                individual credentials remain subject to final client publication
                approval in accordance with project editorial guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* INDUSTRIES AND MARKETS */}
        <section className="border-t border-[#0b1320]/8 bg-[#f8f9fa] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeader
              eyebrow="TARGET AUDIENCES"
              title="Industries We Are Built to Support"
              description="Our advisory services and technical training cater to regulated and high-growth sectors with significant identity compliance and access governance requirements."
            />

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TARGET_INDUSTRIES.map((ind) => (
                <div
                  key={ind.title}
                  className="rounded-xl border border-[#0b1320]/10 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-base font-semibold text-[#0b1320]">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                    {ind.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="bg-[#07101f] py-20 text-white sm:py-24">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="font-mono text-xs font-semibold tracking-[0.24em] text-[#d6a15c] uppercase">
              WORK WITH US
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to Strengthen Your Identity Security Posture?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              Contact our team to discuss an IAM consulting engagement or to
              explore structured professional learning.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#d6a15c] px-7 py-3 text-sm font-semibold text-[#050a14] transition-all hover:bg-[#e2b372]"
              >
                Talk to an IAM Specialist
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                Learn About Our Approach
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
