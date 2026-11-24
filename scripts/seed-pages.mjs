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
        type: "advisory_editorial",
        badge: "A Practical, Accountable Approach",
        headline: "We begin with the business problem, not software sales.",
        subheadline:
          "We assess your current identity environment, define appropriate controls, and support practical implementation or improvement.",
        body: "Our goal is to make IAM understandable to stakeholders and sustainable for the internal teams responsible for operating it.",
        bgImage: "/brand/team-collaboration.jpg",
      },
      {
        type: "workforce_capabilities",
        badge: "Engineering & Operational Depth",
        headline: "Controls built to operate, govern, and sustain.",
        subheadline:
          "Identity governance and automation designed cleanly for everyday IT operations and audit readiness.",
        bgImage: "/brand/workforce-operations.jpg",
      },
      {
        type: "academy_feature",
        badge: "Professional Capability Building",
        headline: "Build your IAM career with The IAM Lab.",
        subheadline:
          "Our learning initiatives connect IAM concepts to enterprise practice. Explore foundation learning, hands-on platform pathways, technical projects, career mentorship, interview preparation, and specialist resources — with a focus on understanding why a solution works, not simply copying steps.",
        bgImage: "/brand/academy-classroom.jpg",
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
        type: "leadership_profile",
        name: "Chiemezie Uzoma",
        role: "Co-Founder & CEO",
        bio: "Leads IAM consulting, technical strategy, identity security initiatives, and professional learning. His background spans enterprise identity administration, governance, privileged access, Microsoft Entra ID, Okta, SailPoint, CyberArk, and identity automation.",
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
