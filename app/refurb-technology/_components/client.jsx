"use client";
import React, { useState } from "react";
import { SectionHeading } from "./RefurbishedPage";

export const FAQSection = ({ faqData }) => {
  if (!faqData?.length) return;
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  return (
    <section className="py-12 bg-surface border-t border-light-100">
      <div className="w-11/12 mx-auto">
        <SectionHeading
          subtitle="GOOD TO KNOW"
          title="Refurbished, answered"
          center
        />
        <div className="space-y-3">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-light-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-4 sm:p-5 flex justify-between items-center font-bold text-sm text-ink hover:bg-light-50 transition"
              >
                <span>{item.q}</span>
                <span className="text-lg text-muted ml-2">
                  {openFaq === idx ? "−" : "+"}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 text-xs text-muted leading-relaxed border-t border-light-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
