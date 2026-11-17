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
        className="border border-[#d6a15c]/40 bg-[#07101f] p-8 sm:p-12 text-center text-slate-100"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#d6a15c] bg-[#d6a15c]/10 text-[#d6a15c]">
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

        <h3 className="mt-6 text-2xl font-bold text-white">
          Enquiry Received
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
          Thank you for contacting The IAM Lab. Your enquiry has been logged directly into our system. Our team will review your message and respond within 24 to 48 business hours.
        </p>

        <div className="mt-8 border-t border-white/10 pt-6">
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
            className="font-mono text-xs font-bold text-[#d6a15c] uppercase underline underline-offset-4 hover:text-white"
          >
            Submit Another Enquiry &rarr;
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 border border-white/10 bg-[#07101f] p-8 sm:p-12 shadow-2xl"
    >
      <div className="border-b border-white/10 pb-4">
        <span className="font-mono text-xs font-bold tracking-widest text-[#d6a15c] uppercase">
          Transmission Protocol // Form Intake
        </span>
        <h2 className="mt-1 text-xl font-bold text-white">
          Direct Consultation Request
        </h2>
      </div>

      {/* Enquiry Type Selector */}
      <div>
        <label
          htmlFor="enquiryType"
          className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
        >
          Enquiry Type <span className="text-[#d6a15c]">*</span>
        </label>
        <select
          id="enquiryType"
          value={formData.enquiryType}
          onChange={(e) =>
            setFormData({ ...formData, enquiryType: e.target.value })
          }
          className="mt-2 block w-full rounded-none border border-white/15 bg-[#030712] px-4 py-3 text-sm font-medium text-white transition-colors focus:border-[#d6a15c] focus:outline-none"
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
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
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
            className="mt-2 block w-full rounded-none border border-white/15 bg-[#030712] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
          >
            Work Email Address <span className="text-[#d6a15c]">*</span>
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
            className="mt-2 block w-full rounded-none border border-white/15 bg-[#030712] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none"
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
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
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
            className="mt-2 block w-full rounded-none border border-white/15 bg-[#030712] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
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
            className="mt-2 block w-full rounded-none border border-white/15 bg-[#030712] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none"
          />
        </div>
      </div>

      {/* Service or Pathway Dropdown */}
      <div>
        <label
          htmlFor="serviceOrPathway"
          className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
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
          className="mt-2 block w-full rounded-none border border-white/15 bg-[#030712] px-4 py-3 text-sm text-white focus:border-[#d6a15c] focus:outline-none"
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
          className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-300"
        >
          Project Details / Requirements <span className="text-[#d6a15c]">*</span>
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
          className="mt-2 block w-full rounded-none border border-white/15 bg-[#030712] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#d6a15c] focus:outline-none"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
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
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) =>
              setFormData({ ...formData, privacyAccepted: e.target.checked })
            }
            className="mt-1 h-4 w-4 rounded-none border-white/20 bg-[#030712] text-[#d6a15c] focus:ring-[#d6a15c]"
          />
          <span className="text-xs leading-relaxed text-slate-300">
            I acknowledge that The IAM Lab will process the details submitted
            strictly to respond to this enquiry. Marketing communications remain
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
          className="border border-rose-500/30 bg-rose-950/40 p-4 text-xs text-rose-300"
        >
          {serverError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-[52px] w-full items-center justify-center border border-[#d6a15c] bg-[#d6a15c] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#030712] shadow-xl transition-all hover:bg-[#e4b26f] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? "Transmitting..." : "Submit Enquiry Request"}
      </button>
    </form>
  );
}
