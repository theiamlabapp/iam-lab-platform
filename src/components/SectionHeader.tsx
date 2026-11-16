interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2.5 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span
            className={`h-px w-6 ${isDark ? "bg-[#d6a15c]" : "bg-[#b27936]"}`}
            aria-hidden="true"
          />
          <p
            className={`font-mono text-xs font-semibold tracking-[0.22em] uppercase ${
              isDark ? "text-[#d6a15c]" : "text-[#8c5c23]"
            }`}
          >
            {eyebrow}
          </p>
        </div>
      )}

      <h2
        className={`mt-3 text-3xl font-semibold tracking-[-0.025em] leading-[1.14] sm:text-4xl lg:text-[2.65rem] ${
          isDark ? "text-white" : "text-[#0b1320]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            isDark ? "text-slate-300" : "text-[#475569]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
