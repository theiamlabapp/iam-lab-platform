import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services & Solutions | Enterprise IAM Consulting",
  description:
    "Explore The IAM Lab's 6 core identity services: IAM Strategy, IGA, Lifecycle Automation, Modern Authentication/SSO, PAM, and Implementation Support.",
};

const SERVICES = [
  {
    id: "strategy",
    num: "01",
    code: "SVC-STRAT",
    title: "IAM Strategy, Assessment & Advisory",
    tagline: "Clarity on identity maturity, risks, and prioritised transformation.",
    problem:
      "Enterprises struggle with overlapping identity products, unquantified privilege accumulation, and unclear compliance status across distributed cloud environments.",
    scope: [
      "Current-state identity architecture & security maturity audit",
      "Privilege creep analysis and attack surface mapping",
      "Vendor-neutral platform evaluation (Entra ID, Okta, SailPoint, CyberArk)",
      "12-to-24-month prioritised roadmap with measurable governance milestones",
    ],
    outcomes:
      "Executive risk clarity, defensible security investment priorities, and an actionable path to verifiable Zero-Trust access.",
    platforms: ["Enterprise Directories", "Zero-Trust Frameworks", "NIST SP 800-207", "CIS Benchmarks"],
  },
  {
    id: "governance",
    num: "02",
    code: "SVC-IGA",
    title: "Identity Governance & Access Management (IGA)",
    tagline: "Verifiable access certification, role design, and compliance assurance.",
    problem:
      "Manual spreadsheet reviews and uncoordinated email approvals create audit failures, unmonitored entitlements, and segregation-of-duties violations.",
    scope: [
      "Access request workflows and multi-tier approval matrix design",
      "Automated periodic access certification campaigns",
      "Role mining, business role engineering, and least-privilege definition",
      "Segregation of Duties (SoD) enforcement and toxic combination monitoring",
    ],
    outcomes:
      "Audit-ready compliance reporting, dramatic reduction in excess entitlements, and verifiable governance across all enterprise applications.",
    platforms: ["SailPoint IdentityIQ / IdentityNow", "Microsoft Entra ID Governance", "Saviynt", "Okta IGA"],
  },
  {
    id: "lifecycle",
    num: "03",
    code: "SVC-JML",
    title: "Identity Lifecycle & Provisioning Automation",
    tagline: "Eliminate manual joiner delay and lingering leaver exposure.",
    problem:
      "Slow employee onboarding creates days of lost productivity, while manual deprovisioning risks departed staff retaining sensitive access indefinitely.",
    scope: [
      "HR-driven identity synchronization (Workday, SuccessFactors, SAP)",
      "Automated Joiner, Mover, and Leaver (JML) state transitions",
      "SCIM 2.0 connector development for bespoke enterprise cloud applications",
      "Orphaned account discovery, directory hygiene, and birthright access rules",
    ],
    outcomes:
      "Productive access on Day 1 for all new hires; immediate, verifiable access revocation upon employee termination.",
    platforms: ["Workday", "Microsoft Entra ID", "SCIM 2.0", "Active Directory", "PowerShell"],
  },
  {
    id: "auth-sso",
    num: "04",
    code: "SVC-AUTH",
    title: "Authentication, SSO & Access Modernisation",
    tagline: "Frictionless, phishing-resistant access across the modern enterprise.",
    problem:
      "Multiple disparate passwords, inconsistent MFA coverage, and legacy authentication protocols leave corporate accounts open to adversary-in-the-middle attacks.",
    scope: [
      "Single Sign-On (SSO) federation via SAML 2.0 and OpenID Connect (OIDC)",
      "Phishing-resistant Multi-Factor Authentication (MFA) and FIDO2 keys",
      "Adaptive Zero-Trust Conditional Access policies based on device, risk, and IP",
      "Legacy protocol deprecation and passwordless authentication rollout",
    ],
    outcomes:
      "Unified user sign-in experience paired with robust defense against credential stuffing and session hijacking.",
    platforms: ["Microsoft Entra ID", "Okta", "Ping Identity", "FIDO2 / WebAuthn", "Kerberos / LDAP"],
  },
  {
    id: "pam",
    num: "05",
    code: "SVC-PAM",
    title: "Privileged Access Management (PAM)",
    tagline: "Lock down critical keys, eliminate permanent admins, and audit every root session.",
    problem:
      "Unmanaged root credentials, shared domain admin passwords, and unmonitored infrastructure access invite lateral movement and ransomware.",
    scope: [
      "Privileged credential discovery, secure vaulting, and automatic rotation",
      "Session isolation, live proxying, and immutable keystroke audit recording",
      "Just-in-Time (JIT) least-privilege elevation via Privileged Identity Management",
      "Emergency break-glass procedure design and disaster recovery validation",
    ],
    outcomes:
      "Zero standing admin privileges across production infrastructure and comprehensive forensic logs for incident response and compliance.",
    platforms: ["CyberArk", "BeyondTrust", "Microsoft Entra PIM", "Delinea", "HashiCorp Vault"],
  },
  {
    id: "implementation",
    num: "06",
    code: "SVC-ENG",
    title: "IAM Implementation & Technical Support",
    tagline: "Experienced platform engineering, migration, and ongoing governance care.",
    problem:
      "Internal IT and security teams often lack the dedicated bandwidth or specialized platform knowledge to deliver complex IAM migrations on schedule.",
    scope: [
      "Turnkey platform deployment, tenant configuration, and hybrid connectors",
      "Active Directory to cloud directory migration and synchronization",
      "Custom connector and PowerShell / API integration development",
      "Operational runbooks, admin handovers, and post-go-live hypercare support",
    ],
    outcomes:
      "De-risked, on-time project execution with fully documented operating procedures and an upskilled internal engineering team.",
    platforms: ["Hybrid Cloud", "Enterprise Directories", "REST APIs", "PowerShell", "Terraform"],
  },
] as const;

