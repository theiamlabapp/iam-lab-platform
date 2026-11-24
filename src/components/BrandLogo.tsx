import Image from "next/image";

interface BrandLogoProps {
  priority?: boolean;
  variant?: "dark" | "light";
  surface?: "plain" | "card";
  className?: string;
}

/**
 * Renders the transparent-background IAM Lab trademark logo.
 * Use `variant="dark"` on white/warm-white surfaces and `variant="light"` on midnight navy surfaces.
 */
export function BrandLogo({
  priority = false,
  variant = "dark",
  surface = "plain",
  className = "w-[88px] sm:w-[104px]",
}: BrandLogoProps) {
  const src =
    variant === "light"
      ? "/brand/the-iam-lab-logo-light.png"
      : "/brand/the-iam-lab-logo-dark.png";

  const image = (
    <Image
      src={src}
      alt="The IAM Lab"
      width={1160}
      height={745}
      priority={priority}
      className={`h-auto select-none ${className}`}
      sizes="(max-width: 640px) 92px, 114px"
    />
  );

  if (surface === "card") {
    return (
      <span className="inline-flex items-center rounded bg-white px-3 py-1.5 shadow-sm border border-slate-200/80">
        {image}
      </span>
    );
  }

  return image;
}
