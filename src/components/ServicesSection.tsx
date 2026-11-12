const SERVICE_PILLARS = [
  {
    number: "01",
    title: "IAM Consulting & Solutions",
    audience: "For Corporate Organisations",
    description:
      "We help organisations strengthen their identity security posture through strategic Identity and Access Management consulting, access governance, implementation guidance, and identity-focused solutions.",
    highlights: [
      "Identity security & access governance",
      "IAM strategy & implementation guidance",
      "Identity lifecycle management",
      "Corporate IAM training & enablement",
    ],
  },
  {
    number: "02",
    title: "IAM Academy & Professional Development",
    audience: "For Individuals & Aspiring Professionals",
    description:
      "We support aspiring and developing IAM professionals through structured learning, technical knowledge, mentorship, and career-focused professional development.",
    highlights: [
      "Professional IAM training tracks",
      "Applied technical & architectural learning",
      "Industry mentorship & career guidance",
      "Practical learning resources",
    ],
  },
] as const;

export function ServicesSection() {
  return (
    <section
      id="what-we-do"
      className="scroll-mt-28 bg-[#fefefe] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold tracking-[0.22em] text-[#8c5c23] uppercase">
            WHAT WE DO
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-[#0b1320] sm:text-4xl">
            Two Dedicated Pillars. One Specialist Discipline.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569] sm:text-lg">
            Every engagement at The IAM Lab combines technical depth in
            Identity and Access Management with a clear commitment to real-world
            capability.
          </p>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          {/* Subtle connecting architectural bridge on desktop */}
          <div
            className="pointer-events-none absolute top-14 left-1/2 hidden h-px w-8 -translate-x-1/2 bg-[#b27936]/55 lg:block"
            aria-hidden="true"
          />

          {SERVICE_PILLARS.map((pillar, index) => (
            <article
              key={pillar.number}
              className="group relative flex flex-col justify-between rounded-2xl border border-[#111111]/10 bg-[#fefefe] p-7 transition-all duration-200 hover:border-[#b27936]/50 hover:shadow-[0_18px_44px_-24px_rgba(11,19,32,0.18)] sm:p-9"
            >
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-[#111111]/8 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#b27936]/30 bg-[#f8f6f1] font-mono text-xs font-semibold text-[#8c5c23]">
                      {pillar.number}
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-[#475569] uppercase">
                      {pillar.audience}
                    </span>
                  </div>

                  {/* Minimal geometric pillar icon */}
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b1320]/[0.04] text-[#0b1320]"
                    aria-hidden="true"
                  >
                    {index === 0 ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path
                          d="M4 18h16M6 14l4-4 4 3 4-7"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="18" cy="6" r="1.75" fill="#B27936" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path
                          d="M5 19V9m7 10V5m7 14v-7"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="5" r="1.75" fill="#B27936" />
                      </svg>
                    )}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-[-0.015em] text-[#0b1320] sm:text-2xl">
                  {pillar.number} — {pillar.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-[#475569]">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 border-t border-[#111111]/8 pt-6">
                <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[#64748b] uppercase">
                  Core Focus Areas
                </p>
                <ul className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {pillar.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-snug text-[#1e293b]"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#b27936]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
