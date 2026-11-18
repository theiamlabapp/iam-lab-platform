"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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
      setErrorMessage("Please enter your administrator work email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your administrator password.");
      return;
    }

    setLoading(true);

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
            // ignore localStorage errors
          }
        } else {
          try {
            localStorage.removeItem("iam_lab_remembered_admin_email");
          } catch {
            // ignore
          }
        }

        setSuccessMessage("Authentication verified. Redirecting to Enterprise Console...");

        // Ensure browser receives and applies the payload-token cookie before reload
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.href = redirectParam;
          } else {
            router.push(redirectParam);
          }
        }, 600);
      } else {
        const errorText =
          data?.errors?.[0]?.message ||
          data?.message ||
          "The email or password provided is incorrect. Please check your credentials and try again.";
        setErrorMessage(errorText);
        setLoading(false);
      }
    } catch (err) {
      console.error("[LoginView] Authentication request error:", err);
      setErrorMessage(
        "A network error occurred while contacting the authentication service. Please check your connection and try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="the-iam-lab-split-login">
      {/* ========================================================
          LEFT SECTION — Approximately 50% width on Desktop
          Cinematic Photographic Backdrop + Identity Network Mesh
          ======================================================== */}
      <div className="iam-login-brand-panel">
        {/* Background Image Layer */}
        <div className="iam-login-bg-layer">
          <Image
            src="/brand/corporate-hero.jpg"
            alt="The IAM Lab Enterprise Security"
            fill
            priority
            className="iam-login-bg-img"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="iam-login-bg-gradient" />
        </div>

        {/* Content Container */}
        <div className="iam-login-brand-content">
          {/* Brand Header */}
          <div className="iam-login-brand-top">
            <div className="iam-login-logo-box">
              <Image
                src="/brand/the-iam-lab-logo.png"
                alt="The IAM Lab"
                width={36}
                height={36}
                className="iam-login-logo-img"
              />
            </div>
            <div className="iam-login-brand-name-group">
              <span className="iam-login-brand-name">THE IAM LAB</span>
              <span className="iam-login-brand-tag">Enterprise Identity Security</span>
            </div>
          </div>

          {/* Core Brand Value Statement */}
          <div className="iam-login-statement-box">
            <div className="iam-login-live-pill">
              <span className="iam-login-live-dot" />
              <span>NIST SP 800-207 ZERO TRUST ARCHITECTURE</span>
            </div>
            <h1 className="iam-login-statement-title">
              Secure identities. Simplify access. Strengthen your business.
            </h1>
            <p className="iam-login-statement-desc">
              Authorised administrative console for enterprise governance, advisory publications,
              inbound client discovery briefs, and IAM Academy cohort admissions.
            </p>
          </div>

          {/* Decorative Identity-Network Topology Visualisation */}
          <div className="iam-login-topology-card">
            <div className="iam-topology-top">
              <div className="iam-topology-title">IDENTITY FABRIC MONITOR</div>
              <div className="iam-topology-status">TLS 1.3 &middot; ENCRYPTED</div>
            </div>

            <div className="iam-topology-grid">
              <div className="iam-topology-node">
                <span className="iam-node-dot iam-node-amber" />
                <span className="iam-node-name">Microsoft Entra ID</span>
                <span className="iam-node-metric">Federation Sync OK</span>
              </div>
              <div className="iam-topology-node">
                <span className="iam-node-dot iam-node-green" />
                <span className="iam-node-name">CyberArk PAM</span>
                <span className="iam-node-metric">Zero Standing Admins</span>
              </div>
              <div className="iam-topology-node">
                <span className="iam-node-dot iam-node-blue" />
                <span className="iam-node-name">SailPoint IGA</span>
                <span className="iam-node-metric">JML Lifecycle Active</span>
              </div>
              <div className="iam-topology-node">
                <span className="iam-node-dot iam-node-green" />
                <span className="iam-node-name">Supabase PG17</span>
                <span className="iam-node-metric">London Pooler Active</span>
              </div>
            </div>
          </div>

          {/* Left Footer */}
          <div className="iam-login-brand-footer">
            <span>&copy; 2026 The IAM Lab &middot; All Rights Reserved</span>
            <span>Enterprise Admin Console &middot; Confidential</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT SECTION — Approximately 50% width on Desktop
          Clean, Crisp Off-White Surface with Branded Form
          ======================================================== */}
      <div className="iam-login-form-panel">
        <div className="iam-login-form-container">
          {/* Header Mobile Brand & Desktop Welcome */}
          <div className="iam-form-header">
            <div className="iam-form-logo-row">
              <div className="iam-form-logo-box">
                <Image
                  src="/brand/the-iam-lab-logo.png"
                  alt="The IAM Lab Logo"
                  width={40}
                  height={40}
                  className="iam-form-logo-img"
                />
              </div>
              <div className="iam-form-badge">SUPER ADMIN PORTAL</div>
            </div>

            <h2 className="iam-form-welcome-title">Welcome back</h2>
            <p className="iam-form-welcome-subtitle">
              Sign in to manage your organisation&apos;s digital presence, review prospective client
              enquiries, and govern published resources.
            </p>
          </div>

          {/* Feedback Banners */}
          {errorMessage && (
            <div className="iam-alert-box iam-alert-error" role="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div className="iam-alert-text">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="iam-alert-box iam-alert-success" role="alert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <div className="iam-alert-text">{successMessage}</div>
            </div>
          )}

          {/* Actual Authentication Form */}
          <form onSubmit={handleSubmit} className="iam-auth-form" noValidate>
            {/* Email Field */}
            <div className="iam-form-group">
              <label htmlFor="iam-email-input" className="iam-form-label">
                Work Email Address
              </label>
              <div className="iam-input-wrap">
                <svg className="iam-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="iam-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@theiamlab.com"
                  autoComplete="email"
                  disabled={loading}
                  required
                  className="iam-form-input"
                />
              </div>
            </div>

            {/* Password Field with Visibility Toggle */}
            <div className="iam-form-group">
              <div className="iam-password-label-row">
                <label htmlFor="iam-password-input" className="iam-form-label">
                  Password
                </label>
                <Link href="/admin/forgot" className="iam-forgot-link">
                  Forgot password?
                </Link>
              </div>

              <div className="iam-input-wrap">
                <svg className="iam-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="iam-password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                  className="iam-form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="iam-password-toggle-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
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

            {/* Remember Me & Security Policy */}
            <div className="iam-form-options">
              <label className="iam-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="iam-checkbox"
                />
                <span>Remember work email</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`iam-submit-btn ${loading ? "iam-btn-loading" : ""}`}
            >
              {loading ? (
                <>
                  <span className="iam-spinner" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign in to Enterprise Console</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Security & Access Compliance Disclaimer */}
          <div className="iam-security-disclaimer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <p>
              Protected by role-based access control and encrypted session management.
              Unauthorized access attempts are monitored and recorded.
            </p>
          </div>

          {/* Public Return Link */}
          <div className="iam-return-row">
            <Link href="/" className="iam-return-link">
              &larr; Return to The IAM Lab Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
