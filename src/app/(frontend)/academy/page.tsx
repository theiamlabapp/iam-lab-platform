import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AcademyFaq } from "@/components/AcademyFaq";

export const metadata: Metadata = {
  title: "IAM Academy | Professional Identity Security Learning & Mentorship",
  description:
    "Master enterprise Identity and Access Management through 6 structured career pathways, live cohort training, hands-on labs, and expert mentorship.",
};

const PATHWAYS = [
  {
    num: "01",
    tier: "Tier 1 // Foundational",
    name: "IAM Foundation",
    audience: "Career switchers, IT graduates, and beginners with technical aptitude.",
    focus:
      "Core identity principles, directory services (Active Directory / LDAP), Authentication vs. Authorization vs. Accounting (AAA), foundational modern protocols (SAML 2.0, OAuth 2.0, OpenID Connect).",
    lab: "Setting up a hybrid cloud directory, configuring basic cloud user provisioning, analyzing token assertions.",
    outcome:
      "A rock-solid conceptual and operational foundation to begin specializing in enterprise access security.",
  },
  {
    num: "02",
    tier: "Tier 2 // Operational",
    name: "IAM Analyst",
    audience: "Helpdesk analysts, IT administrators, and junior security practitioners.",
    focus:
      "Day-to-day access operations, entitlement troubleshooting, user onboarding workflows, periodic access certification campaigns, and audit compliance controls (GRC).",
    lab: "Executing access recertification campaigns, resolving segregation-of-duties conflicts, auditing dormant accounts.",
    outcome:
      "Immediate operational competency in managing and reviewing enterprise user entitlements.",
  },
  {
    num: "03",
    tier: "Tier 3 // Engineering",
    name: "IAM Engineer",
    audience: "Systems engineers, cloud administrators, and technical analysts.",
    focus:
      "Single Sign-On (SSO) configuration, automated user lifecycle provisioning, SCIM 2.0 connector setup, PowerShell and API automation, and hybrid directory synchronization.",
    lab: "Building end-to-end SCIM connectors, configuring Conditional Access policies in Entra ID, automating Joiner-Mover-Leaver state transitions.",
    outcome:
      "Production-ready capability to integrate enterprise applications and automate access lifecycle processes.",
  },
  {
    num: "04",
    tier: "Tier 4 // Advanced",
    name: "Senior IAM Engineer",
    audience: "Experienced IAM engineers and infrastructure specialists.",
    focus:
      "Complex troubleshooting, high-availability platform resilience, Privileged Access Management (PAM) vaulting and session isolation, CI/CD pipeline governance, and emerging AI use cases.",
    lab: "Deploying CyberArk vault policies, implementing Just-in-Time elevation, hardening service account credentials.",
    outcome:
      "Mastery over mission-critical identity infrastructure and advanced enterprise privilege defenses.",
  },
  {
    num: "05",
    tier: "Tier 5 // Strategic",
    name: "IAM Architect",
    audience: "Principal engineers, tech leads, and aspiring security architects.",
    focus:
      "End-to-end enterprise identity architecture, Zero-Trust network integration, multi-cloud access governance (AWS, Azure, GCP), vendor selection, and compliance mapping (ISO 27001, SOX).",
    lab: "Designing a complete enterprise identity roadmap, multi-tenant cloud architecture, and regulatory audit defense dossier.",
    outcome:
      "The architectural vision and design authority to lead organization-wide identity modernizations.",
  },
  {
    num: "06",
    tier: "Tier 6 // Advisory",
    name: "IAM Consultant & Leadership",
    audience: "Practice leaders, consultants, and senior advisory specialists.",
    focus:
      "Client engagement methodology, executive risk communication, business case justification, commercial scoping, and steering committee governance.",
    lab: "Conducting enterprise maturity interviews, presenting C-suite risk heatmaps, writing Statements of Work.",
    outcome:
      "The strategic advisory skills required to interface with C-level stakeholders and deliver commercial consulting value.",
  },
] as const;

const FORMATS = [
  {
    num: "01",
    title: "Live Interactive Cohorts",
    desc: "Instructor-led evening and weekend sessions designed for working professionals, featuring direct Q&A and architecture teardowns.",
  },
  {
    num: "02",
    title: "Practical Enterprise Labs",
    desc: "No simulated toys. You work in real enterprise cloud tenants configuring actual policies, connectors, and governance campaigns.",
  },
  {
    num: "03",
    title: "1-on-1 Mentorship & Review",
    desc: "Direct technical feedback, resume teardowns, interview preparation, and personalized career path guidance from industry leaders.",
  },
  {
    num: "04",
    title: "Practitioner Community",
    desc: "A private peer network of active IAM engineers and alumni sharing job leads, technical solutions, and platform insights.",
  },
  {
    num: "05",
    title: "Books & Study Guides",
    desc: "Authored reference playbooks, exam alignment notes, and architectural diagrams available through our official publication store.",
  },
] as const;

