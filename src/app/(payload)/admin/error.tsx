"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("[Admin Error Boundary Caught]:", error);
  }, [error]);

  const msgLower = String(error?.message || "").toLowerCase();
  const isChunkOrNavError =
    msgLower.includes("chunk") ||
    msgLower.includes("loading css") ||
    msgLower.includes("failed to fetch") ||
    msgLower.includes("dynamically imported module");
  const isAuthError =
    msgLower.includes("unauthorized") ||
    msgLower.includes("jwt") ||
    msgLower.includes("token expired");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        width: "100%",
        padding: "48px 24px",
        boxSizing: "border-box",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          padding: "8px",
          boxShadow: "0 4px 20px rgba(11, 20, 36, 0.08)",
          marginBottom: "20px",
        }}
      >
        <Image
          src="/brand/the-iam-lab-logo.png"
          alt="The IAM Lab"
          width={40}
          height={40}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 12px",
          borderRadius: "999px",
          backgroundColor: isAuthError ? "#FEF2F2" : "#FEF3C7",
          border: isAuthError ? "1px solid #FECACA" : "1px solid #FDE68A",
          color: isAuthError ? "#991B1B" : "#92400E",
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        <span>
          {isAuthError
            ? "Session Verification Required"
            : isChunkOrNavError
            ? "Console View Reload Required"
            : "Temporary Database Interruption"}
        </span>
      </div>

      <h1
        style={{
          fontSize: "22px",
          fontWeight: "700",
          color: "#0B1424",
          margin: "0 0 10px 0",
          letterSpacing: "-0.01em",
        }}
      >
        {isAuthError
          ? "Administrator Sign-In Expired"
          : "Administration Console Recovery"}
      </h1>

      <p
        style={{
          fontSize: "14px",
          color: "#64748B",
          maxWidth: "480px",
          lineHeight: "1.6",
          margin: "0 0 24px 0",
        }}
      >
        {isAuthError
          ? "Your administrator session has timed out. Sign in again to resume managing content."
          : isChunkOrNavError
          ? "A navigation asset or view update was detected. Reload the view to continue without losing your session."
          : "A momentary Supabase connection interruption occurred. Your session remains preserved — retry immediately without signing out."}
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        {isAuthError ? (
          <Link
            href="/admin/login"
            style={{
              padding: "10px 20px",
              backgroundColor: "#0B1424",
              color: "#FFFFFF",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign In Again
          </Link>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                router.refresh();
                reset();
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#0B1424",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(11, 20, 36, 0.15)",
              }}
            >
              Retry Connection
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#FFFFFF",
                color: "#0B1424",
                border: "1px solid #CBD5E1",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Reload View
            </button>
          </>
        )}

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
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Return to Dashboard
        </Link>
      </div>

      {error.digest && (
        <span
          style={{
            marginTop: "24px",
            fontSize: "11px",
            color: "#94A3B8",
            fontFamily: "monospace",
          }}
        >
          Reference Digest: {error.digest}
        </span>
      )}
    </div>
  );
}
