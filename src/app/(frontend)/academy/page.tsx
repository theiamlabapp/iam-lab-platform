import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AcademyFaq } from "@/components/AcademyFaq";
import { getPageData } from "@/lib/getPageData";

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
    title: "1-on-1 Mentorship & Career Guidance",
    desc: "Direct technical feedback, resume teardowns, mock technical interviews, and personalized career path guidance from industry leaders.",
  },
  {
    num: "04",
    title: "Enterprise Corporate Enablement",
    desc: "Custom training programmes designed for corporate engineering and security teams deploying new IAM infrastructure.",
  },
  {
    num: "05",
    title: "Selar Digital Resource Library",
    desc: "Structured workbooks, architecture guides, and technical reference manuals available on our official Selar store.",
  },
] as const;

export default async function AcademyPage() {
  const pageData = await getPageData("academy");

  return (
    <>
      {/* 1. Photographic Academy Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/brand/academy-classroom.jpg"
            alt="The IAM Academy professional learning masterclass"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424]/90 via-[#0B1424]/80 to-[#14243B]/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Professional Education
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pageData?.hero_headline || "The IAM Academy."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {pageData?.hero_subheadline ||
                "Practical, practitioner-led Identity and Access Management education. From foundational principles to enterprise architecture and privileged access engineering."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact?type=individual_learning"
                className="inline-flex min-h-[48px] items-center justify-center bg-[#D89A43] px-7 py-3 text-sm font-bold tracking-wider text-[#0B1424] uppercase hover:bg-[#e4a856]"
              >
                Apply for Next Cohort
              </Link>
              <a
                href="https://selar.com/m/chiemezie-uzoma1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:border-[#D89A43] hover:text-[#D89A43]"
              >
                Selar Bookstore &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Six Learning Pathways */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold tracking-widest text-[#D89A43] uppercase">
              STRUCTURED PROGRESSION
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0B1424] sm:text-4xl">
              Six learning pathways tailored to your career stage.
            </h2>
            <p className="mt-4 text-base text-slate-700">
              Whether entering cybersecurity or advancing to principal architect, our pathways deliver verifiable enterprise competence.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            {PATHWAYS.map((p) => (
              <div
                key={p.num}
                className="border border-slate-200 bg-[#FFFFFF] p-8 sm:p-10 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#D89A43]">
                      {p.tier}
                    </span>
                    <h3 className="text-2xl font-bold text-[#0B1424]">
                      {p.name}
                    </h3>
                  </div>
                  <span className="border border-slate-200 bg-[#F7F6F2] px-3 py-1 text-xs font-medium text-slate-700">
                    {p.audience}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-5">
                    <span className="font-mono text-xs font-semibold text-slate-500 uppercase">
                      Core Syllabus &amp; Theory
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {p.focus}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                    <span className="font-mono text-xs font-semibold text-[#0B1424] uppercase">
                      Hands-On Tenant Lab
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {p.lab}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-6 lg:col-span-3 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                    <span className="font-mono text-xs font-semibold text-emerald-800 uppercase">
                      Expected Competency
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {p.outcome}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Five Learning Formats */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold tracking-widest text-[#D89A43] uppercase">
              DELIVERY FORMATS
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Flexible learning built for working professionals.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {FORMATS.map((f) => (
              <div
                key={f.num}
                className="border border-white/10 bg-[#14243B]/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#D89A43]">
                    FORMAT // {f.num}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-white">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Selar Bookstore Feature */}
      <section className="border-b border-slate-200 bg-[#FFFFFF] py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border-2 border-[#D89A43] bg-[#F7F6F2] p-8 sm:p-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-[#D89A43] uppercase">
                  Digital Publications
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[#0B1424]">
                  Official IAM Workbooks &amp; Study Guides
                </h3>
                <p className="mt-2 text-sm text-slate-700 max-w-xl">
                  Authored by Chiemezie Uzoma, our practical e-books and architecture workbooks are available for immediate digital download via Selar.
                </p>
              </div>
              <a
                href="https://selar.com/m/chiemezie-uzoma1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center bg-[#0B1424] px-6 py-3.5 text-xs font-bold text-white uppercase hover:bg-[#14243B]"
              >
                Visit Selar Store &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Academic Integrity Notice */}
      <section className="border-b border-white/10 bg-[#14243B] py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border border-white/10 bg-[#0B1424] p-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#D89A43]" />
              <p className="font-mono text-xs font-semibold tracking-wider text-[#D89A43] uppercase">
                Professional Learning Integrity Notice
              </p>
            </div>
            <h3 className="mt-3 text-lg font-bold text-white">
              Grounded in Competency, Never Shortcut Certification
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              The IAM Academy does not sell certifications, provide exam proxies, or offer unauthorized exam dumps. We train students to understand enterprise architecture, configure production tenants, and pass official vendor credentials (Microsoft, CyberArk, SailPoint) through verifiable personal technical mastery.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Interactive FAQs */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <span className="font-mono text-xs font-bold tracking-widest text-[#D89A43] uppercase">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Everything you need to know about the Academy.
            </h2>
          </div>
          <div className="mt-12">
            <AcademyFaq />
          </div>
        </div>
      </section>

      {/* 7. Closing Enrollment CTA */}
      <section className="border-b border-white/10 bg-[#0B1424] py-20 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-bold text-white">
            Take the next step in your IAM career.
          </h2>
          <p className="mt-4 text-slate-300">
            Cohort spaces are limited to preserve 1-on-1 mentorship quality. Submit an enquiry to receive the syllabus and cohort timetable.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?type=individual_learning"
              className="inline-flex min-h-[48px] items-center justify-center bg-[#D89A43] px-8 py-3 text-sm font-bold tracking-wider text-[#0B1424] uppercase hover:bg-[#e4a856]"
            >
              Enquire About Enrollment &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
