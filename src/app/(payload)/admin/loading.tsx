import React from "react";
import Image from "next/image";

export default function AdminLoading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        width: "100%",
        padding: "48px 24px",
        boxSizing: "border-box",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          padding: "6px",
          boxShadow: "0 4px 16px rgba(11, 20, 36, 0.08)",
          marginBottom: "16px",
        }}
      >
        <Image
          src="/brand/the-iam-lab-logo.png"
          alt="The IAM Lab"
          width={36}
          height={36}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
          priority
        />
      </div>

      <div
        style={{
          width: "28px",
          height: "28px",
          border: "2px solid #E2E8F0",
          borderTopColor: "#D89A43",
          borderRadius: "50%",
          animation: "iam-spin 0.8s linear infinite",
          marginBottom: "16px",
        }}
      />

      <span
        style={{
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#718096",
        }}
      >
        Connecting Enterprise Console...
      </span>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes iam-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `,
        }}
      />
    </div>
  );
}
