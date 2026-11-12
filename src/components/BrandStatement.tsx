export function BrandStatement() {
  return (
    <section
      id="positioning"
      className="bg-architectural-grid-dark relative scroll-mt-28 overflow-hidden border-y border-white/10 bg-[#0b1320] py-20 text-[#fefefe] sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(178,121,54,0.14)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start">
          <p className="font-mono text-xs font-semibold tracking-[0.22em] text-[#d6a15c] uppercase">
            BRAND POSITIONING
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-[#fefefe] leading-[1.16] sm:text-4xl lg:text-[2.85rem]">
            Secure identities. Simplify access.{" "}
            <span className="text-[#d6a15c]">Strengthen your business.</span>
          </h2>

          <div
            className="mt-8 h-px w-20 bg-[#b27936]"
            aria-hidden="true"
          />

          <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-[1.75]">
            Effective Identity and Access Management is foundational to modern
            digital trust. When access is governed clearly and teams hold deep
            IAM expertise, organisations reduce operational friction, protect
            critical systems, and scale with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
