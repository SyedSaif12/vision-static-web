"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-light-100 bg-white shadow-sm">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className={i !== 0 ? "border-t border-light-200" : ""}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-extrabold text-ink"
            >
              {item.question}
              {isOpen ? (
                <X size={14} className="shrink-0 text-primary" />
              ) : (
                <Plus size={14} className="shrink-0 text-primary" />
              )}
            </button>
            {isOpen && (
              <p className="animate-fade px-5 pb-5 text-sm leading-6 text-muted">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
