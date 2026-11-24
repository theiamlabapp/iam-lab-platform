import Image from "next/image";
import Link from "next/link";
import { CustomCmsSections } from "@/components/CustomCmsSections";
import { DeliveryTimeline } from "@/components/DeliveryTimeline";
import { HomeHero } from "@/components/HomeHero";
import { IdentityFabricVisual } from "@/components/IdentityFabricVisual";
import { InteractivePillarsExplorer } from "@/components/InteractivePillarsExplorer";
import { FadeIn, ImageReveal } from "@/components/MotionWrappers";
import {
  findSection,
  getCustomSections,
  getPageData,
  getSiteSettings,
} from "@/lib/getPageData";
import { resolveDraftPreview } from "@/lib/previewHelper";

export const dynamic = "force-dynamic";

const DEFAULT_CHALLENGES = [
  {
    num: "01",
    title: "Identity Sprawl & Cloud Proliferation",
    context: "SaaS & Multi-Cloud Complexity",
    friction:
      "As organisations grow across hybrid directories and cloud applications, permissions fragment rapidly. Engineering teams lose authoritative visibility over who holds access.",
    resolution:
      "Authoritative identity orchestration, directory consolidation, and consistent Single Source of Truth controls.",
  },
  {
    num: "02",
    title: "Privilege Creep & Unmonitored Admins",
    context: "Standing Entitlements & Key Risk",
    friction:
      "Staff shift roles while keeping old permissions, and shared or standing administrative privileges leave critical infrastructure vulnerable to lateral escalation.",
    resolution:
      "Zero Standing Privilege architecture, automated periodic reviews, and Just-in-Time access elevation.",
  },
  {
    num: "03",
    title: "Inconsistent Review & Audit Debt",
    context: "Regulatory Governance Friction",
    friction:
      "Manual spreadsheet sign-offs and informal approval trails break down under audit pressure across ISO 27001, SOX, and NIS2 mandates.",
    resolution:
      "Traceable access governance workflows, verifiable Separation of Duties (SoD), and continuous audit trails.",
  },
  {
    num: "04",
    title: "Manual Joiner-Mover-Leaver Latency",
    context: "Operational Lifecycle Bottlenecks",
    friction:
      "Manual ticket onboarding delays Day-1 productivity, while late revocation on departure leaves lingering access across peripheral business systems.",
    resolution:
      "Event-driven Joiner-Mover-Leaver automation connecting HR sources directly to enterprise directories via SCIM.",
  },
];

const WORKFORCE_CAPABILITIES = [
  {
    code: "01 // ARCHITECTURE DESIGN",
    title: "Defensible Identity Blueprints",
    detail:
      "Practical target architectures documented for executive alignment, internal security teams, and auditor review.",
  },
  {
    code: "02 // LIFECYCLE ENGINEERING",
    title: "SCIM & Directory Automation",
    detail:
      "Reliable automation linking HR triggers to Microsoft Entra ID, Microsoft Graph, and enterprise applications.",
  },
  {
    code: "03 // PRIVILEGED CONTROLS",
    title: "Ephemeral Administrative Access",
    detail:
      "Vaulted root credentials, approval-gated JIT elevation, and auditable privileged session oversight.",
  },
  {
    code: "04 // OPERATIONAL HANDOVER",
    title: "Team Enablement & Runbooks",
    detail:
      "Clear operational documentation and practitioner knowledge transfer so your team operates securely without lock-in.",
  },
];

