import { Pool } from "pg";

declare global {
  var __iamLabPgPool: Pool | undefined;
}

/**
 * Returns a shared SSL-configured PostgreSQL connection pool for Supabase.
 */
export function getDbPool(): Pool | null {
  const rawDbUri = (process.env.DATABASE_URI || "")
    .trim()
    .replace(/^["']|["']$/g, "");

  if (!rawDbUri) return null;

  if (!globalThis.__iamLabPgPool) {
    globalThis.__iamLabPgPool = new Pool({
      connectionString: rawDbUri,
      ssl:
        rawDbUri.includes("supabase") ||
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : undefined,
      max: 8,
      idleTimeoutMillis: 20000,
      connectionTimeoutMillis: 5000,
    });
  }

  return globalThis.__iamLabPgPool;
}
