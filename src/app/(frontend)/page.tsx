import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";

const CHALLENGES = [
  {
    num: "01",
    title: "Identity Sprawl & Cloud Proliferation",
    context: "SaaS & Multi-Cloud Complexity",
    friction:
      "As enterprises adopt hybrid cloud and distributed SaaS suites, access permissions fragment across uncoordinated directories. Security teams lose authoritative visibility into who possesses what access.",
    resolution:
      "Centralized identity orchestration, directory consolidation, and authoritative Single Source of Truth architecture.",
  },
  {
    num: "02",
    title: "Privilege Creep & Orphan Tokens",
    context: "Stale Entitlements & Shadow Admins",
    friction:
      "Employees change projects and accumulate lingering permissions over time. Unmonitored service principals and orphaned admin credentials expand the enterprise attack surface exponentially.",
    resolution:
      "Automated periodic recertification campaigns, toxic combination detection, and Just-in-Time (JIT) access elevation.",
  },
  {
    num: "03",
    title: "Inconsistent Review & Audit Debt",
    context: "Compliance & Governance Friction",
    friction:
      "Manual spreadsheet audits and informal manager sign-offs fail regulatory standards under SOX, ISO 27001, and NIS2, exposing organisations to compliance penalties and operational delays.",
    resolution:
      "Immutable audit trails, automated compliance reporting, and verifiable segregation of duties (SoD) policies.",
  },
  {
    num: "04",
    title: "Manual Joiner-Mover-Leaver Latency",
    context: "Lifecycle Bottlenecks",
    friction:
      "New hires wait days for essential application access, while departures fail to be cleanly deprovisioned across peripheral systems, leaving active entry points for departed contractors.",
    resolution:
      "HR-driven event-based provisioning via SCIM connectors, immediate automated termination, and zero-latency onboarding.",
  },
] as const;

const SIX_PILLARS = [
  {
    num: "01",
    name: "IAM Strategy, Assessment & Advisory",
    tagline: "Clarity on identity maturity, risks, and prioritised transformation.",
    summary:
      "Comprehensive evaluation of your current identity footprint, privileged posture, and access policies. We deliver an executive risk report and a prioritized 12-to-24-month vendor-neutral architecture roadmap.",
    anchor: "/services#strategy",
  },
  {
    num: "02",
    name: "Identity Governance & Administration (IGA)",
    tagline: "Verifiable access certification, role design, and compliance assurance.",
    summary:
      "Enterprise governance platforms configured to eliminate entitlement bloat. Automated periodic certification campaigns, role mining for least-privilege enforcement, and audit-ready reporting.",
    anchor: "/services#governance",
  },
  {
    num: "03",
    name: "Identity Lifecycle & Provisioning Automation",
    tagline: "Eliminate manual joiner delay and lingering leaver exposure.",
    summary:
      "End-to-end automation connecting HR systems directly to enterprise directories. Ensure immediate Day-1 productivity and instantaneous, verifiable revocation upon employee departure.",
    anchor: "/services#lifecycle",
  },
  {
    num: "04",
    name: "Authentication, SSO & Access Modernisation",
    tagline: "Frictionless, phishing-resistant access across the modern enterprise.",
    summary:
      "Deploy phishing-resistant Multi-Factor Authentication (MFA), FIDO2 security keys, SAML 2.0 / OIDC single sign-on federation, and adaptive Zero-Trust Conditional Access policies.",
    anchor: "/services#auth-sso",
  },
  {
    num: "05",
    name: "Privileged Access Management (PAM)",
    tagline: "Lock down critical keys, eliminate permanent admins, and audit every root session.",
    summary:
      "Zero permanent administrative privileges. Secure vaulting of root credentials, automated password rotation, session isolation with keystroke recording, and emergency break-glass procedure validation.",
    anchor: "/services#pam",
  },
  {
    num: "06",
    name: "Directory Modernisation & Technical Implementation",
    tagline: "Experienced platform engineering, migration, and ongoing governance care.",
    summary:
      "Turnkey platform deployment, Active Directory to cloud directory migration, custom SCIM connectors, and operational runbook handovers for internal engineering teams.",
    anchor: "/services#implementation",
  },
] as const;

