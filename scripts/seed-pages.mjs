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

const initialPages = [
  {
    title: "Home — The IAM Lab",
    slug: "home",
    meta_description:
      "The IAM Lab helps organisations secure digital identities and manage access with greater clarity, control and efficiency, while helping professionals develop practical IAM capability.",
    hero_headline:
      "Secure identities. Simplify access. Strengthen your business.",
    hero_subheadline:
      "The IAM Lab supports organisations with practical Identity and Access Management expertise — from access governance and lifecycle automation to authentication, privileged access, and capability enablement.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "Identity Security • IAM Consulting • Professional Learning",
        headline:
          "Secure identities. Simplify access. Strengthen your business.",
        subheadline:
          "The IAM Lab supports organisations with practical Identity and Access Management expertise — from access governance and lifecycle automation to authentication, privileged access, and capability enablement.",
        ctaPrimary: {
          label: "Discuss an IAM Project",
          href: "/contact?type=enterprise_consulting",
        },
        ctaSecondary: {
          label: "Explore IAM Academy",
          href: "/academy",
        },
        bgImage: "/brand/hero-enterprise.jpg",
      },
      {
        type: "challenges_ledger",
        badge: "Enterprise Vulnerabilities",
        title: "Identity is the primary attack surface.",
        subtitle:
          "Modern organisations manage workforce, vendor, and workload access across disparate systems. Without coordinated governance and automated controls, access risk compounds silently.",
        items: [
          {
            num: "01",
            title: "Identity Sprawl & Cloud Proliferation",
            context: "SaaS & Multi-Cloud Complexity",
            friction:
              "As organisations grow across hybrid directories and cloud applications, permissions fragment rapidly. Engineering teams lose authoritative visibility over who holds access.",
            resolution:
              "Authoritative identity orchestration, directory consolidation, and consistent Single Source of Truth controls.",
          },
          {
            num: "02",
            title: "Privilege Creep & Unmonitored Admins",
            context: "Standing Entitlements & Key Risk",
            friction:
              "Staff shift roles while keeping old permissions, and shared or standing administrative privileges leave critical infrastructure vulnerable to lateral escalation.",
            resolution:
              "Zero Standing Privilege architecture, automated periodic reviews, and Just-in-Time access elevation.",
          },
          {
            num: "03",
            title: "Inconsistent Review & Audit Debt",
            context: "Regulatory Governance Friction",
            friction:
              "Manual spreadsheet sign-offs and informal approval trails break down under audit pressure across ISO 27001, SOX, and NIS2 mandates.",
            resolution:
              "Traceable access governance workflows, verifiable Separation of Duties (SoD), and continuous audit trails.",
          },
          {
            num: "04",
            title: "Manual Joiner-Mover-Leaver Latency",
            context: "Operational Lifecycle Bottlenecks",
            friction:
              "Manual ticket onboarding delays Day-1 productivity, while late revocation on departure leaves lingering access across peripheral business systems.",
            resolution:
              "Event-driven Joiner-Mover-Leaver automation connecting HR sources directly to enterprise directories via SCIM.",
          },
        ],
      },
      {
        type: "advisory_editorial",
        badge: "Independent Advisory",
        headline: "We begin with the business problem, not software sales.",
        subheadline:
          "Identity security is not one tool or a single policy — it is a connected set of decisions about who receives access, how approvals are enforced, and how change is governed.",
        body: "The IAM Lab provides clear, technically grounded consulting across advisory assessments, identity governance, lifecycle automation, and privileged access — tailored to your real environment without vendor hype.",
        bgImage: "/brand/team-collaboration.jpg",
      },
      {
        type: "workforce_capabilities",
        badge: "Engineering & Operational Depth",
        headline: "Practical controls teams can genuinely run and audit.",
        subheadline:
          "Our goal is to make Identity and Access Management transparent to leadership, friction-free for legitimate users, and maintainable by internal IT and security teams.",
        bgImage: "/brand/workforce-operations.jpg",
      },
      {
        type: "academy_feature",
        badge: "Professional Capability Building",
        headline: "Build your IAM career with The IAM Academy.",
        subheadline:
          "Our learning initiatives connect foundational IAM concepts to real enterprise engineering. Explore structured career pathways, practical platform walkthroughs, interview preparation, and digital workbooks.",
        bgImage: "/brand/academy-classroom.jpg",
      },
      {
        type: "closing_cta",
        badge: "Initiate a Conversation",
        headline:
          "Let’s discuss the identity challenge your organisation is solving.",
        subheadline:
          "Supporting teams, organisations, and IAM practitioners who want to strengthen identity security and practical operational capability.",
        ctaPrimary: {
          label: "Talk to an IAM Specialist",
          href: "/contact?type=enterprise_consulting",
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
    hero_headline: "Engineering Trust Across the Modern Enterprise.",
    hero_subheadline:
      "The IAM Lab is an identity and access management consultancy and professional learning practice dedicated to solving real access governance challenges.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "Who We Are",
        headline: "Engineering Trust Across the Modern Enterprise.",
        subheadline:
          "The IAM Lab is an identity and access management consultancy and professional learning practice dedicated to solving real access governance challenges.",
        bgImage: "/brand/office-architecture.jpg",
      },
      {
        type: "leadership_profile",
        name: "Chiemezie Uzoma",
        role: "Co-Founder & Chief Executive Officer",
        bio: "Leads IAM consulting, technical strategy, identity security initiatives, and professional learning. His background spans enterprise identity administration, identity governance, privileged access, Microsoft Entra ID, Okta, SailPoint, CyberArk, and identity lifecycle automation.",
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
    hero_headline: "Connected Decisions. Defensible Identity Control.",
    hero_subheadline:
      "Identity security is not one product or a single policy — it is a set of connected decisions about who receives access, how access is approved, how change is handled, and how risk is governed.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "Services & Solutions",
        headline: "Connected Decisions. Defensible Identity Control.",
        subheadline:
          "Identity security is not one product or a single policy — it is a set of connected decisions about who receives access, how access is approved, how change is handled, and how risk is governed.",
        bgImage: "/brand/enterprise-architecture.jpg",
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
    hero_headline: "Learn IAM. Practise with purpose. Build real capability.",
    hero_subheadline:
      "The IAM Academy connects conceptual foundations, realistic enterprise scenarios, and architectural decision-making so learners understand what they are implementing and why it works.",
    status: "published",
    sections: [
      {
        type: "hero",
        badge: "The IAM Academy",
        headline: "Learn IAM. Practise with purpose. Build real capability.",
        subheadline:
          "The IAM Academy connects conceptual foundations, realistic enterprise scenarios, and architectural decision-making so learners understand what they are implementing and why it works.",
        bgImage: "/brand/academy-classroom.jpg",
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
