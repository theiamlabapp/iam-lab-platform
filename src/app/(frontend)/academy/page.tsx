import type { Metadata } from "next";
import Link from "next/link";
import { AcademyFaq } from "@/components/AcademyFaq";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "IAM Academy | Professional Identity Security Learning & Mentorship",
  description:
    "Master enterprise Identity and Access Management through 6 structured career pathways, live cohort training, hands-on labs, and expert mentorship.",
};

const PATHWAYS = [
  {
    num: "01",
    name: "IAM Foundation",
    level: "Foundational • Beginner",
    audience: "Career switchers, IT graduates, and beginners with technical aptitude.",
    focus:
      "Core identity principles, directory services (AD / LDAP), Authentication vs. Authorization vs. Accounting (AAA), foundational modern protocols (SAML, OAuth 2.0, OpenID Connect).",
    outcome:
      "A rock-solid conceptual and operational foundation to begin specializing in enterprise access security.",
  },
  {
    num: "02",
    name: "IAM Analyst",
    level: "Practitioner • Early Career",
    audience: "Helpdesk analysts, IT administrators, and junior security analysts.",
    focus:
      "Day-to-day access operations, entitlement troubleshooting, user onboarding workflows, access certification campaigns, and audit compliance controls (GRC).",
    outcome:
      "Immediate operational competency in managing and reviewing enterprise user entitlements.",
  },
  {
    num: "03",
    name: "IAM Engineer",
    level: "Professional • Engineering",
    audience: "Systems engineers, cloud administrators, and technical analysts.",
    focus:
      "Single Sign-On (SSO) configuration, automated user lifecycle provisioning, SCIM connector setup, PowerShell and API automation, and hybrid directory synchronization.",
    outcome:
      "Production-ready capability to integrate enterprise applications and automate access lifecycle processes.",
  },
  {
    num: "04",
    name: "Senior IAM Engineer",
    level: "Advanced • Senior Practitioner",
    audience: "Experienced IAM engineers and infrastructure specialists.",
    focus:
      "Complex troubleshooting, high-availability platform resilience, Privileged Access Management (PAM) vaulting and session isolation, CI/CD pipeline governance, and emerging AI use cases.",
    outcome:
      "Mastery over mission-critical identity infrastructure and advanced enterprise privilege defenses.",
  },
  {
    num: "05",
    name: "IAM Architect",
    level: "Expert • Strategic Architecture",
    audience: "Principal engineers, tech leads, and aspiring security architects.",
    focus:
      "End-to-end enterprise identity architecture, Zero-Trust network integration, multi-cloud access governance (AWS, Azure, GCP), vendor selection, and compliance mapping (ISO 27001, SOX).",
    outcome:
      "The architectural vision and design authority to lead organization-wide identity modernizations.",
  },
  {
    num: "06",
    name: "IAM Consultant & Leadership",
    level: "Executive • Advisory & Practice",
    audience: "Practice leaders, consultants, and senior advisory specialists.",
    focus:
      "Client engagement methodology, executive risk communication, business case justification, commercial scoping, and steering committee governance.",
    outcome:
      "The strategic advisory skills required to interface with C-level stakeholders and deliver commercial consulting value.",
  },
] as const;

const FORMATS = [
  {
    title: "Live Interactive Cohorts",
    description:
      "Instructor-led evening and weekend sessions designed for working professionals, featuring direct Q&A and architecture teardowns.",
  },
  {
    title: "Practical Enterprise Labs",
    description:
      "No simulated toys. You work in real enterprise cloud tenants configuring actual policies, connectors, and governance campaigns.",
  },
  {
    title: "1-on-1 Mentorship & Review",
    description:
      "Direct technical feedback, resume teardowns, interview preparation, and personalized career path guidance from industry leaders.",
  },
  {
    title: "Practitioner Community",
    description:
      "A private peer network of active IAM engineers and alumni sharing job leads, technical solutions, and platform insights.",
  },
  {
    title: "Books & Study Guides",
    description:
      "Authored reference playbooks, exam alignment notes, and architectural diagrams available through our official publication store.",
  },
] as const;

