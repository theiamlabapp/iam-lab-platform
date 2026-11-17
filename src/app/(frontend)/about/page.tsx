import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Enterprise Identity Security & Practical Learning",
  description:
    "Learn about The IAM Lab, our mission, core guiding principles, and executive leadership led by Co-Founders Chiemezie Uzoma and Jennifer Uzoma.",
};

const PRINCIPLES = [
  {
    num: "01",
    code: "VAL-PURPOSE",
    title: "Security with Purpose",
    rule: "Access controls must enable business agility, never create administrative inertia.",
    description:
      "We believe identity security should make legitimate enterprise access faster and more reliable, while making unauthorized access mathematically improbable. We engineer policies that are practical, traceable, and sustainable for everyday teams.",
  },
  {
    num: "02",
    code: "VAL-PRACTICAL",
    title: "Practical Learning",
    rule: "Theory without enterprise tenant execution builds fragile, false confidence.",
    description:
      "Identity and Access Management is an operational engineering discipline. Our academy and corporate enablement are grounded strictly in real platforms, production troubleshooting, and active enterprise architecture scenarios.",
  },
  {
    num: "03",
    code: "VAL-INTEGRITY",
    title: "Integrity & Clarity",
    rule: "Transparent assessments, honest capability roadmaps, zero buzzword inflation.",
    description:
      "We provide clear, unvarnished assessments of security posture, capability gaps, and realistic implementation timelines. We refuse vendor hype and prioritize verifiable, defensive technical resilience.",
  },
  {
    num: "04",
    code: "VAL-EVOLUTION",
    title: "Continuous Improvement",
    rule: "Identity threat vectors and cloud ecosystems evolve continuously; so must capability.",
    description:
      "Threat models, regulatory mandates, and cloud platforms never stand still. We continually refine our advisory methodologies and educational curricula to reflect active industry realities.",
  },
] as const;

const LEADERSHIP = [
  {
    name: "Chiemezie Uzoma",
    role: "Co-Founder & Chief Executive Officer",
    remit: "Technical Strategy • Enterprise IAM • Academy Curriculum",
    initials: "CU",
    bio: "Leads IAM consulting, technical strategy, identity security initiatives, and professional learning. His background spans enterprise identity administration, governance, privileged access, Microsoft Entra ID, Okta, SailPoint, CyberArk, and identity lifecycle automation.",
    competencies: [
      "Microsoft Entra ID & PIM",
      "SailPoint Identity Governance",
      "CyberArk PAM Architecture",
      "SCIM 2.0 & JML Automation",
      "Zero-Trust Access Engineering",
    ],
  },
  {
    name: "Jennifer Uzoma",
    role: "Co-Founder & Director of Operations",
    remit: "Operational Excellence • Client Experience • Programme Delivery",
    initials: "JU",
    bio: "Leads operational coordination, programme administration, client experience, and partnership delivery. Ensures that corporate engagements and cohort programmes run with disciplined execution, clarity, and dependable quality.",
    competencies: [
      "Client Engagement Operations",
      "Educational Programme Delivery",
      "Partner & Vendor Coordination",
      "Service Quality Assurance",
      "Global Learner Experience",
    ],
  },
] as const;

