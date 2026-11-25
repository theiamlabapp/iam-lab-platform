"use client";

import React, { useEffect, useState } from "react";

export function RecaptchaStatusField() {
  const [status, setStatus] = useState<"checking" | "configured" | "missing" | "restricted">(
    "checking"
  );

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin/recaptcha-status", { credentials: "include" })
      .then(async (res) => {
        if (!mounted) return;
        if (res.status === 403 || res.status === 401) {
          setStatus("restricted");
          return;
        }
        const data = await res.json().catch(() => ({}));
        setStatus(data?.secretConfigured ? "configured" : "missing");
      })
      .catch(() => {
        if (mounted) setStatus("missing");
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "16px 18px",
        borderRadius: "8px",
        border: "1px solid #CBD5E1",
        backgroundColor: "#F8FAFC",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "8px",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#0B1424", textTransform: "uppercase" }}>
          Server Secret Key Status
        </span>

        {status === "checking" && (
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748B" }}>
            Checking environment...
          </span>
        )}
        {status === "configured" && (
          <span
            style={{
              backgroundColor: "#ECFDF5",
              color: "#065F46",
              border: "1px solid #A7F3D0",
              borderRadius: "9999px",
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            RECAPTCHA_SECRET_KEY Detected on Server
          </span>
        )}
        {status === "missing" && (
          <span
            style={{
              backgroundColor: "#FEF3C7",
              color: "#92400E",
              border: "1px solid #FDE68A",
              borderRadius: "9999px",
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            Pending Server Variable: RECAPTCHA_SECRET_KEY
          </span>
        )}
        {status === "restricted" && (
          <span style={{ fontSize: "11px", color: "#64748B" }}>
            Administrator clearance required
          </span>
        )}
      </div>

      <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.6, color: "#475569" }}>
        For security, your Google reCAPTCHA secret key is never stored in the CMS or exposed to browsers. Add{" "}
        <code>RECAPTCHA_SECRET_KEY</code> inside <strong>Vercel Project Settings &rarr; Environment Variables</strong> for{" "}
        <strong>Preview</strong> and <strong>Production</strong>, then enable reCAPTCHA above and confirm whether your key is{" "}
        <strong>v2 (Checkbox)</strong> or <strong>v3 (Invisible)</strong>.
      </p>
    </div>
  );
}

export default RecaptchaStatusField;
