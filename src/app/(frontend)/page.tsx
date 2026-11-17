import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";

const CHALLENGE_BREAKDOWN = [
  {
    code: "SEC-01",
    num: "01",
    title: "Identity Sprawl & Cloud Proliferation",
    context: "SaaS & Multi-Cloud Complexity",
    friction:
      "As enterprises adopt hybrid cloud and distributed SaaS suites, access permissions fragment across uncoordinated directories. Security teams lose authoritative visibility into who possesses what access.",
    resolution:
      "Centralized identity orchestration, directory consolidation, and authoritative Single Source of Truth architecture.",
  },
  {
    code: "SEC-02",
    num: "02",
    title: "Privilege Creep & Orphan Tokens",
    context: "Stale Entitlements & Shadow Admins",
    friction:
      "Employees change projects and accumulate lingering permissions over time. Unmonitored service principals and orphaned admin credentials expand the enterprise attack surface exponentially.",
    resolution:
      "Automated periodic recertification campaigns, toxic combination detection, and Just-in-Time (JIT) access elevation.",
  },
  {
    code: "SEC-03",
    num: "03",
    title: "Inconsistent Review & Audit Debt",
    context: "Compliance & Governance Friction",
    friction:
      "Manual spreadsheet audits and informal manager sign-offs fail regulatory standards under SOX, ISO 27001, and NIS2, exposing organisations to compliance penalties and operational delays.",
    resolution:
      "Immutable audit trails, automated compliance reporting, and verifiable segregation of duties (SoD) policies.",
  },
  {
    code: "SEC-04",
    num: "04",
    title: "Manual Joiner-Mover-Leaver Latency",
    context: "Lifecycle Bottlenecks",
    friction:
      "New hires wait days for essential application access, while departures fail to be cleanly deprovisioned across peripheral systems, leaving active entry points for departed contractors.",
    resolution:
      "HR-driven event-based provisioning via SCIM connectors, immediate automated termination, and zero-latency onboarding.",
  },
] as const;

const SERVICES_LEDGER = [
  {
    num: "01",
    code: "ADV-01",
    title: "IAM Strategy, Assessment & Advisory",
    tagline: "Risk Discovery • Maturity Scoring • Transformation Roadmap",
    description:
      "Comprehensive evaluation of your current identity footprint, privileged posture, and access policies. We deliver an executive risk report and a prioritized 12-to-24-month vendor-neutral architecture roadmap.",
    deliverables: "Maturity Heatmap • Target State Architecture • Investment Prioritisation",
  },
  {
    num: "02",
    code: "IGA-02",
    title: "Identity Governance & Access Management (IGA)",
    tagline: "Access Reviews • Role Mining • Segregation of Duties",
    description:
      "Enterprise governance platforms configured to eliminate entitlement bloat. Automated periodic certification campaigns, role mining for least-privilege enforcement, and audit-ready reporting.",
    deliverables: "Campaign Automation • Role Engineering • Compliance Dashboards",
  },
  {
    num: "03",
    code: "AUT-03",
    title: "Identity Lifecycle & Provisioning Automation",
    tagline: "Joiner-Mover-Leaver • SCIM 2.0 • HR-to-Cloud Sync",
    description:
      "End-to-end automation connecting HR systems (Workday, SuccessFactors) directly to enterprise directories. Ensure immediate Day-1 productivity and instantaneous, verifiable revocation upon employee departure.",
    deliverables: "JML Pipelines • SCIM Connectors • Directory Hygiene Automation",
  },
  {
    num: "04",
    code: "SSO-04",
    title: "Authentication, SSO & Access Modernisation",
    tagline: "SAML 2.0 • OIDC • FIDO2 Passwordless • Zero-Trust",
    description:
      "Modernize sign-in experiences and eliminate password vulnerabilities. We deploy phishing-resistant Multi-Factor Authentication (MFA), FIDO2 security keys, and adaptive Zero-Trust Conditional Access policies.",
    deliverables: "SSO Federation • Adaptive Policies • Passwordless Deployment",
  },
  {
    num: "05",
    code: "PAM-05",
    title: "Privileged Access Management (PAM)",
    tagline: "Credential Vaulting • Session Isolation • JIT Elevation",
    description:
      "Zero permanent administrative privileges. Secure vaulting of root credentials, automated password rotation, session isolation with keystroke recording, and emergency break-glass procedure validation.",
    deliverables: "Vault Architecture • Privileged Session Proxying • JIT Access Rules",
  },
] as const;

