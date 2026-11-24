import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { getDbPool } from "@/lib/dbPool";
import { getAuthenticatedStaffUser } from "@/payload/access/serverAuth";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

function sanitizeFilename(raw: string): string {
  const base = path.basename(raw || "asset.jpg").toLowerCase();
  return base.replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-");
}

/**
 * Updates metadata (alt text, caption, category, filename) or replaces the binary image of an asset.
 */
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedStaffUser(req.headers);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const mediaId = Number(id);
  if (!Number.isInteger(mediaId) || mediaId <= 0) {
    return NextResponse.json({ error: "Invalid asset ID" }, { status: 400 });
  }

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: "Database connection unavailable" },
      { status: 500 }
    );
  }

  try {
    const existingRes = await pool.query(
      `SELECT id, filename, url, source_type, alt, caption, category FROM media WHERE id = $1 LIMIT 1;`,
      [mediaId]
    );
    if (existingRes.rows.length === 0) {
      return NextResponse.json({ error: "Media asset not found" }, { status: 404 });
    }
    const existing = existingRes.rows[0];

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file");
      const alt = String(formData.get("alt") || existing.alt || "").trim();
      const caption = String(formData.get("caption") || existing.caption || "").trim();
      const category = String(formData.get("category") || existing.category || "hero").trim();

      if (file instanceof File) {
        if (!ALLOWED_MIME_TYPES.has(file.type)) {
          return NextResponse.json(
            { error: "Unsupported image format. Allowed: JPG, PNG, WebP, GIF." },
            { status: 400 }
          );
        }
        if (file.size > MAX_UPLOAD_BYTES) {
          return NextResponse.json(
            { error: "Replacement image exceeds 8 MB." },
            { status: 400 }
          );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const meta = await sharp(buffer).metadata();
        const ext = path.extname(sanitizeFilename(file.name)) || ".jpg";
        const newFilename = `${path.basename(sanitizeFilename(existing.filename), path.extname(existing.filename))}-v${Date.now()}${ext}`;
        const newUrl = `/api/assets/${newFilename}`;

        const updated = await pool.query(
          `UPDATE media
           SET filename = $1, url = $2, thumbnail_u_r_l = $2, mime_type = $3,
               filesize = $4, width = $5, height = $6, alt = $7, caption = $8,
               category = $9, source_type = 'uploaded', asset_data = $10, updated_at = NOW()
           WHERE id = $11
           RETURNING id, filename, url, mime_type, filesize, width, height, alt, caption, category, source_type, updated_at;`,
          [
            newFilename,
            newUrl,
            file.type,
            buffer.length,
            meta.width || 0,
            meta.height || 0,
            alt,
            caption,
            category,
            buffer,
            mediaId,
          ]
        );

        // If any pages referenced the previous URL, update references cleanly
        const oldUrl = String(existing.url || "");
        if (oldUrl && oldUrl !== newUrl) {
          const pagesRes = await pool.query(`SELECT id, sections FROM pages;`);
          for (const p of pagesRes.rows) {
            const rawJson = JSON.stringify(p.sections || []);
            if (rawJson.includes(oldUrl)) {
              const replaced = rawJson.split(oldUrl).join(newUrl);
              await pool.query(`UPDATE pages SET sections = $1, updated_at = NOW() WHERE id = $2;`, [
                replaced,
                p.id,
              ]);
            }
          }
        }

        return NextResponse.json({ asset: updated.rows[0] });
      }
    }

    // Standard JSON metadata update
    const body = (await req.json()) as {
      alt?: string;
      caption?: string;
      category?: string;
      filename?: string;
    };

    const nextAlt = (body.alt ?? existing.alt ?? "").trim();
    const nextCaption = (body.caption ?? existing.caption ?? "").trim();
    const nextCategory = (body.category ?? existing.category ?? "hero").trim();

    if (!nextAlt) {
      return NextResponse.json(
        { error: "Alternative text is required for accessibility." },
        { status: 400 }
      );
    }

    // Only allow renaming URL-slug filename cleanly for DB-stored uploads (keeps static /brand/ paths unbroken)
    let nextFilename = existing.filename;
    let nextUrl = existing.url;
    if (
      body.filename &&
      existing.source_type === "uploaded" &&
      body.filename.trim() !== existing.filename
    ) {
      nextFilename = sanitizeFilename(body.filename.trim());
      nextUrl = `/api/assets/${nextFilename}`;
    }

    const updated = await pool.query(
      `UPDATE media
       SET alt = $1, caption = $2, category = $3, filename = $4, url = $5, thumbnail_u_r_l = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING id, filename, url, mime_type, filesize, width, height, alt, caption, category, source_type, updated_at;`,
      [nextAlt, nextCaption, nextCategory, nextFilename, nextUrl, mediaId]
    );

    return NextResponse.json({ asset: updated.rows[0] });
  } catch (err) {
    console.error("[PATCH /api/admin/media/[id]] Error:", err);
    return NextResponse.json(
      { error: "Failed to update asset." },
      { status: 500 }
    );
  }
}

/**
 * Safely deletes an asset, preventing deletion of core logos or assets actively referenced unless forced.
 */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedStaffUser(req.headers);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const mediaId = Number(id);
  if (!Number.isInteger(mediaId) || mediaId <= 0) {
    return NextResponse.json({ error: "Invalid asset ID" }, { status: 400 });
  }

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: "Database connection unavailable" },
      { status: 500 }
    );
  }

  try {
    const existingRes = await pool.query(
      `SELECT id, filename, url, category FROM media WHERE id = $1 LIMIT 1;`,
      [mediaId]
    );
    if (existingRes.rows.length === 0) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }
    const existing = existingRes.rows[0];

    if (existing.category === "logo" && String(existing.filename).includes("the-iam-lab-logo")) {
      return NextResponse.json(
        { error: "Core brand trademark logos are protected from deletion." },
        { status: 400 }
      );
    }

    const reqUrl = new URL(req.url);
    const force = reqUrl.searchParams.get("force") === "true";

    if (!force) {
      const pagesRes = await pool.query(`SELECT title, sections FROM pages;`);
      const usedPages = pagesRes.rows
        .filter((p) => JSON.stringify(p.sections || []).includes(String(existing.url)))
        .map((p) => p.title);

      if (usedPages.length > 0) {
        return NextResponse.json(
          {
            error: `Asset is currently active on page(s): ${usedPages.join(", ")}. Reassign those sections first or confirm safe removal.`,
            usedPages,
          },
          { status: 409 }
        );
      }
    }

    await pool.query(`DELETE FROM media WHERE id = $1;`, [mediaId]);
    return NextResponse.json({ deleted: true, id: mediaId });
  } catch (err) {
    console.error("[DELETE /api/admin/media/[id]] Error:", err);
    return NextResponse.json(
      { error: "Failed to delete media asset." },
      { status: 500 }
    );
  }
}
