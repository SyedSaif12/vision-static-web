import Link from "next/link";
import { getFilters } from "@/lib/product-query/fetch-api";
import { hrefFor, selectBrand } from "@/lib/product-query/query";

const chip =
  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

export async function BrandBar({ query }) {
  const { brands } = await getFilters(query.category, query.subCategory);

  const active = query.subCategory?.toLowerCase();
  // sirf subCategory wale case me backend bas wahi selected brand bhejta hai;
  // agar kisi wajah se list me na ho tab bhi selected brand dikhao
  const list =
    active && !brands.some((b) => b.label.toLowerCase() === active)
      ? [{ label: query.subCategory }, ...brands]
      : brands;
  if (!list.length) return null;

  return (
    <nav aria-label="Brands" className="mt-3 flex flex-wrap items-center gap-3">
      <span className="mr-2 hidden shrink-0 md:block text-xs font-semibold tracking-wide text-slate-400">
        Brands
      </span>
      <div
        className="
                 flex min-w-0 flex-1 flex-nowrap items-center gap-3
          overflow-x-auto overscroll-x-contain
          pt-1
          snap-x snap-mandatory
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
              "
      >
        <div className="snap-start">
          <Link
            href={hrefFor(selectBrand(query, undefined))}
            aria-current={!active ? "page" : undefined}
            className={`${chip} ${!active ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
          >
            All
          </Link>
        </div>
        {list.map((b) => {
          const selected = active === b.label.toLowerCase();
          return (
            <div key={b.id ?? b.label} className="snap-start">
              <Link
              
                href={hrefFor(
                  selectBrand(query, selected ? undefined : b.label),
                )}
                aria-current={selected ? "page" : undefined}
                className={`${chip} ${selected ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
              >
                {b.label}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
