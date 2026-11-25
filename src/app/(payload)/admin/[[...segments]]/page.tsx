import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import config from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { isTransientDbError, withTransientDbRetry } from "@/lib/dbPool";
import {
  getStaffSessionState,
  hasEnquiryClearance,
} from "@/payload/access/serverAuth";
import { importMap } from "../importMap";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Args): Promise<Metadata> => {
  try {
    return await generatePageMetadata({ config, params, searchParams });
  } catch {
    return {
      title: "The IAM Lab Admin",
    };
  }
};

function DatabaseRecoveryPanel({
  message,
}: {
  message?: string;
}) {
  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "5px 14px",
          borderRadius: "999px",
          backgroundColor: "#FEF3C7",
          border: "1px solid #FDE68A",
          color: "#92400E",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: "14px",
        }}
      >
        Temporary Database Interruption — Session Preserved
      </div>

      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#0B1424",
          margin: "0 0 10px 0",
        }}
      >
        Reconnecting to Database
      </h1>

      <p
        style={{
          fontSize: "14px",
          color: "#64748B",
          maxWidth: "460px",
          lineHeight: 1.6,
          margin: "0 0 24px 0",
        }}
      >
        {message ||
          "A brief Supabase connection interruption occurred. Your administrator session remains intact — retry immediately without signing in again."}
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <a
          href=""
          style={{
            padding: "10px 20px",
            backgroundColor: "#0B1424",
            color: "#FFFFFF",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Retry Connection
        </a>
        <Link
          href="/admin"
          prefetch={false}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FFFFFF",
            color: "#0B1424",
            border: "1px solid #CBD5E1",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

const Page = async ({ params, searchParams }: Args) => {
  const resolvedParams = await params;

  if (resolvedParams?.segments?.[0] === "notifications") {
    const reqHeaders = await headers();
    const session = await getStaffSessionState(reqHeaders);
    if (session.status === "db_error") {
      return <DatabaseRecoveryPanel message={session.message} />;
    }
    if (session.status === "unauthenticated") {
      redirect("/admin/login");
    }
    if (!hasEnquiryClearance(session.user)) {
      redirect("/admin/unauthorized");
    }
  }

  try {
    return await withTransientDbRetry(
      () => RootPage({ config, params, searchParams, importMap }),
      { maxRetries: 2, baseDelayMs: 200, label: "admin:RootPage" }
    );
  } catch (err) {
    // Re-throw Next.js control-flow errors (redirect, notFound, etc.) untouched
    const digest =
      err && typeof err === "object" && "digest" in err
        ? String((err as { digest?: unknown }).digest || "")
        : "";
    if (
      digest.startsWith("NEXT_REDIRECT") ||
      digest.startsWith("NEXT_HTTP_ERROR_FALLBACK") ||
      digest === "NEXT_NOT_FOUND"
    ) {
      throw err;
    }

    if (isTransientDbError(err)) {
      console.error("[Admin RootPage] Persistent transient DB failure after retries:", err);
      return <DatabaseRecoveryPanel />;
    }

    throw err;
  }
};

export default Page;
