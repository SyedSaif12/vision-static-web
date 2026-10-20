"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";

export default function InstalmentTable({ price, banks }) {
    
  const [activeKey, setActiveKey] = useState(banks[0]?.key);
  const active = banks.find((b) => b.key === activeKey) ?? banks[0];

  if (!active) return null;

  return (
    <section
      id="instalments"
      aria-labelledby="instalments-title"
      className="scroll-mt-24"
    >
      <details className="group rounded-xl border border-light-100 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between p-4 text-sm font-semibold text-ink">
          <span id="instalments-title">Credit card instalment plans</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition group-open:rotate-180"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>

        <div className="border-t border-light-100 p-4">
          {/* Bank tabs */}
          <div
            role="tablist"
            aria-label="Select bank"
            className="flex gap-2 overflow-x-auto pb-1"
          >
            {banks.map((bank) => {
              const isActive = bank.key === active.key;
              return (
                <button
                  key={bank.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveKey(bank.key)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide transition ${
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-light-100 bg-white text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {bank.label}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-sm text-muted">
            Convert your payment into instalments through your bank. Markup is
            charged by the bank and shown below for reference.
          </p>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[320px] text-left text-sm">
              <caption className="sr-only">{active.label} instalment plans</caption>
              <thead>
                <tr className="text-xs text-muted">
                  <th className="py-2 font-medium">Months</th>
                  <th className="py-2 font-medium">Per month</th>
                  <th className="py-2 font-medium">Markup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-100">
                {active.plans.map((p) => (
                  <tr key={p.months}>
                    <td className="py-2.5 font-medium text-ink">
                      {p.months} months
                    </td>
                    <td className="py-2.5 text-ink">
                      {formatPrice(
                        Math.round((price * (1 + p.markup / 100)) / p.months),
                        "Rs ",
                      )}
                    </td>
                    <td className="py-2.5 text-muted">{p.markup}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </section>
  );
}