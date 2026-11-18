import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPageData } from "@/lib/getPageData";

export const metadata: Metadata = {
  title: "About Us | Enterprise Identity Security & Practical Learning",
  description:
    "Learn about The IAM Lab, our founding mission, operating principles, and executive leadership led by Co-Founders Chiemezie Uzoma and Jennifer Uzoma.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "Security with Purpose",
    rule: "Access controls must enable business agility, never create administrative inertia.",
    description:
      "We believe identity security should make legitimate enterprise access faster and more reliable, while making unauthorized access mathematically improbable. We engineer policies that are practical, traceable, and sustainable for everyday teams.",
  },
  {
    num: "02",
    title: "Practical Learning",
    rule: "Theory without enterprise tenant execution builds fragile, false confidence.",
    description:
      "Identity and Access Management is an operational engineering discipline. Our academy and corporate enablement are grounded strictly in real platforms, production troubleshooting, and active enterprise architecture scenarios.",
  },
  {
    num: "03",
    title: "Integrity & Clarity",
    rule: "Transparent assessments, honest capability roadmaps, zero buzzword inflation.",
    description:
      "We provide clear, unvarnished assessments of security posture, capability gaps, and realistic implementation timelines. We refuse vendor hype and prioritize verifiable, defensive technical resilience.",
  },
  {
    num: "04",
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
    remit: "Technical Strategy • Enterprise IAM Architecture • Academy Curriculum",
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

const INDUSTRIES = [
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

export default async function AboutPage() {
  const pageData = await getPageData("about");

  return (
    <>
      {/* 1. Large Photographic Introduction */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/brand/office-architecture.jpg"
            alt="The IAM Lab corporate headquarters architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424]/90 via-[#0B1424]/80 to-[#14243B]/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Corporate Profile
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pageData?.hero_headline || "Engineering Trust Across the Modern Enterprise."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {pageData?.hero_subheadline ||
                "The IAM Lab was established to address the critical shortage of specialist Identity and Access Management capability in modern enterprise security programmes."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision — Asymmetric Editorial Split */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <span className="font-mono text-xs font-bold tracking-widest text-[#D89A43] uppercase">
                OUR MISSION
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0B1424] sm:text-4xl">
                Demystifying identity security to safeguard enterprise resilience.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-700">
                To simplify and strengthen identity security for businesses, demystify complex access controls, and build genuine practitioner capability through practical, real-world learning.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                We believe that robust identity architecture should liberate employees to work smoothly while ensuring administrative privileges are auditable, ephemeral, and strictly controlled.
              </p>
            </div>

            <div className="lg:col-span-6">
              <span className="font-mono text-xs font-bold tracking-widest text-[#D89A43] uppercase">
                OUR VISION
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0B1424] sm:text-4xl">
                Setting the benchmark for high-assurance identity practices.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-700">
                To become a trusted, go-to brand for Identity and Access Management consulting, identity security advisory, and professional IAM education globally.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                By uniting executive advisory with hands-on technical bootcamps, we are actively cultivating the next generation of enterprise cybersecurity leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive Leadership Profiles */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Executive Leadership
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Experienced practitioners leading from the front.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Our leadership brings hands-on enterprise tenant implementation, governance programme management, and global educational execution.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="border border-white/10 bg-[#14243B]/60 p-8 sm:p-10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center bg-[#0B1424] border border-[#D89A43]/40 text-lg font-bold text-[#D89A43]">
                    {leader.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#D89A43]">
                      {leader.role}
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-mono text-xs text-slate-400">
                  {leader.remit}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-slate-300">
                  {leader.bio}
                </p>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <span className="font-mono text-xs font-semibold text-slate-400 uppercase">
                    Core Technical Domains
                  </span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {leader.competencies.map((c) => (
                      <span
                        key={c}
                        className="bg-[#0B1424] border border-white/10 px-3 py-1 text-xs text-slate-300"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Guiding Principles */}
      <section className="border-b border-slate-200 bg-[#FFFFFF] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0B1424] uppercase">
                Core Philosophy
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1424] sm:text-4xl">
              Principles that govern our work.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div
                key={p.num}
                className="border-t-2 border-[#D89A43] pt-6"
              >
                <span className="font-mono text-xs font-bold text-[#D89A43]">
                  PRINCIPLE // {p.num}
                </span>
                <h3 className="mt-3 text-lg font-bold text-[#0B1424]">
                  {p.title}
                </h3>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  {p.rule}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Industries Served */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Enterprise Sectors
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Sectors where identity security is mission-critical.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.sector}
                className="border border-white/10 bg-[#14243B]/40 p-8"
              >
                <h3 className="text-xl font-bold text-white">
                  {ind.sector}
                </h3>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <span className="font-mono text-xs text-rose-300 uppercase">
                    Key Vulnerabilities:
                  </span>
                  <p className="mt-1 text-sm text-slate-300">
                    {ind.vulnerability}
                  </p>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <span className="font-mono text-xs text-[#D89A43] uppercase">
                    Governance Solution:
                  </span>
                  <p className="mt-1 text-sm text-slate-300">
                    {ind.governance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing Section */}
      <section className="border-b border-white/10 bg-[#0B1424] py-20 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-bold text-white">
            Ready to strengthen your enterprise identity posture?
          </h2>
          <p className="mt-4 text-slate-300">
            Reach out to our advisory team to arrange a confidential review of your identity governance, privileged access, or directory architecture.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center bg-[#D89A43] px-8 py-3 text-sm font-bold tracking-wider text-[#0B1424] uppercase hover:bg-[#e4a856]"
            >
              Contact The IAM Lab &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
