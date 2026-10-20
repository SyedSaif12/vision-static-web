import { Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function InstalmentFaq({ items }) {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto w-11/12">
        <SectionHeading eyebrow="Good to know" title="Instalment questions" />

        <div className="mx-auto mt-8 max-w-3xl divide-y divide-light-100 overflow-hidden rounded-2xl border border-light-100 bg-white shadow-sm">
          {items.map((item, i) => (
            <details key={item.q} open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-bold text-ink [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm font-bold">{item.q}</h3>
                <Plus
                  size={16}
                  className="shrink-0 text-primary transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
