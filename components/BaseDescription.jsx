"use client";
import { useState } from "react";

export function BaseDescription({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="w-full bg-muted/30 py-12 px-4 md:px-8 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-4">
        {Array.isArray(items) &&
          items.length > 0 &&
          items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq?.id}
                className="space-y-3 border-b border-gray-300 pb-4"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="flex justify-between items-center w-full text-left text-lg font-semibold text-foreground"
                >
                  {faq?.question}
                  <span className="ml-2">
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transform rotate-180 transition-transform"
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
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform"
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
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="text-base leading-relaxed text-foreground/85 mt-2 space-y-2">
                    <p className="font-medium">{faq?.answer}</p>
                    {faq?.link && (
                      <a
                        href={faq?.link}
                        target="_blank"
                        className="text-blue-500 hover:underline inline-block"
                      >
                        {faq?.link}
                      </a>
                    )}
                    {Array.isArray(faq?.order) && faq?.order.length > 0 && (
                      <ol className="list-decimal pl-5 mt-2 space-y-1">
                        {faq.order.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
