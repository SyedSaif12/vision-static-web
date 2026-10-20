import Link from "next/link";
import { getProducts } from "@/lib/product-query/fetch-api";
import { hrefFor, selectProductPills } from "@/lib/product-query/query";

const chip =
  "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

export async function PillsBar({ query }) {
  // pills sirf tab jab brand (subCategory) selected ho
  if (!query.subCategory) return null;

  const { chips } = await getProducts(query);
  if (!chips?.length) return null;

  const active = query.name?.toLowerCase();

  return (
    <nav aria-label="Models" className="mt-4 flex flex-wrap items-center gap-3">
      <span className="mr-2 text-xs font-semibold tracking-wide text-slate-400">
        Models
      </span>

      <Link
        href={hrefFor(selectProductPills(query, undefined))}
        aria-current={!active ? "page" : undefined}
        className={`${chip} ${!active ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
      >
        All
      </Link>

      {chips.map((b) => {
        const selected = active === b.label.toLowerCase();
        return (
          <Link
            key={b.id ?? b.label}
            href={hrefFor(
              selectProductPills(query, selected ? undefined : b.label),
            )}
            aria-current={selected ? "page" : undefined}
            className={`${chip} ${selected ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
          >
            {b.label} <span className="text-faint text-xs">( {b.count} )</span>
          </Link>
        );
      })}
    </nav>
  );
}
