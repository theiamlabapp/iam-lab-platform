"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: HTMLElement,
        opts: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const ENQUIRY_TYPES = [
  { value: "enterprise_consulting", label: "Enterprise Consulting" },
  { value: "corporate_training", label: "Corporate Training & Enablement" },
  { value: "individual_learning", label: "Individual Learning & Mentorship" },
  { value: "partnership", label: "Partnership Exploration" },
  { value: "general", label: "General Enquiry" },
] as const;

const SERVICE_PATHWAY_OPTIONS = [
  { value: "", label: "-- Select Service or Learning Pathway (Optional) --" },
  { label: "--- Corporate Consulting Services ---", value: "", disabled: true },
  { value: "service_strategy", label: "IAM Strategy, Assessment & Advisory" },
  { value: "service_governance", label: "Identity Governance & Access Management" },
  { value: "service_directory", label: "Identity Lifecycle & Provisioning Automation" },
  { value: "service_auth_sso", label: "Authentication, SSO & Access Modernisation" },
  { value: "service_pam", label: "Privileged Access Management (PAM)" },
  { value: "service_cloud_iam", label: "IAM Implementation, Integration & Technical Support" },
  { label: "--- IAM Academy Pathways ---", value: "", disabled: true },
  { value: "pathway_foundation", label: "IAM Foundation" },
  { value: "pathway_analyst", label: "IAM Analyst" },
  { value: "pathway_engineer", label: "IAM Engineer" },
  { value: "pathway_senior_engineer", label: "Senior IAM Engineer" },
  { value: "pathway_architect", label: "IAM Architect" },
  { value: "pathway_consultant_lead", label: "IAM Consultant & Leadership" },
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({
  recaptchaEnabled = false,
  recaptchaVersion = "v2_checkbox",
  recaptchaSiteKey = "",
}: {
  recaptchaEnabled?: boolean;
  recaptchaVersion?: "v2_checkbox" | "v3";
  recaptchaSiteKey?: string;
} = {}) {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const serviceParam = searchParams.get("service") || "";

  const normalizeServiceParam = (raw: string): string => {
    if (!raw) return "";
    const validValues = new Set<string>(SERVICE_PATHWAY_OPTIONS.map((o) => o.value));
    if (validValues.has(raw)) return raw;
    const mapped: Record<string, string> = {
      strategy: "service_strategy",
      architecture: "service_strategy",
      service_architecture: "service_strategy",
      governance: "service_governance",
      pam: "service_pam",
      "auth-sso": "service_auth_sso",
      "cloud-iam": "service_cloud_iam",
      directory: "service_directory",
      implementation: "service_cloud_iam",
      service_implementation: "service_cloud_iam",
      foundation: "pathway_foundation",
      analyst: "pathway_analyst",
      engineer: "pathway_engineer",
      "senior-engineer": "pathway_senior_engineer",
      architect: "pathway_architect",
      "consultant-lead": "pathway_consultant_lead",
    };
    return mapped[raw.toLowerCase()] || "";
  };

  const defaultCategory =
    typeParam === "individual" || typeParam === "individual_learning" || typeParam === "academy"
      ? "individual_learning"
      : typeParam === "corporate_training"
        ? "corporate_training"
        : "enterprise_consulting";

  const defaultService = normalizeServiceParam(serviceParam);

  const [formData, setFormData] = useState({
    enquiryType: defaultCategory,
    name: "",
    email: "",
    organisation: "",
    phone: "",
    serviceOrPathway: defaultService,
    message: "",
    privacyAccepted: false,
    company_hp: "",
  });

  const [prevQueryKey, setPrevQueryKey] = useState(`${typeParam}|${serviceParam}`);
  const currentQueryKey = `${typeParam}|${serviceParam}`;
  if (currentQueryKey !== prevQueryKey) {
    setPrevQueryKey(currentQueryKey);
    setFormData((prev) => ({
      ...prev,
      enquiryType: defaultCategory,
      serviceOrPathway: defaultService || prev.serviceOrPathway,
    }));
  }

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  const shouldUseRecaptcha = Boolean(recaptchaEnabled && recaptchaSiteKey);

  useEffect(() => {
    if (!shouldUseRecaptcha || typeof window === "undefined") return;

    const scriptId = "iam-google-recaptcha-script";
    const desiredSrc =
      recaptchaVersion === "v3"
        ? `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(recaptchaSiteKey)}`
        : "https://www.google.com/recaptcha/api.js?render=explicit";

    const mountV2Widget = () => {
      if (
        recaptchaVersion !== "v2_checkbox" ||
        !recaptchaContainerRef.current ||
        !window.grecaptcha?.ready
      ) {
        return;
      }
      window.grecaptcha.ready(() => {
        if (!recaptchaContainerRef.current || widgetIdRef.current !== null) return;
        widgetIdRef.current = window.grecaptcha!.render(recaptchaContainerRef.current, {
          sitekey: recaptchaSiteKey,
          callback: (token: string) => {
            setRecaptchaToken(token);
            setErrors((prev) => {
              if (!prev.recaptcha) return prev;
              const next = { ...prev };
              delete next.recaptcha;
              return next;
            });
          },
          "expired-callback": () => {
            setRecaptchaToken("");
          },
          "error-callback": () => {
            setRecaptchaToken("");
          },
        });
      });
    };

    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      if (window.grecaptcha) mountV2Widget();
      else existing.addEventListener("load", mountV2Widget, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = desiredSrc;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", mountV2Widget);
    document.head.appendChild(script);
  }, [shouldUseRecaptcha, recaptchaSiteKey, recaptchaVersion]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.enquiryType) {
      errs.enquiryType = "Please select an enquiry category.";
    }
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      errs.email = "Work email address is required.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = "Please enter a valid work email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please include your message or project requirements.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    if (!formData.privacyAccepted) {
      errs.privacyAccepted =
        "You must acknowledge that The IAM Lab will process your details to respond.";
    }
    if (shouldUseRecaptcha && recaptchaVersion === "v2_checkbox" && !recaptchaToken) {
      errs.recaptcha = "Please complete the security verification checkbox.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    try {
      let tokenToSend = recaptchaToken;

      if (shouldUseRecaptcha && recaptchaVersion === "v3") {
        if (!window.grecaptcha?.ready || !window.grecaptcha?.execute) {
          throw new Error(
            "Security verification service is still loading. Please try again in a moment."
          );
        }
        tokenToSend = await new Promise<string>((resolve, reject) => {
          window.grecaptcha!.ready(() => {
            window.grecaptcha!
              .execute(recaptchaSiteKey, { action: "contact_submit" })
              .then(resolve)
              .catch(reject);
          });
        });
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: tokenToSend,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSubmitted(true);
        setRecaptchaToken("");
        if (widgetIdRef.current !== null && window.grecaptcha?.reset) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
      } else {
        setServerError(
          data.message ||
            "Unable to submit enquiry right now. Please email info@theiamlab.com directly."
        );
        if (recaptchaVersion === "v2_checkbox" && widgetIdRef.current !== null && window.grecaptcha?.reset) {
          window.grecaptcha.reset(widgetIdRef.current);
          setRecaptchaToken("");
        }
      }
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Network connection error. Please email info@theiamlab.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-[#D89A43] bg-[#F7F6F2] p-8 text-center text-[#0B1424] sm:p-12"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#0B1424] text-[#D89A43]">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-[#0B1424]">
          Thank You for Contacting The IAM Lab
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-700">
          Thank you for contacting The IAM Lab. Your enquiry has been received. Our team will review your message and respond using the contact details provided.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setRecaptchaToken("");
              setFormData({
                enquiryType: defaultCategory,
                name: "",
                email: "",
                organisation: "",
                phone: "",
                serviceOrPathway: "",
                message: "",
                privacyAccepted: false,
                company_hp: "",
              });
            }}
            className="cursor-pointer text-xs font-bold text-[#0B1424] underline hover:text-[#D89A43]"
          >
            Submit another enquiry &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Enquiry Type Selector */}
      <div>
        <label
          htmlFor="enquiryType"
          className="block font-mono text-xs font-semibold tracking-wider text-[#14243B] uppercase"
        >
          Enquiry Track <span className="text-rose-600">*</span>
        </label>
        <select
          id="enquiryType"
          value={formData.enquiryType}
          onChange={(e) =>
            setFormData({ ...formData, enquiryType: e.target.value })
          }
          className="mt-2 block w-full cursor-pointer border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0B1424] transition-colors focus:border-[#D89A43] focus:bg-white focus:outline-none"
        >
          {ENQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value} className="bg-white text-[#0B1424]">
              {t.label}
            </option>
          ))}
        </select>
        {errors.enquiryType && (
          <p className="mt-1.5 text-xs text-rose-600">{errors.enquiryType}</p>
        )}
      </div>

      {/* Name and Email Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-xs font-semibold tracking-wider text-[#14243B] uppercase"
          >
            Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="e.g. Alex Morgan"
            className="mt-2 block w-full border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1424] placeholder:text-slate-400 focus:border-[#D89A43] focus:bg-white focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-rose-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs font-semibold tracking-wider text-[#14243B] uppercase"
          >
            Work Email Address <span className="text-rose-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="alex@organisation.com"
            className="mt-2 block w-full border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1424] placeholder:text-slate-400 focus:border-[#D89A43] focus:bg-white focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-rose-600">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Organisation and Phone Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="organisation"
            className="block font-mono text-xs font-semibold tracking-wider text-[#14243B] uppercase"
          >
            Organisation / Company{" "}
            <span className="text-[10px] text-slate-500">(Optional)</span>
          </label>
          <input
            id="organisation"
            type="text"
            autoComplete="organization"
            value={formData.organisation}
            onChange={(e) =>
              setFormData({ ...formData, organisation: e.target.value })
            }
            placeholder="Organisation Name"
            className="mt-2 block w-full border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1424] placeholder:text-slate-400 focus:border-[#D89A43] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block font-mono text-xs font-semibold tracking-wider text-[#14243B] uppercase"
          >
            Phone / WhatsApp{" "}
            <span className="text-[10px] text-slate-500">(Optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+44 7... or +234..."
            className="mt-2 block w-full border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1424] placeholder:text-slate-400 focus:border-[#D89A43] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Service or Pathway Dropdown */}
      <div>
        <label
          htmlFor="serviceOrPathway"
          className="block font-mono text-xs font-semibold tracking-wider text-[#14243B] uppercase"
        >
          Specific Service or Learning Pathway{" "}
          <span className="text-[10px] text-slate-500">(Optional)</span>
        </label>
        <select
          id="serviceOrPathway"
          value={formData.serviceOrPathway}
          onChange={(e) =>
            setFormData({ ...formData, serviceOrPathway: e.target.value })
          }
          className="mt-2 block w-full cursor-pointer border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0B1424] focus:border-[#D89A43] focus:bg-white focus:outline-none"
        >
          {SERVICE_PATHWAY_OPTIONS.map((opt, i) => (
            <option
              key={`${opt.value}-${i}`}
              value={opt.value}
              disabled={"disabled" in opt ? opt.disabled : false}
              className="bg-white text-[#0B1424]"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block font-mono text-xs font-semibold tracking-wider text-[#14243B] uppercase"
        >
          Project Details / Requirements <span className="text-rose-600">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Please describe your current IAM challenge, architecture objectives, compliance deadlines, or training cohort requirements..."
          className="mt-2 block w-full border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#0B1424] placeholder:text-slate-400 focus:border-[#D89A43] focus:bg-white focus:outline-none"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-rose-600">{errors.message}</p>
        )}
      </div>

      {/* Honeypot field (hidden from humans) */}
      <input
        type="text"
        name="company_hp"
        tabIndex={-1}
        autoComplete="off"
        value={formData.company_hp}
        onChange={(e) =>
          setFormData({ ...formData, company_hp: e.target.value })
        }
        className="hidden"
        aria-hidden="true"
      />

      {/* Privacy Notice Acknowledgement */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) =>
              setFormData({ ...formData, privacyAccepted: e.target.checked })
            }
            className="mt-1 h-4 w-4 cursor-pointer rounded-none border-slate-300 text-[#0B1424] focus:ring-[#D89A43]"
          />
          <span className="text-xs leading-relaxed text-slate-600">
            I acknowledge that The IAM Lab will process the details submitted
            strictly to respond to this enquiry. Communications remain confidential.
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="mt-1.5 text-xs text-rose-600">{errors.privacyAccepted}</p>
        )}
      </div>

      {/* Google reCAPTCHA Verification (when enabled in Global Site Settings) */}
      {shouldUseRecaptcha && recaptchaVersion === "v2_checkbox" && (
        <div>
          <div ref={recaptchaContainerRef} />
          {errors.recaptcha && (
            <p className="mt-1.5 text-xs text-rose-600">{errors.recaptcha}</p>
          )}
        </div>
      )}

      {shouldUseRecaptcha && recaptchaVersion === "v3" && (
        <p className="text-[11px] text-slate-500">
          Protected by Google reCAPTCHA v3 verification upon submission.
        </p>
      )}

      {serverError && (
        <div
          role="alert"
          className="border border-rose-300 bg-rose-50 p-4 text-xs text-rose-800"
        >
          {serverError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center bg-[#0B1424] px-8 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#14243B] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? "Transmitting..." : "Submit Consultation Request"}
      </button>
    </form>
  );
}

export default ContactForm;
