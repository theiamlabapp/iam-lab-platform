import Image from "next/image";
import Link from "next/link";

interface HomeHeroProps {
  headline?: string;
  subheadline?: string;
}

export function HomeHero({ headline, subheadline }: HomeHeroProps = {}) {
  const displayHeadline = headline || "Secure identities. Simplify access. Strengthen your business.";
  const displaySubheadline =
    subheadline ||
    "The IAM Lab provides independent Identity and Access Management advisory, architecture engineering, and capability development for high-assurance enterprises.";

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-40">
      {/* Full-width realistic photographic background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/brand/hero-enterprise.jpg"
          alt="Enterprise cybersecurity and identity leadership in modern corporate boardroom"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424] via-[#0B1424]/90 to-[#14243B]/80" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Restrained index line */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
              Enterprise Identity &amp; Access Management
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {displayHeadline}
          </h1>

          {/* Concise supporting copy */}
          <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
            {displaySubheadline}
          </p>

          {/* One clear primary CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#D89A43] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1424] uppercase transition-colors hover:bg-[#e4a856]"
            >
              Request a Consultation
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-[50px] items-center justify-center border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#D89A43] hover:text-[#D89A43]"
            >
              Explore Capabilities &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
