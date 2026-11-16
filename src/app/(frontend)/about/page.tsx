import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "About Us | Enterprise Identity Security & Practical Learning",
  description:
    "Learn about The IAM Lab, our mission, core guiding principles, and executive leadership led by Co-Founders Chiemezie Uzoma and Jennifer Uzoma.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "Security with Purpose",
    description:
      "We believe identity security must serve business enablement rather than creating administrative inertia. We design controls that are practical, traceable, and sustainable for everyday teams.",
  },
  {
    num: "02",
    title: "Practical Learning",
    description:
      "Theory without enterprise hands-on execution builds false confidence. Our academy and corporate enablement are grounded in real platforms, real troubleshooting, and production-tested scenarios.",
  },
  {
    num: "03",
    title: "Integrity & Clarity",
    description:
      "We provide clear, unvarnished assessments of security posture, capability gaps, and realistic implementation timelines. We avoid buzzword inflation and prioritize genuine technical resilience.",
  },
  {
    num: "04",
    title: "Continuous Improvement",
    description:
      "Threat models, regulatory expectations, and cloud ecosystems never stand still. We continuously refine our advisory frameworks and educational curricula to reflect active industry realities.",
  },
] as const;

const LEADERSHIP = [
  {
    name: "Chiemezie Uzoma",
    role: "Co-Founder & CEO",
    focus: "Technical Strategy • Enterprise IAM • Academy Curriculum",
    bio: "Leads IAM consulting, technical strategy, identity security initiatives, and professional learning. His background spans enterprise identity administration, governance, privileged access, Microsoft Entra ID, Okta, SailPoint, CyberArk, and identity lifecycle automation.",
    initials: "CU",
  },
  {
    name: "Jennifer Uzoma",
    role: "Co-Founder & Director of Operations",
    focus: "Operational Excellence • Client Experience • Programme Delivery",
    bio: "Leads operational coordination, programme administration, client experience, and partnership delivery. Ensures that corporate engagements and cohort programmes run with disciplined execution, clarity, and dependable quality.",
    initials: "JU",
  },
] as const;

const SECTORS = [
  {
    title: "Financial Services & Banking",
    description:
      "Strict regulatory compliance, segregation of duties (SoD), automated access recertification, and privileged session protection.",
  },
  {
    title: "Technology & SaaS",
    description:
      "Multi-tenant identity boundaries, cloud infrastructure access (CIEM), developer access isolation, and automated SCIM provisioning.",
  },
  {
    title: "Healthcare & Life Sciences",
    description:
      "Patient data privacy, clinician access lifecycle, role-based controls, and auditable governance across clinical applications.",
  },
  {
    title: "Higher Education & Enterprise",
    description:
      "High-churn seasonal populations (students, faculty, contractors), federated authentication, and legacy Active Directory modernisation.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero / Narrative Profile */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-blue-600/10 to-transparent blur-[120px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
              About The IAM Lab
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Building identity resilience. Developing practitioner capability.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              The IAM Lab is an Identity and Access Management consulting, identity security, and professional learning brand headquartered in London, supporting global organisations and developing practitioners worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#07101f]/80 p-8 sm:p-10">
              <span className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Our Mission
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Practical, Workable Security Architecture
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                To help organisations secure digital identities and govern access with greater clarity, control, and efficiency &mdash; while equipping ambitious technology professionals with practical, industry-grade IAM capability.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#07101f]/80 p-8 sm:p-10">
              <span className="font-mono text-xs font-semibold tracking-widest text-amber-400 uppercase">
                Our Vision
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                The Trusted Standard in IAM Authority
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                To become the definitive international authority in enterprise identity architecture and career enablement, recognised for engineering excellence, zero-hype clarity, and transformative career impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Guiding Principles */}
      <section className="relative border-t border-white/10 bg-[#030712] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            theme="dark"
            eyebrow="Core Values"
            title="The principles that govern our work"
            description="Whether architecting a complex governance platform or mentoring a new practitioner, these four standards guide every commitment we make."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="group relative rounded-2xl border border-white/10 bg-[#07101f]/70 p-6 transition-all hover:border-amber-400/30"
              >
                <span className="font-mono text-2xl font-bold text-amber-400/60">
                  {p.num}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-amber-200">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Profiles */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            theme="dark"
            eyebrow="Executive Leadership"
            title="Experienced leadership rooted in enterprise practice"
            description="Our leadership blends deep hands-on identity engineering experience with disciplined operations and educational design."
          />

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="rounded-3xl border border-white/10 bg-[#07101f]/90 p-8 transition-all hover:border-amber-400/30 sm:p-10"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/20 to-transparent font-mono text-xl font-bold text-amber-300">
                    {leader.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      {leader.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-amber-400">
                      {leader.role}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {leader.focus}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-slate-300">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sectors Served */}
      <section className="relative border-t border-white/10 bg-[#030712] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            theme="dark"
            eyebrow="Target Industries"
            title="Proven solutions across regulated environments"
            description="We understand the distinct regulatory, operational, and architectural requirements that shape identity security in key sectors."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-[#07101f]/60 p-6"
              >
                <h3 className="text-base font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact CTA */}
      <section className="relative border-t border-white/10 bg-gradient-to-b from-[#050a14] to-[#02050c] py-20 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Partner with The IAM Lab
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Let us discuss how our advisory, engineering, or enablement services can elevate your organization&apos;s identity security posture.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-[#d6a15c] to-[#e4b26f] px-8 py-3.5 text-sm font-semibold text-[#050a14] shadow-md transition-all hover:brightness-110"
            >
              Start a Conversation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
