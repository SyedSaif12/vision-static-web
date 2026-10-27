import { Check } from "lucide-react";
import { STEPS, getStepIndex } from "./lib/constants";
import { cx } from "./ui/cx";

export default function CheckoutStepper({ current }) {
  const currentIndex = getStepIndex(current);

  return (
    <nav aria-label="Checkout progress">
      <ol className="flex items-center gap-2 text-sm">
        {STEPS.map((step, i) => {
          const state =
            i < currentIndex ? "done" : i === currentIndex ? "active" : "pending";
          return (
            <li key={step.id} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="h-px w-4 bg-gray-300 sm:w-8" />
              )}
              <span
                aria-current={state === "active" ? "step" : undefined}
                className={cx(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                  state === "done" && "bg-green-600 text-white",
                  state === "active" && "bg-primary text-white",
                  state === "pending" && "bg-gray-200 text-gray-500",
                )}
              >
                {state === "done" ? <Check size={14} aria-hidden="true" /> : step.number}
              </span>
              <span
                className={cx(
                  "font-semibold",
                  state === "done" && "hidden text-green-700 sm:inline",
                  state === "active" && "text-gray-900",
                  state === "pending" && "hidden text-gray-400 sm:inline",
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
