import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  Compass,
  ShieldCheck,
  Terminal,
  Users,
} from "lucide-react";
import { AcademyFaq } from "@/components/AcademyFaq";
import { AcademyPathwayExplorer } from "@/components/AcademyPathwayExplorer";
import { CustomCmsSections } from "@/components/CustomCmsSections";
import { FadeIn, ImageReveal } from "@/components/MotionWrappers";
import {
  findSection,
  getCustomSections,
  getPageData,
  getSiteSettings,
} from "@/lib/getPageData";
import { resolveDraftPreview } from "@/lib/previewHelper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "IAM Academy | Professional Identity Security Learning & Mentorship",
  description:
    "Learn IAM. Practise with purpose. Build capability across structured learning pathways, technical labs, mentorship, and career resources.",
};

const FORMATS = [
  {
    id: "community",
    title: "Live community learning",
    desc: "Selected free demonstrations, discussions, and hands-on sessions, subject to announced schedules and capacity.",
    Icon: Users,
  },
  {
    id: "mentorship",
    title: "Structured mentorship",
    desc: "Personalised one-to-one guidance and agreed learning programmes, with scope, duration, and fees confirmed during enrolment.",
    Icon: Compass,
  },
  {
    id: "labs",
    title: "Technical labs and project walkthroughs",
    desc: "Scenario-based practice built around enterprise IAM tasks and operational reasoning.",
    Icon: Terminal,
  },
  {
    id: "career",
    title: "Career and interview support",
    desc: "Career pathway consultations, practical interview preparation, CV and LinkedIn guidance, and focused technical coaching.",
    Icon: Briefcase,
  },
  {
    id: "resources",
    title: "Books and digital resources",
    desc: "Guides and learning material addressing IAM foundations, platform skills, automation, and interview preparation.",
    Icon: BookOpen,
  },
] as const;

const BUILTIN_ACADEMY_SECTIONS = new Set([
  "hero",
  "learning_pathways",
  "learning_formats",
  "selar_bookstore",
  "integrity_notice",
]);

export default async function AcademyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const allowDraft = await resolveDraftPreview(searchParams);
  const [pageData, siteSettings] = await Promise.all([
    getPageData("academy", { allowDraft }),
    getSiteSettings(),
  ]);

  const heroSec = findSection(pageData, "hero");
  const customSections = getCustomSections(pageData, BUILTIN_ACADEMY_SECTIONS);

  return (
    <>
      {allowDraft && pageData?.status === "draft" && (
        <div className="bg-[#D89A43] px-4 py-2 text-center font-mono text-xs font-bold text-[#0B1424] uppercase">
          CMS Draft Preview Active &mdash; Changes below are not yet published publicly
        </div>
      )}

      {/* 1. Workshop Seminar Photographic Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={heroSec?.bgImage || "/brand/academy-classroom.jpg"}
            alt="The IAM Academy instructor guiding professionals in contemporary seminar room"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424]/95 via-[#0B1424]/85 to-[#14243B]/65" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                {heroSec?.badge || "IAM Academy"}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroSec?.headline ||
                pageData?.hero_headline ||
                "Learn IAM. Practise with purpose. Build capability."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {heroSec?.subheadline ||
                pageData?.hero_subheadline ||
                "IAM Academy is the professional learning division of The IAM Lab, designed for people entering identity and access management and practitioners developing more advanced skills. Our approach connects concepts, practical scenarios, and technical decision-making so learners understand what they are doing and why it matters."}
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-3.5 sm:flex-row sm:flex-nowrap sm:items-center">
              <Link
                href="/contact?type=individual_learning"
                className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap bg-[#D89A43] px-7 py-3 text-xs font-bold tracking-[0.13em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
              >
                Enquire About Training &rarr;
              </Link>
              <a
                href={siteSettings.selar_store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap border border-white/25 bg-white/5 px-7 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
              >
                Browse Books &amp; Resources &rarr;
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Interactive Six-Tier Learning Pathways (Warm White #F7F6F2) */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#B07424] uppercase">
                Recommended Learning Pathways
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                Six structured progression pathways.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Choose a pathway below to review focus areas, suggested audience, and next steps.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <AcademyPathwayExplorer />
          </FadeIn>
        </div>
      </section>

      {/* 3. Learning Formats (Midnight Navy #0B1424) */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-5">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#D89A43] uppercase">
                Learning Formats
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Practitioner-focused training built for clarity.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Combining conceptual clarity, scenario-based labs, structured mentorship, and career pathway preparation.
              </p>

              <div className="mt-8 border border-white/15 bg-[#14243B]/50 p-3">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/brand/iam-academy-hero.jpg"
                    alt="Enterprise identity workstation inside IAM Academy seminar"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </FadeIn>

            <ImageReveal delay={0.1} className="lg:col-span-7">
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {FORMATS.map((f) => {
                  const FormatIcon = f.Icon;
                  return (
                    <div
                      key={f.id}
                      className="flex items-start gap-5 py-6 transition-colors hover:bg-white/[0.02]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D89A43]/40 bg-[#14243B] text-[#D89A43]">
                        <FormatIcon className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{f.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 4. Selar Bookstore Feature + Learning Integrity Notice */}
      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-8">
          <div className="border-2 border-[#D89A43] bg-[#F7F6F2] p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-bold tracking-wider text-[#B07424] uppercase">
                  Books &amp; Digital Resources
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-[#0B1424] sm:text-3xl">
                  Guides, Workbooks &amp; Interview Preparation Packs
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  Access guides and learning material addressing IAM foundations, platform skills, automation, and interview preparation directly via The IAM Lab&apos;s Selar store.
                </p>
              </div>
              <a
                href={siteSettings.selar_store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center whitespace-nowrap bg-[#0B1424] px-7 py-4 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#14243B]"
              >
                Browse Books &amp; Resources &rarr;
              </a>
            </div>
          </div>

          <div className="border border-slate-200 bg-[#F8FAFC] p-7 sm:p-9">
            <div className="flex items-center gap-2.5 text-[#B07424]">
              <ShieldCheck className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
              <p className="font-mono text-xs font-bold tracking-wider uppercase">
                Learning Integrity Notice
              </p>
            </div>
            <h3 className="mt-3 text-lg font-bold text-[#0B1424]">
              Focused on True Practitioner Competence
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Training and mentorship support professional development; completion does not guarantee employment, certification, or a specific career outcome. Session schedules, trainer availability, and learning requirements are published once confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#D89A43] uppercase">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              IAM Academy questions &amp; programme scope.
            </h2>
          </div>
          <AcademyFaq />
        </div>
      </section>

      <CustomCmsSections sections={customSections} />

      {/* 6. Closing Enrollment CTA */}
      <section className="bg-[#0B1424] py-20 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ask about IAM Academy pathways or mentorship.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Share your current background and learning goals to discuss confirmed programme schedules or a consultation.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-nowrap sm:items-center">
            <Link
              href="/contact?type=individual_learning"
              className="inline-flex min-h-[50px] items-center justify-center whitespace-nowrap bg-[#D89A43] px-7 py-3.5 text-xs font-bold tracking-[0.13em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
            >
              Book a Career Pathway Consultation &rarr;
            </Link>
            <a
              href={siteSettings.selar_store_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center justify-center whitespace-nowrap border border-white/25 bg-white/5 px-7 py-3.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
            >
              Browse Books &amp; Resources
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
