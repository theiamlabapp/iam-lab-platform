import Image from "next/image";
import React from "react";

export function Icon() {
  return (
    <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded bg-slate-900">
      <Image
        src="/brand/the-iam-lab-logo.png"
        alt="The IAM Lab"
        fill
        className="object-contain"
      />
    </div>
  );
}

export default Icon;
