"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { calcInstalment, formatRate } from "@/lib/instalment";
import BankBadge from "./BankBadge";
import SectionHeading from "./SectionHeading";

export default function InstalmentCalculator({ banks }) {
  const [price, setPrice] = useState("100000");
  const [bankKey, setBankKey] = useState(banks[0].key);
  const [months, setMonths] = useState(banks[0].plans.at(-1).months);

  const bank = banks.find((b) => b.key === bankKey) ?? banks[0];
  // Agar naye bank mein ye tenure na ho to uska sabse lamba plan le lo
  const plan = bank.plans.find((p) => p.months === months) ?? bank.plans.at(-1);

  const amount = Number(price) || 0;
  const { markupAmount, total, monthly } = calcInstalment(
    amount,
    plan.markup,
    plan.months,
  );

  return (
    <section id="calculator" className="scroll-mt-40 py-12 md:py-16">
      <div className="mx-auto w-11/12">
        <SectionHeading
          eyebrow="Try it yourself"
          title="See your monthly payment"
          subtitle="Enter a price, pick a bank and a tenure, and see exactly what you would pay each month."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {/* Inputs */}
          <div className="rounded-2xl border border-light-100 bg-white p-5 shadow-sm sm:p-7">
            <h3 className="font-heading text-base font-bold text-ink">
              Instalment calculator
            </h3>
            <p className="mt-1 text-xs text-muted">
              Change any option to update the amount instantly.
            </p>

            <label htmlFor="calc-price" className="mt-5 block text-xs font-semibold text-ink">
              Product price
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-light-100 bg-white p-3 focus-within:border-primary">
              <span className="text-xs font-semibold text-muted">Rs</span>
              <input
                id="calc-price"
                type="text"
                inputMode="numeric"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value.replace(/\D/g, "").slice(0, 9))
                }
                placeholder="100000"
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none"
              />
            </div>

            <label htmlFor="calc-bank" className="mt-5 block text-xs font-semibold text-ink">
              Your bank
            </label>
            <div className="relative mt-1.5">
              <select
                id="calc-bank"
                value={bank.key}
                onChange={(e) => setBankKey(e.target.value)}
                className="w-full appearance-none rounded-lg border border-light-100 bg-white p-3 pr-10 text-sm text-ink outline-none focus:border-primary"
              >
                {banks.map((b) => (
                  <option key={b.key} value={b.key}>
                    {b.label}
                    {b.islamic ? " (Islamic)" : ""}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>

            <p className="mt-5 text-xs font-semibold text-ink">Tenure</p>
            <div className="mt-1.5 flex flex-wrap gap-2" role="radiogroup" aria-label="Tenure">
              {bank.plans.map((p) => {
                const active = p.months === plan.months;
                return (
                  <button
                    key={p.months}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMonths(p.months)}
                    className={`min-w-20 flex-1 rounded-lg border p-3 text-center transition ${
                      active
                        ? "border-primary bg-brand-50 text-primary"
                        : "border-light-100 bg-white text-ink hover:border-primary"
                    }`}
                  >
                    <span className="block text-base font-bold">{p.months}</span>
                    <span className="block text-xs text-muted">months</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col rounded-2xl bg-gradient-to-br from-primary-200 via-primary-100 to-primary p-5 text-white shadow-lg sm:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">
              Your monthly instalment
            </p>
            <p
              className="mt-2 break-words font-heading text-4xl font-extrabold sm:text-5xl"
              aria-live="polite"
            >
              {formatPrice(monthly, "Rs ")}
            </p>
            <p className="mt-1 text-sm text-white/70">
              per month for {plan.months} months
            </p>

            <div className="mt-5 flex items-center gap-3">
              <BankBadge code={bank.code} className="bg-white/15 text-white" />
              <div>
                <p className="text-sm font-bold">{bank.label}</p>
                <p className="text-xs text-white/70">
                  {bank.islamic
                    ? "Shariah-compliant instalment plan"
                    : "Credit card instalment plan"}
                </p>
              </div>
            </div>

            <dl className="mt-auto space-y-3 pt-6 text-sm">
              <div className="flex justify-between gap-4 border-t border-white/20 pt-3">
                <dt className="text-white/80">Product price</dt>
                <dd className="font-bold">{formatPrice(amount, "Rs ")}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-white/20 pt-3">
                <dt className="text-white/80">Bank markup ({formatRate(plan.markup)})</dt>
                <dd className="font-bold">{formatPrice(markupAmount, "Rs ")}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-white/20 pt-3">
                <dt className="text-white/80">Total you pay</dt>
                <dd className="font-bold">{formatPrice(total, "Rs ")}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-3xl items-start gap-3 rounded-xl border border-brand-50 bg-brand-50 p-4 text-xs leading-relaxed text-ink-50 sm:text-sm">
          <Info size={16} className="mt-0.5 shrink-0 text-primary" />
          <p>
            This is an estimate to help you compare. Markup shown is the{" "}
            <strong className="text-ink">total added over the whole plan</strong>,
            not per month. Your bank confirms the exact plan and monthly amount
            at checkout, and rates can change with each bank&apos;s current offers.
          </p>
        </div>
      </div>
    </section>
  );
}
