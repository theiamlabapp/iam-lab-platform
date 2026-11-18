"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Error Boundary Caught]:", error);
  }, [error]);

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
          backgroundColor: "#FEF2F2",
          border: "1px solid #FEE2E2",
          color: "#991B1B",
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        <span>Database Session Resumption Required</span>
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
        Administration Console Notice
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
        The administration platform encountered a momentary connection interruption with the Supabase database. You can retry immediately.
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => reset()}
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

        <Link
          href="/admin"
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
          Error Digest: {error.digest}
        </span>
      )}
    </div>
  );
}
