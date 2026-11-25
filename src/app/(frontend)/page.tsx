import Image from "next/image";
import Link from "next/link";
import {
  BookOpenCheck,
  KeyRound,
  Layers,
  Network,
  ShieldAlert,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { CustomCmsSections } from "@/components/CustomCmsSections";
import { DeliveryTimeline } from "@/components/DeliveryTimeline";
import { HomeHero } from "@/components/HomeHero";
import { IdentityFabricVisual } from "@/components/IdentityFabricVisual";
import { InteractivePillarsExplorer } from "@/components/InteractivePillarsExplorer";
import { FadeIn, ImageReveal } from "@/components/MotionWrappers";
import { SubtleNetworkBackdrop } from "@/components/SubtleNetworkBackdrop";
import {
  findSection,
  getCustomSections,
  getPageData,
  getSiteSettings,
  getWhatsAppHref,
  resolveCtaHref,
} from "@/lib/getPageData";
import { resolveDraftPreview } from "@/lib/previewHelper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DEFAULT_CHALLENGES = [
  {
    id: "sprawl",
    title: "Identity Sprawl & Fragmented Systems",
    description:
      "Manual onboarding and fragmented directories leave security teams without consistent visibility over who holds access across cloud and hybrid estates.",
    Icon: Network,
  },
  {
    id: "permissions",
    title: "Excessive Permissions & Standing Risk",
    description:
      "Accumulated user permissions and unmonitored administrative privileges create avoidable security exposure when roles change or accounts remain active.",
    Icon: KeyRound,
  },
  {
    id: "approvals",
    title: "Inconsistent Approvals & Audit Friction",
    description:
      "Informal approval processes and manual access reviews cause operational delays and weaken audit traceability across business systems.",
    Icon: ShieldAlert,
  },
];

const DEFAULT_WORKFORCE_CAPABILITIES = [
  {
    title: "Defensible Identity Blueprints",
    detail:
      "Practical target architectures documented for executive alignment, internal security teams, and auditor review.",
    Icon: Layers,
  },
  {
    title: "Identity Lifecycle Automation",
    detail:
      "Reliable joiner, mover, and leaver automation connecting HR triggers to Microsoft Entra ID, Microsoft Graph, and applications.",
    Icon: Workflow,
  },
  {
    title: "Privileged & Access Controls",
    detail:
      "Structured access approvals, least-privilege governance, and controlled administrative elevation.",
    Icon: ShieldCheck,
  },
  {
    title: "Operational Handover",
    detail:
      "Clear operational documentation and practitioner knowledge transfer so internal teams can operate securely over time.",
    Icon: BookOpenCheck,
  },
];

