import { NextResponse } from "next/server";
import { getDbPool, queryWithRetry } from "@/lib/dbPool";
import { getStaffSessionState } from "@/payload/access/serverAuth";

/**
 * Retrieves the authenticated staff/administrator profile directly from Supabase PostgreSQL.
 */
export async function GET(req: Request) {
  const session = await getStaffSessionState(req.headers);
  if (session.status === "db_error") {
    return NextResponse.json(
      { error: session.message, dbInterruption: true },
      { status: 503 }
    );
  }
  if (session.status === "unauthenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sessionUser = session.user;

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: "Database unavailable", dbInterruption: true },
      { status: 503 }
    );
  }

  try {
    const res = await queryWithRetry(
      `SELECT id, email, name, role, job_title, phone, avatar_url, created_at, updated_at
       FROM users
       WHERE id = $1
       LIMIT 1;`,
      [sessionUser.id],
      "profile:get"
    );

    if (!res || res.rows.length === 0) {
      return NextResponse.json({ error: "Account record not found." }, { status: 404 });
    }

    const r = res.rows[0];
    return NextResponse.json({
      profile: {
        id: r.id,
        email: r.email as string,
        name: (r.name as string) || "",
        role: (r.role as string) || sessionUser.role,
        jobTitle: (r.job_title as string) || "Administrator",
        phone: (r.phone as string) || "",
        avatarUrl: typeof r.avatar_url === "string" ? r.avatar_url : "",
        createdAt: r.created_at ? String(r.created_at) : "",
        updatedAt: r.updated_at ? String(r.updated_at) : "",
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/profile] Error:", err);
    return NextResponse.json({ error: "Failed to load profile." }, { status: 500 });
  }
}

/**
 * Updates only safe profile metadata (display name, job title, phone, personal portrait URL)
 * for the currently authenticated administrator/staff account. Never alters email or role.
 */
export async function PATCH(req: Request) {
  const session = await getStaffSessionState(req.headers);
  if (session.status === "db_error") {
    return NextResponse.json(
      { error: session.message, dbInterruption: true },
      { status: 503 }
    );
  }
  if (session.status === "unauthenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sessionUser = session.user;

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 500 });
  }

  try {
    const body = (await req.json()) as {
      name?: string;
      jobTitle?: string;
      phone?: string;
      avatarUrl?: string;
    };

    const name = String(body.name || "").trim();
    if (name.length < 2) {
      return NextResponse.json(
        { error: "Full display name must be at least 2 characters." },
        { status: 400 }
      );
    }

    const jobTitle = String(body.jobTitle || "").trim() || "Administrator";
    const phone = String(body.phone || "").trim();
    const rawAvatar = typeof body.avatarUrl === "string" ? body.avatarUrl.trim() : "";
    // Reject invalid external/script URIs cleanly
    const avatarUrl =
      rawAvatar &&
      (/^\/api\/assets\/[a-zA-Z0-9._-]+$/.test(rawAvatar) ||
        /^\/brand\/[a-zA-Z0-9._-]+$/.test(rawAvatar) ||
        rawAvatar.startsWith("https://"))
        ? rawAvatar
        : "";

    const timestamp = new Date().toISOString();

    const updated = await pool.query(
      `UPDATE users
       SET name = $1, job_title = $2, phone = $3, avatar_url = $4, updated_at = $5
       WHERE id = $6
       RETURNING id, email, name, role, job_title, phone, avatar_url, updated_at;`,
      [name, jobTitle, phone, avatarUrl || null, timestamp, sessionUser.id]
    );

    const r = updated.rows[0];
    return NextResponse.json({
      success: true,
      profile: {
        id: r.id,
        email: r.email as string,
        name: (r.name as string) || "",
        role: (r.role as string) || sessionUser.role,
        jobTitle: (r.job_title as string) || "Administrator",
        phone: (r.phone as string) || "",
        avatarUrl: typeof r.avatar_url === "string" ? r.avatar_url : "",
        updatedAt: r.updated_at ? String(r.updated_at) : "",
      },
    });
  } catch (err) {
    console.error("[PATCH /api/admin/profile] Error:", err);
    return NextResponse.json(
      { error: "Failed to persist profile changes." },
      { status: 500 }
    );
  }
}
