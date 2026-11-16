import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Services & Solutions | The IAM Lab",
  description:
    "Enterprise Identity and Access Management consulting, IGA, PAM, cloud identity, SSO, and hybrid directory architecture delivered by The IAM Lab.",
  alternates: {
    canonical: "/services",
  },
};

const SERVICE_PILLARS = [
  {
    id: "iga",
    number: "01",
    title: "Identity Governance & Administration (IGA)",
    tagline: "Govern the entire identity lifecycle from Joiner to Leaver with automated compliance.",
    challenge:
      "Rapid employee turnover, cross-departmental transfers, and disparate SaaS systems create rampant entitlement bloat, orphaned accounts, and failed regulatory audits.",
    capabilities: [
      "Automated Joiner-Mover-Leaver (JML) provisioning workflows",
      "Periodic access certification & entitlement recertification campaigns",
      "Role-Based Access Control (RBAC) & Attribute-Based Access Control (ABAC) design",
      "Segregation of Duties (SoD) policy enforcement and violation detection",
      "Audit-ready compliance reporting for ISO 27001, SOC 2, and internal audit",
    ],
    outcomes:
      "Eliminates 90%+ of manual onboarding delay, stops account abandonment on day one of departure, and produces defensible compliance records.",
    stakeholders: "CISOs, Information Security Managers, Compliance & Risk Officers, Enterprise Auditors",
    technologies: "SailPoint, Saviynt, Microsoft Entra ID Governance, SCIM, REST Connectors",
  },
  {
    id: "pam",
    number: "02",
    title: "Privileged Access Management (PAM)",
    tagline: "Secure high-value administrative accounts, vault credentials, and enforce zero standing privileges.",
    challenge:
      "Admin credentials, hardcoded passwords, and unmonitored privileged sessions remain the primary attack vector for ransomware, insider threats, and lateral network traversal.",
    capabilities: [
      "Credential vaulting, automated password rotation, and SSH key management",
      "Just-In-Time (JIT) privilege elevation and ephemeral session brokering",
      "Real-time privileged session monitoring, keystroke logging, and session termination",
      "Hardcoded credential and service account discovery across CI/CD and servers",
      "Administrative blast-radius reduction through granular least-privilege policies",
    ],
    outcomes:
      "Removes standing administrator rights across servers and cloud consoles, restricts lateral movement, and delivers tamper-evident audit recordings.",
    stakeholders: "Infrastructure Engineers, Cloud SecOps, Incident Response Teams, System Administrators",
    technologies: "CyberArk, BeyondTrust, HashiCorp Vault, Delinea, Microsoft Entra PIM",
  },
  {
    id: "sso-auth",
    number: "03",
    title: "Access Management & Single Sign-On (SSO / MFA)",
    tagline: "Deliver seamless, phishing-resistant access across every enterprise application.",
    challenge:
      "Fragmented logins, vulnerable SMS-based MFA, password reuse, and high IT helpdesk ticket volumes frustrate employees while leaving organizations exposed to phishing.",
    capabilities: [
      "Enterprise Single Sign-On (SSO) federation via SAML 2.0, OIDC, and OAuth 2.0",
      "Phishing-resistant Multi-Factor Authentication (FIDO2, WebAuthn, Passkeys)",
      "Adaptive & Risk-Based Conditional Access policies (device health, IP, geo-velocity)",
      "Automated user provisioning via SCIM across SaaS directories",
      "Self-service passwordless authentication and account recovery workflows",
    ],
    outcomes:
      "Unifies application access into a single trusted portal, slashes credential-related helpdesk calls by over 75%, and defeats adversary-in-the-middle phishing attacks.",
    stakeholders: "IT Operations Leaders, Digital Workplace Directors, End-User Computing Teams",
    technologies: "Microsoft Entra ID, Okta, Ping Identity, Duo Security, FIDO2 / Passkeys",
  },
  {
    id: "cloud-iam",
    number: "04",
    title: "Cloud IAM & Multi-Cloud Identity Security",
    tagline: "Right-size effective permissions and secure machine identities across AWS, Azure, and GCP.",
    challenge:
      "Cloud environments suffer from massive permission creep, over-privileged IAM roles, unmanaged workload identities, and inconsistent identity controls across multi-cloud estates.",
    capabilities: [
      "Cloud Infrastructure Entitlement Management (CIEM) and privilege right-sizing",
      "Workload and machine identity federation (OIDC without long-lived static secrets)",
      "Cross-account and cross-subscription role trust boundary engineering",
      "Infrastructure-as-Code (IaC) identity policy validation and automated linting",
      "Multi-cloud identity governance aligned with cloud security benchmark baselines",
    ],
    outcomes:
      "Achieves verified least privilege across cloud platforms, eliminates long-lived access keys, and provides continuous visibility into active cloud permissions.",
    stakeholders: "Cloud Architects, DevSecOps Engineers, Platform Teams, Cloud Security Leads",
    technologies: "AWS IAM / IAM Identity Center, Azure RBAC, Google Cloud IAM, Terraform, OpenTofu",
  },
  {
    id: "directory-modernization",
    number: "05",
    title: "Directory Services & Hybrid Identity Architecture",
    tagline: "Modernize legacy Active Directory and build resilient, secure hybrid synchronization.",
    challenge:
      "Complex on-premises Active Directory forests with legacy trusts, unmanaged security groups, and fragile synchronization tools pose immense operational and security vulnerabilities.",
    capabilities: [
      "Active Directory security health assessments and attack-path analysis",
      "Microsoft Entra ID Cloud Sync and Hybrid Connect architecture optimization",
      "Domain consolidation, forest restructuring, and stale object remediation",
      "Modernization of legacy LDAP and Kerberos authentication to modern claims",
      "Secure hybrid directory transition planning without disrupting business operations",
    ],
    outcomes:
      "Eliminates vulnerable legacy directory configurations, shrinks the on-premises attack surface, and provides a stable hybrid bridge to cloud-first operations.",
    stakeholders: "Active Directory Administrators, Hybrid Infrastructure Teams, Enterprise Architects",
    technologies: "Active Directory Domain Services (AD DS), Entra Connect, Azure AD Cloud Sync, Kerberos, LDAP",
  },
  {
    id: "advisory-strategy",
    number: "06",
    title: "IAM Advisory, Strategy & Assessment",
    tagline: "Build a pragmatic, risk-based identity roadmap aligned with executive business priorities.",
    challenge:
      "Organizations frequently invest in costly identity tooling without a coherent target architecture, clear governance ownership, or alignment with regulatory mandates.",
    capabilities: [
      "Comprehensive IAM maturity assessments benchmarked against NIST CSF and CIS Controls",
      "Vendor-neutral RFP evaluation, tooling selection, and architectural design reviews",
      "Regulatory audit readiness for ISO 27001, SOC 2 Type II, PCI-DSS, and GDPR",
      "Target Operating Model (TOM) design, identity team charter, and governance RACI definitions",
      "Executive roadmaps balancing immediate tactical risk reduction with multi-year capability builds",
    ],
    outcomes:
      "Prevents misallocated technology spending, provides board-level clarity on identity maturity, and establishes a sustainable foundation for long-term cyber resilience.",
    stakeholders: "CISOs, CIOs, Chief Risk Officers, Technology Steering Committees, Board Directors",
    technologies: "NIST Cybersecurity Framework, ISO/IEC 27001:2022, CIS Critical Security Controls",
  },
] as const;

