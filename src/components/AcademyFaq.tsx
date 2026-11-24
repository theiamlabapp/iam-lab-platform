"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Do I need IAM experience to start with IAM Academy?",
    answer:
      "No prior cybersecurity work history is required to begin at the IAM Foundation stage. Foundation is specifically structured for beginners, IT support staff, and career switchers with technical aptitude before progressing into hands-on platform administration.",
  },
  {
    question: "When should I select Microsoft Entra ID, Okta, SailPoint, or another platform?",
    answer:
      "Learners explore core architectural identity concepts first in Foundation, then begin specialising on selected identity platforms at the IAM Analyst and IAM Engineer tiers based on their target role, regional enterprise demand, and career objectives.",
  },
  {
    question: "Are live community and cohort sessions recorded?",
    answer:
      "Cohort session schedules, recording access policies, and lab material guidelines are shared cleanly with each programme outline prior to enrolment so working professionals can plan reliably.",
  },
  {
    question: "How do one-to-one mentorship and corporate team training work?",
    answer:
      "Both one-to-one mentorship and corporate engineering workshops begin with a focused consultation to assess capability objectives, current platform exposure, duration, and agreed scope before a tailored programme schedule is confirmed.",
  },
  {
    question: "Where can I access IAM Lab workbooks, guides, and digital resources?",
    answer:
      "Our official guides, technical study manuals, and career preparation packs are published directly via The IAM Lab Selar digital resource store at https://selar.com/m/chiemezie-uzoma1.",
  },
];

export function AcademyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-white/10 border-t border-b border-white/10">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="transition-colors hover:bg-white/[0.02]">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between py-6 px-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D89A43] focus-visible:ring-inset"
              aria-expanded={isOpen}
            >
              <div className="flex items-baseline gap-4 pr-6">
                <span className="font-mono text-xs font-bold text-[#D89A43]">
                  0{idx + 1}
                </span>
                <span className="text-base font-bold text-white sm:text-lg">
                  {faq.question}
                </span>
              </div>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center border text-[#D89A43] transition-colors ${
                  isOpen
                    ? "border-[#D89A43] bg-[#D89A43]/15"
                    : "border-white/15 bg-white/[0.03]"
                }`}
              >
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
              <div className="pb-6 pl-9 pr-4 sm:pl-11">
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
