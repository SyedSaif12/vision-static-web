"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

/**
 * Ye client component URL ka koi logic nahi jaanta.
 * Server ne har option ka final href bana kar diya hai; ye sirf navigate karta hai.
 */
export function SortSelect({
  options,
  value,
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 text-sm text-slate-500">
      Sort by
      <select
        value={value}
        disabled={pending}
        onChange={(e) => startTransition(() => router.push(e.target.value, { scroll: false }))}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-700 disabled:opacity-60"
      >
        {options.map((o) => (
          <option key={o.href} value={o.href}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
