import { Check, X } from "lucide-react";
import { formatStepDate } from "@/lib/orderStatus";

function Dot({ state }) {
  if (state === "done")
    return (
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#12885A] text-white">
        <Check size={14} strokeWidth={3} />
      </span>
    );
  if (state === "failed")
    return (
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red text-white">
        <X size={14} strokeWidth={3} />
      </span>
    );
  if (state === "current")
    return <span className="h-6 w-6 shrink-0 rounded-full bg-primary" />;
  return (
    <span className="h-6 w-6 shrink-0 rounded-full border-2 border-light-100 bg-white" />
  );
}

export default function OrderStatusTimeline({ steps }) {
  return (
    <section className="rounded-2xl border border-light-100 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-card-title font-bold text-ink">Order status</h2>

      <ol className="mt-5">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1;
          const date = formatStepDate(step.dateTime);
          const meta =
            step.state === "done" || step.state === "failed"
              ? [date, step.hint].filter(Boolean).join(" · ")
              : step.hint;

          return (
            <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Connector: done step ke neeche green, baaki halki */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-3 top-6 w-0.5 -translate-x-1/2 ${
                    step.state === "done" ? "bg-[#12885A]" : "bg-light-100"
                  }`}
                />
              )}

              <Dot state={step.state} />

              <div className="min-w-0 pt-0.5">
                <p
                  className={`text-sm font-semibold ${
                    step.state === "current"
                      ? "text-primary"
                      : step.state === "failed"
                        ? "text-red"
                        : "text-ink"
                  }`}
                >
                  {step.title}
                </p>
                {meta && <p className="mt-0.5 text-xs text-muted">{meta}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