export default function AcademyPage() {
  return (
    <>
      {/* 1. Cinematic Hero with Photographic Background */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#030712] py-24 sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/academy-hero.jpg"
            alt="The IAM Academy Training Environment"
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
              <span>Professional Learning &bull; Career Development</span>
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl lg:leading-[1.08]">
              Learn IAM. <br />
              <span className="bg-gradient-to-r from-[#ebd0a3] via-[#d6a15c] to-amber-200 bg-clip-text text-transparent">
                Practise with purpose.
              </span> <br />
              Build capability.
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
              Transform your cybersecurity career through rigorous, practitioner-led training. From foundational principles to enterprise solution architecture, we prepare you for real-world production environments.
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact?type=individual_learning"
                className="inline-flex min-h-[52px] items-center justify-center border border-[#d6a15c] bg-[#d6a15c] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#030712] shadow-xl transition-all hover:bg-[#e4b26f]"
              >
                Enquire for Upcoming Cohorts
              </Link>
              <a
                href="https://selar.com/m/chiemezie-uzoma1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-3 border border-white/25 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-100 backdrop-blur-md transition-all hover:border-[#d6a15c] hover:text-white"
              >
                <span>Browse Authored Books (Selar)</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Structured Pathways: Architectural Specification Ledger (NOT repetitive cards) */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Curriculum Architecture</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Six progressive pathways to engineering mastery.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Our learning paths are mapped directly to market demand, equipping you with verifiable technical skills rather than superficial exam answers.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {PATHWAYS.map((p) => (
              <div
                key={p.num}
                className="border border-white/10 bg-[#07101f] shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 p-6 sm:p-8 bg-white/[0.02] gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-3xl font-bold text-[#d6a15c]">
                      {p.num}
                    </span>
                    <div>
                      <span className="font-mono text-xs text-[#d6a15c] uppercase tracking-widest block">
                        {p.tier}
                      </span>
                      <h3 className="text-2xl font-bold text-white sm:text-3xl">
                        {p.name}
                      </h3>
                    </div>
                  </div>

                  <Link
                    href={`/contact?type=individual_learning&pathway=${p.name.toLowerCase().replace(/\s+/g, "_")}`}
                    className="inline-flex items-center justify-center border border-white/20 bg-white/[0.04] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-200 transition-all hover:border-[#d6a15c] hover:text-white shrink-0"
                  >
                    Enquire for Pathway
                  </Link>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
                  <div className="space-y-6 lg:col-span-5">
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Target Candidate
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        {p.audience}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#d6a15c]">
                        Hands-On Enterprise Lab
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        {p.lab}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                        Target Career Competency
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        {p.outcome}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-10 lg:pt-0 lg:col-span-7">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#d6a15c]">
                      Core Curriculum Syllabus
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {p.focus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 5 Learning Formats: Horizontal Specification Ribbon */}
      <section className="relative border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Pedagogy &bull; Learning Formats</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Engineered for retention and practical impact.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {FORMATS.map((f, idx) => (
              <div
                key={f.num}
                className={`py-8 sm:py-10 ${
                  idx > 0 ? "lg:border-l lg:border-white/10 lg:pl-6" : ""
                } pr-4`}
              >
                <span className="font-mono text-xs font-bold text-[#d6a15c]">
                  {f.num} {"//"}
                </span>
                <h3 className="mt-3 text-base font-bold text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bookstore Showcase Banner */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border border-[#d6a15c]/40 bg-[#07101f] p-8 sm:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#d6a15c] uppercase">
                  Official Publications
                </span>
                <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  Authored IAM Reference Books &amp; Study Guides
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                  Authored by Chiemezie Uzoma. Practical reference manuals, career playbooks, and certification revision guides for identity security practitioners worldwide.
                </p>
              </div>

              <a
                href="https://selar.com/m/chiemezie-uzoma1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-3 border border-[#d6a15c] bg-[#d6a15c] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#030712] transition-all hover:bg-[#e4b26f]"
              >
                <span>Visit Store on Selar</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs & Integrity Notice */}
      <section className="relative border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Academy FAQs</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Frequently asked questions.
            </h2>
          </div>

          <div className="mt-12">
            <AcademyFaq />
          </div>

          <div className="mt-12 border border-white/10 bg-[#07101f] p-6 text-center text-xs leading-relaxed text-slate-400">
            <strong className="text-white">Learning Integrity Notice:</strong> The IAM Lab Academy is an engineering and operational capability programme. Completion certificates reflect practical competency demonstrated in enterprise lab tasks. We do not sell paper credentials or guarantee employment without personal dedication and technical competence.
          </div>
        </div>
      </section>

      {/* 6. Cohort Enrollment CTA Banner */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="flex items-center justify-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
            <span>Enrollment</span>
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl">
            Ready to accelerate your IAM capability?
          </h2>

          <p className="mt-6 text-base text-slate-300 sm:text-lg">
            Cohort seats are limited to ensure direct instructor interaction and personalized lab guidance. Submit an inquiry to receive syllabus details and schedule information.
          </p>

          <div className="mt-10">
            <Link
              href="/contact?type=individual_learning"
              className="inline-flex min-h-[52px] items-center justify-center border border-[#d6a15c] bg-[#d6a15c] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#030712] shadow-xl transition-all hover:bg-[#e4b26f]"
            >
              Enquire for Next Cohort &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
