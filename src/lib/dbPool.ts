import { Pool, type QueryResult, type QueryResultRow } from "pg";

declare global {
  var __iamLabPgPool: Pool | undefined;
}

const TRANSIENT_PG_CODES = new Set([
  "57P01", // admin_shutdown
  "57P02", // crash_shutdown
  "57P03", // cannot_connect_now
  "53300", // too_many_connections
  "08000", // connection_exception
  "08003", // connection_does_not_exist
  "08006", // connection_failure
  "08001", // sqlclient_unable_to_establish_sqlconnection
]);

const TRANSIENT_ERROR_PATTERNS = [
  "connection terminated",
  "econnreset",
  "etimedout",
  "epipe",
  "econnrefused",
  "connection timeout",
  "timeout exceeded when trying to connect",
  "maxclientsinsessionmode",
  "too many clients",
  "remaining connection slots are reserved",
  "client has encountered a connection error",
  "server closed the connection unexpectedly",
  "socket hang up",
];

/**
 * Returns true if an error represents a transient network, socket, or pooler interruption
 * rather than a logical SQL error or authentication rejection.
 */
export function isTransientDbError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const errObj = err as { code?: unknown; message?: unknown; cause?: unknown };
  const code = typeof errObj.code === "string" ? errObj.code.toUpperCase() : "";
  if (code && TRANSIENT_PG_CODES.has(code)) return true;

  const msg =
    typeof errObj.message === "string" ? errObj.message.toLowerCase() : "";
  if (TRANSIENT_ERROR_PATTERNS.some((p) => msg.includes(p))) {
    return true;
  }

  if (errObj.cause && errObj.cause !== err) {
    return isTransientDbError(errObj.cause);
  }
  return false;
}

/**
 * Retries strictly idempotent read operations on transient Supabase/PostgreSQL
 * connection drops with short bounded jitter. Never use for non-idempotent writes.
 */
export async function withTransientDbRetry<T>(
  operation: () => Promise<T>,
  options?: { maxRetries?: number; baseDelayMs?: number; label?: string }
): Promise<T> {
  const maxRetries = options?.maxRetries ?? 2;
  const baseDelayMs = options?.baseDelayMs ?? 160;
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt >= maxRetries || !isTransientDbError(err)) {
        throw err;
      }
      const delay = baseDelayMs * (attempt + 1) + Math.floor(Math.random() * 60);
      console.warn(
        `[DB Retry ${attempt + 1}/${maxRetries}]${options?.label ? ` (${options.label})` : ""}:`,
        err instanceof Error ? err.message : err
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Returns a serverless-tuned SSL-configured PostgreSQL connection pool for Supabase.
 * Sized tightly to avoid exhausting Supabase Session Pooler client limits across concurrent lambdas.
 */
export function getDbPool(): Pool | null {
  const rawDbUri = (process.env.DATABASE_URI || "")
    .trim()
    .replace(/^["']|["']$/g, "");

  if (!rawDbUri) return null;

  if (!globalThis.__iamLabPgPool) {
    const pool = new Pool({
      connectionString: rawDbUri,
      ssl:
        rawDbUri.includes("supabase") ||
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : undefined,
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 12000,
      allowExitOnIdle: true,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    });

    pool.on("error", (err) => {
      console.error("[pgPool] Unexpected idle client error (auto-evicted):", err.message);
    });

    globalThis.__iamLabPgPool = pool;
  }

  return globalThis.__iamLabPgPool;
}

/**
 * Executes an idempotent SQL query with automatic retry on transient connection drops.
 */
export async function queryWithRetry<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[],
  label?: string
): Promise<QueryResult<T> | null> {
  const pool = getDbPool();
  if (!pool) return null;
  return withTransientDbRetry(() => pool.query<T>(sql, params), {
    maxRetries: 2,
    baseDelayMs: 160,
    label,
  });
}