const SECTOR_MATRIX = [
  {
    sector: "Financial Services & Banking",
    vulnerability: "Audit findings, privilege creep, manual recertification delays, SOX & PCI-DSS compliance exposure.",
    governance: "Automated periodic access reviews, fine-grained segregation of duties (SoD), privileged session recording.",
  },
  {
    sector: "Technology & SaaS Enterprises",
    vulnerability: "Multi-tenant cloud infrastructure access, developer entitlement sprawl, unmonitored service principals.",
    governance: "Cloud Infrastructure Entitlement Management (CIEM), SCIM lifecycle automation, Zero-Trust conditional access.",
  },
  {
    sector: "Healthcare & Life Sciences",
    vulnerability: "High employee turnover, clinical application fragmentation, strict patient privacy compliance (HIPAA).",
    governance: "Role-based access control (RBAC), rapid Joiner-Mover-Leaver automation, auditable clinical identity tracking.",
  },
  {
    sector: "Higher Education & Enterprise",
    vulnerability: "Seasonal student and faculty churn, legacy Active Directory debt, federated cross-institution access.",
    governance: "Hybrid directory modernization, automated seasonal deprovisioning, SAML 2.0 and OIDC single sign-on.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* 1. Cinematic Hero with Photographic Layer */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#030712] py-24 sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/corporate-hero.jpg"
            alt="The IAM Lab Headquarters"
            fill
            priority
            className="object-cover object-center opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/92 to-[#030712]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.28em] text-[#d6a15c] uppercase">
              <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
              <span>Corporate Profile &bull; London &bull; Global Operations</span>
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl lg:leading-[1.08]">
              Building identity resilience. <br />
              <span className="bg-gradient-to-r from-[#ebd0a3] via-[#d6a15c] to-amber-200 bg-clip-text text-transparent">
                Developing practitioner capability.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
              The IAM Lab is an Identity and Access Management consulting, identity security, and professional learning brand headquartered in London, supporting international enterprise organisations and developing practitioners worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Panoramic Asymmetric Split: Mission & Vision */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 border border-white/10 bg-[#07101f] lg:grid-cols-2">
            {/* Mission */}
            <div className="p-8 sm:p-12 lg:p-16 border-b border-white/10 lg:border-b-0 lg:border-r">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#d6a15c] uppercase">
                Mission Statement // 01
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                Practical, Workable Security Architecture
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                To help organisations secure digital identities and manage access with greater clarity, control, and efficiency &mdash; while equipping ambitious technology professionals with practical, industry-grade IAM capability.
              </p>
              <div className="mt-8 border-t border-white/10 pt-6 font-mono text-xs text-slate-400">
                Strategic Focus: Zero-Trust Engineering • Enterprise Access Governance
              </div>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#d6a15c] uppercase">
                Vision Statement // 02
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                The Trusted Standard in IAM Authority
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                To become the definitive international authority in enterprise identity architecture and career enablement, recognised for engineering excellence, zero-hype clarity, and transformative career impact.
              </p>
              <div className="mt-8 border-t border-white/10 pt-6 font-mono text-xs text-slate-400">
                Global Benchmark: Operational Integrity • Defensible Security Outcomes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Guiding Principles Specification Ledger */}
      <section className="relative border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Core Values</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              The four principles that govern our work.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Whether architecting a complex governance platform or mentoring a new practitioner, these four standards guide every commitment we make.
            </p>
          </div>

          <div className="mt-16 divide-y divide-white/10 border-t border-b border-white/10">
            {PRINCIPLES.map((p) => (
              <div key={p.code} className="py-8 sm:py-10 transition-colors hover:bg-white/[0.02]">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                  <div className="flex items-baseline gap-4 lg:col-span-2 font-mono">
                    <span className="text-3xl font-bold text-[#d6a15c]">
                      {p.num}
                    </span>
                    <span className="text-xs text-slate-500 uppercase tracking-widest">
                      {p.code}
                    </span>
                  </div>

                  <div className="lg:col-span-6">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-[#d6a15c]">
                      {p.rule}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {p.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 border-t border-white/5 pt-4 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-8 lg:pt-0">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Operational Impact
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Every project deliverable and curriculum module is audited against this principle prior to publication.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership Dossier: Bespoke Typographic Executive Layout */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Executive Leadership</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Experienced leadership rooted in enterprise practice.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Our executive leadership combines deep hands-on identity engineering experience with disciplined operations and educational design.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="border border-white/10 bg-[#07101f] p-8 sm:p-12 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">
                      {leader.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-[#d6a15c] uppercase tracking-wider mt-1">
                      {leader.role}
                    </p>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#d6a15c]/40 bg-[#d6a15c]/10 font-mono text-lg font-bold text-[#d6a15c]">
                    {leader.initials}
                  </div>
                </div>

                <p className="mt-6 font-mono text-xs text-slate-400">
                  Focus: {leader.remit}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {leader.bio}
                </p>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Key Competencies
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {leader.competencies.map((comp) => (
                      <span
                        key={comp}
                        className="border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sector Matrix Table */}
      <section className="relative border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Target Industries</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Proven solutions across regulated environments.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              We understand the distinct regulatory, operational, and architectural requirements that shape identity security across critical enterprise sectors.
            </p>
          </div>

          <div className="mt-16 border border-white/10 bg-[#07101f]">
            <div className="divide-y divide-white/10">
              {SECTOR_MATRIX.map((s) => (
                <div key={s.sector} className="p-6 sm:p-8 transition-colors hover:bg-white/[0.02]">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-4">
                      <h3 className="text-lg font-bold text-white">
                        {s.sector}
                      </h3>
                    </div>
                    <div className="lg:col-span-4">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-rose-400">
                        Primary Risk Vectors
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        {s.vulnerability}
                      </p>
                    </div>
                    <div className="lg:col-span-4">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                        Governance Controls
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        {s.governance}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partner Callout Banner */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="flex items-center justify-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
            <span>Collaboration</span>
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl">
            Partner with The IAM Lab
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
            Let us discuss how our advisory, engineering, or enablement services can elevate your organization&apos;s identity security posture.
          </p>

          <div className="mt-10">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[52px] items-center justify-center border border-[#d6a15c] bg-[#d6a15c] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#030712] shadow-xl transition-all hover:bg-[#e4b26f]"
            >
              Start a Conversation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
