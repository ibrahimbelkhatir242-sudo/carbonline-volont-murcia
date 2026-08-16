"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "Will this fit my exact model and year?",
    answer:
      "Every wheel is built for a specific hub and airbag pattern. Use the compatibility selector or contact us with your VIN and we'll confirm fitment before production starts.",
  },
  {
    question: "Does it retain my factory airbag and controls?",
    answer:
      "Yes. All wheels are designed around the OEM airbag module and multifunction controls — nothing is disabled or rewired.",
  },
  {
    question: "How long does production and delivery take?",
    answer:
      "Each wheel is made to order. Production takes 10–15 business days, followed by tracked shipping across the EU.",
  },
  {
    question: "Can I install it myself?",
    answer:
      "Most owners install it in under an hour with basic hand tools and the included fitment guide. We also recommend a qualified installer if you're not comfortable working near the airbag system.",
  },
];

export default function FAQ({ items = defaultFaqs }: { items?: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-steel/60 border-t border-b border-steel/60">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="font-display font-600 uppercase text-base md:text-lg text-bone pr-6">
                {item.question}
              </span>
              <span className="text-signal text-2xl leading-none shrink-0">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && (
              <p className="pb-5 text-sm text-muted leading-relaxed max-w-2xl">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