export default function AcademyPage() {
  return (
    <>
      {/* 1. Academy Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-blue-600/10 to-transparent blur-[120px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
              The IAM Academy
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Learn IAM. Practise with purpose. Build capability.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Transform your cybersecurity career through rigorous, practitioner-led training. From foundational principles to enterprise solution architecture, we prepare you for real-world production environments.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact?type=individual_learning"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#d6a15c] to-[#e4b26f] px-7 py-3 text-sm font-semibold text-[#050a14] shadow-md transition-all hover:brightness-110 sm:w-auto"
              >
                Enquire About Upcoming Cohorts
              </Link>
              <a
                href="https://selar.com/m/chiemezie-uzoma1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-amber-400/40 hover:text-white sm:w-auto"
              >
                <span>Browse Authored Books (Selar)</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 6 Learning Pathways */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            theme="dark"
            eyebrow="Structured Pathways"
            title="A progressive curriculum for every career stage"
            description="Our learning paths are mapped to active industry demand, equipping you with verifiable technical skills rather than superficial exam answers."
          />

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PATHWAYS.map((path) => (
              <div
                key={path.num}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#07101f]/85 p-8 transition-all hover:border-amber-400/30 hover:bg-[#07101f]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-amber-400">
                      {path.level}
                    </span>
                    <span className="font-mono text-sm font-bold text-slate-500">
                      {path.num}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white">
                    {path.name}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-slate-400">
                    Target: {path.audience}
                  </p>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-mono text-xs text-amber-300/80 uppercase">
                      Curriculum Core
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                      {path.focus}
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-white/5 bg-[#030712]/50 p-4">
                  <p className="font-mono text-[11px] text-slate-400 uppercase">
                    Competency Milestone
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {path.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 5 Learning Formats */}
      <section className="relative border-t border-white/10 bg-[#030712] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            theme="dark"
            align="center"
            eyebrow="Delivery Modes"
            title="How you learn at The IAM Lab"
            description="We combine interactive live teaching, dedicated enterprise lab environments, and continuous mentorship to ensure lasting retention."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {FORMATS.map((fmt, idx) => (
              <div
                key={fmt.title}
                className="rounded-2xl border border-white/10 bg-[#07101f]/70 p-6"
              >
                <span className="font-mono text-xs font-bold text-amber-400">
                  0{idx + 1}
                </span>
                <h3 className="mt-3 text-base font-semibold text-white">
                  {fmt.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {fmt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Digital Storefront Banner */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-r from-amber-500/10 via-[#07101f] to-amber-500/5 p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
                  Official Publications &amp; Study Resources
                </span>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Authored IAM Books &amp; Architectural Manuals
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                  Authored by Chiemezie Uzoma. Practical reference manuals, career playbooks, and certification revision guides for identity security practitioners worldwide.
                </p>
              </div>

              <a
                href="https://selar.com/m/chiemezie-uzoma1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-semibold text-[#050a14] shadow-md transition-all hover:bg-amber-300"
              >
                <span>Visit Store on Selar</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h4a.75.75 0 0 1 0 1.5h-4Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.156 8.194a.75.75 0 0 0-.053 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs & Integrity Notice */}
      <section className="relative border-t border-white/10 bg-[#030712] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="Frequently Asked Questions"
            title="Everything you need to know about the Academy"
            description="Clear answers regarding our prerequisites, teaching formats, certification alignments, and corporate options."
          />

          <div className="mt-12">
            <AcademyFaq />
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center text-xs leading-relaxed text-slate-400">
            <strong className="text-slate-300">Learning Integrity Notice:</strong> The IAM Lab Academy is an engineering and operational capability programme. Completion certificates reflect practical competency demonstrated in enterprise lab tasks. We do not sell paper credentials or guarantee employment without personal dedication and technical competence.
          </div>
        </div>
      </section>

      {/* 6. Enrollment CTA */}
      <section className="relative border-t border-white/10 bg-gradient-to-b from-[#050a14] to-[#02050c] py-20 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to accelerate your IAM capability?
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Cohort seats are limited to ensure direct instructor interaction and personalized lab guidance. Submit an inquiry to receive syllabus details and schedule information.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?type=individual_learning"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-[#d6a15c] to-[#e4b26f] px-8 py-3.5 text-sm font-semibold text-[#050a14] shadow-md transition-all hover:brightness-110"
            >
              Enquire for Next Cohort &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
