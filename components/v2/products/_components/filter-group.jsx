import Link from "next/link";
import { hrefFor, toggleFilter } from "@/lib/product-query/query";

function Box({ checked }) {
  return (
    <span
      aria-hidden
      className={`grid size-4 shrink-0 place-items-center rounded border ${
        checked ? "border-blue-700 bg-blue-700 text-white" : "border-slate-300 bg-white"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m2.5 6.5 2.2 2.2L9.5 3.8" />
        </svg>
      )}
    </span>
  );
}

export function FilterGroup({
  paramKey,
  title,
  options,
  query,
}) {
  const selected = new Set(query.filters[paramKey] ?? []);

  return (
    // <details> = bina JS ke collapse/expand
    <details open className="group border-t border-slate-100 pt-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
        {title}
        <svg viewBox="0 0 12 12" className="size-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="m2 4.5 4 3.5 4-3.5" />
        </svg>
      </summary>

      <ul className="mt-3 space-y-1">
        {options.map((o) => {
          const checked = selected.has(o.label);
          const disabled = o.count === 0 && !checked;
          const row = (
            <>
              <Box checked={checked} />
              <span className="flex-1">{o.label}</span>
              <span className="text-xs text-slate-400">{o.count}</span>
            </>
          );
          return (
            <li key={o.label}>
              {disabled ? (
                <span aria-disabled className="flex cursor-not-allowed items-center gap-3 rounded-md px-1 py-1.5 text-sm text-slate-300">
                  {row}
                </span>
              ) : (
                <Link
                  href={hrefFor(toggleFilter(query, paramKey, o.label))}
                  scroll={false}
                  aria-pressed={checked}
                  className="flex items-center gap-3 rounded-md px-1 py-1.5 text-sm text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-700"
                >
                  {row}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </details>
  );
}
