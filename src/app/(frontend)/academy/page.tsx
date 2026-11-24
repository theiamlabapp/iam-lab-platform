import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    "Learn IAM and practise with purpose through 6 structured career progression tiers, practical enterprise scenarios, mentorship, and digital resources.",
};

const FORMATS = [
  {
    num: "01",
    title: "Live Community Learning",
    desc: "Selected demonstrations, architecture discussions, and hands-on sessions subject to published cohort schedules.",
  },
  {
    num: "02",
    title: "Structured Mentorship",
    desc: "Personalised one-to-one guidance with clear learning plans, agreed duration, and transparent feedback.",
  },
  {
    num: "03",
    title: "Technical Labs & Walkthroughs",
    desc: "Scenario-driven practice built directly around enterprise IAM workflows and operational decision-making.",
  },
  {
    num: "04",
    title: "Career & Interview Support",
    desc: "Pathway planning, technical CV reviews, LinkedIn positioning, and scenario-based interview preparation.",
  },
  {
    num: "05",
    title: "Books & Digital Resources",
    desc: "Structured technical workbooks, architectural guides, and self-paced study packs hosted on Selar.",
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
            alt="The IAM Academy instructor guiding professionals in contemporary London seminar room"
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
                {heroSec?.badge || "The IAM Academy"}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroSec?.headline ||
                pageData?.hero_headline ||
                "Learn IAM. Practise with purpose. Build real capability."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {heroSec?.subheadline ||
                pageData?.hero_subheadline ||
                "The IAM Academy connects conceptual foundations, realistic enterprise scenarios, and architectural decision-making so learners understand what they are implementing and why it works."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact?type=individual_learning"
                className="inline-flex min-h-[48px] items-center justify-center bg-[#D89A43] px-7 py-3 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
              >
                Ask About IAM Academy &rarr;
              </Link>
              <a
                href={siteSettings.selar_store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center border border-white/25 bg-white/5 px-7 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
              >
                Browse Books &amp; Resources &rarr;
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Interactive Six-Tier Career Progression Ladder (Warm White #F7F6F2) */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <FadeIn className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#B07424] uppercase">
                Structured Career Progression
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                Six progression pathways tailored to your career stage.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600">
              Click through any progression stage below to examine syllabus scope, practical tenant scenario work, and expected outcomes.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <AcademyPathwayExplorer />
          </FadeIn>
        </div>
      </section>

      {/* 3. Learning Formats & Practical Enterprise Lab Depth (Midnight Navy #0B1424) */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="lg:col-span-5">
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-[#D89A43] uppercase">
                Five Structured Formats
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Practitioner-focused training built for serious engineers.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Combining conceptual clarity, live architecture sessions, structured mentorship, and real platform decision exercises.
              </p>

              <div className="mt-8 border border-white/15 bg-[#14243B]/50 p-3">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src="/brand/iam-academy-hero.jpg"
                    alt="Enterprise identity tree visualization display inside dark lab"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </FadeIn>

            <ImageReveal delay={0.1} className="lg:col-span-7">
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {FORMATS.map((f) => (
                  <div
                    key={f.num}
                    className="flex flex-col gap-2 py-6 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="font-mono text-xs font-bold text-[#D89A43]">
                      FORMAT // {f.num}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{f.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 4. Selar Bookstore Feature + Learning Integrity Standard */}
      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-8">
          <div className="border-2 border-[#D89A43] bg-[#F7F6F2] p-8 sm:p-12">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-bold tracking-wider text-[#B07424] uppercase">
                  Official Selar Digital Library
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-[#0B1424] sm:text-3xl">
                  IAM Books, Architecture Guides &amp; Preparation Packs
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                  Access structured study workbooks and reference guides covering identity foundations, platform skills, automation, and interview preparation directly via The IAM Lab&apos;s official Selar store.
                </p>
              </div>
              <a
                href={siteSettings.selar_store_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center bg-[#0B1424] px-7 py-4 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#14243B]"
              >
                Browse Books &amp; Resources &rarr;
              </a>
            </div>
          </div>

          <div className="border border-slate-200 bg-[#F8FAFC] p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#D89A43]" />
              <p className="font-mono text-xs font-bold tracking-wider text-[#B07424] uppercase">
                Professional Learning Integrity Notice
              </p>
            </div>
            <h3 className="mt-3 text-lg font-bold text-[#0B1424]">
              Focused on True Practitioner Competence — Never Exam Shortcuts
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Training and mentorship support genuine professional development; enrolment or completion does not guarantee employment, certification, or specific career outcomes. We never sell exam dumps or shortcuts — cohorts are announced cleanly once trainer availability and schedules are confirmed.
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
              Academy programmes &amp; learning pathways FAQ.
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
            Enquire about training or career pathway consultation.
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Tell us your current technical background and target IAM role. Our team will share confirmed cohort dates or tailored mentorship options.
          </p>
          <div className="mt-9">
            <Link
              href="/contact?type=individual_learning"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#D89A43] px-8 py-3.5 text-xs font-bold tracking-[0.14em] text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
            >
              Book a Career Pathway Consultation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
