import Image from "next/image";

interface BrandLogoProps {
  priority?: boolean;
  surface?: "plain" | "card";
  className?: string;
}

export function BrandLogo({
  priority = false,
  surface = "plain",
  className = "w-[118px] sm:w-[136px]",
}: BrandLogoProps) {
  const image = (
    <Image
      src="/brand/the-iam-lab-logo.png"
      alt="The IAM Lab official logo"
      width={1174}
      height={764}
      priority={priority}
      className={`h-auto select-none ${className}`}
      sizes="(max-width: 640px) 128px, 148px"
    />
  );

  if (surface === "card") {
    return (
      <span className="inline-flex items-center rounded-xl bg-[#fefefe] px-3.5 py-2.5 shadow-sm ring-1 ring-white/10">
        {image}
      </span>
    );
  }

  return image;
}