const DELIVERY_PHASES = [
  {
    phase: "01",
    name: "Discover & Assess",
    duration: "Weeks 1 – 3",
    description:
      "Deep-dive review of existing directory structures, application catalogues, administrative accounts, operational pain points, and compliance mandates. We pinpoint gaps between your current state and target security posture.",
    deliverables: ["Current-State IAM Assessment", "Privilege & Identity Risk Heatmap", "Immediate Tactical Remediation List"],
  },
  {
    phase: "02",
    name: "Design & Strategy",
    duration: "Weeks 3 – 6",
    description:
      "Architectural blueprints, vendor-neutral technology evaluation, and detailed governance policies tailored to your operational reality. We define role models, authentication flows, and lifecycle stages before engineering begins.",
    deliverables: ["Target Identity Architecture Blueprint", "Vendor & Tooling Evaluation Matrix", "Role & Policy Design Document"],
  },
  {
    phase: "03",
    name: "Implement & Integrate",
    duration: "Weeks 6 – 12+",
    description:
      "Hands-on engineering, directory connector deployment, SSO/MFA configuration, and lifecycle workflow automation. Built iteratively in staged environments with rigorous test verification at every gate.",
    deliverables: ["Configured Production Environment", "Automated JML Workflows", "Integration Test & Security Verification Sign-off"],
  },
  {
    phase: "04",
    name: "Operationalize & Enable",
    duration: "Continuous",
    description:
      "Comprehensive knowledge transfer, administrator runbooks, operational training, and ongoing governance cadence to ensure your internal engineering and security teams own the system with confidence.",
    deliverables: ["Standard Operating Procedures (SOPs)", "Staff Enablement Sessions", "Continuous Governance Review Cadence"],
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070c14] text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-white/[0.06] py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                ENTERPRISE IDENTITY & ACCESS MANAGEMENT
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Secure architectures. <br />
                Governed lifecycles. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-100 to-amber-200">
                  Simplified access.
                </span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
                The IAM Lab provides specialized consulting, identity governance, access security, and hybrid directory architecture for organizations seeking robust cyber defenses, friction-free operations, and unyielding audit compliance.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact?type=consulting"
                  className="rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  Schedule a Technical Consultation
                </Link>
                <a
                  href="#pillars"
                  className="rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
                >
                  Explore the 6 Pillars
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-4">
                <div>
                  <p className="font-mono text-2xl font-bold text-sky-400">6</p>
                  <p className="text-xs text-slate-400">Specialized Pillars</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-amber-400">100%</p>
                  <p className="text-xs text-slate-400">Vendor-Neutral Focus</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-white">4-Stage</p>
                  <p className="text-xs text-slate-400">Delivery Framework</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-emerald-400">Production</p>
                  <p className="text-xs text-slate-400">Engineering Runbooks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 CORE PILLARS SECTION */}
        <section id="pillars" className="scroll-mt-20 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Core Service Pillars"
              title="Architected for enterprise security and operational simplicity."
              description="Every organization's identity estate is unique, but the challenges of sprawl, privilege accumulation, and compliance failure are universal. We deliver focused expertise across the full spectrum of IAM disciplines."
              theme="dark"
            />

            <div className="mt-16 space-y-12">
              {SERVICE_PILLARS.map((pillar) => (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition hover:border-sky-500/40 sm:p-8 lg:p-10"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column: Number, Title, Description */}
                    <div className="lg:col-span-5">
                      <span className="font-mono text-sm font-semibold tracking-wider text-sky-400">
                        PILLAR {pillar.number}
                      </span>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm font-medium text-amber-300/90">
                        {pillar.tagline}
                      </p>

                      <div className="mt-6 rounded-lg border border-slate-800/80 bg-slate-950/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          The Enterprise Challenge
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                          {pillar.challenge}
                        </p>
                      </div>

                      <div className="mt-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Primary Stakeholders
                        </p>
                        <p className="mt-1 text-xs text-slate-300">
                          {pillar.stakeholders}
                        </p>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Technologies & Standards Aligned
                        </p>
                        <p className="mt-1 font-mono text-xs text-sky-300/90">
                          {pillar.technologies}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Capabilities & Measurable Outcomes */}
                    <div className="flex flex-col justify-between border-t border-slate-800 pt-6 lg:col-span-7 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                          Key Capabilities Delivered
                        </h4>
                        <ul className="mt-4 space-y-3">
                          {pillar.capabilities.map((cap, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                                <svg
                                  className="h-2.5 w-2.5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                              <span className="text-sm leading-relaxed text-slate-200">
                                {cap}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Measurable Security & Business Outcomes
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-200">
                          {pillar.outcomes}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-STAGE DELIVERY PROCESS */}
        <section className="border-t border-white/[0.06] bg-[#05090f] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Our Engineering Methodology"
              title="A structured, predictable 4-stage delivery process."
              description="We avoid open-ended, chaotic transformations. Our consulting engagements follow a disciplined engineering framework that delivers transparent milestones, continuous verification, and complete client ownership."
              theme="dark"
            />

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {DELIVERY_PHASES.map((phase) => (
                <div
                  key={phase.phase}
                  className="relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/40 p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-sky-400">
                        {phase.phase}
                      </span>
                      <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                        {phase.duration}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">
                      {phase.name}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-slate-300">
                      {phase.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-800/80 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Key Deliverables
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {phase.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="h-1 w-1 rounded-full bg-sky-400" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FUTURE CAPABILITIES & INNOVATION HORIZON (SECTION 3.7 OF BRIEF) */}
        <section className="border-t border-white/[0.06] py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-950 p-8 lg:p-12">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 font-mono text-xs font-semibold text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  SECTION 3.7 — INNOVATION HORIZON
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  Emerging Identity Architectures Under Active Research
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  In addition to our core production pillars, The IAM Lab maintains active research into evolving standards. We evaluate emerging identity paradigms with engineering rigor, distinguishing proven enterprise solutions from speculative hype.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-5">
                  <h4 className="text-sm font-semibold text-white">
                    Decentralized Identity (DID) & Verifiable Credentials
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Evaluating W3C Verifiable Credentials and privacy-preserving zero-knowledge proofs for B2B supplier and contractor trust federation.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-5">
                  <h4 className="text-sm font-semibold text-white">
                    AI-Augmented Access Analytics
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Exploring machine-learning models for anomaly detection, peer-group entitlement clustering, and automated least-privilege role recommendations.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-5">
                  <h4 className="text-sm font-semibold text-white">
                    Continuous Adaptive Trust (CAEP / RISC)
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Implementing OpenID Shared Signals and Events (SSE) to terminate active sessions dynamically across SaaS apps upon risk escalation.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs text-slate-400 italic">
                * Note on technical pragmatism: Research initiatives are evaluated as evolving advisory capabilities and are recommended only when client risk posture and infrastructure maturity justify adoption.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="border-t border-white/[0.06] bg-gradient-to-b from-[#070c14] to-[#04070c] py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to fortify your organization&apos;s identity perimeter?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
              Speak directly with an enterprise IAM consultant to evaluate your current identity posture, audit risks, and architectural roadmap.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=consulting"
                className="rounded-lg bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                Schedule an IAM Architecture Review
              </Link>
              <Link
                href="/about"
                className="rounded-lg border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Learn About Our Firm
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
