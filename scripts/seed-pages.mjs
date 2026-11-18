import { Client } from 'pg';

const connectionString = (
  process.env.DATABASE_URI ||
  'postgresql://payload_app.lqkrwdjtkxghrbiifuif:IamLabSecure2026_PayloadDB@aws-0-eu-west-2.pooler.supabase.com:5432/postgres'
).trim().replace(/^["']|["']$/g, '');

const initialPages = [
  {
    title: 'Home — The IAM Lab',
    slug: 'home',
    meta_description:
      'Enterprise Identity and Access Management advisory, engineering, and workforce capability enablement. Secure identities. Simplify access. Strengthen your business.',
    hero_headline: 'Secure identities. Simplify access. Strengthen your business.',
    hero_subheadline:
      'Independent Identity and Access Management advisory, engineering, and capability development for high-assurance enterprises.',
    status: 'published',
    sections: [
      {
        type: 'hero',
        badge: 'Enterprise Identity Architecture & Governance',
        headline: 'Secure identities. Simplify access. Strengthen your business.',
        subheadline:
          'Independent Identity and Access Management advisory, engineering, and capability development for high-assurance enterprises.',
        ctaPrimary: { label: 'Request Consultation', href: '/contact?type=enterprise_consulting' },
        ctaSecondary: { label: 'Explore IAM Academy', href: '/academy' },
        bgImage: '/brand/corporate-hero.jpg',
      },
      {
        type: 'challenges_ledger',
        badge: 'Enterprise Friction & Risk',
        title: 'The Four Structural Identity Challenges Facing Enterprise Leaders',
        subtitle:
          'Modern enterprises accumulate identity friction through rapid SaaS adoption, legacy Active Directory debt, and uncoordinated PAM sprawl.',
        items: [
          {
            num: '01',
            title: 'Governance & Audit Sprawl',
            context: 'Manual access reviews across hybrid multi-cloud directories generate audit fatigue.',
            friction: 'Incomplete entitlement visibility leads to toxic combinations and compliance citations.',
            resolution: 'Automated, policy-driven IGA workflows that enforce continuous least privilege.',
          },
          {
            num: '02',
            title: 'Privileged Access Sprawl',
            context: 'Standing administrative privileges create catastrophic breach vectors.',
            friction: 'Hardcoded secrets and unvaulted service accounts evade legacy security tools.',
            resolution: 'Zero Standing Privilege (ZSP) with just-in-time credential brokering and session recording.',
          },
          {
            num: '03',
            title: 'Legacy Directory Debt',
            context: 'Fragmented on-premises Active Directory forests stalling cloud modernization.',
            friction: 'M&A integration friction, orphaned accounts, and high authentication latency.',
            resolution: 'Streamlined directory consolidation and modern OpenID Connect/SAML 2.0 federation.',
          },
          {
            num: '04',
            title: 'Identity Talent Deficit',
            context: 'Acute global shortage of certified IAM engineers and solution architects.',
            friction: 'High contractor dependency and knowledge gaps inside internal security operations.',
            resolution: 'Tailored enterprise workforce training and production-grade lab enablement.',
          },
        ],
      },
      {
        type: 'services_list',
        badge: 'Enterprise Capabilities',
        title: 'Comprehensive Identity & Access Solutions',
        items: [
          {
            num: '01',
            title: 'IAM Strategy & Maturity Assessment',
            desc: 'Independent architectural audit evaluating current-state maturity against NIST SP 800-207 and ISO 27001.',
          },
          {
            num: '02',
            title: 'Privileged Access Management (PAM)',
            desc: 'Design and deployment of zero standing privilege architecture, credential vaulting, and session recording.',
          },
          {
            num: '03',
            title: 'Identity Governance & Administration (IGA)',
            desc: 'End-to-end lifecycle automation, access request workflows, and compliance-grade certification campaigns.',
          },
          {
            num: '04',
            title: 'Cloud Identity & Workforce Enablement',
            desc: 'Single Sign-On (SSO), adaptive MFA, conditional access policies, and enterprise directory consolidation.',
          },
        ],
      },
    ],
    content: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'The IAM Lab is a specialist cybersecurity consulting practice focused exclusively on Identity and Access Management (IAM), Privileged Access Management (PAM), and Identity Governance and Administration (IGA).',
                type: 'text',
                version: 1,
              },
            ],
          },
        ],
        direction: 'ltr',
      },
    },
  },
  {
    title: 'About The IAM Lab',
    slug: 'about',
    meta_description:
      'Learn about The IAM Lab, our founding mission, executive leadership, operating philosophy, and multi-sector enterprise expertise.',
    hero_headline: 'Engineering Trust Across the Modern Enterprise.',
    hero_subheadline:
      'The IAM Lab was established to bridge the critical gap between complex cybersecurity compliance mandates and frictionless enterprise operations.',
    status: 'published',
    sections: [
      {
        type: 'hero',
        badge: 'Founding Mission & Leadership',
        headline: 'Engineering Trust Across the Modern Enterprise.',
        subheadline:
          'The IAM Lab was established to bridge the critical gap between complex cybersecurity compliance mandates and frictionless enterprise operations.',
        bgImage: '/brand/cyber-command.jpg',
      },
      {
        type: 'leadership_profile',
        name: 'Chiemezie Uzoma',
        role: 'Founder & Principal IAM Consultant',
        bio: 'Senior cybersecurity architect and author with over a decade of hands-on experience designing and delivering identity governance, privileged access management, and cloud security frameworks for tier-one financial institutions, healthcare operators, and critical national infrastructure.',
        credentials: ['CISSP', 'CISM', 'Lead IAM Architect', 'Published Author'],
      },
    ],
    content: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Founded by Chiemezie Uzoma, a seasoned Principal IAM Consultant, The IAM Lab provides high-assurance advisory and implementation services across Banking, Healthcare, Government, and Critical National Infrastructure.',
                type: 'text',
                version: 1,
              },
            ],
          },
        ],
        direction: 'ltr',
      },
    },
  },
  {
    title: 'Services & Solutions',
    slug: 'services',
    meta_description:
      'Specialist enterprise services: IAM Architecture, PAM Engineering, IGA Lifecycle Automation, and Cloud Identity Federation.',
    hero_headline: 'Specialist Identity Engineering. High-Assurance Delivery.',
    hero_subheadline:
      'We design, implement, and govern robust Identity and Access architectures tailored for complex enterprise operating models.',
    status: 'published',
    sections: [
      {
        type: 'hero',
        badge: 'Specialist Enterprise Advisory',
        headline: 'Specialist Identity Engineering. High-Assurance Delivery.',
        subheadline:
          'We design, implement, and govern robust Identity and Access architectures tailored for complex enterprise operating models.',
        bgImage: '/brand/enterprise-security.jpg',
      },
    ],
    content: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Our consulting services span the full identity lifecycle: strategy and roadmap formulation, vendor evaluation, solution architecture, deployment, custom integration, and post-implementation capability handover.',
                type: 'text',
                version: 1,
              },
            ],
          },
        ],
        direction: 'ltr',
      },
    },
  },
  {
    title: 'The IAM Academy',
    slug: 'academy',
    meta_description:
      'Professional training, enterprise tenant lab exercises, and 1-on-1 career mentorship for current and aspiring IAM engineers.',
    hero_headline: 'Bridge the Identity Skills Gap. Build Production Capability.',
    hero_subheadline:
      'Practical, instructor-led training and enterprise tenant lab exercises designed by practicing Principal IAM Architects.',
    status: 'published',
    sections: [
      {
        type: 'hero',
        badge: 'Workforce Enablement & Practical Labs',
        headline: 'Bridge the Identity Skills Gap. Build Production Capability.',
        subheadline:
          'Practical, instructor-led training and enterprise tenant lab exercises designed by practicing Principal IAM Architects.',
        bgImage: '/brand/iam-academy-hero.jpg',
      },
    ],
    content: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'The IAM Academy equips security engineers, system administrators, and technology analysts with the practical skills demanded by top-tier employers.',
                type: 'text',
                version: 1,
              },
            ],
          },
        ],
        direction: 'ltr',
      },
    },
  },
  {
    title: 'Contact & Consultation',
    slug: 'contact',
    meta_description:
      'Schedule an executive IAM consultation or apply for upcoming IAM Academy learning cohorts. Operating globally from London, United Kingdom.',
    hero_headline: 'Connect with The IAM Lab.',
    hero_subheadline:
      'Direct access to senior identity architects for corporate advisory reviews, vendor evaluations, or academy enrollment enquiries.',
    status: 'published',
    sections: [
      {
        type: 'hero',
        badge: 'Initiate Discovery',
        headline: 'Connect with The IAM Lab.',
        subheadline:
          'Direct access to senior identity architects for corporate advisory reviews, vendor evaluations, or academy enrollment enquiries.',
        bgImage: '/brand/team-collaboration.jpg',
      },
    ],
    content: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: 'Submit your enquiry to schedule a preliminary discovery conversation with a Principal Consultant.',
                type: 'text',
                version: 1,
              },
            ],
          },
        ],
        direction: 'ltr',
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
    console.log('[Seed Pages] Connected to Supabase.');

    for (const page of initialPages) {
      const existing = await client.query('SELECT id, slug FROM pages WHERE slug = $1;', [page.slug]);
      const timestamp = new Date().toISOString();

      if (existing.rows.length === 0) {
        await client.query(
          `INSERT INTO pages (title, slug, meta_description, hero_headline, hero_subheadline, status, sections, content, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9);`,
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
        console.log(`[Seed Pages] Enriched existing page: ${page.slug} (ID: ${existing.rows[0].id})`);
      }
    }

    const countRes = await client.query('SELECT count(*) FROM pages;');
    console.log(`[Seed Pages] Total pages in database: ${countRes.rows[0].count}`);

    await client.end();
  } catch (err) {
    console.error('[Seed Pages] Error:', err);
    process.exit(1);
  }
}

seed();
