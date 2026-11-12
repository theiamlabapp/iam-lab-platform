export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#111111]/8 bg-gradient-to-b from-[#fefefe] via-[#fefefe] to-[#f8f6f1] pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Subtle geometric background architecture */}
      <div
        className="bg-architectural-grid pointer-events-none absolute inset-0 opacity-65"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(178,121,54,0.11)_0%,rgba(178,121,54,0)_70%)]"
        aria-hidden="true"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 600"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M740 600 L1080 120 L1220 310"
          stroke="#0B1320"
          strokeWidth="1.5"
        />
        <path
          d="M820 600 L1100 205 L1220 370"
          stroke="#B27936"
          strokeWidth="1.5"
        />
        <circle cx="1080" cy="120" r="4" fill="#0B1320" />
        <circle cx="1100" cy="205" r="4" fill="#B27936" />
      </svg>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* Editorial copy */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#b27936]/30 bg-[#f8f6f1] px-4 py-1.5 text-xs font-medium text-[#111111]">
            <span
              className="h-2 w-2 rounded-full bg-[#b27936]"
              aria-hidden="true"
            />
            <span>Something exceptional is taking shape.</span>
          </div>

          <p className="mt-7 font-mono text-xs font-semibold tracking-[0.22em] text-[#8c5c23] uppercase sm:text-[13px]">
            IDENTITY. ACCESS. SECURITY.
          </p>

          <h1 className="mt-4 max-w-[18ch] text-[2.15rem] font-semibold tracking-[-0.03em] text-[#0b1320] leading-[1.09] sm:text-5xl lg:text-[3.4rem]">
            Secure Identities. Empowering a More Connected Future.
          </h1>

          <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-[#475569] sm:text-[1.125rem] sm:leading-[1.72]">
            The IAM Lab helps organisations strengthen identity security and
            manage access with confidence, while equipping individuals with the
            knowledge, practical skills, and professional guidance to build
            successful careers in Identity and Access Management.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#what-we-do"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-lg bg-[#0b1320] px-6 py-3.5 text-sm font-semibold text-[#fefefe] shadow-sm transition-all hover:bg-[#16243b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b27936] sm:w-auto"
            >
              <span>Explore What We Do</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 text-[#d6a15c]"
              >
                <path
                  d="M10 4v12m0 0l-4.5-4.5M10 16l4.5-4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <span className="text-xs font-medium tracking-wide text-[#64748b] sm:text-sm">
              Consulting · Governance · IAM Academy
            </span>
          </div>
        </div>

        {/* Abstract Identity & Access Architecture Panel */}
        <div className="lg:col-span-5" aria-hidden="true">
          <div className="relative rounded-2xl border border-[#1e293b] bg-[#0b1320] p-6 text-[#fefefe] shadow-[0_28px_64px_-24px_rgba(11,19,32,0.38)] sm:p-8">
            {/* Top gold accent bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#d6a15c] uppercase">
                  Identity Architecture
                </p>
                <p className="mt-1 text-sm font-medium text-slate-200">
                  Trust &amp; Access Framework
                </p>
              </div>
              <span className="inline-flex items-center rounded-md border border-[#b27936]/35 bg-[#b27936]/12 px-2.5 py-1 font-mono text-[11px] text-[#d6a15c]">
                IAM LAB
              </span>
            </div>

            {/* Connected identity layers schematic */}
            <div className="relative mt-6 space-y-3.5">
              <div className="rounded-xl border border-white/10 bg-[#111c2f] px-4 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#d6a15c]" />
                    <span className="text-sm font-medium text-white">
                      Identity Governance &amp; Lifecycle
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-slate-400">
                    LAYER 01
                  </span>
                </div>
                <p className="mt-1.5 pl-5 text-xs leading-relaxed text-slate-400">
                  Policy-driven access assurance across enterprise systems
                </p>
              </div>

              <div className="flex justify-center">
                <span className="h-4 w-px bg-gradient-to-b from-[#b27936]/70 to-white/20" />
              </div>

              <div className="rounded-xl border border-[#b27936]/35 bg-[#132035] px-4 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#b27936]" />
                    <span className="text-sm font-medium text-white">
                      Strategic Access Architecture
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-[#d6a15c]">
                    LAYER 02
                  </span>
                </div>
                <p className="mt-1.5 pl-5 text-xs leading-relaxed text-slate-300">
                  Structured implementation aligned with business resilience
                </p>
              </div>

              <div className="flex justify-center">
                <span className="h-4 w-px bg-gradient-to-b from-white/20 to-[#b27936]/70" />
              </div>

              <div className="rounded-xl border border-white/10 bg-[#111c2f] px-4 py-3.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-slate-300" />
                    <span className="text-sm font-medium text-white">
                      Practitioner Capability &amp; Mentorship
                    </span>
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-slate-400">
                    LAYER 03
                  </span>
                </div>
                <p className="mt-1.5 pl-5 text-xs leading-relaxed text-slate-400">
                  Industry-focused training for modern IAM professionals
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
              <span>theiamlab.com</span>
              <span className="font-mono text-[11px] text-[#d6a15c]">
                COMING SOON
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
