import fs from "fs";
import path from "path";
import { Client } from "pg";
import sharp from "sharp";

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

const BRAND_CATALOG = [
  {
    filename: "hero-enterprise.jpg",
    category: "hero",
    alt: "Senior cybersecurity executives reviewing enterprise architecture in London twilight boardroom",
    caption: "Homepage primary hero photography",
  },
  {
    filename: "team-collaboration.jpg",
    category: "consulting",
    alt: "The IAM Lab principal architects reviewing identity governance schematics in London studio",
    caption: "Independent advisory editorial photography",
  },
  {
    filename: "workforce-operations.jpg",
    category: "identity",
    alt: "Enterprise IAM specialists monitoring access telemetry and governance dashboards",
    caption: "Workforce capabilities operations room photography",
  },
  {
    filename: "academy-classroom.jpg",
    category: "classroom",
    alt: "The IAM Academy instructor-led cohort workshop and practical enterprise lab",
    caption: "IAM Academy workshop photography",
  },
  {
    filename: "iam-academy-hero.jpg",
    category: "classroom",
    alt: "Curved IAM hierarchy display in architectural dark navy operations lab",
    caption: "IAM Academy architecture visualization",
  },
  {
    filename: "executive-consulting.jpg",
    category: "consulting",
    alt: "Executive advisory boardroom overlooking London financial district at golden hour",
    caption: "Executive consultation closing section photography",
  },
  {
    filename: "office-architecture.jpg",
    category: "consulting",
    alt: "The IAM Lab London headquarters client reception gallery and skyline boardroom",
    caption: "About page headquarters hero photography",
  },
  {
    filename: "enterprise-architecture.jpg",
    category: "hero",
    alt: "Executive conference suite beside glass-walled enterprise directory server racks",
    caption: "Services page hero photography",
  },
  {
    filename: "contact-advisory.jpg",
    category: "consulting",
    alt: "Quiet private client briefing suite overlooking London financial district",
    caption: "Contact page hero photography",
  },
  {
    filename: "cyber-network.jpg",
    category: "identity",
    alt: "Global enterprise identity operations monitoring theater with network telemetry",
    caption: "Global security operations visualization",
  },
  {
    filename: "cyber-command.jpg",
    category: "identity",
    alt: "Architectural glass and dark marble Zero-Trust identity perimeter sculpture",
    caption: "Architectural Zero-Trust visual motif",
  },
  {
    filename: "enterprise-security.jpg",
    category: "identity",
    alt: "Bevelled architectural security glass and brushed bronze detail",
    caption: "Minimalist architectural steel and glass texture",
  },
  {
    filename: "admin-login-office.jpg",
    category: "consulting",
    alt: "Cybersecurity analysts reviewing identity configurations across dual monitors",
    caption: "Enterprise console sign-in photography",
  },
  {
    filename: "security-infrastructure.jpg",
    category: "identity",
    alt: "High-assurance enterprise network infrastructure racks and structured cabling",
    caption: "Enterprise directory infrastructure hardware",
  },
  {
    filename: "the-iam-lab-logo-dark.png",
    category: "logo",
    alt: "The IAM Lab official dark navy and gold transparent logo (light surfaces)",
    caption: "Transparent dark variant for white headers",
  },
  {
    filename: "the-iam-lab-logo-light.png",
    category: "logo",
    alt: "The IAM Lab official warm white and gold transparent logo (dark surfaces)",
    caption: "Transparent light variant for dark backgrounds",
  },
  {
    filename: "the-iam-lab-logo.png",
    category: "logo",
    alt: "The IAM Lab master corporate logo trademark",
    caption: "Master corporate trademark image",
  },
];

async function seedMedia() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log("[Seed Media] Connected to Supabase PostgreSQL.");

  for (const item of BRAND_CATALOG) {
    const filePath = path.join(process.cwd(), "public", "brand", item.filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`[Seed Media] Missing disk file skipped: ${item.filename}`);
      continue;
    }

    const stat = fs.statSync(filePath);
    const meta = await sharp(filePath).metadata();
    const mime = item.filename.endsWith(".png") ? "image/png" : "image/jpeg";
    const url = `/brand/${item.filename}`;

    const existing = await client.query(
      "SELECT id FROM media WHERE filename = $1 OR url = $2 LIMIT 1;",
      [item.filename, url]
    );

    if (existing.rows.length === 0) {
      await client.query(
        `INSERT INTO media (
           filename, url, thumbnail_u_r_l, mime_type, filesize, width, height,
           alt, caption, category, source_type, created_at, updated_at
         ) VALUES ($1, $2, $2, $3, $4, $5, $6, $7, $8, $9, 'brand', NOW(), NOW());`,
        [
          item.filename,
          url,
          mime,
          stat.size,
          meta.width || 1920,
          meta.height || 1080,
          item.alt,
          item.caption,
          item.category,
        ]
      );
      console.log(`[Seed Media] Inserted: ${item.filename}`);
    } else {
      await client.query(
        `UPDATE media
         SET url = $1, thumbnail_u_r_l = $1, mime_type = $2, filesize = $3,
             width = $4, height = $5, alt = $6, caption = $7, category = $8,
             source_type = 'brand', updated_at = NOW()
         WHERE id = $9;`,
        [
          url,
          mime,
          stat.size,
          meta.width || 1920,
          meta.height || 1080,
          item.alt,
          item.caption,
          item.category,
          existing.rows[0].id,
        ]
      );
      console.log(`[Seed Media] Updated: ${item.filename}`);
    }
  }

  const count = await client.query("SELECT COUNT(*) FROM media;");
  console.log(`[Seed Media] Total reconciled media assets in database: ${count.rows[0].count}`);
  await client.end();
}

seedMedia().catch((err) => {
  console.error("[Seed Media] Error:", err);
  process.exit(1);
});
