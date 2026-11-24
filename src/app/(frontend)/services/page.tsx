import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Compass,
  KeyRound,
  LockKeyhole,
  ServerCog,
  Users,
  Workflow,
} from "lucide-react";
import { CustomCmsSections } from "@/components/CustomCmsSections";
import { DeliveryTimeline } from "@/components/DeliveryTimeline";
import { FadeIn } from "@/components/MotionWrappers";
import {
  findSection,
  getCustomSections,
  getPageData,
} from "@/lib/getPageData";
import { resolveDraftPreview } from "@/lib/previewHelper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services & Solutions | Enterprise IAM Consulting",
  description:
    "Explore The IAM Lab's six practice areas: IAM Strategy, Assessment & Advisory, Identity Governance & Access Management, Identity Lifecycle & Provisioning Automation, Authentication & SSO, PAM, and IAM Implementation & Technical Support.",
};

const SIX_SERVICES = [
  {
    id: "strategy",
    shortTitle: "Strategy & Advisory",
    name: "IAM Strategy, Assessment & Advisory",
    service:
      "Assess identity processes, technology architecture, risks, governance maturity, and business requirements; define practical improvement priorities and a roadmap.",
    problem:
      "Fragmented IAM practices, unclear ownership, inconsistent controls, and difficulty deciding what to improve first.",
    outcomes:
      "A clearer view of risk, a prioritised plan, and more informed architecture or investment decisions.",
    suitableFor:
      "Organisations planning a new IAM programme, modernisation, security improvement, or independent review.",
    platforms: ["Existing Directories", "Cloud Identity Providers", "IGA & PAM Environments (Per Scope)"],
    Icon: Compass,
  },
  {
    id: "governance",
    shortTitle: "Identity Governance",
    name: "Identity Governance & Access Management",
    service:
      "Support identity governance design, access request workflows, approvals, access review processes, role models, and least-privilege practices.",
    problem:
      "Excess permissions, weak ownership of access, manual recertification, and insufficient visibility into who can access what.",
    outcomes:
      "More consistent access decisions, traceability, and stronger governance processes.",
    suitableFor:
      "IT, cybersecurity, risk, compliance, and application-owner teams.",
    platforms: ["Microsoft Entra ID", "SailPoint", "Relevant Governance Platforms"],
    Icon: Users,
  },
  {
    id: "directory",
    shortTitle: "Lifecycle Automation",
    name: "Identity Lifecycle & Provisioning Automation",
    service:
      "Assess and improve joiner, mover, and leaver processes, user provisioning and deprovisioning, group management, workflow integration, and process automation.",
    problem:
      "Slow onboarding, lingering access after role changes or exits, repetitive tickets, and avoidable manual errors.",
    outcomes:
      "More reliable access changes, reduced manual intervention, and improved lifecycle controls.",
    suitableFor:
      "Organisations managing multiple departments, applications, or identity repositories.",
    platforms: ["Microsoft Entra ID", "Microsoft Graph", "PowerShell", "Identity Directories & Connectors"],
    Icon: Workflow,
  },
  {
    id: "auth-sso",
    shortTitle: "Authentication & SSO",
    name: "Authentication, SSO & Access Modernisation",
    service:
      "Support secure authentication designs, SSO, MFA, conditional access, application onboarding, and access policy improvement.",
    problem:
      "Inconsistent sign-in controls, fragmented access experiences, and avoidable authentication exposure.",
    outcomes:
      "Clearer access policies, better sign-in consistency, and risk-informed authentication controls.",
    suitableFor: "Organisations modernising user and application access.",
    platforms: ["Microsoft Entra ID", "Okta", "Authentication Protocols (Per Scope)"],
    Icon: LockKeyhole,
  },
  {
    id: "pam",
    shortTitle: "Privileged Access",
    name: "Privileged Access Management (PAM)",
    service:
      "Provide assessment, design, and technical support for privileged identity controls, privileged access workflows, role elevation, and related operating processes.",
    problem:
      "Overprivileged accounts, unmanaged administrative access, and difficulty monitoring sensitive access.",
    outcomes:
      "A more controlled approach to privileged access and clearer accountability.",
    suitableFor:
      "Security operations, infrastructure, cloud, and platform engineering teams.",
    platforms: ["CyberArk", "Microsoft Entra Privileged Identity (In Scope)"],
    Icon: KeyRound,
  },
  {
    id: "implementation",
    shortTitle: "Implementation & Support",
    name: "IAM Implementation, Integration & Technical Support",
    service:
      "Provide scoped assistance with IAM platform configuration, integrations, troubleshooting, operational documentation, and knowledge transfer.",
    problem:
      "Project delivery bottlenecks, integration issues, and gaps between architecture and day-to-day operations.",
    outcomes:
      "Defined technical deliverables, clearer operating practices, and skills transfer for internal teams.",
    suitableFor:
      "Organisations implementing or improving an IAM capability and technology partners requiring specialist input.",
    platforms: ["Scope Confirmed Per Engagement", "Client-Driven Technology Selection"],
    Icon: ServerCog,
  },
] as const;

