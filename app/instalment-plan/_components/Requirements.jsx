import { Check, CreditCard, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const CARDS = [
  {
    icon: CreditCard,
    tone: "bg-brand-50 text-primary",
    title: "To pay in instalments",
    items: [
      "A credit card from one of the supported banks above",
      "Enough available limit on the card for the full price",
      "An order above the minimum instalment amount",
      "That is it, no separate application or paperwork with us",
    ],
  },
  {
    icon: ShieldCheck,
    tone: "bg-gold-50 text-gold-700",
    title: "Good to know",
    items: [
      "The bank blocks the full amount on your card, then splits it into monthly instalments",
      "Availability and rates depend on your card and the bank's current offer",
      "Islamic bank plans use a Shariah-compliant profit rate, not interest",
      "Not sure if your card qualifies? Message us and we will check for you",
    ],
  },
];

export default function Requirements() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-11/12">
        <SectionHeading eyebrow="Before you start" title="What you need" />

        <div className="mx-auto mt-8 grid gap-5 md:grid-cols-2">
          {CARDS.map(({ icon: Icon, tone, title, items }) => (
            <article
              key={title}
              className="rounded-2xl border border-light-100 bg-white p-5 shadow-sm sm:p-7"
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}
              >
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-heading text-base font-bold text-ink">
                {title}
              </h3>
              <ul className="mt-3 divide-y divide-light-100">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 py-3 text-sm text-ink-50"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
