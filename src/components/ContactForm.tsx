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
  { value: "service_pam", label: "Privileged Access Management (PAM)" },
  { value: "service_auth_sso", label: "Access Management & SSO/MFA" },
  { value: "service_cloud_iam", label: "Cloud IAM & Entitlement Governance" },
  { value: "service_directory", label: "Directory Modernisation & Implementation" },
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
    typeParam === "individual" || typeParam === "individual_learning" || typeParam === "academy"
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
        className="border border-[#D89A43] bg-[#F7F6F2] p-8 sm:p-12 text-center text-[#0B1424]"
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
          Consultation Request Received
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-700 max-w-md mx-auto">
          Thank you for reaching out. Your enquiry has been persisted securely and routed to our advisory team. We will review your requirements and respond within one business day.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
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
            className="text-xs font-bold text-[#0B1424] underline hover:text-[#D89A43]"
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
          className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#14243B]"
        >
          Enquiry Track <span className="text-rose-600">*</span>
        </label>
        <select
          id="enquiryType"
          value={formData.enquiryType}
          onChange={(e) =>
            setFormData({ ...formData, enquiryType: e.target.value })
          }
          className="mt-2 block w-full border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0B1424] transition-colors focus:border-[#D89A43] focus:bg-white focus:outline-none"
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
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#14243B]"
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
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#14243B]"
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
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#14243B]"
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
            className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#14243B]"
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
          className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#14243B]"
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
          className="mt-2 block w-full border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm font-medium text-[#0B1424] focus:border-[#D89A43] focus:bg-white focus:outline-none"
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
          className="block font-mono text-xs font-semibold uppercase tracking-wider text-[#14243B]"
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
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) =>
              setFormData({ ...formData, privacyAccepted: e.target.checked })
            }
            className="mt-1 h-4 w-4 rounded-none border-slate-300 text-[#0B1424] focus:ring-[#D89A43]"
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
        className="inline-flex min-h-[48px] w-full items-center justify-center bg-[#0B1424] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#14243B] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? "Transmitting..." : "Submit Consultation Request"}
      </button>
    </form>
  );
}

export default ContactForm;
