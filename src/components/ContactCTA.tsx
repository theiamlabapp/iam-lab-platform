export function ContactCTA() {
  return (
    <section className="bg-[#fefefe] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
        <p className="font-mono text-xs font-semibold tracking-[0.22em] text-[#8c5c23] uppercase">
          THE IAM LAB
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-[#0b1320] sm:text-4xl">
          Let&apos;s build a more secure digital future.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
          Whether your organisation needs expert IAM guidance or you are ready
          to develop your career in identity security, The IAM Lab is preparing
          something for you.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
          <a
            href="#what-we-do"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#0b1320] px-6 py-3.5 text-sm font-semibold text-[#fefefe] transition-colors hover:bg-[#16243b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b27936] sm:w-auto"
          >
            Review Our Service Pillars
          </a>

          <a
            href="#top"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-lg border border-[#111111]/15 bg-[#fefefe] px-6 py-3.5 text-sm font-semibold text-[#0b1320] transition-colors hover:border-[#b27936]/50 hover:bg-[#f8f6f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b27936] sm:w-auto"
          >
            Back to Top
          </a>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-[#64748b] sm:text-sm">
          Direct consultation and academy enrolment channels will open with our
          full platform release.
        </p>
      </div>
    </section>
  );
}
