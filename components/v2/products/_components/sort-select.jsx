"use client";

import { ArrowDownUp, ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

/**
 * Ye client component URL ka koi logic nahi jaanta.
 * Server ne har option ka final href bana kar diya hai; ye sirf navigate karta hai.
 */
export function SortSelect({ options, value, hidden = false }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <label
      className={`${hidden ? "hidden lg:flex" : "lg:hidden flex"} items-center gap-2 text-sm text-slate-500`}
    >
      <span className="hidden md:block">Sort by</span>
      <div className="relative">
        <ArrowDownUp
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <select
          value={value}
          disabled={pending}
          onChange={(e) =>
            startTransition(() =>
              router.push(e.target.value, { scroll: false }),
            )
          }
          className="
            appearance-none rounded-lg border border-slate-200
            bg-white py-2 pl-9 pr-8 text-sm font-medium
            text-slate-900 outline-none
            focus-visible:ring-2 focus-visible:ring-blue-700
            disabled:opacity-60
          "
        >
          {options.map((o) => (
            <option key={o.href} value={o.href}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
      </div>
    </label>
  );
}
