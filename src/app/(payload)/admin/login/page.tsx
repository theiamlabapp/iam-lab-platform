"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.errors?.[0]?.message ||
            "Authentication failed. Please verify your credentials or contact security operations."
        );
      }

      // Successful login -> route to admin dashboard
      router.push("/admin");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected authentication error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#05090f] text-slate-100 antialiased">
      {/* LEFT PANEL: BRAND & SECURITY CONTEXT */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-white/[0.08] bg-gradient-to-br from-[#060b12] via-[#09111c] to-[#04070c] p-12 lg:flex xl:p-16">
        {/* Ambient lighting & mesh */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/90 p-1.5 shadow-lg">
              <Image
                src="/brand/the-iam-lab-logo.png"
                alt="The IAM Lab"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-sans text-base font-bold tracking-tight text-white">
                THE IAM LAB
              </span>
              <span className="block text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                Enterprise Identity Security
              </span>
            </div>
          </Link>

          <div className="mt-16 max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-3 py-1 font-mono text-xs font-semibold text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              RESTRICTED ADMINISTRATIVE CONSOLE
            </span>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white xl:text-4xl">
              Secure identities. <br />
              Simplify access. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-100 to-amber-200">
                Strengthen your business.
              </span>
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              The centralized administrative gateway for managing The IAM Lab corporate web properties, client consulting enquiries, academy cohorts, and published technical resources.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 font-mono text-[10px] font-bold">
                  ✓
                </span>
                <span>Role-Based Access Control (RBAC) enforced</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                  ✓
                </span>
                <span>PostgreSQL 17 encrypted persistence via Supabase</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-3 text-xs text-slate-300">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-mono text-[10px] font-bold">
                  ✓
                </span>
                <span>All administrative actions logged with audit timestamps</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6">
          <p className="text-xs text-slate-400">
            The IAM Lab Ltd &middot; London, United Kingdom &middot; Enterprise Platform v2.0
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: HIGH-SECURITY LOGIN CARD */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Brand Header */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-1">
                <Image
                  src="/brand/the-iam-lab-logo.png"
                  alt="The IAM Lab"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-sans text-sm font-bold tracking-tight text-white">
                THE IAM LAB
              </span>
            </Link>
          </div>

          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-400">
              Payload CMS 3.x
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Administrative Sign-In
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              Authorized security personnel and content editors only. Enter your credentials to access the console.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-rose-500/40 bg-rose-950/30 p-4 text-xs text-rose-300">
              <div className="flex items-center gap-2 font-semibold text-rose-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Access Denied
              </div>
              <p className="mt-1">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Work Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chimezie@theiamlab.com"
                className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="mt-2 block w-full rounded-lg border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Authenticating Session...
                </span>
              ) : (
                "Sign In to Admin Console"
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-start gap-2.5">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 002 0V7z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                  Authorized Access Only
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  Protected by role-based access control and encrypted session management. Unauthorized access attempts are monitored and recorded.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 transition hover:text-sky-300"
            >
              &larr; Return to The IAM Lab Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
