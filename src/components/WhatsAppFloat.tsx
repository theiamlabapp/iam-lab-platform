"use client";

import React from "react";

interface WhatsAppFloatProps {
  href: string;
}

/**
 * Accessible floating WhatsApp quick-contact widget fixed at the lower-right corner.
 */
export function WhatsAppFloat({ href }: WhatsAppFloatProps) {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex items-center gap-2.5 sm:right-6 sm:bottom-6">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to an IAM Specialist on WhatsApp"
        title="Chat on WhatsApp — The IAM Lab"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.38)] ring-2 ring-white/90 transition-transform duration-200 hover:scale-105 hover:bg-[#1ebe5d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D89A43] sm:h-14 sm:w-14"
      >
        {/* Subtle reduced-motion-safe glowing pulse ring */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/45 motion-safe:animate-ping"
          style={{ animationDuration: "2.8s" }}
          aria-hidden="true"
        />

        {/* Official WhatsApp Glyph */}
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="relative z-10 h-6 w-6 sm:h-7 sm:w-7"
          aria-hidden="true"
        >
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.256.59 4.456 1.712 6.394L3.09 28.8l6.584-1.728a12.76 12.76 0 0 0 6.33 1.682h.006c7.058 0 12.796-5.74 12.796-12.8 0-3.42-1.332-6.634-3.75-9.052A12.72 12.72 0 0 0 16.004 3.2Zm0 23.38h-.005a10.6 10.6 0 0 1-5.402-1.478l-.388-.23-3.908 1.026 1.044-3.81-.252-.402a10.56 10.56 0 0 1-1.622-5.646c0-5.838 4.75-10.588 10.592-10.588 2.83 0 5.49 1.102 7.49 3.102a10.52 10.52 0 0 1 3.096 7.486c0 5.84-4.75 10.59-10.645 10.54Zm5.806-7.934c-.318-.16-1.884-.93-2.176-1.036-.292-.106-.504-.16-.716.16-.212.318-.822 1.036-1.008 1.248-.186.212-.372.238-.69.08-.318-.16-1.344-.496-2.56-1.58-.946-.844-1.586-1.886-1.772-2.204-.186-.318-.02-.49.14-.648.144-.144.318-.372.478-.558.16-.186.212-.318.318-.53.106-.212.054-.398-.026-.558-.08-.16-.716-1.726-.982-2.362-.258-.62-.52-.536-.716-.546-.186-.01-.398-.01-.61-.01-.212 0-.556.08-.848.398-.292.318-1.114 1.088-1.114 2.654 0 1.566 1.14 3.078 1.3 3.29.16.212 2.244 3.428 5.438 4.808.76.328 1.352.524 1.814.67.762.242 1.456.208 2.004.126.612-.092 1.884-.77 2.15-1.514.266-.742.266-1.378.186-1.512-.08-.132-.292-.212-.61-.372Z" />
        </svg>
      </a>
    </div>
  );
}
