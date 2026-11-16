import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionHeader } from "@/components/SectionHeader";

const CHALLENGE_POINTS = [
  {
    title: "Identity Sprawl & Growth",
    description:
      "As organisations adopt cloud platforms and scale teams, managing who has access to which systems becomes increasingly complex.",
    tag: "Access Complexity",
  },
  {
    title: "Excessive Permissions",
    description:
      "Unmanaged privilege accumulation and stale user entitlements expand your attack surface and increase audit vulnerability.",
    tag: "Privilege Creep",
  },
  {
    title: "Inconsistent Approvals",
    description:
      "Manual and fragmented access reviews create operational delays, compliance exposure, and weak governance oversight.",
    tag: "Audit Risk",
  },
  {
    title: "Lifecycle Friction",
    description:
      "Slow joiner provisioning and incomplete leaver deprovisioning expose sensitive enterprise assets to unauthorised retention.",
    tag: "Lifecycle Gaps",
  },
] as const;

const SERVICE_HIGHLIGHTS = [
  {
    num: "01",
    title: "IAM Strategy, Assessment & Advisory",
    description:
      "Assess identity risks, evaluate governance maturity, and establish an actionable, prioritised roadmap tailored to your business.",
  },
  {
    num: "02",
    title: "Identity Governance & Access Management (IGA)",
    description:
      "Structured access requests, automated review workflows, least-privilege role design, and verifiable compliance controls.",
  },
  {
    num: "03",
    title: "Lifecycle & Provisioning Automation",
    description:
      "Eliminate manual ticketing across joiner, mover, and leaver events with policy-driven directory orchestration.",
  },
  {
    num: "04",
    title: "Authentication, SSO & Access Modernisation",
    description:
      "Consistent single sign-on, risk-informed MFA, conditional access policies, and seamless application onboarding.",
  },
  {
    num: "05",
    title: "Privileged Access Management (PAM)",
    description:
      "Defend sensitive administrative tiers with just-in-time elevation, credential vaulting, and session accountability.",
  },
  {
    num: "06",
    title: "Implementation & Technical Support",
    description:
      "Targeted engineering for Microsoft Entra ID, Okta, SailPoint, CyberArk, and PowerShell integration workflows.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fefefe] text-[#0b1320]">
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-[#0b1320]/8 bg-gradient-to-b from-[#fefefe] via-[#f8f9fa] to-[#f8f6f1] pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32">
          <div
            className="bg-architectural-grid pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Copy */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#b27936]/30 bg-[#f8f6f1] px-4 py-1.5 text-xs font-semibold text-[#8c5c23]">
                  <span
                    className="h-2 w-2 rounded-full bg-[#b27936]"
                    aria-hidden="true"
                  />
                  <span>
                    IDENTITY SECURITY &middot; IAM CONSULTING &middot; PROFESSIONAL LEARNING
                  </span>
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-[#0b1320] leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
                  Secure identities. Simplify access.{" "}
                  <span className="text-[#8c5c23]">
                    Strengthen your business.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg sm:leading-[1.75]">
                  The IAM Lab supports organisations with practical identity and
                  access management expertise — from access governance and
                  identity lifecycle automation to authentication, privileged
                  access and IAM improvement initiatives. We also help
                  professionals build meaningful IAM skills through structured
                  learning and hands-on guidance.
                </p>

                <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="/contact?type=consulting"
                    className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl bg-[#0b1320] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#16243b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b27936] sm:w-auto"
                  >
                    Discuss an IAM Project
                  </Link>

                  <Link
                    href="/academy"
                    className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl border border-[#0b1320]/15 bg-white px-7 py-3.5 text-sm font-semibold text-[#0b1320] shadow-sm transition-all hover:border-[#b27936]/50 hover:bg-[#f8f6f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b27936] sm:w-auto"
                  >
                    Explore IAM Academy
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-[#0b1320]/10 pt-6 text-xs text-[#64748b]">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b27936]" />
                    Enterprise Advisory
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b27936]" />
                    Governance &amp; Automation
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b27936]" />
                    Career Mentorship
                  </span>
                </div>
              </div>

              {/* Architectural Visual */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-[#1e293b] bg-[#07101f] shadow-2xl">
                  <Image
                    src="/brand/corporate-hero.jpg"
                    alt="The IAM Lab Architectural Identity & Access Gateway"
                    width={1376}
                    height={768}
                    priority
                    className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="border-t border-white/10 bg-[#07101f]/90 p-5 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#d6a15c] uppercase">
                          Zero Trust &middot; Identity Architecture
                        </p>
                        <p className="mt-0.5 text-xs text-slate-300">
                          Structured access decisions across the digital enterprise
                        </p>
                      </div>
                      <span className="rounded-md border border-[#b27936]/40 bg-[#b27936]/10 px-2.5 py-1 font-mono text-[10px] text-[#d6a15c]">
                        THE IAM LAB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE CHALLENGE SECTION */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeader
              eyebrow="THE CHALLENGE WE HELP YOU SOLVE"
              title="Modern Access Is Complex. We Make It Controllable."
              description="As organisations grow, managing the right access for the right people becomes more complex. Manual onboarding, excessive permissions, fragmented systems and inconsistent approval processes can create security risks, delays and audit challenges. A well-designed IAM approach helps make identity processes more controlled, traceable and workable."
            />

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CHALLENGE_POINTS.map((item, i) => (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between rounded-xl border border-[#0b1320]/10 bg-[#f8f9fa] p-7 transition-all duration-200 hover:border-[#b27936]/45 hover:bg-white hover:shadow-md"
                >
                  <div>
                    <span className="inline-flex h-8 items-center rounded-md border border-[#0b1320]/10 bg-white px-2.5 font-mono text-xs font-semibold text-[#8c5c23]">
                      0{i + 1} &middot; {item.tag}
                    </span>

                    <h3 className="mt-5 text-lg font-semibold text-[#0b1320]">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#0b1320]/8 pt-4">
                    <span className="text-xs font-medium text-[#8c5c23]">
                      Solved through structured IAM &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES OVERVIEW */}
        <section className="border-y border-[#0b1320]/8 bg-[#f8f6f1] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeader
                eyebrow="WHAT WE CAN HELP WITH"
                title="Six Focused IAM Consulting Disciplines"
                description="We guide organisations through pragmatic, scoped engagements that turn identity security from a source of friction into an operational strength."
              />

              <Link
                href="/services"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#8c5c23] hover:underline"
              >
                <span>View all 6 service pillars in detail</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_HIGHLIGHTS.map((svc) => (
                <article
                  key={svc.num}
                  className="flex flex-col justify-between rounded-2xl border border-[#0b1320]/10 bg-white p-7 shadow-sm transition-all duration-200 hover:border-[#b27936]/50 hover:shadow-lg sm:p-8"
                >
                  <div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#b27936]/30 bg-[#f8f6f1] font-mono text-xs font-semibold text-[#8c5c23]">
                      {svc.num}
                    </span>

                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.015em] text-[#0b1320]">
                      {svc.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                      {svc.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#0b1320]/8 pt-4">
                    <Link
                      href="/services"
                      className="text-xs font-semibold text-[#8c5c23] hover:underline"
                    >
                      Explore pillar outcomes &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* A PRACTICAL, ACCOUNTABLE APPROACH */}
        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <SectionHeader
                  eyebrow="OUR ENGAGEMENT APPROACH"
                  title="A Practical, Accountable Approach to Identity Security"
                />

                <p className="mt-6 text-base leading-relaxed text-[#475569] sm:text-lg">
                  We begin with the business problem, assess the current
                  identity environment, define appropriate controls and support
                  practical implementation or improvement. Our goal is to make
                  IAM understandable to stakeholders and sustainable for the
                  teams responsible for operating it.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      step: "01",
                      title: "Discovery & Problem Definition",
                      detail:
                        "We examine identity risks, operating friction, and stakeholder requirements before suggesting technologies.",
                    },
                    {
                      step: "02",
                      title: "Target Architecture & Control Design",
                      detail:
                        "We define actionable governance models, role designs, and lifecycle policies that fit real team workflows.",
                    },
                    {
                      step: "03",
                      title: "Scoped Implementation & Delivery",
                      detail:
                        "Hands-on platform configuration, API integration, and automation scripts with complete documentation.",
                    },
                    {
                      step: "04",
                      title: "Knowledge Transfer & Enablement",
                      detail:
                        "We upskill your internal administrators and operators to ensure long-term independence and audit confidence.",
                    },
                  ].map((phase) => (
                    <div
                      key={phase.step}
                      className="flex items-start gap-4 rounded-xl border border-[#0b1320]/8 bg-[#f8f9fa] p-4.5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0b1320] font-mono text-xs font-bold text-white">
                        {phase.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-[#0b1320]">
                          {phase.title}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                          {phase.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[#1e293b] bg-[#07101f] p-8 text-white shadow-xl sm:p-10">
                  <p className="font-mono text-xs font-semibold tracking-[0.24em] text-[#d6a15c] uppercase">
                    ENGAGEMENT GUARANTEE
                  </p>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Clear Scope. Honest Guidance. Real Operational Capability.
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    We do not sell proprietary vendor lock-in or inflated
                    transformation projects. Every engagement is governed by an
                    agreed Statement of Work with measurable technical
                    deliverables.
                  </p>

                  <div className="mt-8 border-t border-white/10 pt-6">
                    <p className="text-xs text-slate-400">
                      Technology agnostic guidance across:
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-200">
                      Microsoft Entra ID &middot; Okta &middot; SailPoint &middot; CyberArk &middot; Microsoft Graph &middot; PowerShell
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/contact?type=consulting"
                      className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#d6a15c] px-6 py-3 text-sm font-semibold text-[#050a14] transition-all hover:bg-[#e2b372]"
                    >
                      Request a Business Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUILD YOUR IAM CAREER / ACADEMY TEASER */}
        <section className="border-t border-[#0b1320]/8 bg-[#f8f9fa] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-[#1e293b] bg-[#07101f] shadow-xl">
                  <Image
                    src="/brand/academy-hero.jpg"
                    alt="The IAM Lab IAM Academy Interactive Training Workstation"
                    width={1376}
                    height={768}
                    className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="border-t border-white/10 bg-[#07101f]/90 p-5">
                    <p className="font-mono text-xs text-[#d6a15c]">
                      IAM ACADEMY &middot; TECHNICAL PATHWAYS
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      Hands-on platform labs, career mentorship, and technical resources
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <SectionHeader
                  eyebrow="BUILD YOUR IAM CAREER"
                  title="Professional Learning Connecting Concepts to Enterprise Practice"
                  description="Our learning initiatives connect IAM concepts to enterprise practice. Explore foundation learning, hands-on platform pathways, technical projects, career mentorship, interview preparation and specialist resources — with a focus on understanding why a solution works, not simply copying steps."
                />

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#0b1320]/8 bg-white p-5">
                    <p className="font-mono text-xs font-semibold text-[#8c5c23]">
                      6 LEARNING PATHWAYS
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#0b1320]">
                      From IAM Foundation to Architect &amp; Leadership
                    </p>
                    <p className="mt-1 text-xs text-[#64748b]">
                      Tailored pathways for career changers, analysts, and engineers.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#0b1320]/8 bg-white p-5">
                    <p className="font-mono text-xs font-semibold text-[#8c5c23]">
                      CURATED RESOURCES
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-[#0b1320]">
                      Books, Guides &amp; Practical Tools
                    </p>
                    <p className="mt-1 text-xs text-[#64748b]">
                      Instant access via our dedicated Selar resource portal.
                    </p>
                  </div>
                </div>

                <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/academy"
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#0b1320] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#16243b] sm:w-auto"
                  >
                    Explore IAM Academy
                  </Link>

                  <a
                    href="https://selar.com/m/chiemezie-uzoma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-[#b27936]/40 bg-white px-6 py-3 text-sm font-semibold text-[#8c5c23] shadow-sm transition-all hover:bg-[#f8f6f1] sm:w-auto"
                  >
                    <span>Browse IAM Books &amp; Resources</span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-3.5 w-3.5"
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE AND TRUST */}
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <p className="font-mono text-xs font-semibold tracking-[0.24em] text-[#8c5c23] uppercase">
              AUDIENCE &amp; TRUST
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[#0b1320] sm:text-3xl">
              Supporting teams, organisations and IAM professionals who want to
              improve identity security and capability.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#64748b]">
              Every programme and consultation is grounded in actual enterprise
              protocols, least-privilege architectures, and industry governance
              benchmarks.
            </p>
          </div>
        </section>

        {/* CLOSING CONSULTATION CTA */}
        <section className="border-t border-[#0b1320]/8 bg-[#07101f] py-20 text-white sm:py-24">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <p className="font-mono text-xs font-semibold tracking-[0.24em] text-[#d6a15c] uppercase">
              START A CONVERSATION
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
              Let&apos;s discuss the identity challenge your organisation is trying to solve.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300">
              Speak directly with an IAM consultant to evaluate your current
              access posture, assess risks, or plan your organisation&apos;s
              identity roadmap.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl bg-[#d6a15c] px-8 py-3.5 text-sm font-semibold text-[#050a14] shadow-sm transition-all hover:bg-[#e2b372] sm:w-auto"
              >
                Talk to an IAM Specialist
              </Link>

              <Link
                href="/services"
                className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                Review Service Pillars
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
