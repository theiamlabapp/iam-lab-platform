import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Services & Solutions | Enterprise IAM Consulting",
  description:
    "Explore The IAM Lab's 6 core identity services: IAM Strategy, IGA, Lifecycle Automation, Modern Authentication/SSO, PAM, and Implementation Support.",
};

const SERVICES = [
  {
    id: "strategy",
    num: "01",
    title: "IAM Strategy, Assessment & Advisory",
    tagline: "Clarity on identity maturity, risks, and prioritised transformation.",
    problem:
      "Many enterprises struggle with overlapping identity tools, unquantified privilege risks, and unclear compliance status across cloud and legacy estates.",
    scope: [
      "Current-state identity architecture and maturity evaluation",
      "Privilege creep analysis and attack surface assessment",
      "Vendor-neutral architecture and technology selection guidance",
      "12-to-24-month prioritised roadmap with measurable governance milestones",
    ],
    outcomes:
      "Executive risk clarity, defensible security investment priorities, and a structured path to zero-trust access.",
    platforms: "Cross-platform architectural standards • Zero-Trust frameworks",
  },
  {
    id: "governance",
    num: "02",
    title: "Identity Governance & Access Management (IGA)",
    tagline: "Verifiable access certification, role design, and compliance assurance.",
    problem:
      "Spreadsheets and informal approval emails create audit failures, unmonitored entitlements, and segregation-of-duties violations.",
    scope: [
      "Access request and multi-tier approval workflow design",
      "Automated periodic access certification campaigns",
      "Role mining, business role engineering, and least-privilege definition",
      "Segregation of Duties (SoD) enforcement and toxic combination monitoring",
    ],
    outcomes:
      "Audit-ready compliance reporting, reduced excess privileges, and systematic governance across all business assets.",
    platforms: "SailPoint • Microsoft Entra ID Governance • Saviynt • Okta IGA",
  },
  {
    id: "lifecycle",
    num: "03",
    title: "Identity Lifecycle & Provisioning Automation",
    tagline: "Eliminate manual joiner delay and lingering leaver exposure.",
    problem:
      "Slow employee onboarding creates lost productivity, while manual deprovisioning risks departed staff retaining sensitive access indefinitely.",
    scope: [
      "HR-driven identity synchronization (Workday, SAP, SuccessFactors)",
      "Automated Joiner, Mover, and Leaver (JML) state transitions",
      "SCIM 2.0 connector development for bespoke enterprise SaaS apps",
      "Orphaned account discovery, directory hygiene, and birthright access rules",
    ],
    outcomes:
      "Productive access on Day 1 for new hires; immediate, verifiable access revocation upon employee termination.",
    platforms: "Microsoft Entra ID • Workday • Okta • SCIM 2.0 • Active Directory",
  },
  {
    id: "auth-sso",
    num: "04",
    title: "Authentication, SSO & Access Modernisation",
    tagline: "Frictionless, phishing-resistant access across the modern enterprise.",
    problem:
      "Multiple disparate passwords, inconsistent MFA coverage, and legacy authentication protocols leave corporate accounts open to credential theft.",
    scope: [
      "Single Sign-On (SSO) federation via SAML 2.0 and OpenID Connect (OIDC)",
      "Phishing-resistant Multi-Factor Authentication (MFA) and FIDO2 keys",
      "Adaptive Zero-Trust Conditional Access policies based on device, risk, and IP",
      "Legacy protocol deprecation and passwordless authentication deployment",
    ],
    outcomes:
      "A seamless user login experience paired with defense-in-depth protection against credential stuffing and session hijacking.",
    platforms: "Microsoft Entra ID • Okta • Ping Identity • FIDO2 / WebAuthn",
  },
  {
    id: "pam",
    num: "05",
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
      "Zero standing admin privileges across production infrastructure and comprehensive forensic logs for compliance and incident response.",
    platforms: "CyberArk • BeyondTrust • Microsoft Entra PIM • Delinea",
  },
  {
    id: "implementation",
    num: "06",
    title: "IAM Implementation & Technical Support",
    tagline: "Experienced platform engineering, migration, and ongoing governance care.",
    problem:
      "Internal IT and security teams often lack the dedicated bandwidth or specialized platform knowledge to deliver complex IAM migrations on schedule.",
    scope: [
      "Turnkey platform deployment, tenant configuration, and hybrid connectors",
      "Active Directory to cloud directory migration and synchronization",
      "Custom connector and PowerShell / API integration scripting",
      "Operational runbooks, admin handovers, and post-go-live hypercare support",
    ],
    outcomes:
      "De-risked, on-time project execution with fully documented operating procedures and an upskilled internal team.",
    platforms: "Hybrid Cloud • Enterprise Directories • REST APIs • PowerShell",
  },
] as const;

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "A focused consultation to evaluate your current identity challenges, operational friction, compliance requirements, and business priorities.",
  },
  {
    step: "02",
    title: "Scope & Requirements",
    description:
      "We produce an agreed scope document detailing specific system boundaries, user populations, integration endpoints, and target criteria.",
  },
  {
    step: "03",
    title: "Formal Proposal & Design",
    description:
      "We provide a clear architecture blueprint, milestone schedule, statement of work, and transparent commercial investment structure.",
  },
  {
    step: "04",
    title: "Delivery & Knowledge Transfer",
    description:
      "Hands-on execution, rigorous staging validation, production rollout, comprehensive runbook delivery, and staff enablement.",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      {/* 1. Services Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/15 via-blue-600/10 to-transparent blur-[120px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Enterprise Solutions
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              End-to-end identity security, governance and engineering.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              We help enterprises design, deploy, and govern identity architectures that reduce exposure, eliminate audit findings, and keep everyday business moving forward.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Detailed Service Pillars */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            theme="dark"
            eyebrow="Core Practice Areas"
            title="Six specialized pillars of IAM expertise"
            description="Our service catalogue addresses every stage of the identity lifecycle, from strategic assessments to deep platform engineering."
          />

          <div className="mt-14 space-y-10">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                id={svc.id}
                className="rounded-3xl border border-white/10 bg-[#07101f]/90 p-8 shadow-xl transition-all hover:border-amber-400/30 sm:p-10"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-3xl font-extrabold text-amber-400">
                      {svc.num}
                    </span>
                    <div>
                      <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        {svc.title}
                      </h2>
                      <p className="mt-1 text-sm text-amber-300/90">
                        {svc.tagline}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/contact?type=enterprise_consulting&service=${svc.id}`}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-semibold text-[#050a14] transition-all hover:bg-amber-300"
                  >
                    Request Consultation
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                  <div className="space-y-6 lg:col-span-5">
                    <div>
                      <h3 className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        The Challenge
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {svc.problem}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        Target Outcomes
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {svc.outcomes}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">
                        Key Platforms
                      </h3>
                      <p className="mt-2 font-mono text-xs text-slate-300">
                        {svc.platforms}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#030712]/60 p-6 lg:col-span-7">
                    <h3 className="font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
                      Engagement Scope &amp; Deliverables
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {svc.scope.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                          <span>{item}</span>
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
      <section className="relative border-t border-white/10 bg-[#030712] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            theme="dark"
            align="center"
            eyebrow="Commercial Workflow"
            title="How we engage and deliver"
            description="Our structured consulting workflow ensures absolute transparency from initial exploratory discussions to final operational sign-off."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((w) => (
              <div
                key={w.step}
                className="rounded-2xl border border-white/10 bg-[#07101f]/70 p-6"
              >
                <span className="inline-block rounded-lg bg-amber-400/10 px-3 py-1 font-mono text-xs font-bold text-amber-400">
                  Step {w.step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section 3.7 Future Capability Notice */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <p className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">
                Notice of Future Capability
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

      {/* 5. Consultation CTA */}
      <section className="relative border-t border-white/10 bg-gradient-to-b from-[#050a14] to-[#02050c] py-20 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Discuss your IAM initiative with an expert
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Tell us about your active projects, compliance deadlines, or infrastructure modernization goals. We will arrange a focused technical discussion.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-gradient-to-r from-[#d6a15c] to-[#e4b26f] px-8 py-3.5 text-sm font-semibold text-[#050a14] shadow-md transition-all hover:brightness-110"
            >
              Request a Consultation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
