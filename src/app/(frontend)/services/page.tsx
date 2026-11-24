import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    "Explore The IAM Lab's six consulting pillars: IAM Strategy & Advisory, IGA, Lifecycle Automation, Authentication/SSO, PAM Engineering, and Implementation Support.",
};

const SIX_SERVICES = [
  {
    id: "strategy",
    num: "01",
    name: "IAM Strategy, Assessment & Advisory",
    tagline: "Clarity on identity risks, maturity posture, and phased priorities.",
    problem:
      "Fragmented IAM practices, unclear ownership of access decisions, inconsistent controls, and difficulty deciding what to strengthen first.",
    scope: [
      "Evaluate identity processes, existing directories, risks, and governance maturity",
      "Analyse excess entitlements, privileged access exposure, and audit bottlenecks",
      "Evaluate target technology improvements vendor-neutrally based on your estate",
      "Deliver an actionable phased transformation roadmap & executive business case",
    ],
    outcomes:
      "A clear view of risk, prioritised governance steps, and informed investment decisions aligned with leadership.",
    suitableFor:
      "Organisations launching an IAM programme, modernising legacy systems, or requiring independent advisory review.",
    platforms: ["Existing Directories", "Cloud Identity Providers", "IGA & PAM Estates"],
  },
  {
    id: "governance",
    num: "02",
    name: "Identity Governance & Access Management",
    tagline: "Structured access workflows, recertification reviews, and traceability.",
    problem:
      "Excessive accumulated permissions, weak application-owner accountability, manual spreadsheets, and insufficient visibility into who holds what access.",
    scope: [
      "Access request workflows and structured multi-tier approval governance",
      "Periodic access review / recertification campaign design and rollout",
      "Practical role modelling and least-privilege entitlement definition",
      "Segregation of Duties (SoD) controls and ongoing audit traceability",
    ],
    outcomes:
      "More consistent access decisions, stronger compliance traceability, and verifiable governance practices.",
    suitableFor:
      "IT, cybersecurity, governance, risk, compliance (GRC), and business application-owner teams.",
    platforms: ["Microsoft Entra ID Governance", "SailPoint", "IGA Platforms per Scope"],
  },
  {
    id: "directory",
    num: "03",
    name: "Identity Lifecycle & Provisioning Automation",
    tagline: "Streamline Joiner-Mover-Leaver operations and remove manual friction.",
    problem:
      "Slow onboarding delays, lingering unrevoked accounts after employee or contractor exits, and high-risk manual provisioning tickets.",
    scope: [
      "Assess and streamline Joiner, Mover, and Leaver (JML) operational flows",
      "Automate user provisioning, deprovisioning, and group membership rules",
      "Connect HR triggers safely to target directories and enterprise SaaS apps",
      "Engineer resilient scripts and agreed API / SCIM 2.0 connectors",
    ],
    outcomes:
      "Reliable access transitions, drastic reduction in manual ticket overhead, and timely revocation at offboarding.",
    suitableFor:
      "Growing organisations managing multiple departments, SaaS applications, and hybrid identity sources.",
    platforms: ["Microsoft Entra ID", "Microsoft Graph", "PowerShell", "SCIM 2.0"],
  },
  {
    id: "auth-sso",
    num: "04",
    name: "Authentication, SSO & Access Modernisation",
    tagline: "Unified sign-in controls and risk-informed access assurance.",
    problem:
      "Inconsistent login enforcement across apps, password sprawl, legacy authentication leakage, and fragmented user access journeys.",
    scope: [
      "Single Sign-On (SSO) design and application onboarding via SAML 2.0 & OIDC",
      "Phishing-resistant Multi-Factor Authentication (MFA) rollouts",
      "Conditional Access policies governed by device compliance and sign-in context",
      "Guided transition away from weak legacy authentication methods",
    ],
    outcomes:
      "Consistent access policy enforcement across the organisation alongside simpler, safer sign-in for employees.",
    suitableFor:
      "Organisations standardising application access and securing hybrid workforce authentication.",
    platforms: ["Microsoft Entra ID", "Okta", "SAML 2.0 / OIDC", "Conditional Access"],
  },
  {
    id: "pam",
    num: "05",
    name: "Privileged Access Management (PAM)",
    tagline: "Contain elevated administrative risk across critical infrastructure.",
    problem:
      "Overprivileged service and user accounts, shared root credentials, and limited audit oversight of high-risk administrative sessions.",
    scope: [
      "Assessment and architecture design for privileged identity controls",
      "Privileged credential vaulting policies and automated secret rotation",
      "Just-in-Time (JIT) privilege elevation and structured approval workflows",
      "Hardening administrative tiering and operational monitoring procedures",
    ],
    outcomes:
      "Controlled privileged access, elimination of permanent standing admins, and clear administrative accountability.",
    suitableFor:
      "Security operations, cloud engineering, and core infrastructure administration teams.",
    platforms: ["CyberArk", "Microsoft Entra Privileged Identity (PIM)", "PAM Controls"],
  },
  {
    id: "implementation",
    num: "06",
    name: "IAM Implementation, Integration & Support",
    tagline: "Hands-on technical delivery, troubleshooting, and skills handover.",
    problem:
      "Project delivery bottlenecks, stalled application onboarding, and gaps between high-level architectural recommendations and live operations.",
    scope: [
      "Scoped technical assistance with IAM platform configuration & deployments",
      "Troubleshooting complex synchronization, token, or integration defects",
      "Clear operational documentation, architecture diagrams, and runbooks",
      "Structured knowledge transfer enabling your internal support engineers",
    ],
    outcomes:
      "Tangible technical progress, documented operating practices, and stronger internal team self-sufficiency.",
    suitableFor:
      "Organisations executing active IAM projects or technology teams requiring specialist technical depth.",
    platforms: ["Hybrid Directories", "Entra ID / Okta / SailPoint", "Custom Integrations"],
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

      {/* 1. Architectural Server & Advisory Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={heroSec?.bgImage || "/brand/enterprise-architecture.jpg"}
            alt="Executive conference center alongside glass-walled enterprise directory server racks"
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
                "Connected Decisions. Defensible Identity Control."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {heroSec?.subheadline ||
                pageData?.hero_subheadline ||
                "Identity security is not one product or a single policy — it is a set of connected decisions about who receives access, how access is approved, how change is handled, and how risk is governed."}
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
          <span className="mr-2 shrink-0 font-mono text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Jump to Pillar:
          </span>
          {SIX_SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 border border-slate-200 bg-[#F7F6F2] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#0B1424] transition-colors hover:border-[#D89A43] hover:bg-white"
            >
              {s.num} &middot; {s.name.split(" ")[0]} {s.name.split(" ")[1]}
            </a>
          ))}
        </div>
      </nav>

      {/* 3. Alternating Structural Editorial Pillars Showcase (Non-Uniform Composition) */}
      <section className="divide-y divide-slate-200 border-b border-slate-200 bg-[#F7F6F2]">
        {SIX_SERVICES.map((s, idx) => {
          const isEven = idx % 2 === 1;
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
                      <span className="font-mono text-sm font-bold text-[#B07424]">
                        {s.num} {"//"}
                      </span>
                      <span className="h-px flex-1 bg-slate-300" />
                    </div>

                    <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#0B1424] sm:text-3xl">
                      {s.name}
                    </h2>

                    <p className="mt-3 text-base font-medium text-slate-700">
                      {s.tagline}
                    </p>

                    <div className="mt-8 border-l-2 border-rose-700/60 pl-4">
                      <span className="font-mono text-[10px] font-bold tracking-wider text-rose-700 uppercase">
                        Problem Addressed
                      </span>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                        {s.problem}
                      </p>
                    </div>

                    <div className="mt-6 border-l-2 border-emerald-700/60 pl-4">
                      <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
                        Expected Outcomes
                      </span>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                        {s.outcomes}
                      </p>
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/contact?type=enterprise_consulting&service=${s.id}`}
                        className="inline-flex items-center gap-2 bg-[#0B1424] px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#14243B]"
                      >
                        <span>Discuss {s.name.split(",")[0]}</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  </FadeIn>

                  {/* Pillar Technical Specification & Scope Column */}
                  <FadeIn
                    delay={0.1}
                    className="border border-slate-200 bg-white p-8 shadow-xs lg:col-span-7 lg:p-10"
                  >
                    <div>
                      <span className="font-mono text-[11px] font-bold tracking-wider text-[#B07424] uppercase">
                        Scope of Advisory &amp; Technical Delivery
                      </span>
                      <ul className="mt-5 divide-y divide-slate-100 border-t border-b border-slate-100">
                        {s.scope.map((item, sIdx) => (
                          <li
                            key={item}
                            className="flex items-start gap-4 py-3.5 text-sm leading-relaxed text-slate-700"
                          >
                            <span className="mt-0.5 font-mono text-xs font-bold text-[#B07424]">
                              0{sIdx + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <span className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Ideal Organisational Fit
                        </span>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600">
                          {s.suitableFor}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Technology Context (Per Scope)
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

      {/* 4. Interactive Commercial Delivery Timeline (Midnight Navy #0B1424) */}
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
              Structured execution from discovery to knowledge transfer.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Select each phase below to inspect how we scope deliverables, maintain transparency, and hand over durable controls.
            </p>
          </FadeIn>

          <DeliveryTimeline theme="dark" />
        </div>
      </section>

      {/* 5. Future Capability Notice */}
      <section className="border-b border-white/10 bg-[#14243B] py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border border-white/15 bg-[#0B1424] p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#D89A43]" />
              <p className="font-mono text-xs font-semibold tracking-wider text-[#D89A43] uppercase">
                Future Roadmap Capability // Planned Extension
              </p>
            </div>
            <h3 className="mt-3 text-lg font-bold text-white">
              IAM Specialist Network &amp; Talent Enablement Pipeline
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              An IAM specialist network and vetted talent pipeline may be introduced later once vetting, contractor governance, and quality assurance frameworks are established. Our active services today focus exclusively on consulting advisory, technical delivery, and team capability enablement.
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
            We will discuss what technical advisory or implementation support is appropriate and how a scoped engagement can help.
          </p>
          <div className="mt-9">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#D89A43] px-8 py-3.5 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
            >
              Request a Consultation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