const DELIVERY_STEPS = [
  {
    step: "01",
    title: "Discovery & Needs Assessment",
    detail: "Focused technical audit of your existing identity architecture, friction points, and compliance mandates.",
  },
  {
    step: "02",
    title: "Scope & Requirements",
    detail: "Rigorous definition of system boundaries, user cohorts, directory targets, and success criteria.",
  },
  {
    step: "03",
    title: "Formal Proposal & Design",
    detail: "Target architecture blueprints, vendor-neutral platform evaluation, and commercial roadmap.",
  },
  {
    step: "04",
    title: "Delivery & Knowledge Transfer",
    detail: "Hands-on implementation, staging verification, production deployment, runbooks, and staff enablement.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero */}
      <HomeHero />

      {/* 2. Identity Security Challenges — Asymmetric Technical Ledger */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Enterprise Vulnerabilities
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Identity is the primary attack surface.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Modern enterprises operate across hybrid cloud directories, hundreds of SaaS tools, and distributed workforces. Without unified governance, access risk escalates silently.
            </p>
          </div>

          <div className="mt-16 divide-y divide-white/10 border-t border-b border-white/10">
            {CHALLENGES.map((item) => (
              <div
                key={item.num}
                className="grid grid-cols-1 gap-6 py-8 sm:py-10 lg:grid-cols-12 lg:gap-8"
              >
                <div className="flex items-baseline gap-4 lg:col-span-4">
                  <span className="font-mono text-xs font-bold text-[#D89A43]">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-slate-400">
                      {item.context}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-sm leading-relaxed text-slate-300">
                    {item.friction}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="border-l border-[#D89A43]/40 pl-4">
                    <span className="font-mono text-[11px] font-semibold text-[#D89A43] uppercase">
                      Architectural Resolution
                    </span>
                    <p className="mt-1 text-sm text-slate-200">
                      {item.resolution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Photographic Editorial Section — Introducing The IAM Lab */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-xl">
                <Image
                  src="/brand/team-collaboration.jpg"
                  alt="The IAM Lab advisory consultants collaborating on enterprise architecture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0B1424] uppercase">
                  Independent Advisory
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0B1424] sm:text-4xl">
                We engineer trust across the modern enterprise.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-700">
                The IAM Lab was founded to bridge the gap between complex regulatory mandates and practical enterprise operations. We are not software resellers; we provide independent, vendor-neutral guidance focused solely on defensible security posture and business enablement.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Led by seasoned IAM practitioners with decades of combined experience across banking, healthcare, government, and global SaaS enterprises, we deliver architecture that stands up to adversarial scrutiny and strict regulatory audits.
              </p>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1424] hover:text-[#D89A43]"
                >
                  <span>Learn about our leadership and methodology</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Six Consulting Pillars — Editorial Layout */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Core Capabilities
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Six pillars of IAM consulting excellence.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              From strategic executive roadmaps to automated directory pipelines and zero-standing-privilege defenses.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {SIX_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="flex flex-col justify-between bg-[#0B1424] p-8 sm:p-10 transition-colors hover:bg-[#14243B]"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#D89A43]">
                    PILLAR // {pillar.num}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white">
                    {pillar.name}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-[#D89A43]">
                    {pillar.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {pillar.summary}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Link
                    href={pillar.anchor}
                    className="text-xs font-bold tracking-wider text-white uppercase hover:text-[#D89A43]"
                  >
                    Explore Pillar Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Four-Stage Delivery Methodology */}
      <section className="border-b border-slate-200 bg-[#FFFFFF] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#0B1424] uppercase">
                Engagement Protocol
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1424] sm:text-4xl">
              How we engage and deliver.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              A structured commercial workflow ensuring complete transparency from initial discovery to production handover.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_STEPS.map((s) => (
              <div
                key={s.step}
                className="border-t-2 border-[#0B1424] pt-6"
              >
                <span className="font-mono text-xs font-bold text-[#D89A43]">
                  STEP // {s.step}
                </span>
                <h3 className="mt-3 text-lg font-bold text-[#0B1424]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. IAM Academy Introduction — Photographic Background */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/academy-classroom.jpg"
            alt="IAM Academy professional masterclass and cohort learning"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-[#0B1424]/90" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Workforce Capability
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              The IAM Academy.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Practical, practitioner-led training for ambitious engineers, analysts, and enterprise teams. Grounded in real cloud tenants, hands-on labs, and executive mentorship.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/academy"
                className="inline-flex min-h-[48px] items-center justify-center bg-[#D89A43] px-7 py-3 text-sm font-bold tracking-wider text-[#0B1424] uppercase hover:bg-[#e4a856]"
              >
                Explore Learning Pathways
              </Link>
              <a
                href="https://selar.com/m/chiemezie-uzoma1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:border-[#D89A43] hover:text-[#D89A43]"
              >
                Official Selar Bookstore &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Consultation Section with Photographic Background */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/executive-consulting.jpg"
            alt="Executive cybersecurity consulting discussion"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1424] via-[#0B1424]/90 to-[#0B1424]/85" />
        </div>

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
              Consultation
            </span>
            <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl">
            Discuss your IAM initiative with an expert.
          </h2>

          <p className="mt-6 text-base text-slate-300 sm:text-lg">
            Whether preparing for a regulatory audit, deploying modern Privileged Access Management, or upskilling your team, we provide direct access to senior IAM practitioners.
          </p>

          <div className="mt-10">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[52px] items-center justify-center bg-[#D89A43] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1424] uppercase shadow-xl hover:bg-[#e4a856]"
            >
              Request an Executive Consultation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
