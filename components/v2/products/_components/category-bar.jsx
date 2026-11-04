import Link from "next/link";
import { getFilters } from "@/lib/product-query/fetch-api";
import { hrefFor, selectCategory } from "@/lib/product-query/query";

const chip =
  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700";

// "used-laptops" -> "used laptops" (URL me raw label hi jata hai)
const prettify = (label) => label.replace(/-/g, " ");

export async function CategoryBar({ query }) {
  const { categories } = await getFilters(query.category, query.subCategory);
  if (!categories.length) return null;

  const active = query.category?.toLowerCase();
  // selected category list me na aaye tab bhi dikhao, taake user hata sake
  const list =
    active && !categories.some((c) => c.label.toLowerCase() === active)
      ? [{ label: query.category }, ...categories]
      : categories;

  return (
    <nav
      aria-label="Categories"
      className="mt-3 flex flex-wrap items-center gap-3"
    >
      <span className="mr-2 hidden shrink-0 md:block text-xs font-semibold tracking-wide text-slate-400">
        Category
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
            href={hrefFor(selectCategory(query, undefined))}
            aria-current={!active ? "page" : undefined}
            className={`${chip} ${!active ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
          >
            All
          </Link>
        </div>
        {list.map((c) => {
          const selected = active === c.label.toLowerCase();
          return (
            <div  key={c.id ?? c.label} className="snap-start">
              <Link
               
                href={hrefFor(
                  selectCategory(query, selected ? undefined : c.label),
                )}
                aria-current={selected ? "page" : undefined}
                className={`${chip} ${selected ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"}`}
              >
                {prettify(c.label)}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
