import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/dbPool";

export async function GET(
  _req: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const cleanName = path.basename(filename || "");

  if (!cleanName || cleanName.includes("..")) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  // 1. Check PostgreSQL stored uploaded assets first (persistent on Vercel serverless)
  const pool = getDbPool();
  if (pool) {
    try {
      const res = await pool.query(
        `SELECT asset_data, mime_type, updated_at
         FROM media
         WHERE filename = $1 AND asset_data IS NOT NULL
         LIMIT 1;`,
        [cleanName]
      );

      if (res.rows.length > 0 && res.rows[0].asset_data) {
        const buffer = res.rows[0].asset_data as Buffer;
        const mimeType =
          (res.rows[0].mime_type as string) || "application/octet-stream";

        return new NextResponse(new Uint8Array(buffer), {
          status: 200,
          headers: {
            "Content-Type": mimeType,
            "Content-Length": String(buffer.length),
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
          },
        });
      }
    } catch (err) {
      console.error("[GET /api/assets] DB stream error:", err);
    }
  }

  // 2. Fallback to static disk file in public/brand if present
  const brandPath = path.join(process.cwd(), "public", "brand", cleanName);
  if (fs.existsSync(brandPath)) {
    const fileBuf = fs.readFileSync(brandPath);
    const ext = path.extname(cleanName).toLowerCase();
    const mime =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".jpg" || ext === ".jpeg"
            ? "image/jpeg"
            : "application/octet-stream";

    return new NextResponse(new Uint8Array(fileBuf), {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  return NextResponse.json({ error: "Asset not found" }, { status: 404 });
}
