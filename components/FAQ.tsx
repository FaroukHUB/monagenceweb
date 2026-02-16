"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQ({
  title = "Questions fréquentes",
  subtitle = "Tout ce que vous devez savoir",
  items,
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-4">{title}</h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl overflow-hidden transition-all hover:border-primary/30"
          >
            <button
              className="w-full flex items-center justify-between p-6 text-left font-semibold text-dark hover:text-primary transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <svg
                className={`w-5 h-5 shrink-0 ml-4 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-gray-500 leading-relaxed animate-fade-in">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
