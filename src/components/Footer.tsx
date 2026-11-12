import { CopyrightYear } from "./CopyrightYear";

export function Footer() {
  return (
    <footer className="relative z-20 w-full">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 border-t border-white/10 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:px-8 lg:px-12">
        <p>&copy; <CopyrightYear /> The IAM Lab</p>
        <a
          href="mailto:info@theiamlab.com"
          className="transition-colors hover:text-[#d6a15c] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6a15c]"
        >
          info@theiamlab.com
        </a>
      </div>
    </footer>
  );
}
