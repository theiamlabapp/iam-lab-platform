"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

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
  { value: "service_governance", label: "Identity Governance & Access Management (IGA)" },
  { value: "service_lifecycle", label: "Identity Lifecycle & Provisioning Automation" },
  { value: "service_auth_sso", label: "Authentication, SSO & Access Modernisation" },
  { value: "service_pam", label: "Privileged Access Management (PAM)" },
  { value: "service_implementation", label: "IAM Implementation & Technical Support" },
  { label: "--- IAM Academy Pathways ---", value: "", disabled: true },
  { value: "pathway_foundation", label: "IAM Foundation (Beginner)" },
  { value: "pathway_analyst", label: "IAM Analyst" },
  { value: "pathway_engineer", label: "IAM Engineer" },
  { value: "pathway_senior_engineer", label: "Senior IAM Engineer" },
  { value: "pathway_architect", label: "IAM Architect" },
  { value: "pathway_consultant_lead", label: "IAM Consultant & Leadership" },
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const defaultCategory =
    typeParam === "individual" || typeParam === "academy"
      ? "individual_learning"
      : typeParam === "corporate_training"
        ? "corporate_training"
        : "enterprise_consulting";

  const [formData, setFormData] = useState({
    enquiryType: defaultCategory,
    name: "",
    email: "",
    organisation: "",
    phone: "",
    serviceOrPathway: "",
    message: "",
    privacyAccepted: false,
    company_hp: "", // Honeypot spam trap
  });

  const [prevTypeParam, setPrevTypeParam] = useState(typeParam);
  if (typeParam !== prevTypeParam) {
    setPrevTypeParam(typeParam);
    setFormData((prev) => ({
      ...prev,
      enquiryType: defaultCategory,
    }));
  }

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.enquiryType) {
      errs.enquiryType = "Please select an enquiry category.";
    }
    if (!formData.name.trim()) {
      errs.name = "Full name is required.";
    }
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please include your message or enquiry details.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    if (!formData.privacyAccepted) {
      errs.privacyAccepted =
        "You must acknowledge that The IAM Lab will process your details to respond.";
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setSubmitted(true);
      } else {
        setServerError(
          data.message ||
            "Unable to submit enquiry right now. Please email info@theiamlab.com directly."
        );
      }
    } catch {
      setServerError(
        "Network connection error. Please email info@theiamlab.com directly."
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
        className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-8 text-center text-slate-100 backdrop-blur-xl sm:p-10"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="mt-5 text-2xl font-semibold text-white">
          Enquiry Received
        </h3>

        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-slate-300">
          Thank you for contacting The IAM Lab. Your enquiry has been received.
          Our team will review your message and respond using the contact
          details provided within 24 to 48 business hours.
        </p>

        <div className="mt-6 border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                enquiryType: "enterprise_consulting",
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
            className="inline-flex items-center text-sm font-semibold text-[#d6a15c] underline underline-offset-4 hover:text-[#ebd0a3]"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-2xl border border-white/10 bg-[#07101f]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10"
    >
      {/* Enquiry Type Selector */}
      <div>
        <label
          htmlFor="enquiryType"
          className="block text-sm font-medium text-slate-200"
        >
          Enquiry Type <span className="text-[#d6a15c]">*</span>
        </label>
        <select
          id="enquiryType"
          value={formData.enquiryType}
          onChange={(e) =>
            setFormData({ ...formData, enquiryType: e.target.value })
          }
          className="mt-2 block w-full rounded-xl border border-white/15 bg-[#030712]/80 px-3.5 py-3 text-sm font-medium text-white transition-colors focus:border-[#d6a15c] focus:outline-none focus:ring-1 focus:ring-[#d6a15c]"
        >
          {ENQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value} className="bg-[#07101f] text-slate-100">
              {t.label}
            </option>
          ))}
        </select>
        {errors.enquiryType && (
          <p className="mt-1.5 text-xs text-rose-400">{errors.enquiryType}</p>
        )}
      </div>

      {/* Name and Email Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-200"
          >
            Full Name <span className="text-[#d6a15c]">*</span>
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
            className="mt-2 block w-full rounded-xl border border-white/15 bg-[#030712]/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none focus:ring-1 focus:ring-[#d6a15c]"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-200"
          >
            Email Address <span className="text-[#d6a15c]">*</span>
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
            className="mt-2 block w-full rounded-xl border border-white/15 bg-[#030712]/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none focus:ring-1 focus:ring-[#d6a15c]"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Organisation and Phone Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="organisation"
            className="block text-sm font-medium text-slate-200"
          >
            Organisation / Company{" "}
            <span className="text-xs font-normal text-slate-400">
              (Optional)
            </span>
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
            className="mt-2 block w-full rounded-xl border border-white/15 bg-[#030712]/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none focus:ring-1 focus:ring-[#d6a15c]"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-200"
          >
            Phone / WhatsApp{" "}
            <span className="text-xs font-normal text-slate-400">
              (Optional)
            </span>
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
            className="mt-2 block w-full rounded-xl border border-white/15 bg-[#030712]/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none focus:ring-1 focus:ring-[#d6a15c]"
          />
        </div>
      </div>

      {/* Service or Pathway Dropdown */}
      <div>
        <label
          htmlFor="serviceOrPathway"
          className="block text-sm font-medium text-slate-200"
        >
          Specific Service or Learning Pathway{" "}
          <span className="text-xs font-normal text-slate-400">(Optional)</span>
        </label>
        <select
          id="serviceOrPathway"
          value={formData.serviceOrPathway}
          onChange={(e) =>
            setFormData({ ...formData, serviceOrPathway: e.target.value })
          }
          className="mt-2 block w-full rounded-xl border border-white/15 bg-[#030712]/80 px-3.5 py-3 text-sm text-white focus:border-[#d6a15c] focus:outline-none focus:ring-1 focus:ring-[#d6a15c]"
        >
          {SERVICE_PATHWAY_OPTIONS.map((opt, i) => (
            <option
              key={`${opt.value}-${i}`}
              value={opt.value}
              disabled={"disabled" in opt ? opt.disabled : false}
              className="bg-[#07101f] text-slate-100"
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
          className="block text-sm font-medium text-slate-200"
        >
          Your Message <span className="text-[#d6a15c]">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Please describe your current IAM challenge, project objectives, or training requirements..."
          className="mt-2 block w-full rounded-xl border border-white/15 bg-[#030712]/80 px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none focus:ring-1 focus:ring-[#d6a15c]"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
        )}
      </div>

      {/* Honeypot field (hidden from users) */}
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
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) =>
              setFormData({ ...formData, privacyAccepted: e.target.checked })
            }
            className="mt-1 h-4 w-4 rounded border-white/20 bg-[#030712] text-[#d6a15c] focus:ring-[#d6a15c]"
          />
          <span className="text-xs leading-relaxed text-slate-300">
            I acknowledge that The IAM Lab will process the details submitted
            strictly to respond to this enquiry. Marketing opt-in remains
            independent and optional.
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="mt-1.5 text-xs text-rose-400">{errors.privacyAccepted}</p>
        )}
      </div>

      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3.5 text-xs text-rose-300"
        >
          {serverError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#d6a15c] px-7 py-3.5 text-sm font-semibold text-[#050a14] shadow-md transition-all hover:bg-[#e4b26f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6a15c] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? "Sending Enquiry..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
