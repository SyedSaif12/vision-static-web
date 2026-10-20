import { ShoppingCart, CreditCard, ListChecks, CircleCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    icon: ShoppingCart,
    title: "Pick your product",
    text: "Add the laptop, phone, or appliance you want to your cart, like a normal order.",
  },
  {
    icon: CreditCard,
    title: 'Choose "Pay in instalments"',
    text: "At checkout, select the instalment option instead of paying the full amount.",
  },
  {
    icon: ListChecks,
    title: "Select your bank and tenure",
    text: "Pick your bank's credit card and how many months you want.",
  },
  {
    icon: CircleCheck,
    title: "Your bank confirms the plan",
    text: "The bank converts your purchase into instalments and confirms the monthly amount. You are done.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto w-11/12">
        <SectionHeading
          eyebrow="How it works"
          title="Four simple steps"
          subtitle="Instalments run on your bank credit card. The bank handles the plan, we just make it easy to pick."
        />

        <ol className="mx-auto mt-8 max-w-3xl space-y-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="flex items-center gap-4 rounded-xl border border-light-100 bg-white p-4 shadow-sm"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-sm font-bold text-ink">{title}</h3>
                <p className="mt-0.5 text-xs text-muted sm:text-sm">{text}</p>
              </div>
              <Icon size={26} className="hidden shrink-0 text-primary sm:block" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
