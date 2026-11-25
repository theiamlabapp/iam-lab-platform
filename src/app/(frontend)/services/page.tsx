import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
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
    serviceParam: "service_strategy",
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
    technologyContext:
      "Existing directories, cloud identity providers, IGA and PAM environments, according to scope.",
    Icon: Compass,
  },
  {
    id: "governance",
    serviceParam: "service_governance",
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
    technologyContext:
      "Microsoft Entra ID, SailPoint, and other relevant governance platforms, subject to confirmed delivery capability.",
    Icon: Users,
  },
  {
    id: "directory",
    serviceParam: "service_directory",
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
    technologyContext:
      "Microsoft Entra ID, Microsoft Graph, PowerShell, identity directories, and agreed connectors.",
    Icon: Workflow,
  },
  {
    id: "auth-sso",
    serviceParam: "service_auth_sso",
    shortTitle: "Authentication & SSO",
    name: "Authentication, SSO & Access Modernisation",
    service:
      "Support secure authentication designs, SSO, MFA, conditional access, application onboarding, and access policy improvement.",
    problem:
      "Inconsistent sign-in controls, fragmented access experiences, and avoidable authentication exposure.",
    outcomes:
      "Clearer access policies, better sign-in consistency, and risk-informed authentication controls.",
    suitableFor: "Organisations modernising user and application access.",
    technologyContext:
      "Microsoft Entra ID, Okta, and relevant authentication protocols, subject to the agreed project.",
    Icon: LockKeyhole,
  },
  {
    id: "pam",
    serviceParam: "service_pam",
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
    technologyContext:
      "CyberArk and Microsoft Entra privileged identity capabilities, where in project scope.",
    Icon: KeyRound,
  },
  {
    id: "implementation",
    serviceParam: "service_cloud_iam",
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
    technologyContext:
      "Scope confirmed per engagement; technology choices follow client requirements and existing architecture.",
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

      {/* 1. Editorial Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-20 sm:py-28 lg:py-32">
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

            <h1 className="mt-5 text-[1.9rem] leading-[1.14] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroSec?.headline ||
                pageData?.hero_headline ||
                "Connected decisions. Defensible identity control."}
            </h1>

            <p className="mt-5 text-[15px] leading-relaxed text-slate-300 sm:text-lg">
              {heroSec?.subheadline ||
                pageData?.hero_subheadline ||
                "Identity security is not one product or a single policy. It is a set of connected decisions about who receives access, how access is approved, how identity changes are handled, and how risk is controlled. The IAM Lab provides scoped IAM consulting, technical guidance, and implementation support to help organisations improve these decisions."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Sticky Anchor Bar */}
      <nav
        aria-label="Consulting Services Quick Navigation"
        className="sticky top-[84px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md sm:top-[93px]"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-5 py-3 sm:px-8 lg:px-12">
          {SIX_SERVICES.map((s) => {
            const NavIcon = s.Icon;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex shrink-0 items-center gap-1.5 border border-slate-200 bg-[#F7F6F2] px-3 py-1.5 text-xs font-semibold text-[#0B1424] transition-colors hover:border-[#D89A43] hover:bg-white"
              >
                <NavIcon className="h-3.5 w-3.5 text-[#B07424]" aria-hidden="true" />
                <span>{s.shortTitle}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* 3. Clean Editorial Enterprise Consulting Grid (6 Practice Areas) */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mb-12 max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#B07424] uppercase">
              Practice Areas
            </span>
            <h2 className="mt-3 text-[1.65rem] leading-[1.2] font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
              Scoped consulting &amp; implementation services.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {SIX_SERVICES.map((s, idx) => {
              const ServiceIcon = s.Icon;
              return (
                <FadeIn
                  key={s.id}
                  id={s.id}
                  delay={idx * 0.05}
                  className="scroll-mt-44 flex flex-col justify-between border border-slate-200 bg-white p-7 transition-colors hover:border-[#D89A43]/70 sm:p-9"
                >
                  <div>
                    <div className="flex items-start gap-4 border-b border-slate-100 pb-6">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-slate-200 bg-[#F7F6F2] text-[#B07424]">
                        <ServiceIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold tracking-tight text-[#0B1424] sm:text-2xl">
                          {s.name}
                        </h3>
                      </div>
                    </div>

                    <dl className="mt-6 space-y-4 text-sm">
                      <div>
                        <dt className="font-mono text-[10px] font-bold tracking-wider text-[#B07424] uppercase">
                          Service Scope
                        </dt>
                        <dd className="mt-1 leading-relaxed text-slate-700">
                          {s.service}
                        </dd>
                      </div>

                      <div className="border-t border-slate-100 pt-4">
                        <dt className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Problem Addressed
                        </dt>
                        <dd className="mt-1 leading-relaxed text-slate-600">
                          {s.problem}
                        </dd>
                      </div>

                      <div className="border-t border-slate-100 pt-4">
                        <dt className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                          Outcomes
                        </dt>
                        <dd className="mt-1 leading-relaxed text-slate-700">
                          {s.outcomes}
                        </dd>
                      </div>

                      <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
                        <div>
                          <dt className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                            Suitable For
                          </dt>
                          <dd className="mt-1 text-xs leading-relaxed text-slate-600">
                            {s.suitableFor}
                          </dd>
                        </div>

                        <div>
                          <dt className="font-mono text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                            Technology Context
                          </dt>
                          <dd className="mt-1 text-xs leading-relaxed text-slate-600">
                            {s.technologyContext}
                          </dd>
                        </div>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <Link
                      href={`/contact?type=enterprise_consulting&service=${s.serviceParam}`}
                      className="inline-flex items-center gap-2 whitespace-nowrap bg-[#0B1424] px-5 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#14243B]"
                    >
                      <span>Request Consultation</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Preserved Service Delivery Model Section */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mb-14 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Service Delivery Model
              </span>
            </div>
            <h2 className="mt-4 text-[1.65rem] leading-[1.2] font-extrabold tracking-tight text-white sm:text-4xl">
              How we engage and deliver clarity.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Select each phase below to inspect how we scope deliverables and transfer operational knowledge.
            </p>
          </FadeIn>

          <DeliveryTimeline theme="dark" />
        </div>
      </section>

      {/* 5. Understated Future Capability Note */}
      <section className="border-b border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="flex flex-col gap-3 border-l-2 border-[#D89A43] pl-5">
            <div className="flex items-center gap-2 text-[#B07424]">
              <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
              <p className="font-mono text-xs font-bold tracking-wider uppercase">
                Future Capability &mdash; Not a Live Service Yet
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
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
          <h2 className="text-[1.7rem] leading-[1.2] font-extrabold text-white sm:text-4xl">
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
