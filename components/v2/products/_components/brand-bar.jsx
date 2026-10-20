import Link from "next/link";
import { getFilters } from "@/lib/product-query/fetch-api";
import { hrefFor, selectBrand } from "@/lib/product-query/query";

const chip =
  "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

export async function BrandBar({ query }) {
  const { filters } = await getFilters(query.category, query.subCategory);
  const brands = filters.brands ?? [];
  if (!brands.length) return null;

  const active = query.subCategory?.toLowerCase();

  return (
    <nav aria-label="Brands" className="mt-6 flex flex-wrap items-center gap-3">
      <span className="mr-2 text-xs font-semibold tracking-wide text-slate-400">Brands</span>

      <Link
        href={hrefFor(selectBrand(query, undefined))}
        aria-current={!active ? "page" : undefined}
        className={`${chip} ${!active ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
      >
        All
      </Link>

      {brands.map((b) => {
        const selected = active === b.label.toLowerCase();
        const disabled = b.count === 0 && !selected;
        const content = (
          <>
            {b.label}
            {/* <span className={`text-xs font-normal ${selected ? "text-blue-100" : "text-slate-400"}`}>
              {b.count}
            </span> */}
          </>
        );

        if (disabled) {
          return (
            <span key={b.id ?? b.label} aria-disabled className={`${chip} cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400`}>
              {content}
            </span>
          );
        }
        return (
          <Link
            key={b.id ?? b.label}
            href={hrefFor(selectBrand(query, selected ? undefined : b.label))}
            aria-current={selected ? "page" : undefined}
            className={`${chip} ${selected ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
