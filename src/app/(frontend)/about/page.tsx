import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CustomCmsSections } from "@/components/CustomCmsSections";
import { FadeIn, ImageReveal } from "@/components/MotionWrappers";
import {
  findSection,
  getCustomSections,
  getPageData,
} from "@/lib/getPageData";
import { resolveDraftPreview } from "@/lib/previewHelper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | Enterprise Identity Security & Practical Learning",
  description:
    "Learn about The IAM Lab, our founding mission, operating principles, and leadership by Co-Founders Chiemezie Uzoma and Jennifer Uzoma.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "Security with Purpose",
    rule: "Focus on real enterprise risk and business agility, never technology for its own sake.",
    description:
      "Well-designed identity controls make legitimate work reliable and fast while reducing unauthorized access pathways. We prioritize durable policies over complexity.",
  },
  {
    num: "02",
    title: "Practical Learning",
    rule: "Build deep technical reasoning through enterprise tasks and structured practice.",
    description:
      "Our academy connects architectural principles to production troubleshooting and decision-making so practitioners understand why a configuration works.",
  },
  {
    num: "03",
    title: "Integrity & Clarity",
    rule: "Honest scope, realistic expectations, and zero unverified marketing claims.",
    description:
      "We communicate transparently about identity maturity gaps, implementation timelines, and expected operational outcomes across every engagement.",
  },
  {
    num: "04",
    title: "Continuous Improvement",
    rule: "Identity processes must become easier to govern, audit, and maintain over time.",
    description:
      "Because cloud estates and threat models evolve constantly, we continuously refine both our engineering methodologies and practitioner curricula.",
  },
] as const;

const DEFAULT_LEADERSHIP = [
  {
    name: "Chiemezie Uzoma",
    role: "Co-Founder & Chief Executive Officer",
    remit: "Technical Strategy • Enterprise IAM Architecture • Academy Curriculum",
    initials: "CU",
    bio: "Leads IAM consulting, technical strategy, identity security initiatives, and professional learning. His background spans enterprise identity administration, identity governance, privileged access, Microsoft Entra ID, Okta, SailPoint, CyberArk, and identity lifecycle automation.",
    domains: [
      "Microsoft Entra ID & Governance",
      "SailPoint IGA",
      "CyberArk PAM",
      "Okta Access Modernisation",
      "JML Lifecycle Automation",
    ],
  },
  {
    name: "Jennifer Uzoma",
    role: "Co-Founder & Director of Operations",
    remit: "Operational Governance • Client Experience • Programme Delivery",
    initials: "JU",
    bio: "Leads operational coordination, programme administration, client experience, and partnership delivery across The IAM Lab. Ensures consulting engagements and cohort programmes run with clarity, accountability, and dependable service quality.",
    domains: [
      "Engagement Delivery Operations",
      "Programme Administration",
      "Partner & Client Experience",
      "Service Quality Assurance",
      "Global Learner Operations",
    ],
  },
];

const TARGET_SECTORS = [
  {
    num: "01",
    sector: "Financial Services & Banking",
    context: "Designed for strict auditability & Segregation of Duties (SoD)",
    focus:
      "Addressing privilege accumulation, manual recertification fatigue, and rigorous compliance expectations across regulated financial ecosystems.",
  },
  {
    num: "02",
    sector: "Technology & SaaS Enterprises",
    context: "Designed for multi-cloud speed & SaaS sprawl control",
    focus:
      "Structuring SCIM lifecycle automation, SSO federation, workload identity controls, and consistent access governance for scaling technical teams.",
  },
  {
    num: "03",
    sector: "Healthcare & Life Sciences",
    context: "Designed for workforce shift agility & sensitive record protection",
    focus:
      "Role-based access alignment, timely provisioning for rotating clinical staff, and accountable access reviews protecting regulated data.",
  },
  {
    num: "04",
    sector: "Education & Professional Services",
    context: "Designed for seasonal churn & modern directory consolidation",
    focus:
      "Replacing manual onboarding delays and hybrid directory debt with predictable authentication and lifecycle automation.",
  },
] as const;