const DELIVERY_STEPS = [
  {
    step: "01",
    name: "Discovery & Maturity Audit",
    phase: "Investigation",
    desc: "Rigorous technical inspection of your directories, privileged roles, SaaS apps, and compliance requirements through structured stakeholder sessions.",
  },
  {
    step: "02",
    name: "Scope & Target Architecture",
    phase: "Specification",
    desc: "Formal definition of technical boundaries, integration dependencies, governance guardrails, and quantifiable security success metrics.",
  },
  {
    step: "03",
    name: "Engineering & Pilot Staging",
    phase: "Execution",
    desc: "Hands-on platform deployment, connector development, policy tuning, and controlled pilot validation in dedicated staging environments.",
  },
  {
    step: "04",
    name: "Production Rollout & Enablement",
    phase: "Operationalisation",
    desc: "Phased enterprise deployment, runbook delivery, operational hypercare, and comprehensive knowledge transfer to your internal engineering team.",
  },
] as const;

const ACADEMY_PATHWAYS_MATRIX = [
  {
    pathway: "IAM Foundation",
    level: "Tier 1 // Entry",
    audience: "Career switchers & IT beginners",
    core: "Core identity concepts, AD / LDAP directories, AAA principles, SAML & OIDC fundamentals.",
  },
  {
    pathway: "IAM Analyst",
    level: "Tier 2 // Operational",
    audience: "Helpdesk, IT support, early practitioners",
    core: "Access request workflows, entitlement troubleshooting, recertification campaigns, GRC audit basics.",
  },
  {
    pathway: "IAM Engineer",
    level: "Tier 3 // Engineering",
    audience: "Systems administrators & security engineers",
    core: "SSO integration, SCIM provisioning pipelines, API automation, hybrid directory synchronization.",
  },
  {
    pathway: "Senior IAM Engineer",
    level: "Tier 4 // Advanced",
    audience: "Experienced IAM & infrastructure engineers",
    core: "Platform resilience, PAM vaulting & session isolation, CI/CD pipeline governance, emerging AI security.",
  },
  {
    pathway: "IAM Architect",
    level: "Tier 5 // Strategic",
    audience: "Tech leads & aspiring security architects",
    core: "Zero-Trust enterprise architecture, multi-cloud governance (AWS/Azure/GCP), compliance frameworks.",
  },
  {
    pathway: "IAM Consultant & Lead",
    level: "Tier 6 // Advisory",
    audience: "Practice leaders & senior specialists",
    core: "Client advisory methodology, C-suite risk translation, commercial scoping, steering governance.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero with Photographic Layer */}
      <HomeHero />

      {/* 2. Asymmetric Technical Breakdown: The Enterprise Challenge */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Left Column: Context & Architectural Directive */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
                <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
                <span>The Identity Problem Space</span>
              </div>

              <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl lg:leading-[1.12]">
                Access management is the primary attack surface of the modern cloud enterprise.
              </h2>

              <p className="mt-6 text-base leading-relaxed text-slate-300">
                As organisations scale across multi-cloud environments and distributed workforces, managing who holds access to what systems becomes opaque. Fragmented approvals, orphaned credentials, and unmanaged privileges invite catastrophic breach exposure and crippling audit findings.
              </p>

              {/* Technical Telemetry Panel */}
              <div className="mt-10 border-l-2 border-[#d6a15c] bg-[#07101f] p-6 shadow-xl">
                <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-[#d6a15c] uppercase">
                  Enterprise Operational Standard
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  We replace spreadsheet-driven access management with continuous, policy-governed automation. Every entitlement is verified, every privileged session is audited, and every joiner or leaver state is instantaneous.
                </p>
              </div>
            </div>

            {/* Right Column: Architectural Ledger (No generic cards!) */}
            <div className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
              {CHALLENGE_BREAKDOWN.map((item) => (
                <div
                  key={item.code}
                  className="group py-8 sm:py-10 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-[#d6a15c]">
                    <span className="font-semibold tracking-widest">{item.code} {"//"} {item.context}</span>
                    <span className="text-slate-500 font-bold">{item.num}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold text-white group-hover:text-[#ebd0a3] transition-colors sm:text-2xl">
                    {item.title}
                  </h3>

                  <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-rose-400/90">
                        Operational Friction
                      </p>
                      <p className="mt-1 text-slate-400 leading-relaxed text-xs sm:text-sm">
                        {item.friction}
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400/90">
                        Target Architecture
                      </p>
                      <p className="mt-1 text-slate-300 leading-relaxed text-xs sm:text-sm">
                        {item.resolution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solutions Showcase with Background Image & Architectural Ledger */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        {/* Background Image Layer with Heavy Dark Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/corporate-hero.jpg"
            alt="Corporate Identity Architecture"
            fill
            className="object-cover object-center opacity-20 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/95 to-[#030712]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
                <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
                <span>Enterprise Consulting Pillars</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                Engineering depth across the full identity lifecycle.
              </h2>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/[0.04] px-6 py-3 font-mono text-xs font-semibold tracking-wider text-slate-200 uppercase transition-all hover:border-[#d6a15c] hover:text-white"
            >
              <span>Explore All 6 Solutions</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Full-Width Capability Ledger (NOT cards) */}
          <div className="mt-12 divide-y divide-white/10 border-b border-white/10">
            {SERVICES_LEDGER.map((svc) => (
              <div
                key={svc.code}
                className="group py-8 sm:py-10 transition-colors hover:bg-white/[0.02]"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                  {/* Left Column: Number & Code */}
                  <div className="flex items-baseline gap-4 lg:col-span-2 font-mono">
                    <span className="text-3xl font-bold text-[#d6a15c] sm:text-4xl">
                      {svc.num}
                    </span>
                    <span className="text-xs text-slate-500 uppercase tracking-widest">
                      {svc.code}
                    </span>
                  </div>

                  {/* Center Column: Core Content */}
                  <div className="lg:col-span-7">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#ebd0a3] transition-colors sm:text-2xl">
                      {svc.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs font-medium text-[#d6a15c]">
                      {svc.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {svc.description}
                    </p>
                  </div>

                  {/* Right Column: Deliverables & Action */}
                  <div className="flex flex-col justify-between gap-4 border-t border-white/5 pt-4 lg:col-span-3 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-8 lg:pt-0">
                    <div>
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Key Deliverables
                      </p>
                      <p className="mt-1 font-mono text-xs text-slate-300">
                        {svc.deliverables}
                      </p>
                    </div>

                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#d6a15c] uppercase transition-colors hover:text-white"
                    >
                      <span>Service Architecture</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Delivery Methodology: Horizontal Process Ribbon */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Engagement Framework</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Predictable, milestone-governed project delivery.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              We eliminate enterprise project risk through our four-phase implementation discipline, ensuring transparent scoping, technical validation, and lasting internal team handover.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_STEPS.map((s, idx) => (
              <div
                key={s.step}
                className={`relative py-8 sm:py-10 ${
                  idx > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
                } ${idx % 2 === 1 ? "sm:border-l sm:border-white/10 sm:pl-8 lg:border-l-0 lg:pl-0" : ""} pr-6`}
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="text-2xl font-bold text-[#d6a15c]">
                    {s.step}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    {s.phase}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {s.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IAM Academy & Selar Storefront Feature with Photographic Backdrop */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        {/* Photographic Background Layer */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/academy-hero.jpg"
            alt="IAM Academy Training Background"
            fill
            className="object-cover object-center opacity-25 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/95 to-[#030712]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Left Column: Educational Manifesto & Bookstore */}
            <div className="space-y-8 lg:col-span-5">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
                  <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
                  <span>The IAM Academy</span>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                  Learn IAM. <br />
                  Practise with purpose. <br />
                  Build capability.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-slate-300">
                  Most cybersecurity certifications focus on rote memorization. The IAM Academy focuses on production-ready engineering: configuring real cloud tenants, debugging SAML assertions, automating SCIM flows, and hardening privileged access.
                </p>
              </div>

              {/* Selar Bookstore Callout Box */}
              <div className="border border-[#d6a15c]/40 bg-[#07101f]/90 p-8 shadow-2xl backdrop-blur-md">
                <span className="font-mono text-xs font-bold tracking-widest text-[#d6a15c] uppercase">
                  Official Publications &amp; Guides
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">
                  Authored IAM Books &amp; Study Resources
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Written by Chiemezie Uzoma. Explore practical reference guides, engineering runbooks, and certification preparation playbooks on our official Selar storefront.
                </p>
                <div className="mt-6">
                  <a
                    href="https://selar.com/m/chiemezie-uzoma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#d6a15c] px-6 py-3 font-mono text-xs font-bold tracking-wider text-[#030712] uppercase transition-all hover:bg-[#e4b26f]"
                  >
                    <span>Visit Store on Selar</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Progressive Pathway Matrix (Tabular structure) */}
            <div className="lg:col-span-7">
              <div className="border border-white/10 bg-[#07101f]/80 backdrop-blur-md">
                <div className="border-b border-white/10 px-6 py-4 bg-white/[0.02]">
                  <p className="font-mono text-xs font-bold tracking-widest text-[#d6a15c] uppercase">
                    Career Curriculum Matrix // 6 Progressive Tiers
                  </p>
                </div>

                <div className="divide-y divide-white/10">
                  {ACADEMY_PATHWAYS_MATRIX.map((tier) => (
                    <div key={tier.pathway} className="p-6 transition-colors hover:bg-white/[0.02]">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h4 className="text-lg font-bold text-white">
                          {tier.pathway}
                        </h4>
                        <span className="font-mono text-xs font-semibold text-[#d6a15c]">
                          {tier.level}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Target Audience: {tier.audience}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-300 border-t border-white/5 pt-3">
                        <strong className="text-white">Curriculum Focus:</strong> {tier.core}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 p-6 bg-white/[0.02] flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">
                    Live Cohorts &bull; 1-on-1 Mentorship &bull; Real Enterprise Labs
                  </span>
                  <Link
                    href="/academy"
                    className="font-mono text-xs font-bold text-[#d6a15c] uppercase hover:underline"
                  >
                    View Syllabus &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Executive Conversion Section */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <div className="flex items-center justify-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
            <span>Consultation &amp; Enquiries</span>
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Strengthen your enterprise identity security today.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Schedule an initial consultation with our senior identity specialists to assess your access posture, plan your migration, or enroll your technical team.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[52px] w-full items-center justify-center border border-[#d6a15c] bg-[#d6a15c] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#030712] shadow-xl transition-all hover:bg-[#e4b26f] sm:w-auto"
            >
              Talk to an IAM Specialist
            </Link>
            <Link
              href="/contact?type=individual_learning"
              className="inline-flex min-h-[52px] w-full items-center justify-center border border-white/20 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-200 transition-all hover:border-[#d6a15c] hover:text-white sm:w-auto"
            >
              Enquire About Academy Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
