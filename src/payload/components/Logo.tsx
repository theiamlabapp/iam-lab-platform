import Image from "next/image";
import React from "react";

export function Logo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px 0",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Image
          src="/brand/the-iam-lab-logo.png"
          alt="The IAM Lab"
          width={32}
          height={32}
          style={{ objectFit: "contain", width: "100%", height: "100%" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "-0.01em",
            color: "#ffffff",
          }}
        >
          THE IAM LAB
        </span>
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "10px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#d6a15c",
          }}
        >
          Enterprise Console
        </span>
      </div>
    </div>
  );
}

export default Logo;