const BUILTIN_HOME_SECTIONS = new Set([
  "hero",
  "challenges_ledger",
  "advisory_editorial",
  "workforce_capabilities",
  "services_list",
  "delivery_timeline",
  "academy_feature",
  "closing_cta",
]);

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const allowDraft = await resolveDraftPreview(searchParams);
  const [pageData, siteSettings] = await Promise.all([
    getPageData("home", { allowDraft }),
    getSiteSettings(),
  ]);

  const heroSec = findSection(pageData, "hero");
  const challengesSec = findSection(pageData, "challenges_ledger");
  const advisorySec = findSection(pageData, "advisory_editorial");
  const workforceSec = findSection(pageData, "workforce_capabilities");
  const academySec = findSection(pageData, "academy_feature");
  const closingSec = findSection(pageData, "closing_cta");
  const customSections = getCustomSections(pageData, BUILTIN_HOME_SECTIONS);

  const challengeItems =
    Array.isArray(challengesSec?.items) && challengesSec.items.length > 0
      ? challengesSec.items.map((item, idx) => ({
          num: String(item.num || `0${idx + 1}`),
          title: String(item.title || ""),
          context: String(item.context || ""),
          friction: String(item.friction || ""),
          resolution: String(item.resolution || ""),
        }))
      : DEFAULT_CHALLENGES;

  return (
    <>
      {/* Draft Banner when previewing */}
      {allowDraft && pageData?.status === "draft" && (
        <div className="bg-[#D89A43] px-4 py-2 text-center font-mono text-xs font-bold text-[#0B1424] uppercase">
          CMS Draft Preview Active &mdash; Changes below are not yet published publicly
        </div>
      )}

      {/* 1. Cinematic Twilight Executive Boardroom Hero */}
      <HomeHero
        badge={heroSec?.badge}
        headline={heroSec?.headline || pageData?.hero_headline}
        subheadline={heroSec?.subheadline || pageData?.hero_subheadline}
        bgImage={heroSec?.bgImage}
        ctaPrimaryLabel={heroSec?.ctaPrimary?.label}
        ctaPrimaryHref={heroSec?.ctaPrimary?.href}
        ctaSecondaryLabel={heroSec?.ctaSecondary?.label}
        ctaSecondaryHref={heroSec?.ctaSecondary?.href}
      />

      {/* 2. Enterprise Identity Challenges + Animated Network & Orbital Fabric */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                {challengesSec?.badge || "Enterprise Vulnerabilities"}
              </span>
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
              {challengesSec?.title || "Identity is the primary attack surface."}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {challengesSec?.subtitle ||
                "Modern organisations manage workforce, vendor, and workload access across disparate systems. Without coordinated governance and automated controls, access risk compounds silently."}
            </p>
          </FadeIn>

          {/* Animated Connected Identity Fabric Visualizer */}
          <FadeIn delay={0.1} className="mt-14">
            <IdentityFabricVisual />
          </FadeIn>

          {/* Structural Hairline Challenge Ledger */}
          <div className="mt-16 divide-y divide-white/10 border-t border-b border-white/10">
            {challengeItems.map((item) => (
              <div
                key={item.num}
                className="grid grid-cols-1 gap-6 py-8 transition-colors hover:bg-white/[0.02] sm:py-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="flex items-baseline gap-4 lg:col-span-4">
                  <span className="font-mono text-xs font-bold text-[#D89A43]">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-slate-400">
                      {item.context}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <span className="mb-1.5 block font-mono text-[10px] font-semibold tracking-wider text-rose-300/80 uppercase lg:hidden">
                    Operational Friction
                  </span>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {item.friction}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="border-l-2 border-[#D89A43]/60 pl-4">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-[#D89A43] uppercase">
                      Architectural Resolution
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                      {item.resolution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Editorial Introduction — Asymmetric Photographic Spread (Warm White #F7F6F2) */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <ImageReveal className="lg:col-span-6">
              <div className="relative">
                <div className="relative aspect-[16/11] w-full overflow-hidden border border-slate-300/80 shadow-lg">
                  <Image
                    src={advisorySec?.bgImage || "/brand/team-collaboration.jpg"}
                    alt="The IAM Lab architects reviewing identity system schematics in London studio"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>LONDON ADVISORY PRACTICE</span>
                  <span>VENDOR-NEUTRAL ARCHITECTURE</span>
                </div>
              </div>
            </ImageReveal>

            <FadeIn delay={0.12} className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#B07424] uppercase">
                  {advisorySec?.badge || "Independent Advisory"}
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                {advisorySec?.headline ||
                  "We begin with the business problem, not software sales."}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-700">
                {advisorySec?.subheadline ||
                  "Identity security is not one tool or a single policy — it is a connected set of decisions about who receives access, how approvals are enforced, and how change is governed."}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {advisorySec?.body ||
                  "The IAM Lab provides clear, technically grounded consulting across advisory assessments, identity governance, lifecycle automation, and privileged access — tailored to your real environment without vendor hype."}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border-b-2 border-[#D89A43] pb-1 text-sm font-bold text-[#0B1424] transition-colors hover:text-[#B07424]"
                >
                  <span>Learn about our approach and leadership</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Workforce Capabilities — Varied Right-Image Composition (Pure White #FFFFFF) */}
      <section className="border-b border-slate-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#B07424] uppercase">
                  {workforceSec?.badge || "Engineering & Operational Depth"}
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                {workforceSec?.headline ||
                  "Practical controls teams can genuinely run and audit."}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {workforceSec?.subheadline ||
                  "Our goal is to make Identity and Access Management transparent to leadership, friction-free for legitimate users, and maintainable by internal IT and security teams."}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-2">
                {WORKFORCE_CAPABILITIES.map((cap) => (
                  <div key={cap.code} className="space-y-1.5">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-[#B07424] uppercase">
                      {cap.code}
                    </span>
                    <h3 className="text-base font-bold text-[#0B1424]">
                      {cap.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600">
                      {cap.detail}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <ImageReveal delay={0.14} className="lg:col-span-6">
              <div className="relative">
                <div className="relative aspect-[16/11] w-full overflow-hidden border border-slate-200 shadow-lg">
                  <Image
                    src={workforceSec?.bgImage || "/brand/workforce-operations.jpg"}
                    alt="Enterprise identity engineers collaborating inside a modern security operations studio"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>HYBRID &amp; CLOUD IAM DELIVERY</span>
                  <span>OPERATIONAL SUSTAINABILITY</span>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 5. Six Consulting Pillars — Interactive Architecture Explorer (Midnight Navy #0B1424) */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <FadeIn className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                  Six Core Practice Pillars
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                End-to-end IAM consulting &amp; implementation.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                Select any consulting pillar below to inspect problem scope, technical deliverables, and target outcomes.
              </p>
            </FadeIn>

            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-2 border border-white/20 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
            >
              <span>Full Services Specification</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <FadeIn delay={0.1}>
            <InteractivePillarsExplorer />
          </FadeIn>
        </div>
      </section>

      {/* 6. Animated 4-Stage Engagement & Delivery Timeline (Warm White #F7F6F2) */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mx-auto mb-14 max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#B07424] uppercase">
                Engagement Protocol
              </span>
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
              How we engage and deliver clarity.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              A transparent, milestone-based consulting model ensuring aligned scope from first conversation through knowledge transfer.
            </p>
          </FadeIn>

          <DeliveryTimeline theme="light" />
        </div>
      </section>

      {/* 7. IAM Academy — Photographic Depth Split Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={academySec?.bgImage || "/brand/academy-classroom.jpg"}
            alt="The IAM Academy hands-on technical workshop in architectural seminar studio"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424]/95 via-[#0B1424]/88 to-[#14243B]/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                  {academySec?.badge || "Professional Capability Building"}
                </span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                {academySec?.headline || "Build your IAM career with The IAM Academy."}
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                {academySec?.subheadline ||
                  "Our learning initiatives connect foundational IAM concepts to real enterprise engineering. Explore structured career pathways, practical platform walkthroughs, interview preparation, and digital workbooks — designed so learners understand why a solution works, not simply copy steps."}
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/academy"
                  className="inline-flex min-h-[48px] items-center justify-center bg-[#D89A43] px-7 py-3 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
                >
                  Explore IAM Academy &rarr;
                </Link>
                <a
                  href={siteSettings.selar_store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center border border-white/25 bg-white/5 px-7 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
                >
                  Browse IAM Books &amp; Resources &rarr;
                </a>
              </div>
            </FadeIn>

            <ImageReveal delay={0.14} className="lg:col-span-6">
              <div className="border border-white/15 bg-[#14243B]/60 p-3 backdrop-blur-sm">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/brand/iam-academy-hero.jpg"
                    alt="Enterprise identity architecture hierarchy workstation in IAM Academy lab"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex items-center justify-between px-2 pt-3 pb-1 font-mono text-[10px] text-slate-400 uppercase">
                  <span>6 Structured Progression Tiers</span>
                  <span className="text-[#D89A43]">Foundation &rarr; Architect</span>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Dynamic Administrator-Added Sections from Visual CMS */}
      <CustomCmsSections sections={customSections} />

      {/* 8. Closing Executive Consultation Section */}
      <section className="relative overflow-hidden bg-[#0B1424] py-28 sm:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={closingSec?.bgImage || "/brand/executive-consulting.jpg"}
            alt="Executive advisory suite overlooking London financial skyline at golden hour"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1424] via-[#0B1424]/85 to-[#0B1424]/80" />
        </div>

        <FadeIn className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
              {closingSec?.badge || "Initiate a Conversation"}
            </span>
            <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            {closingSec?.headline ||
              "Let’s discuss the identity challenge your organisation is solving."}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {closingSec?.subheadline ||
              "Supporting teams, organisations, and IAM practitioners who want to strengthen identity security and practical operational capability."}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={
                closingSec?.ctaPrimary?.href || "/contact?type=enterprise_consulting"
              }
              className="inline-flex min-h-[52px] items-center justify-center bg-[#D89A43] px-9 py-4 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase shadow-xl transition-colors hover:bg-[#e5aa57]"
            >
              {closingSec?.ctaPrimary?.label || "Talk to an IAM Specialist"} &rarr;
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
