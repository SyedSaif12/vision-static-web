import Link from "next/link";
import { hrefFor, toggleFilter } from "@/lib/product-query/query";

/** "screen_size" -> "Screen Size", "connectivityType" -> "Connectivity Type" */
export const titleFor = (key) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

function Box({ checked }) {
  return (
    <span
      aria-hidden
      className={`grid h-5 w-5 shrink-0 place-items-center rounded border-[1.5px] ${
        checked ? "border-brand bg-brand text-white" : "border-faint bg-white"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m2.5 6.5 2.2 2.2L9.5 3.8" />
        </svg>
      )}
    </span>
  );
}

export function FilterGroup({ paramKey, options, query, defaultOpen = true }) {
  const selected = new Set(query.filters[paramKey] ?? []);

  return (
    // <details> = bina JS ke collapse/expand. defaultOpen sirf index par depend kare
    // (selection par nahi), warna option hatate hi group khud band ho jata.
    <details open={defaultOpen} className="group border-t border-light-100 pt-3">
      <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          {titleFor(paramKey)}
          {selected.size > 0 && (
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-white">
              {selected.size}
            </span>
          )}
        </span>
        <svg
          viewBox="0 0 12 12"
          className="h-3 w-3 text-faint transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="m2 4.5 4 3.5 4-3.5" />
        </svg>
      </summary>

      <ul className="mt-1 pb-2">
        {options.map((o) => {
          const checked = selected.has(o.label);
          const disabled = o.count === 0 && !checked;
          const row = (
            <>
              <Box checked={checked} />
              <span className="flex-1">{o.label}</span>
              <span className="text-xs text-faint">{o.count}</span>
            </>
          );
          return (
            <li key={o.label}>
              {disabled ? (
                <span
                  aria-disabled
                  className="flex cursor-not-allowed items-center gap-3 rounded-lg px-1 py-2.5 text-sm text-light-100 lg:py-1.5"
                >
                  {row}
                </span>
              ) : (
                <Link
                  href={hrefFor(toggleFilter(query, paramKey, o.label))}
                  scroll={false}
                  aria-pressed={checked}
                  className="flex items-center gap-3 rounded-lg px-1 py-2.5 text-[15px] text-ink-50 hover:bg-surface lg:py-1.5 lg:text-sm"
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