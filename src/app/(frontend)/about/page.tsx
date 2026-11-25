import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  Cloud,
  Compass,
  GraduationCap,
  HeartPulse,
  RefreshCw,
  Scale,
  ShieldCheck,
  Target,
} from "lucide-react";
import { CustomCmsSections } from "@/components/CustomCmsSections";
import { FadeIn, ImageReveal } from "@/components/MotionWrappers";
import { SubtleNetworkBackdrop } from "@/components/SubtleNetworkBackdrop";
import {
  findSection,
  getCustomSections,
  getPageData,
  getSiteSettings,
  getWhatsAppHref,
} from "@/lib/getPageData";
import { resolveDraftPreview } from "@/lib/previewHelper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Enterprise Identity Security & Practical Learning",
  description:
    "Learn about The IAM Lab, our mission, guiding principles, and leadership in Identity and Access Management consulting and capability development.",
};

const PRINCIPLES = [
  {
    id: "purpose",
    title: "Security with purpose",
    description:
      "Focus on risks and business outcomes rather than technology for its own sake.",
    Icon: ShieldCheck,
  },
  {
    id: "learning",
    title: "Practical learning",
    description:
      "Build understanding through real-world scenarios and hands-on application.",
    Icon: GraduationCap,
  },
  {
    id: "integrity",
    title: "Integrity and clarity",
    description:
      "Communicate honestly about scope, capability, and expected outcomes.",
    Icon: Scale,
  },
  {
    id: "improvement",
    title: "Continuous improvement",
    description:
      "Make identity processes easier to maintain, audit, and improve over time.",
    Icon: RefreshCw,
  },
] as const;

interface LeaderProfile {
  name: string;
  role: string;
  initials: string;
  bio: string;
  photoUrl?: string;
}

const DEFAULT_LEADERSHIP: LeaderProfile[] = [
  {
    name: "Chiemezie Uzoma",
    role: "Co-Founder & CEO",
    initials: "CU",
    bio: "Leads IAM consulting, technical strategy, identity security initiatives, and professional learning. His background spans enterprise identity administration, governance, privileged access, Microsoft Entra ID, Okta, SailPoint, CyberArk, and identity automation.",
    photoUrl: "",
  },
  {
    name: "Jennifer Uzoma",
    role: "Co-Founder & Director of Operations",
    initials: "JU",
    bio: "Leads operational coordination, programme administration, client experience, and partnership support for The IAM Lab.",
    photoUrl: "",
  },
];

const TARGET_SECTORS = [
  {
    id: "financial",
    sector: "Financial Services",
    context: "Target Sector",
    focus:
      "Supporting strict access governance, recertification traceability, and segregation of duties controls.",
    Icon: Building2,
  },
  {
    id: "technology",
    sector: "Technology",
    context: "Target Sector",
    focus:
      "Scalable SSO, lifecycle automation, and cloud identity controls for growing technical environments.",
    Icon: Cloud,
  },
  {
    id: "healthcare",
    sector: "Healthcare",
    context: "Target Sector",
    focus:
      "Timely user provisioning, role-aligned access reviews, and accountable governance over sensitive records.",
    Icon: HeartPulse,
  },
  {
    id: "education",
    sector: "Education & Professional Services",
    context: "Target Sector",
    focus:
      "Reducing manual onboarding friction and unifying access management across directories and applications.",
    Icon: Briefcase,
  },
] as const;

