import Image from "next/image";
import React from "react";

export function Logo() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-slate-700/80 bg-slate-900/90 p-1">
        <Image
          src="/brand/the-iam-lab-logo.png"
          alt="The IAM Lab"
          fill
          className="object-contain p-0.5"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-sans text-sm font-bold tracking-tight text-white">
          THE IAM LAB
        </span>
        <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
          Administrative Console
        </span>
      </div>
    </div>
  );
}

export default Logo;