const BUILTIN_SERVICES_SECTIONS = new Set([
  "hero",
  "services_list",
  "delivery_timeline",
  "future_capability",
  "closing_cta",
]);

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const allowDraft = await resolveDraftPreview(searchParams);
  const pageData = await getPageData("services", { allowDraft });

  const heroSec = findSection(pageData, "hero");
  const customSections = getCustomSections(pageData, BUILTIN_SERVICES_SECTIONS);

  return (
    <>
      {allowDraft && pageData?.status === "draft" && (
        <div className="bg-[#D89A43] px-4 py-2 text-center font-mono text-xs font-bold text-[#0B1424] uppercase">
          CMS Draft Preview Active &mdash; Changes below are not yet published publicly
        </div>
      )}

      {/* 1. Hero — Client-Exact Opening Copy */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={heroSec?.bgImage || "/brand/enterprise-architecture.jpg"}
            alt="Executive conference center alongside enterprise identity architecture systems"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424]/95 via-[#0B1424]/85 to-[#14243B]/65" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                {heroSec?.badge || "Services & Solutions"}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroSec?.headline ||
                pageData?.hero_headline ||
                "Connected decisions. Defensible identity control."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {heroSec?.subheadline ||
                pageData?.hero_subheadline ||
                "Identity security is not one product or a single policy. It is a set of connected decisions about who receives access, how access is approved, how identity changes are handled, and how risk is controlled. The IAM Lab provides scoped IAM consulting, technical guidance, and implementation support to help organisations improve these decisions."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Sticky Quick-Jump Pillar Anchor Rail */}
      <nav
        aria-label="Consulting Pillars Quick Navigation"
        className="sticky top-[84px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md sm:top-[93px]"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-5 py-3 sm:px-8 lg:px-12">
          <span className="mr-1 shrink-0 font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Practice Areas:
          </span>
          {SIX_SERVICES.map((s) => {
            const NavIcon = s.Icon;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex shrink-0 items-center gap-1.5 border border-slate-200 bg-[#F7F6F2] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#0B1424] transition-colors hover:border-[#D89A43] hover:bg-white"
              >
                <NavIcon className="h-3.5 w-3.5 text-[#B07424]" aria-hidden="true" />
                <span>{s.shortTitle}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* 3. Six Source-Accurate Practice Sections */}
      <section className="divide-y divide-slate-200 border-b border-slate-200 bg-[#F7F6F2]">
        {SIX_SERVICES.map((s, idx) => {
          const isEven = idx % 2 === 1;
          const ServiceIcon = s.Icon;
          return (
            <div
              key={s.id}
              id={s.id}
              className={`scroll-mt-44 py-20 sm:py-24 ${
                isEven ? "bg-white" : "bg-[#F7F6F2]"
              }`}
            >
              <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                  {/* Pillar Overview Column */}
                  <FadeIn className="lg:col-span-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center border border-[#D89A43]/40 bg-white text-[#B07424]">
                        <ServiceIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="h-px flex-1 bg-slate-300" />
                    </div>

                    <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#0B1424] sm:text-3xl">
                      {s.name}
                    </h2>

                    <div className="mt-6 border-l-2 border-rose-700/60 pl-4">
                      <span className="font-mono text-[10px] font-bold tracking-wider text-rose-700 uppercase">
                        Problem Addressed
                      </span>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {s.problem}
                      </p>
                    </div>

                    <div className="mt-6 border-l-2 border-emerald-700/60 pl-4">
                      <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
                        Outcomes
                      </span>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                        {s.outcomes}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/contact?type=enterprise_consulting&service=${s.id}`}
                        className="inline-flex items-center gap-2 whitespace-nowrap bg-[#0B1424] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#14243B]"
                      >
                        <span>Request Consultation</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </FadeIn>

                  {/* Pillar Technical Specification Column */}
                  <FadeIn
                    delay={0.1}
                    className="border border-slate-200 bg-white p-8 shadow-xs lg:col-span-7 lg:p-10"
                  >
                    <div>
                      <span className="font-mono text-[11px] font-bold tracking-wider text-[#B07424] uppercase">
                        Service Scope
                      </span>
                      <div className="mt-4 flex items-start gap-3 border-t border-b border-slate-100 py-4 text-sm leading-relaxed text-slate-700">
                        <CheckCircle2
                          className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#B07424]"
                          aria-hidden="true"
                        />
                        <p>{s.service}</p>
                      </div>
                    </div>

                    <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <span className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Suitable For
                        </span>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">
                          {s.suitableFor}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Technology Context
                        </span>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {s.platforms.map((plat) => (
                            <span
                              key={plat}
                              className="border border-slate-200 bg-[#F7F6F2] px-2.5 py-1 font-mono text-[11px] text-[#0B1424]"
                            >
                              {plat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 4. Interactive Commercial Delivery Timeline */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mb-14 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Service Delivery Model
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              How we engage and deliver clarity.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Select each phase below to inspect how we scope deliverables and transfer operational knowledge.
            </p>
          </FadeIn>

          <DeliveryTimeline theme="dark" />
        </div>
      </section>

      {/* 5. Future Capability Notice — Explicitly Not Live Yet */}
      <section className="border-b border-white/10 bg-[#14243B] py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border border-white/15 bg-[#0B1424] p-7 sm:p-8">
            <div className="flex items-center gap-2.5 text-[#D89A43]">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold tracking-wider uppercase">
                Future Capability &mdash; Not a Live Service Yet
              </p>
            </div>
            <h3 className="mt-3 text-lg font-bold text-white">
              IAM Specialist Network &amp; Talent Placement Service
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              An IAM specialist network or talent placement service may be introduced later once vetting, contractor agreements, quality assurance, client delivery obligations, and relevant legal arrangements are established.
            </p>
          </div>
        </div>
      </section>

      <CustomCmsSections sections={customSections} />

      {/* 6. Closing Consultation CTA */}
      <section className="relative overflow-hidden bg-[#0B1424] py-24 text-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/brand/executive-consulting.jpg"
            alt="Executive advisory consultation suite"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-[#0B1424]/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Tell us about your identity security priorities.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            We&apos;ll discuss what support is appropriate and how a scoped engagement could work.
          </p>
          <div className="mt-9">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[50px] items-center justify-center whitespace-nowrap bg-[#D89A43] px-8 py-3.5 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
            >
              Request a Consultation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
