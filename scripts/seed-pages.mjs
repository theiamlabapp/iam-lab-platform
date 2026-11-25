import fs from "fs";
import path from "path";
import { Client } from "pg";

if (!process.env.DATABASE_URI) {
  const envFile = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*DATABASE_URI\s*=\s*(.+)\s*$/);
      if (m) process.env.DATABASE_URI = m[1].trim().replace(/^["']|["']$/g, "");
    }
  }
}

const connectionString = (process.env.DATABASE_URI || "").trim().replace(/^["']|["']$/g, "");
if (!connectionString) {
  console.error("Missing DATABASE_URI in environment or .env.local.");
  process.exit(1);
}

const SIX_SERVICES_ITEMS = [
  {
    id: "strategy",
    serviceParam: "service_strategy",
    shortTitle: "Strategy & Advisory",
    name: "IAM Strategy, Assessment & Advisory",
    service:
      "Assess identity processes, technology architecture, risks, governance maturity, and business requirements; define practical improvement priorities and a roadmap.",
    problem:
      "Fragmented IAM practices, unclear ownership, inconsistent controls, and difficulty deciding what to improve first.",
    outcomes:
      "A clearer view of risk, a prioritised plan, and more informed architecture or investment decisions.",
    suitableFor:
      "Organisations planning a new IAM programme, modernisation, security improvement, or independent review.",
    technologyContext:
      "Existing directories, cloud identity providers, IGA and PAM environments, according to scope.",
    image: "/brand/service-strategy.jpg",
    imageAlt:
      "Senior IAM strategy consultants reviewing enterprise identity architecture plans with executive client in London boardroom",
    anchor: "/services#strategy",
    description:
      "Assess identity processes, technology architecture, risks, governance maturity, and business requirements to define practical improvement priorities and a clear roadmap.",
  },
  {
    id: "governance",
    serviceParam: "service_governance",
    shortTitle: "Identity Governance",
    name: "Identity Governance & Access Management",
    service:
      "Support identity governance design, access request workflows, approvals, access review processes, role models, and least-privilege practices.",
    problem:
      "Excess permissions, weak ownership of access, manual recertification, and insufficient visibility into who can access what.",
    outcomes:
      "More consistent access decisions, traceability, and stronger governance processes.",
    suitableFor:
      "IT, cybersecurity, risk, compliance, and application-owner teams.",
    technologyContext:
      "Microsoft Entra ID, SailPoint, and other relevant governance platforms, subject to confirmed delivery capability.",
    image: "/brand/service-governance.jpg",
    imageAlt:
      "Identity governance specialist reviewing access compliance and audit controls in executive office",
    anchor: "/services#governance",
    description:
      "Support identity governance design, access request workflows, approvals, access review processes, role models, and least-privilege practices across applications.",
  },
  {
    id: "directory",
    serviceParam: "service_directory",
    shortTitle: "Lifecycle Automation",
    name: "Identity Lifecycle & Provisioning Automation",
    service:
      "Assess and improve joiner, mover, and leaver processes, user provisioning and deprovisioning, group management, workflow integration, and process automation.",
    problem:
      "Slow onboarding, lingering access after role changes or exits, repetitive tickets, and avoidable manual errors.",
    outcomes:
      "More reliable access changes, reduced manual intervention, and improved lifecycle controls.",
    suitableFor:
      "Organisations managing multiple departments, applications, or identity repositories.",
    technologyContext:
      "Microsoft Entra ID, Microsoft Graph, PowerShell, identity directories, and agreed connectors.",
    image: "/brand/service-lifecycle.jpg",
    imageAlt:
      "Enterprise identity engineers collaborating on automated provisioning workflows at dual workstation monitors",
    anchor: "/services#directory",
    description:
      "Assess and improve joiner, mover, and leaver processes, user provisioning and deprovisioning, group management, workflow integration, and process automation.",
  },
  {
    id: "auth-sso",
    serviceParam: "service_auth_sso",
    shortTitle: "Authentication & SSO",
    name: "Authentication, SSO & Access Modernisation",
    service:
      "Support secure authentication designs, SSO, MFA, conditional access, application onboarding, and access policy improvement.",
    problem:
      "Inconsistent sign-in controls, fragmented access experiences, and avoidable authentication exposure.",
    outcomes:
      "Clearer access policies, better sign-in consistency, and risk-informed authentication controls.",
    suitableFor: "Organisations modernising user and application access.",
    technologyContext:
      "Microsoft Entra ID, Okta, and relevant authentication protocols, subject to the agreed project.",
    image: "/brand/service-sso.jpg",
    imageAlt:
      "Enterprise security architect configuring authentication and single sign-on controls in London financial district office",
    anchor: "/services#auth-sso",
    description:
      "Support secure authentication designs, single sign-on (SSO), multi-factor authentication (MFA), conditional access, application onboarding, and access policy improvement.",
  },
  {
    id: "pam",
    serviceParam: "service_pam",
    shortTitle: "Privileged Access",
    name: "Privileged Access Management (PAM)",
    service:
      "Provide assessment, design, and technical support for privileged identity controls, privileged access workflows, role elevation, and related operating processes.",
    problem:
      "Overprivileged accounts, unmanaged administrative access, and difficulty monitoring sensitive access.",
    outcomes:
      "A more controlled approach to privileged access and clearer accountability.",
    suitableFor:
      "Security operations, infrastructure, cloud, and platform engineering teams.",
    technologyContext:
      "CyberArk and Microsoft Entra privileged identity capabilities, where in project scope.",
    image: "/brand/service-pam.jpg",
    imageAlt:
      "Infrastructure engineers overseeing privileged access infrastructure beside glass-partitioned enterprise server racks",
    anchor: "/services#pam",
    description:
      "Provide assessment, design, and technical support for privileged identity controls, privileged access workflows, role elevation, and related operating processes.",
  },
  {
    id: "implementation",
    serviceParam: "service_cloud_iam",
    shortTitle: "Implementation & Support",
    name: "IAM Implementation, Integration & Technical Support",
    service:
      "Provide scoped assistance with IAM platform configuration, integrations, troubleshooting, operational documentation, and knowledge transfer.",
    problem:
      "Project delivery bottlenecks, integration issues, and gaps between architecture and day-to-day operations.",
    outcomes:
      "Defined technical deliverables, clearer operating practices, and skills transfer for internal teams.",
    suitableFor:
      "Organisations implementing or improving an IAM capability and technology partners requiring specialist input.",
    technologyContext:
      "Scope confirmed per engagement; technology choices follow client requirements and existing architecture.",
    image: "/brand/service-implementation.jpg",
    imageAlt:
      "Senior IAM consultant guiding platform integration and knowledge transfer at executive workstation",
    anchor: "/services#implementation",
    description:
      "Provide scoped assistance with IAM platform configuration, integrations, troubleshooting, operational documentation, and knowledge transfer for internal teams.",
  },
];

const DELIVERY_STAGE_ITEMS = [
  {
    id: "discovery",
    title: "Discovery call",
    detail:
      "Understand your organisation's identity environment, immediate security concerns, and operational objectives.",
    output: "Aligned Problem Framing",
  },
  {
    id: "scope",
    title: "Scope and requirements",
    detail:
      "Define clear technical boundaries, target identity systems, stakeholders, and practical priorities.",
    output: "Agreed Scope Definition",
  },
  {
    id: "proposal",
    title: "Proposal and agreed deliverables",
    detail:
      "Establish a transparent engagement structure, milestone plan, and technology approach tailored to your environment.",
    output: "Clear Delivery Plan",
  },
  {
    id: "delivery",
    title: "Delivery and knowledge transfer",
    detail:
      "Execute agreed technical work alongside practical documentation and skills transfer for your internal team.",
    output: "Controls & Team Enablement",
  },
];

const initialPages = [
  {
    title: "Home — The IAM Lab",
    slug: "home",
    meta_description:
      "The IAM Lab helps organisations secure digital identities and manage access with greater clarity, control and efficiency, while helping professionals develop practical IAM capability.",
    hero_headline:
      "Secure identities. Simplify access. Strengthen your business.",
    hero_subheadline:
      "The IAM Lab supports organisations with practical identity and access management expertise — from access governance and identity lifecycle automation to authentication, privileged access and IAM improvement initiatives. We also help professionals build meaningful IAM skills through structured learning and hands-on guidance.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "Identity Security • IAM Consulting • Professional Learning",
        headline:
          "Secure identities. Simplify access. Strengthen your business.",
        subheadline:
          "The IAM Lab supports organisations with practical identity and access management expertise — from access governance and identity lifecycle automation to authentication, privileged access and IAM improvement initiatives. We also help professionals build meaningful IAM skills through structured learning and hands-on guidance.",
        ctaPrimary: {
          label: "Discuss an IAM Project",
          href: "/contact?type=enterprise_consulting#contact-form",
        },
        ctaSecondary: {
          label: "Explore IAM Academy",
          href: "/academy",
        },
        bgImage: "/brand/hero-enterprise.jpg",
        carouselItems: [
          {
            id: "strategy",
            label: "IAM Strategy & Advisory",
            summary:
              "Assess identity risks, governance maturity, and improvement priorities with a practical roadmap.",
            href: "/services#strategy",
          },
          {
            id: "governance",
            label: "Identity Governance",
            summary:
              "Strengthen access requests, approvals, access reviews, role models, and least-privilege oversight.",
            href: "/services#governance",
          },
          {
            id: "lifecycle",
            label: "Lifecycle Automation",
            summary:
              "Streamline joiner, mover, and leaver provisioning across directories and business systems.",
            href: "/services#directory",
          },
          {
            id: "pam",
            label: "Privileged Access (PAM)",
            summary:
              "Introduce structured privileged access controls, role elevation workflows, and clear accountability.",
            href: "/services#pam",
          },
          {
            id: "academy",
            label: "IAM Academy",
            summary:
              "Structured career pathways, practical scenario labs, mentorship, and curated IAM resources.",
            href: "/academy",
          },
        ],
      },
      {
        type: "challenges_ledger",
        badge: "The Challenge We Help Solve",
        title: "Identity processes need clear control.",
        subtitle:
          "As organisations grow, managing the right access for the right people becomes more complex. A well-designed IAM approach makes identity processes controlled, traceable, and workable.",
        items: [
          {
            num: "01",
            title: "Identity Sprawl & Fragmented Systems",
            description:
              "Manual onboarding and fragmented directories leave security teams without consistent visibility over who holds access across cloud and hybrid estates.",
          },
          {
            num: "02",
            title: "Excessive Permissions & Standing Risk",
            description:
              "Accumulated user permissions and unmonitored administrative privileges create avoidable security exposure when roles change or accounts remain active.",
          },
          {
            num: "03",
            title: "Inconsistent Approvals & Audit Friction",
            description:
              "Informal approval processes and manual access reviews cause operational delays and weaken audit traceability across business systems.",
          },
        ],
      },
      {
        type: "identity_fabric",
        badge: "Connected Identity Decision Fabric",
        headline: "Connected Identity Architecture",
        subheadline:
          "Four integrated control domains supporting defensible access decisions.",
        items: [
          {
            id: "directory",
            tabLabel: "Authoritative Identity",
            title: "Authoritative Identity Core",
            summary:
              "HR sources and enterprise directories aligned into a consistent identity lifecycle, reducing manual joiner-mover-leaver bottlenecks.",
            controls: [
              "HR & Directory Synchronisation",
              "Automated Joiner-Mover-Leaver Flows",
              "SCIM & Connector Provisioning",
            ],
          },
          {
            id: "governance",
            tabLabel: "Identity Governance",
            title: "Identity Governance & Access Control",
            summary:
              "Structured access requests, approvals, recertification campaigns, role design, and oversight across applications.",
            controls: [
              "Access Request & Approval Workflows",
              "Periodic Access Recertification",
              "Role Design & Least-Privilege Oversight",
            ],
          },
          {
            id: "privilege",
            tabLabel: "Privileged Access",
            title: "Privileged Access Management",
            summary:
              "Controlled privileged workflows, administrative role elevation, and accountable governance protecting sensitive systems.",
            controls: [
              "Privileged Access Controls",
              "Controlled Role Elevation Workflows",
              "Administrative Accountability & Review",
            ],
          },
          {
            id: "cloud",
            tabLabel: "Authentication",
            title: "Authentication & Access Modernisation",
            summary:
              "Secure sign-in controls, single sign-on (SSO), multi-factor authentication (MFA), and risk-informed conditional access policies.",
            controls: [
              "Single Sign-On (SSO) & App Onboarding",
              "Conditional Access & MFA Enforcement",
              "Access Policy Improvement",
            ],
          },
        ],
      },
      {
        type: "advisory_editorial",
        badge: "A Practical, Accountable Approach",
        headline: "We begin with the business problem, not software sales.",
        subheadline:
          "We assess your current identity environment, define appropriate controls, and support practical implementation or improvement.",
        body: "Our goal is to make IAM understandable to stakeholders and sustainable for the internal teams responsible for operating it.",
        bgImage: "/brand/team-collaboration.jpg",
        ctaPrimary: {
          label: "Learn about our approach and leadership",
          href: "/about",
        },
      },
      {
        type: "workforce_capabilities",
        badge: "Engineering & Operational Depth",
        headline: "Controls built to operate, govern, and sustain.",
        subheadline:
          "Identity governance and automation designed cleanly for everyday IT operations and audit readiness.",
        bgImage: "/brand/workforce-operations.jpg",
        items: [
          {
            title: "Defensible Identity Blueprints",
            detail:
              "Practical target architectures documented for executive alignment, internal security teams, and auditor review.",
          },
          {
            title: "Identity Lifecycle Automation",
            detail:
              "Reliable joiner, mover, and leaver automation connecting HR triggers to Microsoft Entra ID, Microsoft Graph, and applications.",
          },
          {
            title: "Privileged & Access Controls",
            detail:
              "Structured access approvals, least-privilege governance, and controlled administrative elevation.",
          },
          {
            title: "Operational Handover",
            detail:
              "Clear operational documentation and practitioner knowledge transfer so internal teams can operate securely over time.",
          },
        ],
      },
      {
        type: "services_list",
        badge: "Six Core Practice Pillars",
        headline: "Scoped IAM consulting & implementation support.",
        subheadline:
          "Select any practice area below to review scope, problem focus, and expected outcomes.",
        ctaPrimary: {
          label: "View Services & Solutions",
          href: "/services",
        },
        items: SIX_SERVICES_ITEMS,
      },
      {
        type: "delivery_timeline",
        badge: "Service Delivery Model",
        headline: "How we engage and deliver clarity.",
        subheadline:
          "A transparent, milestone-based engagement workflow from discovery call through knowledge transfer.",
        items: DELIVERY_STAGE_ITEMS,
      },
      {
        type: "academy_feature",
        badge: "Professional Capability Building",
        headline: "Build your IAM career with The IAM Lab.",
        subheadline:
          "Our learning initiatives connect IAM concepts to enterprise practice. Explore foundation learning, hands-on platform pathways, technical projects, career mentorship, interview preparation, and specialist resources — with a focus on understanding why a solution works, not simply copying steps.",
        bgImage: "/brand/academy-classroom.jpg",
        secondaryImage: "/brand/iam-academy-hero.jpg",
        ctaPrimary: {
          label: "Explore IAM Academy",
          href: "/academy",
        },
        ctaSecondary: {
          label: "Browse IAM Books & Resources",
          href: "https://selar.com/m/chiemezie-uzoma1",
        },
      },
      {
        type: "closing_cta",
        badge: "Start a Conversation",
        headline:
          "Let’s discuss the identity challenge your organisation is trying to solve.",
        subheadline:
          "Supporting teams, organisations, and IAM professionals who want to improve identity security and capability.",
        ctaPrimary: {
          label: "Talk to an IAM Specialist",
          href: "/contact?type=enterprise_consulting#contact-form",
        },
        ctaSecondary: {
          label: "Submit Written Enquiry",
          href: "/contact?type=enterprise_consulting#contact-form",
        },
        bgImage: "/brand/executive-consulting.jpg",
      },
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "The IAM Lab is an independent Identity and Access Management consulting and professional learning brand.",
                type: "text",
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    title: "About The IAM Lab",
    slug: "about",
    meta_description:
      "Learn about The IAM Lab, our founding mission, operating principles, and executive leadership led by Co-Founders Chiemezie Uzoma and Jennifer Uzoma.",
    hero_headline: "Practical consulting and professional IAM development.",
    hero_subheadline:
      "The IAM Lab is an identity and access management initiative focused on enterprise identity security, practical consulting, and professional development. We bring together technical IAM experience, structured learning, and a commitment to solving real access management challenges.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "Who We Are",
        headline: "Practical consulting and professional IAM development.",
        subheadline:
          "The IAM Lab is an identity and access management initiative focused on enterprise identity security, practical consulting, and professional development. We bring together technical IAM experience, structured learning, and a commitment to solving real access management challenges.",
        bgImage: "/brand/office-architecture.jpg",
      },
      {
        type: "mission_vision",
        badge: "Our Mission",
        headline: "Secure access and capable professionals.",
        subheadline:
          "To help organisations manage digital identities and access more securely and effectively, while equipping IAM professionals with the understanding, practice, and confidence to grow.",
        visionLabel: "Our Vision",
        visionBody:
          "To become a trusted home for practical identity security expertise and professional IAM development, with strong relevance to organisations and talent across Africa and international markets.",
        approachLabel: "Our Approach to Engagement",
        approachBody:
          "We start by understanding the organisation's environment and objectives, then define an appropriate scope, approach, deliverables, and governance. Services are agreed through a consultation or statement of work; technology choices depend on the client's requirements and existing architecture.",
        bgImage: "/brand/team-collaboration.jpg",
      },
      {
        type: "leadership_profile",
        badge: "Leadership",
        headline: "Advisory strategy & operational delivery.",
        items: [
          {
            name: "Chiemezie Uzoma",
            role: "Co-Founder & CEO",
            initials: "CU",
            photoUrl: "",
            bio: "Leads IAM consulting, technical strategy, identity security initiatives, and professional learning. His background spans enterprise identity administration, governance, privileged access, Microsoft Entra ID, Okta, SailPoint, CyberArk, and identity automation.",
          },
          {
            name: "Jennifer Uzoma",
            role: "Co-Founder & Director of Operations",
            initials: "JU",
            photoUrl: "",
            bio: "Leads operational coordination, programme administration, client experience, and partnership support for The IAM Lab.",
          },
        ],
      },
      {
        type: "principles_list",
        badge: "What Guides Our Work",
        headline: "Four principles that guide every engagement.",
        items: [
          {
            id: "purpose",
            title: "Security with purpose",
            description:
              "Focus on risks and business outcomes rather than technology for its own sake.",
          },
          {
            id: "learning",
            title: "Practical learning",
            description:
              "Build understanding through real-world scenarios and hands-on application.",
          },
          {
            id: "integrity",
            title: "Integrity and clarity",
            description:
              "Communicate honestly about scope, capability, and expected outcomes.",
          },
          {
            id: "improvement",
            title: "Continuous improvement",
            description:
              "Make identity processes easier to maintain, audit, and improve over time.",
          },
        ],
      },
      {
        type: "industries_sectors",
        badge: "Industries & Markets",
        headline: "Organisations our advisory services are built to support.",
        subheadline:
          "Designed for teams across financial services, technology, healthcare, education, and professional services seeking structured identity control.",
        items: [
          {
            id: "financial",
            context: "Target Sector",
            sector: "Financial Services",
            focus:
              "Supporting strict access governance, recertification traceability, and segregation of duties controls.",
          },
          {
            id: "technology",
            context: "Target Sector",
            sector: "Technology",
            focus:
              "Scalable SSO, lifecycle automation, and cloud identity controls for growing technical environments.",
          },
          {
            id: "healthcare",
            context: "Target Sector",
            sector: "Healthcare",
            focus:
              "Timely user provisioning, role-aligned access reviews, and accountable governance over sensitive records.",
          },
          {
            id: "education",
            context: "Target Sector",
            sector: "Education & Professional Services",
            focus:
              "Reducing manual onboarding friction and unifying access management across directories and applications.",
          },
        ],
      },
      {
        type: "closing_cta",
        badge: "Next Steps",
        headline: "Let’s discuss your identity priorities.",
        subheadline:
          "Speak directly with a specialist or explore how our scoped services can support your team.",
        ctaPrimary: {
          label: "Talk to an IAM Specialist",
          href: "/contact?type=enterprise_consulting#contact-form",
        },
        ctaSecondary: {
          label: "Explore Our Services",
          href: "/services",
        },
      },
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Led by Co-Founders Chiemezie Uzoma and Jennifer Uzoma, The IAM Lab bridges complex identity security requirements and sustainable operations.",
                type: "text",
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    title: "Services & Solutions",
    slug: "services",
    meta_description:
      "Explore The IAM Lab's six consulting pillars: IAM Strategy & Advisory, IGA, Lifecycle Automation, Authentication/SSO, PAM Engineering, and Implementation Support.",
    hero_headline: "Connected decisions. Defensible identity control.",
    hero_subheadline:
      "Identity security is not one product or a single policy. It is a set of connected decisions about who receives access, how access is approved, how identity changes are handled, and how risk is controlled. The IAM Lab provides scoped IAM consulting, technical guidance, and implementation support to help organisations improve these decisions.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "Services & Solutions",
        headline: "Connected decisions. Defensible identity control.",
        subheadline:
          "Identity security is not one product or a single policy. It is a set of connected decisions about who receives access, how access is approved, how identity changes are handled, and how risk is controlled. The IAM Lab provides scoped IAM consulting, technical guidance, and implementation support to help organisations improve these decisions.",
        bgImage: "/brand/enterprise-architecture.jpg",
      },
      {
        type: "services_list",
        badge: "Practice Areas",
        headline: "Scoped consulting & implementation services.",
        items: SIX_SERVICES_ITEMS,
      },
      {
        type: "delivery_timeline",
        badge: "Service Delivery Model",
        headline: "How we engage and deliver clarity.",
        subheadline:
          "Select each phase below to inspect how we scope deliverables and transfer operational knowledge.",
        items: DELIVERY_STAGE_ITEMS,
      },
      {
        type: "future_capability",
        badge: "Future Capability — Not a Live Service Yet",
        subheadline:
          "An IAM specialist network or talent placement service may be introduced later once vetting, contractor agreements, quality assurance, client delivery obligations, and relevant legal arrangements are established.",
      },
      {
        type: "closing_cta",
        badge: "Initiate Engagement",
        headline: "Tell us about your identity security priorities.",
        subheadline:
          "We'll discuss what support is appropriate and how a scoped engagement could work.",
        bgImage: "/brand/executive-consulting.jpg",
        ctaPrimary: {
          label: "Request a Consultation",
          href: "/contact?type=enterprise_consulting#contact-form",
        },
      },
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Six scoped consulting service pillars covering strategy, IGA, lifecycle automation, SSO/MFA, PAM, and integration engineering.",
                type: "text",
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    title: "The IAM Academy",
    slug: "academy",
    meta_description:
      "Learn IAM and practise with purpose through 6 structured career progression tiers, practical enterprise scenarios, mentorship, and digital resources.",
    hero_headline: "Learn IAM. Practise with purpose. Build capability.",
    hero_subheadline:
      "IAM Academy is the professional learning division of The IAM Lab, designed for people entering identity and access management and practitioners developing more advanced skills. Our approach connects concepts, practical scenarios, and technical decision-making so learners understand what they are doing and why it matters.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "IAM Academy",
        headline: "Learn IAM. Practise with purpose. Build capability.",
        subheadline:
          "IAM Academy is the professional learning division of The IAM Lab, designed for people entering identity and access management and practitioners developing more advanced skills. Our approach connects concepts, practical scenarios, and technical decision-making so learners understand what they are doing and why it matters.",
        bgImage: "/brand/academy-classroom.jpg",
        ctaPrimary: {
          label: "Enquire About Training",
          href: "/contact?type=individual_learning#contact-form",
        },
        ctaSecondary: {
          label: "Browse Books & Resources",
          href: "https://selar.com/m/chiemezie-uzoma1",
        },
      },
      {
        type: "learning_pathways",
        badge: "Recommended Learning Pathways",
        headline: "Six structured progression pathways.",
        subheadline:
          "Choose a pathway below to review focus areas, suggested audience, and next steps.",
        items: [
          {
            code: "pathway_foundation",
            tier: "Foundational",
            name: "IAM Foundation",
            audience: "Beginners and career changers",
            focus:
              "Core IAM concepts, identity lifecycle, controls, terminology, and career orientation; no platform training required.",
          },
          {
            code: "pathway_analyst",
            tier: "Operational",
            name: "IAM Analyst",
            audience: "IT support and early IAM practitioners",
            focus:
              "First hands-on training with a chosen IAM platform; access operations, troubleshooting, enterprise cases, and GRC.",
          },
          {
            code: "pathway_engineer",
            tier: "Engineering",
            name: "IAM Engineer",
            audience: "IAM analysts and engineers",
            focus:
              "SSO, provisioning, application integration, protocols, workflow automation, and troubleshooting.",
          },
          {
            code: "pathway_senior_engineer",
            tier: "Advanced Engineering",
            name: "Senior IAM Engineer",
            audience: "Experienced IAM engineers",
            focus:
              "Advanced diagnostics, resilience, platform engineering, CI/CD, PAM engineering, and emerging AI use cases.",
          },
          {
            code: "pathway_architect",
            tier: "Architecture",
            name: "IAM Architect",
            audience: "Senior technical practitioners",
            focus:
              "Solution design, enterprise integration, identity architecture, and Zero Trust.",
          },
          {
            code: "pathway_consultant_lead",
            tier: "Advisory & Leadership",
            name: "IAM Consultant & Leadership",
            audience: "Consultants and IAM leaders",
            focus:
              "Discovery, advisory delivery, strategy, operating model, and transformation.",
          },
        ],
      },
      {
        type: "learning_formats",
        badge: "Learning Formats",
        headline: "Practitioner-focused training built for clarity.",
        subheadline:
          "Combining conceptual clarity, scenario-based labs, structured mentorship, and career pathway preparation.",
        bgImage: "/brand/iam-academy-hero.jpg",
        items: [
          {
            id: "community",
            title: "Live community learning",
            desc: "Selected free demonstrations, discussions, and hands-on sessions, subject to announced schedules and capacity.",
          },
          {
            id: "mentorship",
            title: "Structured mentorship",
            desc: "Personalised one-to-one guidance and agreed learning programmes, with scope, duration, and fees confirmed during enrolment.",
          },
          {
            id: "labs",
            title: "Technical labs and project walkthroughs",
            desc: "Scenario-based practice built around enterprise IAM tasks and operational reasoning.",
          },
          {
            id: "career",
            title: "Career and interview support",
            desc: "Career pathway consultations, practical interview preparation, CV and LinkedIn guidance, and focused technical coaching.",
          },
          {
            id: "resources",
            title: "Books and digital resources",
            desc: "Guides and learning material addressing IAM foundations, platform skills, automation, and interview preparation.",
          },
        ],
      },
      {
        type: "selar_bookstore",
        badge: "Books & Digital Resources",
        headline: "Guides, Workbooks & Interview Preparation Packs",
        subheadline:
          "Access guides and learning material addressing IAM foundations, platform skills, automation, and interview preparation directly via The IAM Lab's Selar store.",
        ctaPrimary: {
          label: "Browse Books & Resources",
          href: "https://selar.com/m/chiemezie-uzoma1",
        },
      },
      {
        type: "integrity_notice",
        badge: "Learning Integrity Notice",
        headline: "Focused on True Practitioner Competence",
        subheadline:
          "Training and mentorship support professional development; completion does not guarantee employment, certification, or a specific career outcome. Session schedules, trainer availability, and learning requirements are published once confirmed.",
      },
      {
        type: "faqs_list",
        badge: "Frequently Asked Questions",
        headline: "IAM Academy questions & programme scope.",
        items: [
          {
            question: "Do I need IAM experience to start?",
            answer:
              "No. The IAM Foundation pathway is specifically designed for beginners and career changers, focusing on core concepts, identity lifecycle, controls, and terminology without requiring prior platform administration experience.",
          },
          {
            question:
              "When should I select Entra ID, Okta, SailPoint, or another platform?",
            answer:
              "You choose a hands-on IAM platform at the IAM Analyst stage based on your career goals, background, and the enterprise environments you want to target.",
          },
          {
            question: "Are sessions recorded?",
            answer:
              "Recording availability and material access policies depend on the specific programme or community session and are confirmed with each cohort announcement.",
          },
          {
            question: "How do one-to-one mentorship and corporate training work?",
            answer:
              "Both start with a consultation to discuss learning goals and team needs, followed by a scoped proposal confirming programme structure, duration, and fees prior to enrolment.",
          },
          {
            question: "Where can I access books and resources?",
            answer:
              "Guides and digital learning resources are available directly through The IAM Lab's Selar store at https://selar.com/m/chiemezie-uzoma1.",
          },
        ],
      },
      {
        type: "closing_cta",
        badge: "Enrolment & Guidance",
        headline: "Ask about IAM Academy pathways or mentorship.",
        subheadline:
          "Share your current background and learning goals to discuss confirmed programme schedules or a consultation.",
        ctaPrimary: {
          label: "Book a Career Pathway Consultation",
          href: "/contact?type=individual_learning#contact-form",
        },
        ctaSecondary: {
          label: "Browse Books & Resources",
          href: "https://selar.com/m/chiemezie-uzoma1",
        },
      },
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Structured learning pathways from IAM Foundation through Senior Engineer, Architect, and Consulting Leadership.",
                type: "text",
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
  {
    title: "Contact & Consultation",
    slug: "contact",
    meta_description:
      "Connect with The IAM Lab for corporate IAM advisory consultations or IAM Academy pathway enquiries. Operating from London, United Kingdom.",
    hero_headline: "Let’s discuss your IAM needs.",
    hero_subheadline:
      "Whether your organisation needs advisory assistance with identity governance, access modernisation, or IAM Academy training enquiries, we welcome an initial conversation.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "Contact & Consultation",
        headline: "Let’s discuss your IAM needs.",
        subheadline:
          "Whether your organisation needs advisory assistance with identity governance, access modernisation, or IAM Academy training enquiries, we welcome an initial conversation.",
        bgImage: "/brand/contact-advisory.jpg",
      },
      {
        type: "contact_tracks",
        badge: "Two Dedicated Enquiry Routes",
        headline: "How can we support your goals?",
        subheadline:
          "Choose the track matching your objectives in the form. Enquiries are routed directly to our consulting and admissions specialists.",
        items: [
          {
            badge: "ROUTE 01 // FOR ORGANISATIONS",
            title: "Consulting, Implementation & Assessments",
            description:
              "Discuss consulting architecture, employee enablement, identity risk reviews, or an active modernisation project.",
            ctaLabel: "Request a Business Consultation",
            href: "/contact?type=enterprise_consulting#contact-form",
          },
          {
            badge: "ROUTE 02 // FOR INDIVIDUALS",
            title: "IAM Academy Pathways & Mentorship",
            description:
              "Explore structured learning pathways, cohorts, one-to-one mentorship, or curated study guides on IAM Academy.",
            ctaLabel: "Ask About IAM Academy",
            href: "/academy",
          },
        ],
      },
      {
        type: "form_intro",
        badge: "Inbound Enquiry Desk",
        headline: "Submit your consultation request",
        subheadline:
          "Your details are recorded securely and routed directly to our team for follow-up.",
      },
      {
        type: "office_map",
        badge: "United Kingdom Advisory Base",
        headline: "London Headquarters",
        subheadline:
          "Operating internationally from London, supporting enterprises and learners across the UK, Africa, Europe, and North America.",
      },
    ],
    content: {
      root: {
        type: "root",
        format: "",
        indent: 0,
        version: 1,
        children: [
          {
            type: "paragraph",
            format: "",
            indent: 0,
            version: 1,
            children: [
              {
                mode: "normal",
                text: "Enquiries are persisted directly in Supabase PostgreSQL and routed to our team.",
                type: "text",
                version: 1,
              },
            ],
          },
        ],
        direction: "ltr",
      },
    },
  },
];

