import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPageData } from "@/lib/getPageData";

export const metadata: Metadata = {
  title: "Services & Solutions | Enterprise IAM Consulting",
  description:
    "Explore The IAM Lab's six consulting service pillars: IAM Advisory, IGA, PAM, Access Management/SSO, Cloud IAM, and Directory Modernisation.",
};

const SIX_SERVICES = [
  {
    id: "strategy",
    num: "01",
    name: "IAM Advisory & Strategy",
    tagline: "Clarity on identity maturity, risks, and prioritised transformation.",
    problem:
      "Enterprises struggle with overlapping identity products, unquantified privilege accumulation, and unclear compliance status across distributed cloud environments.",
    scope: [
      "Current-state identity architecture & security maturity audit",
      "Privilege creep analysis and attack surface mapping",
      "Vendor-neutral platform evaluation (Microsoft Entra ID, Okta, SailPoint, CyberArk)",
      "12-to-24-month prioritised roadmap with measurable governance milestones",
    ],
    outcomes:
      "Executive risk clarity, defensible security investment priorities, and an actionable path to verifiable Zero-Trust access.",
    platforms: ["NIST SP 800-207", "CIS Benchmarks", "ISO 27001", "SOX / NIS2"],
  },
  {
    id: "governance",
    num: "02",
    name: "Identity Governance & Administration (IGA)",
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
    id: "pam",
    num: "03",
    name: "Privileged Access Management (PAM)",
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
    id: "auth-sso",
    num: "04",
    name: "Access Management & SSO / MFA",
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
    platforms: ["Microsoft Entra ID", "Okta Workforce", "Ping Identity", "FIDO2 / WebAuthn"],
  },
  {
    id: "cloud-iam",
    num: "05",
    name: "Cloud IAM & Entitlement Governance",
    tagline: "Secure identities across multi-cloud infrastructure (AWS, Azure, GCP).",
    problem:
      "Cloud permissions are excessively permissive by default. Over-privileged IAM roles and unmonitored service accounts create critical breach pathways.",
    scope: [
      "Cloud Infrastructure Entitlement Management (CIEM) posture audits",
      "Cross-account trust boundary definition and role least-privileging",
      "Workload identity federation and short-lived credential architecture",
      "Automated drift detection and unused permission pruning",
    ],
    outcomes:
      "Elimination of excessive cloud permissions, auditable machine identities, and unified governance across hybrid clouds.",
    platforms: ["AWS IAM", "Azure RBAC / Entra Workload ID", "Google Cloud IAM", "Terraform"],
  },
  {
    id: "directory",
    num: "06",
    name: "Directory Modernisation & Lifecycle Engineering",
    tagline: "Active Directory hygiene, SCIM 2.0 automation, and technical implementation.",
    problem:
      "Legacy Active Directory forests create technical debt, while manual joiner-mover-leaver processes cause operational delays and departed staff lingering access.",
    scope: [
      "Hybrid directory synchronization, forest consolidation, and cleanup",
      "HR-driven user lifecycle automation (Workday, SuccessFactors, SAP)",
      "Custom SCIM 2.0 connector development for enterprise SaaS tools",
      "PowerShell automation, API integration, and operational runbook handovers",
    ],
    outcomes:
      "Immediate Day-1 productivity for new hires, instantaneous revocation upon departure, and modern directory health.",
    platforms: ["Active Directory", "Microsoft Entra Connect", "SCIM 2.0", "Workday", "PowerShell"],
  },
] as const;

const WORKFLOW = [
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

export default async function ServicesPage() {
  const pageData = await getPageData("services");

  return (
    <>
      {/* 1. Photographic Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1424] py-24 sm:py-32 lg:py-36">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/brand/security-infrastructure.jpg"
            alt="Enterprise technology and secure identity infrastructure"
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
                Enterprise Capabilities
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {pageData?.hero_headline || "Architectural Rigour. Zero-Trust Certainty."}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {pageData?.hero_subheadline ||
                "Six specialised consulting service pillars engineered to eliminate standing privileges, streamline identity lifecycles, and maintain continuous regulatory audit-readiness."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Distinct Editorial Service Sections */}
      <section className="border-b border-slate-200 bg-[#F7F6F2] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 space-y-20">
          {SIX_SERVICES.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="border border-slate-200 bg-[#FFFFFF] p-8 sm:p-12 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <span className="font-mono text-xs font-bold text-[#D89A43]">
                    SERVICE PILLAR // {s.num}
                  </span>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#0B1424] sm:text-3xl">
                    {s.name}
                  </h2>
                </div>
                <Link
                  href={`/contact?type=enterprise_consulting&service=${s.id}`}
                  className="inline-flex items-center justify-center bg-[#0B1424] px-5 py-2.5 text-xs font-bold text-white uppercase hover:bg-[#14243B]"
                >
                  Engage on this Pillar &rarr;
                </Link>
              </div>

              <p className="mt-6 text-base font-medium text-slate-800">
                {s.tagline}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Problem & Outcomes */}
                <div className="space-y-6 lg:col-span-5">
                  <div>
                    <span className="font-mono text-xs font-semibold text-rose-700 uppercase">
                      The Business Challenge
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {s.problem}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-semibold text-emerald-800 uppercase">
                      Expected Business Outcomes
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {s.outcomes}
                    </p>
                  </div>
                </div>

                {/* Scope & Platforms */}
                <div className="space-y-6 border-t border-slate-200 pt-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#0B1424] uppercase">
                      Scope of Advisory &amp; Engineering
                    </span>
                    <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
                      {s.scope.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-[#D89A43]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-semibold text-slate-500 uppercase">
                      Supported Platforms &amp; Standards
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="border border-slate-200 bg-[#F7F6F2] px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 4-Stage Commercial Delivery Protocol */}
      <section className="border-b border-white/10 bg-[#0B1424] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D89A43]" aria-hidden="true" />
              <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#D89A43] uppercase">
                Consulting Protocol
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Structured engagement from discovery to sign-off.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Our structured consulting workflow ensures absolute transparency from exploratory discussions to operational sign-off.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map((w, idx) => (
              <div
                key={w.step}
                className={`py-8 sm:py-10 ${
                  idx > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
                } pr-6`}
              >
                <span className="font-mono text-xs font-bold text-[#D89A43] uppercase">
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

      {/* 4. Section 3.7 Notice of Future Capability */}
      <section className="border-b border-white/10 bg-[#14243B] py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="border border-white/10 bg-[#0B1424] p-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#D89A43]" />
              <p className="font-mono text-xs font-semibold tracking-wider text-[#D89A43] uppercase">
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
      <section className="border-b border-white/10 bg-[#0B1424] py-24 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Discuss your IAM initiative with an expert
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Tell us about your active projects, compliance deadlines, or infrastructure modernization goals. We will arrange a focused technical discussion.
          </p>
          <div className="mt-8">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[50px] items-center justify-center bg-[#D89A43] px-8 py-3.5 text-sm font-bold tracking-wider text-[#0B1424] uppercase hover:bg-[#e4a856]"
            >
              Request a Consultation &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