const BUILTIN_HOME_SECTIONS = new Set([
  "hero",
  "challenges_ledger",
  "identity_fabric",
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

  const whatsappHref = getWhatsAppHref(siteSettings.whatsapp_number);
  const heroSec = findSection(pageData, "hero");
  const challengesSec = findSection(pageData, "challenges_ledger");
  const fabricSec = findSection(pageData, "identity_fabric");
  const advisorySec = findSection(pageData, "advisory_editorial");
  const workforceSec = findSection(pageData, "workforce_capabilities");
  const servicesSec = findSection(pageData, "services_list");
  const deliverySec = findSection(pageData, "delivery_timeline");
  const academySec = findSection(pageData, "academy_feature");
  const closingSec = findSection(pageData, "closing_cta");
  const customSections = getCustomSections(pageData, BUILTIN_HOME_SECTIONS);

  const challengeIcons = [Network, KeyRound, ShieldAlert];
  const challengeCards =
    Array.isArray(challengesSec?.items) && challengesSec.items.length > 0
      ? challengesSec.items.slice(0, 3).map((item, idx) => ({
          id: String(item.num || item.id || idx),
          title: String(item.title || DEFAULT_CHALLENGES[idx % 3].title),
          description: String(
            item.description ||
              item.friction ||
              DEFAULT_CHALLENGES[idx % 3].description
          ),
          Icon: challengeIcons[idx % challengeIcons.length],
        }))
      : DEFAULT_CHALLENGES;

  const workforceCapabilities =
    Array.isArray(workforceSec?.items) && workforceSec.items.length > 0
      ? workforceSec.items.map((item, idx) => {
          const fallback =
            DEFAULT_WORKFORCE_CAPABILITIES[
              idx % DEFAULT_WORKFORCE_CAPABILITIES.length
            ];
          return {
            title: String(item.title || item.name || fallback.title),
            detail: String(
              item.detail || item.description || fallback.detail
            ),
            Icon: fallback.Icon,
          };
        })
      : DEFAULT_WORKFORCE_CAPABILITIES;

  const heroCarouselItems = Array.isArray(heroSec?.carouselItems)
    ? (heroSec.carouselItems as Array<Record<string, unknown>>)
    : Array.isArray(heroSec?.items)
    ? (heroSec.items as Array<Record<string, unknown>>)
    : undefined;

  return (
    <>
      {allowDraft && pageData?.status === "draft" && (
        <div className="bg-[#D89A43] px-4 py-2 text-center font-mono text-xs font-bold text-[#0B1424] uppercase">
          CMS Draft Preview Active &mdash; Changes below are not yet published publicly
        </div>
      )}

      {/* 1. Hero + Continuous Horizontal Service Carousel */}
      <HomeHero
        badge={heroSec?.badge}
        headline={heroSec?.headline || pageData?.hero_headline}
        subheadline={heroSec?.subheadline || pageData?.hero_subheadline}
        bgImage={heroSec?.bgImage}
        ctaPrimaryLabel={heroSec?.ctaPrimary?.label}
        ctaPrimaryHref={heroSec?.ctaPrimary?.href}
        ctaSecondaryLabel={heroSec?.ctaSecondary?.label}
        ctaSecondaryHref={heroSec?.ctaSecondary?.href}
        carouselItems={heroCarouselItems}
      />

      {/* 2. Enterprise Identity Challenges (3 Visual Cards) + Connected Identity Fabric */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                {challengesSec?.badge || "The Challenge We Help Solve"}
              </span>
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-[1.65rem] leading-[1.2] font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
              {challengesSec?.title ||
                challengesSec?.headline ||
                "Identity processes need clear control."}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              {challengesSec?.subtitle ||
                challengesSec?.subheadline ||
                "As organisations grow, managing the right access for the right people becomes more complex. A well-designed IAM approach makes identity processes controlled, traceable, and workable."}
            </p>
          </FadeIn>

          {/* Three Visual Challenge Cards */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {challengeCards.map((card, idx) => {
              const CardIcon = card.Icon;
              return (
                <FadeIn
                  key={card.id}
                  delay={idx * 0.08}
                  className="group flex flex-col justify-between border border-white/15 bg-[#08101E] p-7 transition-colors hover:border-[#D89A43]/60 hover:bg-[#14243B]/45"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center border border-[#D89A43]/40 bg-[#14243B] text-[#D89A43] transition-colors group-hover:border-[#D89A43] group-hover:bg-[#D89A43] group-hover:text-[#0B1424]">
                      <CardIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {card.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Interactive Connected Identity Control Fabric */}
          <FadeIn delay={0.1} className="mt-14">
            <IdentityFabricVisual cmsDomains={fabricSec?.items} />
          </FadeIn>
        </div>
      </section>

      {/* 3. Editorial Introduction — A Practical, Accountable Approach */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <ImageReveal className="lg:col-span-6">
              <div className="relative aspect-[16/11] w-full overflow-hidden border border-slate-300/80 shadow-lg">
                <Image
                  src={advisorySec?.bgImage || "/brand/team-collaboration.jpg"}
                  alt="The IAM Lab architects reviewing identity system schematics in London studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </ImageReveal>

            <FadeIn delay={0.12} className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#B07424] uppercase">
                  {advisorySec?.badge || "A Practical, Accountable Approach"}
                </span>
              </div>
              <h2 className="mt-4 text-[1.65rem] leading-[1.2] font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                {advisorySec?.headline ||
                  "We begin with the business problem, not software sales."}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-700">
                {advisorySec?.subheadline ||
                  "We assess your current identity environment, define appropriate controls, and support practical implementation or improvement."}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                {advisorySec?.body ||
                  "Our goal is to make IAM understandable to stakeholders and sustainable for the internal teams responsible for operating it."}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  href={advisorySec?.ctaPrimary?.href || "/about"}
                  className="inline-flex items-center gap-2 border-b-2 border-[#D89A43] pb-1 text-sm font-bold text-[#0B1424] transition-colors hover:text-[#B07424]"
                >
                  <span>
                    {advisorySec?.ctaPrimary?.label ||
                      "Learn about our approach and leadership"}
                  </span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Engineering & Operational Depth (White Surface + Subtle Network Pattern Backdrop) */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-24 sm:py-32">
        <SubtleNetworkBackdrop />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#B07424] uppercase">
                  {workforceSec?.badge || "Engineering & Operational Depth"}
                </span>
              </div>

              <h2 className="mt-4 text-[1.65rem] leading-[1.2] font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                {workforceSec?.headline ||
                  "Controls built to operate, govern, and sustain."}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {workforceSec?.subheadline ||
                  "Identity governance and automation designed cleanly for everyday IT operations and audit readiness."}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-2">
                {workforceCapabilities.map((cap) => {
                  const CapIcon = cap.Icon;
                  return (
                    <div key={cap.title} className="space-y-2">
                      <div className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-[#F7F6F2] text-[#B07424]">
                        <CapIcon className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>
                      <h3 className="text-base font-bold text-[#0B1424]">
                        {cap.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-600">
                        {cap.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </FadeIn>

            <ImageReveal delay={0.14} className="lg:col-span-6">
              <div className="relative aspect-[16/11] w-full overflow-hidden border border-slate-200 shadow-lg">
                <Image
                  src={workforceSec?.bgImage || "/brand/workforce-operations.jpg"}
                  alt="Enterprise identity engineers collaborating inside a modern security operations studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 5. Six Core Practice Pillars — Icon-Based Interactive Explorer */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <FadeIn className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                  {servicesSec?.badge || "Six Core Practice Pillars"}
                </span>
              </div>
              <h2 className="mt-4 text-[1.65rem] leading-[1.2] font-extrabold tracking-tight text-white sm:text-4xl">
                {servicesSec?.headline ||
                  "Scoped IAM consulting & implementation support."}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                {servicesSec?.subheadline ||
                  "Select any practice area below to review scope, problem focus, and expected outcomes."}
              </p>
            </FadeIn>

            <Link
              href={servicesSec?.ctaPrimary?.href || "/services"}
              className="inline-flex shrink-0 items-center justify-center whitespace-nowrap border border-white/20 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
            >
              {servicesSec?.ctaPrimary?.label || "View Services & Solutions"} &rarr;
            </Link>
          </div>

          <FadeIn delay={0.1}>
            <InteractivePillarsExplorer cmsItems={servicesSec?.items} />
          </FadeIn>
        </div>
      </section>

      {/* 6. Animated 4-Stage Engagement & Delivery Section */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mx-auto mb-14 max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#B07424] uppercase">
                {deliverySec?.badge || "Service Delivery Model"}
              </span>
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-[1.65rem] leading-[1.2] font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
              {deliverySec?.headline || "How we engage and deliver clarity."}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {deliverySec?.subheadline ||
                "A transparent, milestone-based engagement workflow from discovery call through knowledge transfer."}
            </p>
          </FadeIn>

          <DeliveryTimeline theme="light" cmsItems={deliverySec?.items} />
        </div>
      </section>

      {/* 7. IAM Academy — Build Your IAM Career */}
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

              <h2 className="mt-4 text-[1.75rem] leading-[1.16] font-extrabold tracking-tight text-white sm:text-5xl">
                {academySec?.headline || "Build your IAM career with The IAM Lab."}
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
                {academySec?.subheadline ||
                  "Our learning initiatives connect IAM concepts to enterprise practice. Explore foundation learning, hands-on platform pathways, technical projects, career mentorship, interview preparation, and specialist resources — with a focus on understanding why a solution works, not simply copying steps."}
              </p>

              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-nowrap sm:items-center">
                <Link
                  href={academySec?.ctaPrimary?.href || "/academy"}
                  className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap bg-[#D89A43] px-5 py-3 text-xs font-bold tracking-[0.12em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57] xl:px-6"
                >
                  {academySec?.ctaPrimary?.label || "Explore IAM Academy"} &rarr;
                </Link>
                <a
                  href={academySec?.ctaSecondary?.href || siteSettings.selar_store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap border border-white/25 bg-white/5 px-5 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43] xl:px-6"
                >
                  {academySec?.ctaSecondary?.label || "Browse IAM Books & Resources"} &rarr;
                </a>
              </div>
            </FadeIn>

            <ImageReveal delay={0.14} className="lg:col-span-6">
              <div className="border border-white/15 bg-[#14243B]/60 p-3 backdrop-blur-sm">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={String(academySec?.secondaryImage || "/brand/iam-academy-hero.jpg")}
                    alt="Enterprise identity architecture hierarchy workstation in IAM Academy lab"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* Dynamic Administrator-Added Sections from Visual CMS */}
      <CustomCmsSections sections={customSections} whatsappHref={whatsappHref} />

      {/* 8. Closing Executive Consultation Section */}
      <section className="relative overflow-hidden bg-[#0B1424] py-28 sm:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={closingSec?.bgImage || "/brand/executive-consulting.jpg"}
            alt="Executive advisory suite overlooking city skyline at golden hour"
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
              {closingSec?.badge || "Start a Conversation"}
            </span>
            <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-[1.75rem] leading-[1.18] font-extrabold tracking-tight text-white sm:text-5xl">
            {closingSec?.headline ||
              "Let’s discuss the identity challenge your organisation is trying to solve."}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {closingSec?.subheadline ||
              "Supporting teams, organisations, and IAM professionals who want to improve identity security and capability."}
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-nowrap sm:items-center">
            {(() => {
              const primaryLabel = closingSec?.ctaPrimary?.label || "Talk to an IAM Specialist";
              const primaryHref = resolveCtaHref(
                closingSec?.ctaPrimary?.href,
                primaryLabel,
                whatsappHref,
                whatsappHref
              );
              const isExternal = primaryHref.startsWith("http");
              return (
                <a
                  href={primaryHref}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex min-h-[50px] items-center justify-center whitespace-nowrap bg-[#D89A43] px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase shadow-xl transition-colors hover:bg-[#e5aa57]"
                >
                  {primaryLabel} &rarr;
                </a>
              );
            })()}
            <Link
              href={
                closingSec?.ctaSecondary?.href ||
                "/contact?type=enterprise_consulting#contact-form"
              }
              className="inline-flex min-h-[50px] items-center justify-center whitespace-nowrap border border-white/25 bg-white/5 px-7 py-3.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
            >
              {closingSec?.ctaSecondary?.label || "Submit Written Enquiry"}
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
