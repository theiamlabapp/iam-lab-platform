import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/dbPool";
import {
  getAuthenticatedStaffUser,
  hasEnquiryClearance,
} from "@/payload/access/serverAuth";

const DEFAULT_PAGE_SIZE = 12;

/**
 * Ensures notifications schema exists lazily if first invoked before migration runs.
 */
export async function ensureNotificationsTable(
  pool: NonNullable<ReturnType<typeof getDbPool>>
) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id SERIAL PRIMARY KEY,
      enquiry_id INTEGER UNIQUE REFERENCES enquiries(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      enquiry_name VARCHAR(255) NOT NULL DEFAULT '',
      enquiry_email VARCHAR(255) NOT NULL DEFAULT '',
      enquiry_type VARCHAR(64) NOT NULL DEFAULT 'general',
      is_read BOOLEAN NOT NULL DEFAULT false,
      read_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_notifications_unread_created
      ON notifications (is_read, created_at DESC);
  `);
}

/**
 * GET /api/admin/notifications?page=1&limit=12&filter=all|unread|read
 * Restricted strictly to authenticated admin / enquiry staff.
 */
export async function GET(req: Request) {
  const user = await getAuthenticatedStaffUser(req.headers);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasEnquiryClearance(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 500 }
    );
  }

  try {
    await ensureNotificationsTable(pool);

    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || "1") || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(url.searchParams.get("limit") || DEFAULT_PAGE_SIZE) || DEFAULT_PAGE_SIZE)
    );
    const filterRaw = (url.searchParams.get("filter") || "all").toLowerCase();
    const filter =
      filterRaw === "unread" || filterRaw === "read" ? filterRaw : "all";

    const whereClause =
      filter === "unread"
        ? "WHERE is_read = false"
        : filter === "read"
        ? "WHERE is_read = true"
        : "";
    const offset = (page - 1) * limit;

    const [listRes, unreadRes, totalRes, filteredCountRes] = await Promise.all([
      pool.query(
        `SELECT id, enquiry_id, title, message, enquiry_name, enquiry_email, enquiry_type, is_read, read_at, created_at
         FROM notifications
         ${whereClause}
         ORDER BY created_at DESC, id DESC
         LIMIT $1 OFFSET $2;`,
        [limit, offset]
      ),
      pool.query(
        `SELECT COUNT(*)::int AS count FROM notifications WHERE is_read = false;`
      ),
      pool.query(`SELECT COUNT(*)::int AS count FROM notifications;`),
      pool.query(
        `SELECT COUNT(*)::int AS count FROM notifications ${whereClause};`
      ),
    ]);

    const unreadCount = Number(unreadRes.rows[0]?.count ?? 0);
    const totalAll = Number(totalRes.rows[0]?.count ?? 0);
    const totalFiltered = Number(filteredCountRes.rows[0]?.count ?? 0);
    const totalPages = Math.max(1, Math.ceil(totalFiltered / limit));

    return NextResponse.json({
      notifications: listRes.rows.map((r) => ({
        id: Number(r.id),
        enquiryId: r.enquiry_id ? Number(r.enquiry_id) : null,
        title: String(r.title || ""),
        message: String(r.message || ""),
        enquiryName: String(r.enquiry_name || ""),
        enquiryEmail: String(r.enquiry_email || ""),
        enquiryType: String(r.enquiry_type || "general"),
        isRead: Boolean(r.is_read),
        readAt: r.read_at ? String(r.read_at) : null,
        createdAt: r.created_at ? String(r.created_at) : new Date().toISOString(),
      })),
      unreadCount,
      totalAll,
      readCount: Math.max(0, totalAll - unreadCount),
      totalFiltered,
      page,
      limit,
      totalPages,
    });
  } catch (err) {
    console.error("[GET /api/admin/notifications] Error:", err);
    return NextResponse.json(
      { error: "Failed to load notifications." },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/notifications
 * Marks individual or all notifications as read/unread.
 */
export async function PATCH(req: Request) {
  const user = await getAuthenticatedStaffUser(req.headers);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasEnquiryClearance(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pool = getDbPool();
  if (!pool) {
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 500 }
    );
  }

  try {
    await ensureNotificationsTable(pool);
    const body = (await req.json().catch(() => ({}))) as {
      action?: "markRead" | "markUnread" | "markAllRead";
      id?: number | string;
    };

    const action = body.action;
    if (action === "markAllRead") {
      await pool.query(
        `UPDATE notifications
         SET is_read = true, read_at = COALESCE(read_at, NOW()), updated_at = NOW()
         WHERE is_read = false;`
      );
    } else if (action === "markRead" && body.id !== undefined) {
      const id = Number(body.id);
      if (!Number.isFinite(id) || id <= 0) {
        return NextResponse.json({ error: "Invalid notification ID." }, { status: 400 });
      }
      await pool.query(
        `UPDATE notifications
         SET is_read = true, read_at = COALESCE(read_at, NOW()), updated_at = NOW()
         WHERE id = $1;`,
        [id]
      );
    } else if (action === "markUnread" && body.id !== undefined) {
      const id = Number(body.id);
      if (!Number.isFinite(id) || id <= 0) {
        return NextResponse.json({ error: "Invalid notification ID." }, { status: 400 });
      }
      await pool.query(
        `UPDATE notifications
         SET is_read = false, read_at = NULL, updated_at = NOW()
         WHERE id = $1;`,
        [id]
      );
    } else {
      return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
    }

    const unreadRes = await pool.query(
      `SELECT COUNT(*)::int AS count FROM notifications WHERE is_read = false;`
    );

    return NextResponse.json({
      ok: true,
      unreadCount: Number(unreadRes.rows[0]?.count ?? 0),
    });
  } catch (err) {
    console.error("[PATCH /api/admin/notifications] Error:", err);
    return NextResponse.json(
      { error: "Failed to update notification status." },
      { status: 500 }
    );
  }
}
