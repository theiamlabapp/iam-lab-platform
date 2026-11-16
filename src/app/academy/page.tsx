import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AcademyFaq } from "@/components/AcademyFaq";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "IAM Academy | The IAM Lab",
  description:
    "Master Identity and Access Management through practitioner-led cohorts, technical lab simulations, and professional mentorship at The IAM Lab Academy.",
  alternates: {
    canonical: "/academy",
  },
};

const PATHWAYS = [
  {
    number: "01",
    title: "IAM Fundamentals & Core Concepts",
    level: "Foundational",
    audience: "Aspiring Security Analysts, Helpdesk Admins, IT Engineers",
    description:
      "Master the foundational pillars of Identity and Access Management: authentication, authorization, accounting (AAA), identity lifecycle stages, directory structures, and identity federation fundamentals.",
    topics: [
      "Authentication vs. Authorization principles",
      "SAML 2.0, OAuth 2.0 & OpenID Connect (OIDC) protocols",
      "Directory fundamentals (LDAP, Active Directory, Azure AD/Entra)",
      "Role-Based Access Control (RBAC) vs. ABAC models",
      "Common identity threat vectors & credential compromise methods",
    ],
    outcome: "Understand how identity functions across modern enterprise environments and speak the language of IAM engineering.",
  },
  {
    number: "02",
    title: "Identity Governance & Administration (IGA) Mastery",
    level: "Intermediate",
    audience: "Identity Engineers, Compliance Specialists, Security Operations",
    description:
      "Deep dive into the operational mechanics of enterprise governance: Joiner-Mover-Leaver automation, entitlement aggregation, role engineering, and certification campaigns.",
    topics: [
      "Joiner-Mover-Leaver (JML) lifecycle workflows and triggers",
      "Access request approval workflows & self-service delegation",
      "Periodic access certification & recertification orchestration",
      "Separation of Duties (SoD) rule definition and toxic combinations",
      "SCIM standard connectors and API-driven user provisioning",
    ],
    outcome: "Design and implement end-to-end identity governance programs that satisfy enterprise compliance mandates.",
  },
  {
    number: "03",
    title: "Privileged Access Management (PAM) Engineering",
    level: "Advanced",
    audience: "Infrastructure Engineers, SecOps Leads, Cloud Security Engineers",
    description:
      "Learn how to defend an organization's most critical assets by vaulting administrative credentials, isolating sessions, and enforcing zero standing privileges.",
    topics: [
      "Credential vaulting architecture and automated password rotation",
      "Just-In-Time (JIT) access elevation and ephemeral credentials",
      "Privileged session recording, live monitoring, and termination",
      "Securing service accounts, CI/CD pipelines, and machine secrets",
      "Designing defense-in-depth PAM policies against lateral movement",
    ],
    outcome: "Eliminate standing administrator privileges and secure critical infrastructure from ransomware and privilege abuse.",
  },
  {
    number: "04",
    title: "Cloud Identity & Modern Access Security",
    level: "Intermediate – Advanced",
    audience: "Cloud Engineers, Azure/AWS Administrators, Platform Architects",
    description:
      "Master identity across multi-cloud environments: Microsoft Entra ID, AWS IAM Identity Center, conditional access, and passwordless authentication.",
    topics: [
      "Microsoft Entra ID architecture and advanced tenant security",
      "AWS IAM policies, SCPs, permission boundaries, and IAM Identity Center",
      "Phishing-resistant MFA (FIDO2, Passkeys) & risk-based Conditional Access",
      "Workload and machine identity federation without static access keys",
      "Cloud Infrastructure Entitlement Management (CIEM) principles",
    ],
    outcome: "Architect resilient cloud identity perimeters across enterprise multi-cloud estates.",
  },
  {
    number: "05",
    title: "Directory Modernization & Hybrid Architecture",
    level: "Intermediate",
    audience: "Active Directory Admins, Systems Engineers, Hybrid IT Teams",
    description:
      "Address legacy debt by modernizing Active Directory, consolidating forests, and designing resilient hybrid synchronization with cloud directories.",
    topics: [
      "Active Directory security hygiene and attack-path remediation",
      "Microsoft Entra Cloud Sync and Entra Connect hybrid architecture",
      "Migrating legacy LDAP and Kerberos apps to modern claims",
      "Forest consolidation and stale object cleanup strategies",
      "Designing secure hybrid identity without replicating on-prem weaknesses",
    ],
    outcome: "Safely bridge legacy on-premises directories to modern, cloud-first identity environments.",
  },
  {
    number: "06",
    title: "IAM Architecture & Program Leadership",
    level: "Executive & Senior",
    audience: "Senior IAM Engineers, Aspiring Architects, CISOs, Technical Directors",
    description:
      "Step into high-level identity leadership: blueprinting enterprise programs, aligning identity with business strategy, conducting vendor evaluations, and presenting to executive leadership.",
    topics: [
      "Developing a multi-year IAM Target Operating Model (TOM)",
      "Vendor-neutral RFP evaluation and tooling selection criteria",
      "Aligning identity metrics with board-level risk management",
      "Stakeholder management and executive presentation skills",
      "Leading large-scale enterprise identity transformation programs",
    ],
    outcome: "Lead identity strategy, direct engineering teams, and communicate IAM value to C-suite stakeholders.",
  },
] as const;

