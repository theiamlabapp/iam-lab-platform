import { Client } from 'pg';

const connectionString = 'postgresql://payload_app.lqkrwdjtkxghrbiifuif:IamLabSecure2026_PayloadDB@aws-0-eu-west-2.pooler.supabase.com:5432/postgres';

const initialPages = [
  {
    title: 'Home — The IAM Lab',
    slug: 'home',
    meta_description: 'Enterprise Identity and Access Management advisory, engineering, and workforce capability enablement. Secure identities. Simplify access. Strengthen your business.',
    hero_headline: 'Secure identities. Simplify access. Strengthen your business.',
    hero_subheadline: 'Independent Identity and Access Management advisory, engineering, and capability development for high-assurance enterprises.',
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
    meta_description: 'Learn about The IAM Lab, our founding mission, executive leadership, operating philosophy, and multi-sector enterprise expertise.',
    hero_headline: 'Engineering Trust Across the Modern Enterprise.',
    hero_subheadline: 'The IAM Lab was established to bridge the critical gap between complex cybersecurity compliance mandates and frictionless enterprise operations.',
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
    meta_description: 'Comprehensive IAM advisory, architecture, implementation, IGA, PAM, modern directory federation, and talent capability enablement.',
    hero_headline: 'Architectural Rigour. Zero-Trust Certainty.',
    hero_subheadline: 'Six specialised service pillars engineered to eliminate standing privileges, streamline identity lifecycles, and maintain continuous regulatory audit-readiness.',
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
                text: 'From enterprise strategy roadmaps to automated joiner-mover-leaver lifecycle workflows, we deliver end-to-end IAM transformation across Microsoft Entra ID, CyberArk, SailPoint, and Okta.',
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
    meta_description: 'Professional Identity and Access Management training, practical engineering bootcamps, and career transformation pathways.',
    hero_headline: 'Master Enterprise Identity Engineering.',
    hero_subheadline: 'Accelerate your career in one of cybersecurity’s highest-demand disciplines with hands-on labs, real-world tenant architectures, and executive mentorship.',
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
                text: 'The IAM Academy provides structured learning pathways across IAM Foundations, Microsoft Entra ID Mastery, CyberArk PAM Administration, and Identity Governance Architecture.',
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
    meta_description: 'Schedule an executive enterprise IAM consultation or apply for upcoming IAM Academy learning cohorts.',
    hero_headline: 'Initiate Your Security Transformation.',
    hero_subheadline: 'Direct access to senior IAM architects for strategic consulting reviews, vendor evaluations, or academy enrollment enquiries.',
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
                text: 'Our advisory team is based in London, UK and operates globally. Submit your project requirements to schedule a confidential discovery session.',
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
          `INSERT INTO pages (title, slug, meta_description, hero_headline, hero_subheadline, content, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $7);`,
          [
            page.title,
            page.slug,
            page.meta_description,
            page.hero_headline,
            page.hero_subheadline,
            JSON.stringify(page.content),
            timestamp,
          ]
        );
        console.log(`[Seed Pages] Created page: ${page.slug}`);
      } else {
        console.log(`[Seed Pages] Page already exists: ${page.slug} (ID: ${existing.rows[0].id})`);
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
