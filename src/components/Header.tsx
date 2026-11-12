import { BrandLogo } from "./BrandLogo";

const NAV_ITEMS = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Positioning", href: "#positioning" },
  { label: "Launch", href: "#coming-soon" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#111111]/8 bg-[#fefefe]/95 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[#0b1320] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#fefefe]"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-10">
        <a
          href="#top"
          aria-label="The IAM Lab — Return to top"
          className="inline-flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b27936]"
        >
          <BrandLogo priority className="w-[104px] sm:w-[122px]" />
        </a>

        <nav
          aria-label="Primary page sections"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#334155] transition-colors hover:text-[#8c5c23] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b27936]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-[#b27936]/30 bg-[#f8f6f1] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#111111] sm:inline-flex">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#b27936]"
              aria-hidden="true"
            />
            Coming Soon
          </span>

          <a
            href="#what-we-do"
            className="inline-flex min-h-[40px] items-center rounded-lg border border-[#111111]/12 bg-[#fefefe] px-3.5 py-2 text-xs font-semibold text-[#0b1320] transition-colors hover:border-[#b27936]/50 hover:bg-[#f8f6f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b27936] md:hidden"
          >
            What We Do
          </a>
        </div>
      </div>
    </header>
  );
}