const BUILTIN_ABOUT_SECTIONS = new Set([
  "hero",
  "mission_vision",
  "leadership_profile",
  "principles_list",
  "industries_sectors",
  "closing_cta",
]);

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const allowDraft = await resolveDraftPreview(searchParams);
  const [pageData, settings] = await Promise.all([
    getPageData("about", { allowDraft }),
    getSiteSettings(),
  ]);

  const whatsappHref = getWhatsAppHref(settings.whatsapp_number);
  const heroSec = findSection(pageData, "hero");
  const missionSec = findSection(pageData, "mission_vision");
  const leadershipSec = findSection(pageData, "leadership_profile");
  const principlesSec = findSection(pageData, "principles_list");
  const sectorsSec = findSection(pageData, "industries_sectors");
  const closingSec = findSection(pageData, "closing_cta");
  const customSections = getCustomSections(pageData, BUILTIN_ABOUT_SECTIONS);

  const leaders: LeaderProfile[] =
    Array.isArray(leadershipSec?.items) && leadershipSec.items.length > 0
      ? leadershipSec.items.map((item, idx) => {
          const fallback = DEFAULT_LEADERSHIP[idx % DEFAULT_LEADERSHIP.length];
          const fullName = String(item.name || fallback.name);
          const computedInitials = fullName
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0]?.toUpperCase() || "")
            .join("");
          return {
            name: fullName,
            role: String(item.role || fallback.role),
            initials: String(item.initials || computedInitials || fallback.initials),
            bio: String(item.bio || fallback.bio),
            photoUrl: typeof item.photoUrl === "string" ? item.photoUrl.trim() : "",
          };
        })
      : [
          {
            ...DEFAULT_LEADERSHIP[0],
            name: (leadershipSec?.name as string) || DEFAULT_LEADERSHIP[0].name,
            role: (leadershipSec?.role as string) || DEFAULT_LEADERSHIP[0].role,
            bio:
              typeof leadershipSec?.bio === "string" && leadershipSec.bio
                ? leadershipSec.bio
                : DEFAULT_LEADERSHIP[0].bio,
            photoUrl:
              typeof leadershipSec?.photoUrl === "string"
                ? leadershipSec.photoUrl.trim()
                : "",
          },
          DEFAULT_LEADERSHIP[1],
        ];

  const principlesList =
    Array.isArray(principlesSec?.items) && principlesSec.items.length > 0
      ? principlesSec.items.map((item, idx) => {
          const fallback = PRINCIPLES[idx % PRINCIPLES.length];
          return {
            id: String(item.id || fallback.id),
            title: String(item.title || fallback.title),
            description: String(item.description || fallback.description),
            Icon: fallback.Icon,
          };
        })
      : PRINCIPLES;

  const sectorsList =
    Array.isArray(sectorsSec?.items) && sectorsSec.items.length > 0
      ? sectorsSec.items.map((item, idx) => {
          const fallback = TARGET_SECTORS[idx % TARGET_SECTORS.length];
          return {
            id: String(item.id || fallback.id),
            sector: String(item.sector || item.title || fallback.sector),
            context: String(item.context || fallback.context),
            focus: String(item.focus || item.description || fallback.focus),
            Icon: fallback.Icon,
          };
        })
      : TARGET_SECTORS;

  return (
    <>
      {allowDraft && pageData?.status === "draft" && (
        <div className="bg-[#D89A43] px-4 py-2 text-center font-mono text-xs font-bold text-[#0B1424] uppercase">
          CMS Draft Preview Active &mdash; Changes below are not yet published publicly
        </div>
      )}

      {/* 1. Architectural Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={heroSec?.bgImage || "/brand/office-architecture.jpg"}
            alt="The IAM Lab office architecture and executive boardroom"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424]/95 via-[#0B1424]/85 to-[#14243B]/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                {heroSec?.badge || "Who We Are"}
              </span>
            </div>

            <h1 className="mt-6 text-[1.9rem] leading-[1.14] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroSec?.headline ||
                pageData?.hero_headline ||
                "Practical consulting and professional IAM development."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {heroSec?.subheadline ||
                pageData?.hero_subheadline ||
                "The IAM Lab is an identity and access management initiative focused on enterprise identity security, practical consulting, and professional development. We bring together technical IAM experience, structured learning, and a commitment to solving real access management challenges."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Mission, Vision & Engagement Approach Paired with Standalone Photography */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-10 lg:col-span-6">
              <FadeIn>
                <div className="flex items-center gap-2.5 text-[#B07424]">
                  <Target className="h-4.5 w-4.5" aria-hidden="true" />
                  <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                    {missionSec?.badge || "Our Mission"}
                  </span>
                </div>
                <h2 className="mt-3 text-[1.65rem] leading-[1.2] font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                  {missionSec?.headline || "Secure access and capable professionals."}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  {missionSec?.subheadline ||
                    "To help organisations manage digital identities and access more securely and effectively, while equipping IAM professionals with the understanding, practice, and confidence to grow."}
                </p>
              </FadeIn>

              <FadeIn delay={0.08} className="border-t border-slate-300 pt-8">
                <div className="flex items-center gap-2.5 text-[#B07424]">
                  <Compass className="h-4.5 w-4.5" aria-hidden="true" />
                  <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                    {String(missionSec?.visionLabel || "Our Vision")}
                  </span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  {String(
                    missionSec?.visionBody ||
                      "To become a trusted home for practical identity security expertise and professional IAM development, with strong relevance to organisations and talent across Africa and international markets."
                  )}
                </p>
              </FadeIn>

              <FadeIn delay={0.14} className="border-t border-slate-300 pt-8">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#B07424] uppercase">
                  {String(missionSec?.approachLabel || "Our Approach to Engagement")}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {String(
                    missionSec?.approachBody ||
                      "We start by understanding the organisation's environment and objectives, then define an appropriate scope, approach, deliverables, and governance. Services are agreed through a consultation or statement of work; technology choices depend on the client's requirements and existing architecture."
                  )}
                </p>
              </FadeIn>
            </div>

            <ImageReveal delay={0.14} className="lg:col-span-6">
              <div className="relative aspect-[16/11] w-full overflow-hidden border border-slate-300 bg-white shadow-lg">
                <Image
                  src={missionSec?.bgImage || "/brand/team-collaboration.jpg"}
                  alt="The IAM Lab identity architects discussing governance designs"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 3. Executive Leadership (Clean Client-Verified Content Only) */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                {leadershipSec?.badge || "Leadership"}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {leadershipSec?.headline || "Advisory strategy & operational delivery."}
            </h2>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {leaders.map((leader, idx) => (
              <FadeIn
                key={leader.name}
                delay={idx * 0.1}
                className="border border-white/15 bg-[#14243B]/45 p-8 sm:p-10"
              >
                <div className="flex items-center gap-5 border-b border-white/10 pb-6">
                  {leader.photoUrl ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-[#D89A43]/60 bg-[#0B1424]">
                      <Image
                        src={leader.photoUrl}
                        alt={`${leader.name} — ${leader.role}`}
                        fill
                        sizes="64px"
                        className="object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#D89A43]/60 bg-[#0B1424] font-mono text-xl font-bold text-[#D89A43]">
                      {leader.initials}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-[#D89A43] uppercase">
                      {leader.role}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-300">
                  {leader.bio}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What Guides Our Work (Subtle Network Pattern Behind White Surface) */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-24 sm:py-32">
        <SubtleNetworkBackdrop />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#B07424] uppercase">
              {principlesSec?.badge || "What Guides Our Work"}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
              {principlesSec?.headline || "Four principles that guide every engagement."}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 divide-y divide-slate-200 border-t border-b border-slate-200 bg-white/85 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {principlesList.map((p) => {
              const PrincipleIcon = p.Icon;
              return (
                <div key={p.id} className="p-8 lg:px-7">
                  <div className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-[#F7F6F2] text-[#B07424]">
                    <PrincipleIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-[#0B1424]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Industries & Target Markets */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                {sectorsSec?.badge || "Industries & Markets"}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {sectorsSec?.headline || "Organisations our advisory services are built to support."}
            </h2>
            <p className="mt-3 text-base text-slate-300">
              {sectorsSec?.subheadline ||
                "Designed for teams across financial services, technology, healthcare, education, and professional services seeking structured identity control."}
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 divide-y divide-white/10 border-t border-b border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
            {sectorsList.map((sec, idx) => {
              const SectorIcon = sec.Icon;
              return (
                <div
                  key={sec.id}
                  className={`p-8 sm:p-10 ${
                    idx >= 2 ? "md:border-t md:border-white/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[#D89A43]">
                    <SectorIcon className="h-4.5 w-4.5" aria-hidden="true" />
                    <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
                      {sec.context}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">
                    {sec.sector}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {sec.focus}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CustomCmsSections sections={customSections} />

      {/* Closing CTA — Desktop Same-Line Button Alignment */}
      <section className="bg-[#F7F6F2] py-20 text-center sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-extrabold text-[#0B1424] sm:text-4xl">
            {closingSec?.headline || "Let’s discuss your identity priorities."}
          </h2>
          <p className="mt-4 text-base text-slate-600">
            {closingSec?.subheadline ||
              "Speak directly with a specialist or explore how our scoped services can support your team."}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-nowrap sm:items-center">
            <a
              href={closingSec?.ctaPrimary?.href || whatsappHref}
              target={closingSec?.ctaPrimary?.href?.startsWith("/") ? undefined : "_blank"}
              rel={closingSec?.ctaPrimary?.href?.startsWith("/") ? undefined : "noopener noreferrer"}
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap bg-[#0B1424] px-7 py-3.5 text-xs font-bold tracking-[0.13em] text-white uppercase transition-colors hover:bg-[#14243B]"
            >
              {closingSec?.ctaPrimary?.label || "Talk to an IAM Specialist"} &rarr;
            </a>
            <Link
              href={closingSec?.ctaSecondary?.href || "/services"}
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap border border-slate-300 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-[#0B1424] uppercase transition-colors hover:border-[#D89A43]"
            >
              {closingSec?.ctaSecondary?.label || "Explore Our Services"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
