import { CreditCard, Percent, ShieldCheck } from "lucide-react";

export default function Highlights({ months, hasZeroMarkup, hasIslamic }) {
  const min = months[0];
  const max = months[months.length - 1];

  const items = [
    {
      icon: CreditCard,
      tone: "bg-brand-50 text-primary",
      title: min && max && min !== max ? `${min} to ${max} months` : "Flexible tenures",
      text: "Pick the tenure that fits your budget. Shorter plans cost less, longer plans keep the monthly amount small.",
    },
    hasZeroMarkup && {
      icon: Percent,
      tone: "bg-gold-50 text-gold-700",
      title: "0% markup on select plans",
      text: "Several partner banks add no markup on their shortest plan. You pay exactly the sticker price, split into equal parts.",
    },
    hasIslamic && {
      icon: ShieldCheck,
      tone: "bg-brand-50 text-primary",
      title: "Islamic plans available",
      text: "Shariah-compliant instalment plans are offered by our Islamic banking partners, so you can buy the halal way if you prefer.",
    },
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto w-11/12">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, tone, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-light-100 bg-white p-5 shadow-sm"
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-heading text-sm font-bold text-ink">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
