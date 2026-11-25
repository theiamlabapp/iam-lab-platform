"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAdminAction } from "../actions/loginAction";

export function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("iam_lab_remembered_admin_email") || "";
      } catch {
        return "";
      }
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage("Please enter your work email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // 1. Primary Authentication: Next.js Direct Server Action
      // Sets the payload-token HTTP-only cookie natively in Vercel server response headers
      const actionResult = await loginAdminAction({
        email: cleanEmail,
        password,
      });

      if (actionResult.success) {
        if (rememberMe) {
          try {
            localStorage.setItem("iam_lab_remembered_admin_email", cleanEmail);
          } catch {
            // ignore
          }
        } else {
          try {
            localStorage.removeItem("iam_lab_remembered_admin_email");
          } catch {
            // ignore
          }
        }

        setSuccessMessage("Authentication verified. Redirecting...");

        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = redirectParam;
          } else {
            router.push(redirectParam);
          }
        }, 400);
        return;
      }

      // If Server Action reported credential mismatch or user lock
      if (actionResult.error) {
        setErrorMessage(actionResult.error);
        setLoading(false);
        return;
      }
    } catch (serverActionErr) {
      console.warn("[LoginView] Server Action fallback triggered:", serverActionErr);
      // 2. Secondary Fallback: REST endpoint
      try {
        const res = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: cleanEmail,
            password,
          }),
        });

        const data = await res.json();

        if (res.ok && data?.user) {
          if (rememberMe) {
            try {
              localStorage.setItem("iam_lab_remembered_admin_email", cleanEmail);
            } catch {
              // ignore
            }
          }

          setSuccessMessage("Authentication verified. Redirecting...");

          setTimeout(() => {
            if (typeof window !== "undefined") {
              window.location.href = redirectParam;
            } else {
              router.push(redirectParam);
            }
          }, 400);
          return;
        } else {
          const errorText =
            data?.errors?.[0]?.message ||
            data?.message ||
            "The email or password provided is incorrect. Please verify your credentials.";
          setErrorMessage(errorText);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("[LoginView] Request error:", err);
        setErrorMessage("A network error occurred. Please check your connection and try again.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="iam-login-split">
      {/* ========================================================
          LEFT: Enterprise IAM Governance & Security Composition
          Photorealistic enterprise infrastructure backdrop beneath
          a strong Midnight Navy gradient overlay, grid lines, and
          Connected Identity Fabric diagram with gold accents.
          ======================================================== */}
      <div className="iam-login-visual-panel" aria-hidden="true">
        <Image
          src="/brand/admin-login-enterprise-bg.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="iam-login-bg-photo"
        />
        <div className="iam-login-bg-overlay" />

        {/* Atmospheric background grid & subtle accent glows */}
        <div className="iam-login-grid-bg" />
        <div className="iam-login-glow-top" />
        <div className="iam-login-glow-bottom" />

        <div className="iam-login-visual-inner">
          {/* Core Headline */}
          <div className="iam-login-visual-copy">
            <h2 className="iam-login-visual-title">
              Centralised Identity Control &amp; Assurance
            </h2>
            <p className="iam-login-visual-desc">
              Govern digital identities, access policies, client enquiries, and corporate platform operations from one unified console.
            </p>
          </div>

          {/* Connected Identity Fabric Diagram */}
          <div className="iam-login-stage">
            <div className="iam-login-glass-card iam-login-card-primary">
              <div className="iam-login-card-header">
                <span className="iam-login-card-label">Connected Identity Fabric</span>
                <span className="iam-login-card-badge">ZERO-TRUST POSTURE</span>
              </div>

              <svg
                viewBox="0 0 420 150"
                className="iam-login-topology-svg"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connecting gold & slate hairlines */}
                <path
                  d="M210 38 L78 106 M210 38 L166 106 M210 38 L254 106 M210 38 L342 106"
                  stroke="rgba(216, 154, 67, 0.45)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M78 106 H342"
                  stroke="rgba(148, 163, 184, 0.25)"
                  strokeWidth="1"
                />

                {/* Central Policy Hub */}
                <rect x="136" y="14" width="148" height="36" rx="8" fill="#14243B" stroke="#D89A43" strokeWidth="1.4" />
                <circle cx="154" cy="32" r="5" fill="#D89A43" />
                <text x="166" y="36" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
                  IAM Control Core
                </text>

                {/* Four Connected Governance Nodes */}
                {[
                  { x: 40, label: "IGA", sub: "Governance" },
                  { x: 128, label: "SSO", sub: "Auth Policy" },
                  { x: 216, label: "JML", sub: "Lifecycle" },
                  { x: 304, label: "PAM", sub: "Privileged" },
                ].map((node) => (
                  <g key={node.label}>
                    <rect
                      x={node.x}
                      y="92"
                      width="76"
                      height="46"
                      rx="7"
                      fill="rgba(11, 20, 36, 0.85)"
                      stroke="rgba(148, 163, 184, 0.35)"
                      strokeWidth="1"
                    />
                    <text
                      x={node.x + 38}
                      y="112"
                      textAnchor="middle"
                      fill="#D89A43"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="monospace"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x + 38}
                      y="127"
                      textAnchor="middle"
                      fill="#CBD5E1"
                      fontSize="9.5"
                      fontFamily="system-ui, sans-serif"
                    >
                      {node.sub}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT: Clean white / warm-white authentication panel
          Display logo ONLY ONCE above login heading.
          ======================================================== */}
      <div className="iam-login-card-panel">
        <div className="iam-login-card-inner">
          {/* Logo ONLY ONCE above the heading */}
          <div className="iam-login-logo-wrap">
            <Image
              src="/brand/the-iam-lab-logo.png"
              alt="The IAM Lab"
              width={48}
              height={48}
              priority
              className="iam-login-single-logo"
            />
          </div>

          <div className="iam-login-heading-group">
            <h1 className="iam-login-title">Sign in to Console</h1>
            <p className="iam-login-subtitle">
              Sign in to manage The IAM Lab enterprise platform.
            </p>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="iam-login-alert iam-alert-danger" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="iam-login-alert iam-alert-ok" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="iam-login-form" noValidate>
            <div className="iam-field-group">
              <label htmlFor="iam-admin-email" className="iam-field-label">
                Work Email
              </label>
              <input
                id="iam-admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@theiamlab.com"
                autoComplete="email"
                disabled={loading}
                required
                className="iam-field-input"
              />
            </div>

            <div className="iam-field-group">
              <div className="iam-field-label-row">
                <label htmlFor="iam-admin-password" className="iam-field-label">
                  Password
                </label>
                <Link href="/admin/forgot" className="iam-link-forgot">
                  Forgot password?
                </Link>
              </div>
              <div className="iam-input-relative">
                <input
                  id="iam-admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                  className="iam-field-input iam-input-with-toggle"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="iam-toggle-visibility"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="iam-field-remember">
              <label className="iam-checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="iam-checkbox-native"
                />
                <span className="iam-checkbox-text">Remember email</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`iam-btn-primary ${loading ? "iam-btn-busy" : ""}`}
            >
              {loading ? (
                <>
                  <span className="iam-btn-spinner" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="iam-login-footer-nav">
            <Link href="/" className="iam-link-return">
              &larr; Back to theiamlab.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
