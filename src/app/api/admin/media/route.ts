import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { getDbPool } from "@/lib/dbPool";
import { getAuthenticatedStaffUser, hasEditorialClearance } from "@/payload/access/serverAuth";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB

function sanitizeFilename(raw: string): string {
  const base = path.basename(raw || "upload.jpg").toLowerCase();
  return base.replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-");
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const kb = Math.round(bytes / 1024);
  if (kb < 1024) return `${kb} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Lists all media assets reconciled in Supabase along with where each asset is referenced.
 */
export async function GET(req: Request) {
  const user = await getAuthenticatedStaffUser(req.headers);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: "Database connection unavailable" },
      { status: 500 }
    );
  }

  try {
    const [mediaRes, pagesRes, usersRes] = await Promise.all([
      pool.query(`
        SELECT id, filename, url, mime_type, filesize, width, height, alt, caption,
               category, source_type, created_at, updated_at
        FROM media
        ORDER BY CASE WHEN source_type = 'uploaded' THEN 0 ELSE 1 END, updated_at DESC, id DESC;
      `),
      pool.query(`SELECT slug, title, sections FROM pages;`),
      pool.query(`SELECT name, email, avatar_url FROM users;`),
    ]);

    const pages = pagesRes.rows as Array<{
      slug: string;
      title: string;
      sections?: unknown;
    }>;
    const users = usersRes.rows as Array<{
      name?: string;
      email: string;
      avatar_url?: string;
    }>;

    const assets = mediaRes.rows.map((row) => {
      const assetUrl = String(row.url || "");
      const usedIn: string[] = [];

      for (const p of pages) {
        const serialized = JSON.stringify(p.sections || []);
        if (assetUrl && serialized.includes(assetUrl)) {
          usedIn.push(`Page: ${p.title || p.slug}`);
        }
      }

      for (const u of users) {
        if (u.avatar_url && assetUrl && u.avatar_url === assetUrl) {
          usedIn.push(`Profile: ${u.name || u.email}`);
        }
      }

      return {
        id: row.id,
        filename: row.filename,
        url: assetUrl,
        mimeType: row.mime_type || "image/jpeg",
        filesize: Number(row.filesize || 0),
        sizeLabel: formatBytes(Number(row.filesize || 0)),
        width: Number(row.width || 0),
        height: Number(row.height || 0),
        dimensions:
          row.width && row.height ? `${row.width} × ${row.height}` : "Responsive",
        alt: row.alt || "",
        caption: row.caption || "",
        category: row.category || "hero",
        sourceType: row.source_type || "brand",
        usedIn,
        updatedAt: row.updated_at,
      };
    });

    return NextResponse.json({ assets });
  } catch (err) {
    console.error("[GET /api/admin/media] Error:", err);
    return NextResponse.json(
      { error: "Failed to load media repository" },
      { status: 500 }
    );
  }
}

/**
 * Handles serverless-safe image upload directly into Supabase PostgreSQL BYTEA storage.
 */
export async function POST(req: Request) {
  const user = await getAuthenticatedStaffUser(req.headers);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: "Database connection unavailable" },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const altInput = String(formData.get("alt") || "").trim();
    const captionInput = String(formData.get("caption") || "").trim();
    const categoryInput = String(formData.get("category") || "hero").trim();

    if (!hasEditorialClearance(user) && categoryInput !== "portrait") {
      return NextResponse.json(
        { error: "Forbidden: Editorial clearance required to upload library assets." },
        { status: 403 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please attach an image file to upload." },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported format. Allowed: JPG, PNG, WebP, GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "Image exceeds the 8 MB upload limit." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const metadata = await sharp(buffer).metadata();
    const baseName = sanitizeFilename(file.name);
    const ext = path.extname(baseName) || ".jpg";
    const stem = path.basename(baseName, ext);
    const uniqueFilename = `${stem}-${Date.now()}${ext}`;
    const publicUrl = `/api/assets/${uniqueFilename}`;
    const safeAlt = altInput || stem.replace(/[-_]+/g, " ");

    const inserted = await pool.query(
      `INSERT INTO media (
         filename, url, thumbnail_u_r_l, mime_type, filesize, width, height,
         alt, caption, category, source_type, asset_data, created_at, updated_at
       ) VALUES ($1, $2, $2, $3, $4, $5, $6, $7, $8, $9, 'uploaded', $10, NOW(), NOW())
       RETURNING id, filename, url, mime_type, filesize, width, height, alt, caption, category, source_type, updated_at;`,
      [
        uniqueFilename,
        publicUrl,
        file.type,
        buffer.length,
        metadata.width || 0,
        metadata.height || 0,
        safeAlt,
        captionInput || safeAlt,
        categoryInput,
        buffer,
      ]
    );

    const r = inserted.rows[0];
    return NextResponse.json({
      asset: {
        id: r.id,
        filename: r.filename,
        url: r.url,
        mimeType: r.mime_type,
        filesize: Number(r.filesize),
        sizeLabel: formatBytes(Number(r.filesize)),
        width: Number(r.width),
        height: Number(r.height),
        dimensions: r.width && r.height ? `${r.width} × ${r.height}` : "Responsive",
        alt: r.alt,
        caption: r.caption,
        category: r.category,
        sourceType: r.source_type,
        usedIn: [],
        updatedAt: r.updated_at,
      },
    });
  } catch (err) {
    console.error("[POST /api/admin/media] Upload error:", err);
    return NextResponse.json(
      { error: "Failed to process and store uploaded image." },
      { status: 500 }
    );
  }
}
