import Image from "next/image";
import Link from "next/link";
import type { PageSection } from "@/lib/getPageData";
import { FadeIn } from "./MotionWrappers";

/**
 * Renders administrator-added custom sections appended in the Visual Page Editor.
 */
export function CustomCmsSections({ sections }: { sections: PageSection[] }) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((sec, idx) => {
        const heading = sec.headline || sec.title || "";
        const copy = sec.subheadline || sec.body || sec.desc || "";
        const badge = sec.badge || "Executive Overview";
        const ctaLabel = sec.ctaPrimary?.label;
        const ctaHref = sec.ctaPrimary?.href;
        const bgImage = typeof sec.bgImage === "string" ? sec.bgImage : "";

        const isDark = idx % 2 === 1;

        return (
          <section
            key={`${sec.type}-${idx}`}
            className={`relative overflow-hidden border-b py-20 sm:py-28 ${
              isDark
                ? "border-white/10 bg-[#0B1424] text-white"
                : "border-slate-200 bg-[#F7F6F2] text-[#0B1424]"
            }`}
          >
            {bgImage && (
              <div className="pointer-events-none absolute inset-0 z-0">
                <Image
                  src={bgImage}
                  alt={heading || "The IAM Lab featured image"}
                  fill
                  sizes="100vw"
                  className={`object-cover object-center ${
                    isDark ? "opacity-25" : "opacity-10"
                  }`}
                />
              </div>
            )}

            <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
              <FadeIn>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                  <span
                    className={`font-mono text-xs font-semibold tracking-[0.22em] uppercase ${
                      isDark ? "text-[#D89A43]" : "text-[#B07424]"
                    }`}
                  >
                    {badge}
                  </span>
                </div>

                {heading && (
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {heading}
                  </h2>
                )}

                {copy && (
                  <p
                    className={`mt-5 max-w-3xl text-base leading-relaxed whitespace-pre-wrap ${
                      isDark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {copy}
                  </p>
                )}

                {ctaLabel && ctaHref && (
                  <div className="mt-8">
                    <Link
                      href={ctaHref}
                      className="inline-flex items-center gap-2 bg-[#D89A43] px-6 py-3 text-xs font-bold tracking-wider text-[#0B1424] uppercase transition-colors hover:bg-[#e5aa57]"
                    >
                      <span>{ctaLabel}</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                )}
              </FadeIn>
            </div>
          </section>
        );
      })}
    </>
  );
}