const BUILTIN_ABOUT_SECTIONS = new Set([
  "hero",
  "mission_vision",
  "leadership_profile",
  "principles_list",
  "industries_sectors",
]);

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const allowDraft = await resolveDraftPreview(searchParams);
  const pageData = await getPageData("about", { allowDraft });

  const heroSec = findSection(pageData, "hero");
  const leadershipSec = findSection(pageData, "leadership_profile");
  const customSections = getCustomSections(pageData, BUILTIN_ABOUT_SECTIONS);

  const primaryLeaderBio =
    typeof leadershipSec?.bio === "string" && leadershipSec.bio
      ? leadershipSec.bio
      : DEFAULT_LEADERSHIP[0].bio;
  const primaryLeaderName =
    (leadershipSec?.name as string) || DEFAULT_LEADERSHIP[0].name;
  const primaryLeaderRole =
    (leadershipSec?.role as string) || DEFAULT_LEADERSHIP[0].role;

  return (
    <>
      {allowDraft && pageData?.status === "draft" && (
        <div className="bg-[#D89A43] px-4 py-2 text-center font-mono text-xs font-bold text-[#0B1424] uppercase">
          CMS Draft Preview Active &mdash; Changes below are not yet published publicly
        </div>
      )}

      {/* 1. Architectural Headquarters Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={heroSec?.bgImage || "/brand/office-architecture.jpg"}
            alt="The IAM Lab London headquarters client gallery and boardroom"
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

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroSec?.headline ||
                pageData?.hero_headline ||
                "Engineering Trust Across the Modern Enterprise."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {heroSec?.subheadline ||
                pageData?.hero_subheadline ||
                "The IAM Lab is an identity and access management consultancy and professional learning practice dedicated to solving real access governance challenges."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. Mission & Vision — Editorial Asymmetric Band paired with Studio Photography */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-12 lg:col-span-6">
              <FadeIn>
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#B07424] uppercase">
                  01 // OUR MISSION
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                  Demystify access control and safeguard resilience.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  To help organisations manage digital identities and enterprise access with greater clarity and operational control, while equipping IAM practitioners with the understanding, structured practice, and confidence to excel.
                </p>
              </FadeIn>

              <FadeIn delay={0.1} className="border-t border-slate-300 pt-10">
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#B07424] uppercase">
                  02 // OUR VISION
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                  Trusted advisory across UK, Africa, and international markets.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  To become a go-to, technically credible home for Identity and Access Management consulting and capability development for organisations and professionals internationally.
                </p>
              </FadeIn>
            </div>

            <ImageReveal delay={0.14} className="lg:col-span-6">
              <div className="border border-slate-300 bg-white p-3 shadow-md">
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src="/brand/team-collaboration.jpg"
                    alt="The IAM Lab identity architects discussing governance designs"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="border-t border-slate-100 px-3 py-4">
                  <p className="font-mono text-[11px] font-bold tracking-wider text-[#B07424] uppercase">
                    How We Engage
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    Every engagement starts by understanding your organisation&apos;s architecture and objectives before defining agreed deliverables, scope, and technology choices.
                  </p>
                </div>
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 3. Executive Leadership (Midnight Navy #0B1424) */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Executive Leadership
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Practitioner-led strategy &amp; operational delivery.
            </h2>
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Primary Leader Card */}
            <FadeIn className="border border-white/15 bg-[#14243B]/45 p-8 sm:p-10">
              <div className="flex items-center gap-5 border-b border-white/10 pb-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#D89A43]/60 bg-[#0B1424] font-mono text-xl font-bold text-[#D89A43]">
                  {DEFAULT_LEADERSHIP[0].initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {primaryLeaderName}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-[#D89A43] uppercase">
                    {primaryLeaderRole}
                  </p>
                </div>
              </div>

              <p className="mt-4 font-mono text-[11px] text-slate-400">
                {DEFAULT_LEADERSHIP[0].remit}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {primaryLeaderBio}
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <span className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Primary Technical Focus
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DEFAULT_LEADERSHIP[0].domains.map((d) => (
                    <span
                      key={d}
                      className="border border-white/15 bg-[#0B1424] px-3 py-1 text-xs text-slate-300"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Second Co-Founder Card */}
            <FadeIn delay={0.12} className="border border-white/15 bg-[#14243B]/45 p-8 sm:p-10">
              <div className="flex items-center gap-5 border-b border-white/10 pb-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#D89A43]/60 bg-[#0B1424] font-mono text-xl font-bold text-[#D89A43]">
                  {DEFAULT_LEADERSHIP[1].initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {DEFAULT_LEADERSHIP[1].name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-[#D89A43] uppercase">
                    {DEFAULT_LEADERSHIP[1].role}
                  </p>
                </div>
              </div>

              <p className="mt-4 font-mono text-[11px] text-slate-400">
                {DEFAULT_LEADERSHIP[1].remit}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {DEFAULT_LEADERSHIP[1].bio}
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <span className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  Operational Focus
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DEFAULT_LEADERSHIP[1].domains.map((d) => (
                    <span
                      key={d}
                      className="border border-white/15 bg-[#0B1424] px-3 py-1 text-xs text-slate-300"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Guiding Principles — Editorial Four-Column Typography (Pure White #FFFFFF) */}
      <section className="border-b border-slate-200 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#B07424] uppercase">
              Operating Ethos
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
              Four principles that govern every engagement.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 divide-y divide-slate-200 border-t border-b border-slate-200 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="p-8 lg:px-7">
                <span className="font-mono text-xs font-bold text-[#B07424]">
                  {p.num} {"//"} PRINCIPLE
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-[#0B1424]">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">
                  {p.rule}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Target Sectors — Honest Audience Framing */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Industries &amp; Operating Environments
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Where identity control protects critical operations.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Our advisory and implementation architectures are structured to meet the compliance and scale realities of high-assurance sectors.
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 divide-y divide-white/10 border-t border-b border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
            {TARGET_SECTORS.map((sec, idx) => (
              <div
                key={sec.num}
                className={`p-8 sm:p-10 ${
                  idx >= 2 ? "md:border-t md:border-white/10" : ""
                }`}
              >
                <span className="font-mono text-[11px] font-bold tracking-wider text-[#D89A43] uppercase">
                  {sec.num} {"//"} {sec.context}
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">
                  {sec.sector}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {sec.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CustomCmsSections sections={customSections} />

      {/* Closing CTA */}
      <section className="bg-[#F7F6F2] py-20 text-center sm:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-extrabold text-[#0B1424] sm:text-4xl">
            Work directly with senior IAM practitioners.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Discuss an upcoming governance review, privileged access programme, or team capability workshop.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[48px] items-center justify-center bg-[#0B1424] px-8 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#14243B]"
            >
              Talk to an IAM Specialist &rarr;
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-[48px] items-center justify-center border border-slate-300 bg-white px-7 py-3.5 text-xs font-bold tracking-wider text-[#0B1424] uppercase transition-colors hover:border-[#D89A43]"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