const LEARNING_FORMATS = [
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Instructor-Led Live Cohorts",
    desc: "Intensive 6 to 10-week cohort-based masterclasses with live technical lectures, real-time lab demonstrations, and interactive Q&A sessions.",
  },
  {
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    title: "Self-Paced Digital Resources",
    desc: "Downloadable study guides, architectural templates, policy checklists, and technical interview cheat sheets curated on our official Selar store.",
  },
  {
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    title: "Hands-On Technical Labs",
    desc: "Configure live directories, build SCIM connectors, simulate phishing-resistant MFA deployments, and resolve real-world identity failure scenarios.",
  },
  {
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    title: "1-on-1 Mentorship & Career Guidance",
    desc: "Direct access to Chiemezie Uzoma and senior IAM mentors for tailored CV reviews, technical mock interviews, and career advancement roadmaps.",
  },
  {
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    title: "Corporate Team Enablement",
    desc: "Bespoke enterprise workshops designed to upskill internal IT and security operations teams on specific tools, protocols, and standard runbooks.",
  },
] as const;

export default function AcademyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070c14] text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-white/[0.06] py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
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
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  PROFESSIONAL IDENTITY SECURITY EDUCATION
                </div>

                <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Master Identity & Access Management from{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-100 to-amber-200">
                    industry practitioners.
                  </span>
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
                  Practical, hands-on, enterprise-grade IAM education designed for aspiring and practicing security engineers, cloud architects, and IT professionals seeking in-demand technical competence.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact?type=academy"
                    className="rounded-lg bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                  >
                    Join Upcoming Cohort Waitlist
                  </Link>
                  <a
                    href="https://selar.com/m/chiemezie-uzoma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-500/10 px-6 py-3.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20"
                  >
                    <span>Browse Digital Store on Selar</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>

                {/* Highlights */}
                <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
                  <div>
                    <p className="font-mono text-2xl font-bold text-sky-400">6</p>
                    <p className="text-xs text-slate-400">Structured Pathways</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-bold text-amber-400">Practitioner</p>
                    <p className="text-xs text-slate-400">Direct Instruction</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-bold text-emerald-400">100% Real</p>
                    <p className="text-xs text-slate-400">Lab-Based Scenarios</p>
                  </div>
                </div>
              </div>

              {/* Visual Presentation */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/60 p-2 shadow-2xl backdrop-blur-sm lg:max-w-none">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                    <Image
                      src="/brand/academy-hero.jpg"
                      alt="The IAM Lab Academy executive training workstation"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-semibold tracking-wider uppercase text-amber-300">
                        Interactive Laboratory Environment
                      </p>
                      <p className="text-sm font-medium text-white">
                        Simulating enterprise directory forests, cloud tenants, and privileged access vaults.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 LEARNING PATHWAYS */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Structured Learning Pathways"
              title="Curricula engineered for real enterprise impact."
              description="Each pathway is designed around actual enterprise engineering tasks—not abstract theory. You learn how identity is configured, audited, and defended in production environments."
              theme="dark"
            />

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PATHWAYS.map((pathway) => (
                <div
                  key={pathway.number}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition hover:border-sky-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold tracking-widest text-sky-400">
                        PATHWAY {pathway.number}
                      </span>
                      <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                        {pathway.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {pathway.title}
                    </h3>

                    <p className="mt-1 text-xs text-amber-400/90">
                      <span className="font-semibold text-slate-400">Target:</span> {pathway.audience}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {pathway.description}
                    </p>

                    <div className="mt-6 border-t border-slate-800/80 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Core Modules Covered
                      </p>
                      <ul className="mt-3 space-y-2">
                        {pathway.topics.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                      Practical Capability Gained
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      {pathway.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 LEARNING FORMATS */}
        <section className="border-t border-white/[0.06] bg-[#05090f] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Delivery Modalities"
              title="Flexible formats built for working professionals."
              description="Whether you thrive in interactive live cohort discussions, independent self-paced study, or personalized 1-on-1 mentorship, we provide learning formats that fit your career schedule."
              theme="dark"
            />

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {LEARNING_FORMATS.map((fmt, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-left transition hover:border-slate-700"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={fmt.icon} />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {fmt.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">
                    {fmt.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OFFICIAL SELAR STORE INTEGRATION CALLOUT */}
        <section className="border-t border-white/[0.06] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-950/20 via-slate-900 to-sky-950/30 p-8 lg:p-12">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    OFFICIAL DIGITAL RESOURCE STORE
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                    Self-Paced Guides, Interview Blueprints & Reference Architectures
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Access Chiemezie Uzoma&apos;s curated digital publications, SC-300 study companions, JML automation templates, and IAM interview mastery guides available instantly on our official Selar storefront.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
                  <a
                    href="https://selar.com/m/chiemezie-uzoma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-lg bg-amber-400 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300"
                  >
                    <span>Visit Official Selar Store</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <span className="text-[11px] text-slate-400">
                    Instant secure digital delivery via Selar platform
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEARNING INTEGRITY & STANDARDS NOTICE (SECTION 4.7) */}
        <section className="border-t border-white/[0.06] bg-[#05090f] py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide uppercase text-amber-300">
                    Academic Integrity & Professional Standards Notice
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    The IAM Lab provides practitioner-led education, skills development, and career mentorship. We do not issue counterfeit university degrees or guarantee unearned corporate roles. Identity security is a high-responsibility profession where organizations trust engineers with critical administrative keys. Career outcomes depend entirely on individual dedication, rigorous lab practice, and verified skill mastery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQS SECTION */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Frequently Asked Questions"
              title="Everything you need to know about the IAM Academy."
              description="Common inquiries regarding prerequisites, cohort schedules, certifications, and enterprise team training."
              align="center"
              theme="dark"
            />

            <div className="mt-12">
              <AcademyFaq />
            </div>
          </div>
        </section>

        {/* CLOSING ENROLLMENT CTA */}
        <section className="border-t border-white/[0.06] bg-gradient-to-b from-[#070c14] to-[#04070c] py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to accelerate your career in Identity Security?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
              Join our upcoming cohort waitlist or schedule an advisory discussion with an academy instructor today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=academy"
                className="rounded-lg bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Apply for Cohort Waitlist
              </Link>
              <Link
                href="/services"
                className="rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Explore Enterprise Consulting
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
