"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Who is the IAM Academy designed for?",
    answer:
      "The IAM Academy is built for IT administrators, system engineers, helpdesk professionals, cloud specialists, and cybersecurity practitioners who want to build deep, market-relevant expertise in Identity and Access Management. We also support career switchers with foundational technical aptitude who are committed to structured, practitioner-led learning.",
  },
  {
    question: "Do I need prior cybersecurity experience to enroll?",
    answer:
      "While foundational understanding of basic networking, operating systems, and client-server concepts is helpful, you do not need years of security experience. Our 'IAM Foundation' pathway starts with core principles before progressing to advanced IGA, PAM, and cloud identity engineering.",
  },
  {
    question: "What is the format and time commitment for cohorts?",
    answer:
      "Cohorts run for 6 to 10 weeks depending on the specific pathway. Sessions are delivered live online during evenings or weekends to accommodate working professionals, supplemented by recorded archives, hands-on lab assignments, and direct access to instructors.",
  },
  {
    question: "Do these programs prepare me for industry certifications?",
    answer:
      "Yes. While our primary focus is practical engineering ability rather than rote exam memorization, our curricula align closely with industry standards and directly support preparation for credentials such as Microsoft SC-300 (Identity and Access Administrator), CompTIA Security+, and vendor-specific certifications across Okta, CyberArk, and SailPoint.",
  },
  {
    question: "Does The IAM Lab offer corporate training for enterprise IT teams?",
    answer:
      "Yes. We design and deliver customized corporate workshops tailored to your organization's specific identity architecture, tooling stack (e.g. Microsoft Entra ID, CyberArk, SailPoint), and internal standard operating procedures. Contact us through our consultation form to discuss team training.",
  },
];

export function AcademyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl border border-white/10 bg-[#07101f]/70 backdrop-blur-sm transition-colors hover:border-[#d6a15c]/40"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a15c] focus-visible:ring-inset"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-white sm:text-lg">
                {faq.question}
              </span>
              <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#d6a15c]">
                <svg
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-white/10 px-5 pb-5 pt-3">
                <p className="text-sm leading-relaxed text-slate-300">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
