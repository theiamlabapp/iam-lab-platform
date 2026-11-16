import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { SectionHeader } from "@/components/SectionHeader";

const CHALLENGE_POINTS = [
  {
    num: "01",
    tag: "Access Complexity",
    title: "Identity Sprawl & Cloud Growth",
    description:
      "As organisations adopt multi-cloud architectures and fragmented SaaS applications, tracking who holds access to what systems becomes opaque and difficult to verify.",
  },
  {
    num: "02",
    tag: "Privilege Creep",
    title: "Excessive & Stale Permissions",
    description:
      "Users accumulate unreviewed entitlements over time. Orphaned administrative accounts and stale service principals expand your attack surface and invite audit failures.",
  },
  {
    num: "03",
    tag: "Audit Risk",
    title: "Inconsistent Review & Approval Gaps",
    description:
      "Spreadsheet-driven access reviews and ad-hoc email sign-offs lack auditability, slowing down operations while leaving critical regulatory requirements unmet.",
  },
  {
    num: "04",
    tag: "Lifecycle Friction",
    title: "Manual Joiner-Mover-Leaver Latency",
    description:
      "Slow user onboarding hinders productivity, while delayed or partial deprovisioning upon employee departure leaves sensitive corporate data dangerously exposed.",
  },
] as const;

const SERVICE_HIGHLIGHTS = [
  {
    num: "01",
    title: "IAM Strategy, Assessment & Advisory",
    description:
      "Evaluate existing identity architecture, identify security gaps and privileged risks, and deliver an actionable, risk-prioritised roadmap aligned with your business goals.",
    href: "/services",
  },
  {
    num: "02",
    title: "Identity Governance & Access Management (IGA)",
    description:
      "Establish structured access request workflows, automated periodic certification campaigns, role mining, and verifiable segregation-of-duties (SoD) policies.",
    href: "/services",
  },
  {
    num: "03",
    title: "Identity Lifecycle & Provisioning Automation",
    description:
      "Implement end-to-end Joiner, Mover and Leaver automation connected to HR systems and cloud directories, ensuring prompt access activation and immediate revocation.",
    href: "/services",
  },
  {
    num: "04",
    title: "Authentication, SSO & Access Modernisation",
    description:
      "Modernise legacy sign-ins with robust Single Sign-On (SAML/OIDC), risk-based Multi-Factor Authentication (MFA), passwordless access, and Zero-Trust Conditional Access.",
    href: "/services",
  },
  {
    num: "05",
    title: "Privileged Access Management (PAM)",
    description:
      "Secure administrative credentials, implement session recording, vault critical keys, and establish Just-in-Time (JIT) least-privilege elevation for sensitive environments.",
    href: "/services",
  },
] as const;

const DELIVERY_PHASES = [
  {
    step: "01",
    title: "Discovery & Assessment",
    description:
      "We inspect your current identity footprint, directory structure, privileged accounts, and compliance obligations through focused technical interviews.",
  },
  {
    step: "02",
    title: "Scope & Requirements",
    description:
      "Together we define clear technical scope, governance boundaries, integration dependencies, and measurable target outcomes.",
  },
  {
    step: "03",
    title: "Architecture & Proposal",
    description:
      "We deliver a formal solution design, statement of work, milestone schedule, and transparent commercial structure tailored to your enterprise.",
  },
  {
    step: "04",
    title: "Delivery & Knowledge Transfer",
    description:
      "Hands-on implementation, validation testing, runbook documentation, and thorough upskilling of your internal engineering and operations team.",
  },
] as const;

