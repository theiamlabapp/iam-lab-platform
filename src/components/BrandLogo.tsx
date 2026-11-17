import Image from "next/image";

interface BrandLogoProps {
  priority?: boolean;
  surface?: "plain" | "card";
  className?: string;
}

export function BrandLogo({
  priority = false,
  surface = "card",
  className = "w-[88px] sm:w-[104px]",
}: BrandLogoProps) {
  const image = (
    <Image
      src="/brand/the-iam-lab-logo.png"
      alt="The IAM Lab official logo"
      width={1174}
      height={764}
      priority={priority}
      className={`h-auto select-none ${className}`}
      sizes="(max-width: 640px) 96px, 112px"
    />
  );

  if (surface === "card") {
    return (
      <span className="inline-flex items-center rounded bg-white px-3 py-1.5 shadow-md border border-white/20">
        {image}
      </span>
    );
  }

  return image;
}
