"use client";

import { useState, type FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setError("Please enter your email address.");
      setSubmittedEmail(null);
      return;
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      setError("Please enter a valid email address.");
      setSubmittedEmail(null);
      return;
    }

    setError(null);
    setSubmittedEmail(trimmed);
  };

  const mailtoHref = submittedEmail
    ? `mailto:info@theiamlab.com?subject=${encodeURIComponent(
        "The IAM Lab — Launch Notification Request"
      )}&body=${encodeURIComponent(
        `Hello The IAM Lab team,\n\nPlease notify me when the full platform launches.\n\nEmail: ${submittedEmail}\n`
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
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
            if (submittedEmail) setSubmittedEmail(null);
          }}
          placeholder="Enter your email address"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "notify-error" : undefined}
          className="min-h-[46px] w-full flex-1 bg-transparent px-4 text-sm text-white placeholder:text-slate-400 focus:outline-none sm:text-[15px]"
        />

        <button
          type="submit"
          className="inline-flex min-h-[46px] shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#d6a15c] px-6 py-2.5 text-sm font-semibold text-[#050a14] transition-all hover:bg-[#e2b372] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fefefe]"
        >
          Notify Me
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

      {submittedEmail && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 rounded-xl border border-[#d6a15c]/30 bg-[#081224]/85 px-4 py-3 text-xs leading-relaxed text-slate-200 backdrop-blur-md sm:text-sm"
        >
          <p>
            Automated mailing-list collection is not yet active on this preview.
            Send your launch request directly using your email app:
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-1.5 font-semibold text-[#d6a15c] underline decoration-[#d6a15c]/50 underline-offset-4 transition-colors hover:text-[#ebd0a3] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c]"
            >
              <span>Send from {submittedEmail} to info@theiamlab.com</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