const ACADEMY_PATHWAYS = [
  { name: "IAM Foundation", audience: "Career switchers & IT beginners", focus: "Core identity, directories, AAA, protocol basics" },
  { name: "IAM Analyst", audience: "IT support & early security roles", focus: "Access operations, troubleshooting, audit & GRC" },
  { name: "IAM Engineer", audience: "Engineers & sysadmins", focus: "SSO, provisioning, SAML/OIDC, SCIM, lifecycle" },
  { name: "Senior IAM Engineer", audience: "Experienced IAM engineers", focus: "Platform resilience, PAM engineering, CI/CD, automation" },
  { name: "IAM Architect", audience: "Senior engineers & leads", focus: "Enterprise architecture, zero-trust design, multi-cloud" },
  { name: "IAM Consultant & Lead", audience: "Practice leads & specialists", focus: "Advisory, stakeholder delivery, business alignment" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <HomeHero />

      {/* 2. The Enterprise Challenge */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeader
                theme="dark"
                eyebrow="The Identity Challenge"
                title="Access management shouldn't be an operational bottleneck or security liability."
                description="As organisations grow, managing the right access for the right people at the right time becomes exponentially harder. Fragmented tools, manual reviews, and accumulated permissions invite breach exposure and audit findings."
              />

              <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 backdrop-blur-sm">
                <p className="text-sm font-semibold tracking-wide text-amber-300 uppercase">
                  Our Approach
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  We balance strict zero-trust identity controls with real-world business agility. A well-designed IAM architecture makes access automated, traceable, and frictionless for legitimate users.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
              {CHALLENGE_POINTS.map((item) => (
                <div
                  key={item.num}
                  className="group relative rounded-2xl border border-white/10 bg-[#07101f]/80 p-6 backdrop-blur-md transition-all hover:border-amber-400/30 hover:bg-[#07101f]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-wider text-amber-400 uppercase">
                      {item.tag}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-amber-200">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Solutions & Services Showcase */}
      <section className="relative border-t border-white/10 bg-[#030712] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              theme="dark"
              eyebrow="Solutions & Consulting"
              title="Enterprise IAM Services built for depth, compliance and speed."
              description="From governance roadmaps to complex PAM deployments, we provide hands-on technical execution across leading identity platforms."
            />
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-amber-400/40 hover:text-white"
            >
              <span>View All 6 Solutions</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="mt-12 space-y-4">
            {SERVICE_HIGHLIGHTS.map((svc) => (
              <div
                key={svc.num}
                className="group flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-[#07101f]/70 p-6 transition-all hover:border-amber-400/30 hover:bg-[#07101f] sm:p-8 md:flex-row md:items-center"
              >
                <div className="flex items-start gap-5 sm:items-center sm:gap-6">
                  <span className="font-mono text-2xl font-bold text-amber-400/70 sm:text-3xl">
                    {svc.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-amber-200 sm:text-xl">
                      {svc.title}
                    </h3>
                    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-400">
                      {svc.description}
                    </p>
                  </div>
                </div>

                <Link
                  href={svc.href}
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold tracking-wider text-amber-300 uppercase transition-colors hover:text-amber-200"
                >
                  <span>Learn more</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 4-Phase Delivery Framework */}
      <section className="relative border-t border-white/10 bg-[#050a14] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeader
            theme="dark"
            align="center"
            eyebrow="Engagement Methodology"
            title="A structured, predictable delivery lifecycle"
            description="Every enterprise consultation follows our tested four-phase engagement framework, ensuring accountability, technical rigor, and seamless knowledge transfer."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DELIVERY_PHASES.map((phase) => (
              <div
                key={phase.step}
                className="relative rounded-2xl border border-white/10 bg-[#07101f]/70 p-6 backdrop-blur-sm"
              >
                <span className="inline-block rounded-lg bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-400">
                  Phase {phase.step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {phase.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IAM Academy & Selar Storefront Spotlight */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#030712] py-20 sm:py-28">
        <div
          className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-[400px] w-[500px] rounded-full bg-amber-500/10 blur-[130px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-6 lg:col-span-5">
              <SectionHeader
                theme="dark"
                eyebrow="The IAM Academy"
                title="Learn IAM. Practise with purpose. Build capability."
                description="We bridge the gap between academic cybersecurity theory and real enterprise identity engineering. Our curriculum covers the entire career trajectory from fundamentals to principal advisory."
              />

              <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] p-6">
                <p className="font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
                  Digital Bookstore &amp; Manuals
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Access authored IAM study guides, implementation playbooks, and architectural reference manuals directly from our official Selar store.
                </p>
                <div className="mt-4">
                  <a
                    href="https://selar.com/m/chiemezie-uzoma1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-semibold text-[#050a14] shadow-sm transition-all hover:bg-amber-300"
                  >
                    <span>Visit Official Selar Store</span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h4a.75.75 0 0 1 0 1.5h-4Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.156 8.194a.75.75 0 0 0-.053 1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {ACADEMY_PATHWAYS.map((path) => (
                <div
                  key={path.name}
                  className="rounded-2xl border border-white/10 bg-[#07101f]/70 p-5 transition-all hover:border-amber-400/30"
                >
                  <p className="font-mono text-xs text-amber-400 uppercase">
                    {path.audience}
                  </p>
                  <h4 className="mt-1 text-base font-semibold text-white">
                    {path.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {path.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Dual-Audience Conversion Banner */}
      <section className="relative border-t border-white/10 bg-gradient-to-b from-[#050a14] to-[#02050c] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <span className="inline-block rounded-full border border-amber-400/25 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-300 uppercase">
            Start Your Journey
          </span>
          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-5xl">
            Ready to strengthen your enterprise identity posture?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            Whether your organisation requires an independent IAM maturity assessment or your team needs practitioner-grade technical training, we are ready to assist.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact?type=enterprise_consulting"
              className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#d6a15c] to-[#e4b26f] px-8 py-3.5 text-sm font-semibold text-[#050a14] shadow-lg transition-all hover:brightness-110 sm:w-auto"
            >
              Talk to an IAM Specialist
            </Link>
            <Link
              href="/contact?type=individual_learning"
              className="inline-flex min-h-[50px] w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-amber-400/40 hover:text-white sm:w-auto"
            >
              Enquire About Academy Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
