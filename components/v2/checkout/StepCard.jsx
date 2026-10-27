"use client";
import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { cx } from "./ui/cx";
import { linkButton } from "./ui/styles";

/**
 * Accordion-style shell shared by every step.
 *  pending → greyed header only
 *  active  → header + body (children)
 *  done    → check mark, summary line and an Edit action
 */
export default function StepCard({
  id,
  number,
  title,
  status,
  summary,
  actionLabel = "Edit",
  onAction,
  children,
}) {
  const ref = useRef(null);
  const wasActive = useRef(status === "active");

  // Bring a newly opened step into view (important on mobile).
  useEffect(() => {
    if (status === "active" && !wasActive.current) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    wasActive.current = status === "active";
  }, [status]);

  return (
    <section
      ref={ref}
      aria-labelledby={`step-${id}-title`}
      className={cx(
        "scroll-mt-24 rounded-2xl border bg-white p-5 sm:p-6",
        status === "pending"
          ? "border-gray-100 bg-white/60"
          : "border-gray-200 shadow-sm",
      )}
    >
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={cx(
            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
            status === "done" && "bg-green-600 text-white",
            status === "active" && "bg-primary text-white",
            status === "pending" && "bg-gray-100 text-gray-400",
          )}
        >
          {status === "done" ? <Check size={16} /> : number}
        </span>

        <div className="min-w-0 flex-1">
          <h2
            id={`step-${id}-title`}
            className={cx(
              "text-lg font-bold",
              status === "pending" ? "text-gray-400" : "text-gray-900",
            )}
          >
            {title}
          </h2>
          {status === "done" && summary && (
            <p className="mt-0.5 break-words text-sm text-gray-500">{summary}</p>
          )}
        </div>

        {status === "done" && onAction && (
          <button type="button" onClick={onAction} className={linkButton}>
            {actionLabel}
          </button>
        )}
      </header>

      {status === "active" && <div className="mt-5 sm:pl-11">{children}</div>}
    </section>
  );
}
