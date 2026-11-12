"use client";

import { useState, type FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "sent"; email: string }
  | { status: "fallback"; email: string; reason: string };

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setError("Please enter your email address.");
      setSubmitState({ status: "idle" });
      return;
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      setError("Please enter a valid email address.");
      setSubmitState({ status: "idle" });
      return;
    }

    setError(null);
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, company }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        configured?: boolean;
        message?: string;
      };

      if (response.ok && data.ok) {
        setEmail("");
        setSubmitState({ status: "sent", email: trimmed });
        return;
      }

      if (response.status === 400 && data.message) {
        setError(data.message);
        setSubmitState({ status: "idle" });
        return;
      }

      setSubmitState({
        status: "fallback",
        email: trimmed,
        reason:
          data.configured === false
            ? "Direct mail delivery is awaiting SMTP credentials in deployment settings. You can still send your request directly via your email app:"
            : data.message ||
              "Automated delivery could not complete right now. You can send your request directly via your email app:",
      });
    } catch {
      setSubmitState({
        status: "fallback",
        email: trimmed,
        reason:
          "Network error while sending request. You can send your launch notification directly via email below:",
      });
    }
  };

  const fallbackEmail =
    submitState.status === "fallback" ? submitState.email : "";
  const mailtoHref = fallbackEmail
    ? `mailto:info@theiamlab.com?subject=${encodeURIComponent(
        "The IAM Lab — Launch Notification Request"
      )}&body=${encodeURIComponent(
        `Hello The IAM Lab team,\n\nPlease notify me when the full platform launches.\n\nEmail: ${fallbackEmail}\n`
      )}`
    : "mailto:info@theiamlab.com";

  return (
    <div className="w-full max-w-lg">
      <p className="text-sm font-medium tracking-wide text-slate-200 sm:text-[15px]">
        Be the first to know when we launch.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-3.5 flex flex-col gap-2 rounded-2xl border border-white/15 bg-[#081224]/75 p-1.5 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors focus-within:border-[#d6a15c]/55 sm:flex-row sm:items-center"
      >
        <label htmlFor="notify-email" className="sr-only">
          Email address
        </label>
        <input
          id="notify-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          disabled={submitState.status === "submitting"}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
            if (submitState.status !== "idle") {
              setSubmitState({ status: "idle" });
            }
          }}
          placeholder="Enter your email address"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "notify-error" : undefined}
          className="min-h-[46px] w-full flex-1 bg-transparent px-4 text-sm text-white placeholder:text-slate-400 focus:outline-none disabled:opacity-60 sm:text-[15px]"
        />

        {/* Honeypot anti-bot field */}
        <input
          type="text"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <button
          type="submit"
          disabled={submitState.status === "submitting"}
          className="inline-flex min-h-[46px] shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#d6a15c] px-6 py-2.5 text-sm font-semibold text-[#050a14] transition-all hover:bg-[#e2b372] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fefefe] disabled:cursor-wait disabled:opacity-70"
        >
          {submitState.status === "submitting" ? "Sending..." : "Notify Me"}
        </button>
      </form>

      {error && (
        <p
          id="notify-error"
          role="alert"
          className="mt-2.5 text-xs font-medium text-amber-300"
        >
          {error}
        </p>
      )}

      {submitState.status === "sent" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 rounded-xl border border-emerald-400/30 bg-[#081224]/85 px-4 py-3 text-xs leading-relaxed text-slate-200 backdrop-blur-md sm:text-sm"
        >
          <p className="font-medium text-emerald-300">
            Thank you &mdash; your request has been sent to info@theiamlab.com.
          </p>
          <p className="mt-1 text-slate-300">
            We&apos;ll notify{" "}
            <span className="font-medium text-white">{submitState.email}</span>{" "}
            when The IAM Lab launches.
          </p>
        </div>
      )}

      {submitState.status === "fallback" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 rounded-xl border border-[#d6a15c]/30 bg-[#081224]/85 px-4 py-3 text-xs leading-relaxed text-slate-200 backdrop-blur-md sm:text-sm"
        >
          <p>{submitState.reason}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-1.5 font-semibold text-[#d6a15c] underline decoration-[#d6a15c]/50 underline-offset-4 transition-colors hover:text-[#ebd0a3] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c]"
            >
              <span>Send from {submitState.email} to info@theiamlab.com</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