async function seed() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("[Seed Pages] Connected to Supabase.");

    for (const page of initialPages) {
      const existing = await client.query(
        "SELECT id, slug FROM pages WHERE slug = $1;",
        [page.slug]
      );
      const timestamp = new Date().toISOString();

      if (existing.rows.length === 0) {
        await client.query(
          `INSERT INTO pages (title, slug, meta_description, hero_headline, hero_subheadline, status, published_at, sections, content, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $9, $7, $8, $9, $9);`,
          [
            page.title,
            page.slug,
            page.meta_description,
            page.hero_headline,
            page.hero_subheadline,
            page.status,
            JSON.stringify(page.sections),
            JSON.stringify(page.content),
            timestamp,
          ]
        );
        console.log(`[Seed Pages] Created page: ${page.slug}`);
      } else {
        await client.query(
          `UPDATE pages
           SET title = $1, meta_description = $2, hero_headline = $3, hero_subheadline = $4, status = $5, sections = $6, updated_at = $7
           WHERE slug = $8;`,
          [
            page.title,
            page.meta_description,
            page.hero_headline,
            page.hero_subheadline,
            page.status,
            JSON.stringify(page.sections),
            timestamp,
            page.slug,
          ]
        );
        console.log(`[Seed Pages] Synchronized page: ${page.slug} (ID: ${existing.rows[0].id})`);
      }
    }

    const res = await client.query("SELECT COUNT(*) FROM pages;");
    console.log("[Seed Pages] Total pages in database:", res.rows[0].count);
  } catch (err) {
    console.error("[Seed Pages] Error:", err);
  } finally {
    await client.end();
  }
}

seed();
