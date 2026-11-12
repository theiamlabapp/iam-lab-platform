const PLATFORM_FOUNDATIONS = [
  {
    label: "Advisory Practice",
    detail:
      "Clear pathways for enterprise IAM strategy, access governance, and lifecycle architecture.",
  },
  {
    label: "IAM Academy",
    detail:
      "Structured curricula and practical resources built for aspiring and advancing specialists.",
  },
  {
    label: "Mentorship & Growth",
    detail:
      "Industry-grounded guidance connecting foundational learning to sustainable IAM careers.",
  },
] as const;

export function ComingSoonSection() {
  return (
    <section
      id="coming-soon"
      className="scroll-mt-28 border-b border-[#111111]/8 bg-[#f8f6f1] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="rounded-2xl border border-[#111111]/10 bg-[#fefefe] p-7 shadow-[0_16px_48px_-28px_rgba(11,19,32,0.16)] sm:p-11 lg:p-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#b27936]/30 bg-[#f8f6f1] px-3.5 py-1 text-xs font-semibold tracking-wide text-[#8c5c23] uppercase">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-[#b27936]"
                  aria-hidden="true"
                />
                Platform Coming Soon
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-[#0b1320] leading-[1.15] sm:text-4xl">
                The future of identity and access starts here.
              </h2>

              <p className="mt-5 text-base leading-relaxed text-[#475569] sm:text-lg">
                We are building a dedicated platform for organisations seeking
                stronger identity security and individuals ready to grow in the
                world of Identity and Access Management.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="space-y-4">
                {PLATFORM_FOUNDATIONS.map((item, idx) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[#111111]/8 bg-[#f8f6f1]/70 px-5 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-[#0b1320] sm:text-base">
                        {item.label}
                      </h3>
                      <span className="font-mono text-xs font-medium text-[#8c5c23]">
                        0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
