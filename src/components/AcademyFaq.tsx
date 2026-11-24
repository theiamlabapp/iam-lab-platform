"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Do I need IAM experience to start?",
    answer:
      "No. The IAM Foundation pathway is specifically designed for beginners and career changers, focusing on core concepts, identity lifecycle, controls, and terminology without requiring prior platform administration experience.",
  },
  {
    question: "When should I select Entra ID, Okta, SailPoint, or another platform?",
    answer:
      "You choose a hands-on IAM platform at the IAM Analyst stage based on your career goals, background, and the enterprise environments you want to target.",
  },
  {
    question: "Are sessions recorded?",
    answer:
      "Recording availability and material access policies depend on the specific programme or community session and are confirmed with each cohort announcement.",
  },
  {
    question: "How do one-to-one mentorship and corporate training work?",
    answer:
      "Both start with a consultation to discuss learning goals and team needs, followed by a scoped proposal confirming programme structure, duration, and fees prior to enrolment.",
  },
  {
    question: "Where can I access books and resources?",
    answer:
      "Guides and digital learning resources are available directly through The IAM Lab's Selar store at https://selar.com/m/chiemezie-uzoma1.",
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
          <div key={faq.question} className="transition-colors hover:bg-white/[0.02]">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between px-2 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D89A43] focus-visible:ring-inset"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3.5 pr-6">
                <HelpCircle
                  className="h-4.5 w-4.5 shrink-0 text-[#D89A43]"
                  aria-hidden="true"
                />
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
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </span>
            </button>
            {isOpen && (
              <div className="pr-4 pb-6 pl-10">
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
