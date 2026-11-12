import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NotifyForm } from "@/components/NotifyForm";

export default function Home() {
  return (
    <div
      id="top"
      className="relative flex min-h-dvh flex-col justify-between overflow-hidden bg-[#050a14] text-[#fefefe]"
    >
      {/* Full-viewport 3D architectural glass & metallic background */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/brand/hero-bg.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="animate-ambient-bg object-cover object-[72%_center] sm:object-center"
        />
        {/* Contrast scrims preserving typography legibility across viewports */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040914]/90 via-[#050c1a]/72 to-[#040914]/38" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040914]/70 via-transparent to-[#040914]/88" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_45%,rgba(59,130,246,0.08)_0%,transparent_55%)]" />
      </div>

      <Header />

      <main
        id="main-content"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-12"
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3">
            <span
              className="h-px w-8 bg-[#d6a15c]/80"
              aria-hidden="true"
            />
            <p className="font-mono text-xs font-semibold tracking-[0.32em] text-[#d6a15c] uppercase sm:text-[13px]">
              THE IAM LAB
            </p>
          </div>

          <h1 className="animate-headline-reveal mt-5 bg-gradient-to-b from-white via-white to-slate-300 bg-clip-text text-[clamp(2.85rem,10.5vw,7.25rem)] font-semibold tracking-[-0.04em] leading-[0.94] text-transparent sm:mt-6">
            COMING SOON.
          </h1>

          <p className="mt-5 max-w-2xl text-base font-normal tracking-[-0.01em] leading-relaxed text-slate-200/95 sm:mt-7 sm:text-xl lg:text-2xl">
            Secure identities. Simplify access. Strengthen your business.
          </p>

          <div className="mt-9 sm:mt-11">
            <NotifyForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