const WORKFLOW_STEPS = [
  {
    step: "01",
    phase: "Step 01 // Discovery",
    title: "Discovery & Needs Assessment",
    description:
      "A focused consultation to evaluate your current identity challenges, operational friction, compliance requirements, and business priorities.",
  },
  {
    step: "02",
    phase: "Step 02 // Scoping",
    title: "Scope & Requirements",
    description:
      "We produce an agreed scope document detailing specific system boundaries, user populations, integration endpoints, and target criteria.",
  },
  {
    step: "03",
    phase: "Step 03 // Architecture",
    title: "Formal Proposal & Design",
    description:
      "We provide a clear architecture blueprint, milestone schedule, statement of work, and transparent commercial investment structure.",
  },
  {
    step: "04",
    phase: "Step 04 // Handover",
    title: "Delivery & Knowledge Transfer",
    description:
      "Hands-on execution, rigorous staging validation, production rollout, comprehensive runbook delivery, and staff enablement.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      {/* 1. Cinematic Hero with Photographic Layer */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#030712] py-24 sm:py-32 lg:py-40">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src="/brand/hero-bg.jpg"
            alt="Enterprise IAM Architecture"
            fill
            priority
            className="object-cover object-center opacity-25 mix-blend-screen scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/92 to-[#030712]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.28em] text-[#d6a15c] uppercase">
              <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
              <span>Enterprise Services // Practice Areas</span>
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl lg:leading-[1.08]">
              End-to-end identity security, <br />
              <span className="bg-gradient-to-r from-[#ebd0a3] via-[#d6a15c] to-amber-200 bg-clip-text text-transparent">
                governance and operational engineering.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
              We help enterprises design, deploy, and govern identity architectures that reduce exposure, eliminate audit findings, and keep everyday business moving forward.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Detailed Architectural Service Blueprint Ledgers (NOT repetitive cards) */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Pillar Specifications</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Six specialized pillars of IAM expertise.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Our service catalogue addresses every stage of the identity lifecycle, from strategic assessments to deep platform engineering.
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                id={svc.id}
                className="border border-white/10 bg-[#07101f] shadow-2xl"
              >
                {/* Blueprint Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 p-6 sm:p-8 bg-white/[0.02] gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-3xl font-bold text-[#d6a15c]">
                      {svc.num}
                    </span>
                    <div>
                      <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block">
                        {svc.code}
                      </span>
                      <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        {svc.title}
                      </h2>
                    </div>
                  </div>

                  <Link
                    href={`/contact?type=enterprise_consulting&service=${svc.id}`}
                    className="inline-flex items-center justify-center border border-[#d6a15c] bg-[#d6a15c] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#030712] transition-all hover:bg-[#e4b26f] shrink-0"
                  >
                    Request Consultation
                  </Link>
                </div>

                {/* Blueprint Content Grid */}
                <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
                  {/* Left Column: Problem & Outcomes */}
                  <div className="space-y-6 lg:col-span-5">
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                        Operational Problem Solved
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {svc.problem}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                        Target Commercial Outcome
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {svc.outcomes}
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#d6a15c]">
                        Platform Ecosystem
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {svc.platforms.map((p) => (
                          <span
                            key={p}
                            className="border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-300"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Engineering Scope & Deliverables */}
                  <div className="border-t border-white/10 pt-6 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-10 lg:pt-0 lg:col-span-7">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#d6a15c]">
                      Scope of Work &amp; Deliverables
                    </p>
                    <ul className="mt-4 space-y-4">
                      {svc.scope.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="font-mono text-xs font-bold text-[#d6a15c] shrink-0 mt-0.5">
                            0{idx + 1} {"//"}
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 4-Step Commercial Delivery Workflow */}
      <section className="relative border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
              <span className="h-px w-6 bg-[#d6a15c]" aria-hidden="true" />
              <span>Engagement Protocol</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              How we engage and deliver.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Our structured consulting workflow ensures absolute transparency from initial exploratory discussions to final operational sign-off.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((w, idx) => (
              <div
                key={w.step}
                className={`py-8 sm:py-10 ${
                  idx > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
                } pr-6`}
              >
                <span className="font-mono text-xs font-bold text-[#d6a15c] uppercase">
                  {w.phase}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">
                  {w.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section 3.7 Future Capability Notice */}
      <section className="relative border-b border-white/10 bg-[#050a14] py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border border-white/10 bg-[#07101f] p-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#d6a15c]" />
              <p className="font-mono text-xs font-semibold tracking-wider text-[#d6a15c] uppercase">
                Notice of Future Capability // Section 3.7
              </p>
            </div>
            <h3 className="mt-3 text-lg font-bold text-white">
              IAM Talent Placement &amp; Staff Augmentation
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              The IAM Lab is actively building a specialized talent pipeline of vetted, practitioner-grade IAM professionals for enterprise client placement. This capability is currently under development. Our active commercial focus remains advisory, identity architecture, technical delivery, and corporate enablement.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Consultation CTA Banner */}
      <section className="relative border-b border-white/10 bg-[#030712] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="flex items-center justify-center gap-3 font-mono text-xs font-semibold tracking-[0.25em] text-[#d6a15c] uppercase">
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
            <span>Consultation</span>
            <span className="h-px w-8 bg-[#d6a15c]" aria-hidden="true" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl">
            Discuss your IAM initiative with an expert
          </h2>

          <p className="mt-6 text-base text-slate-300 sm:text-lg">
            Tell us about your active projects, compliance deadlines, or infrastructure modernization goals. We will arrange a focused technical discussion.
          </p>

          <div className="mt-10">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[52px] items-center justify-center border border-[#d6a15c] bg-[#d6a15c] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#030712] shadow-xl transition-all hover:bg-[#e4b26f]"
            >
              Request a Consultation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
