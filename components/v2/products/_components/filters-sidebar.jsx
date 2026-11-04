import Link from "next/link";
import { clearAll, hasActiveFilters, hrefFor } from "@/lib/product-query/query";
import { FilterPanel } from "./filter-panel";

/** Desktop sidebar: sirf card + header, content FilterPanel se. */
export async function FiltersSidebar({ query }) {
  return (
    <div className="sticky top-4 space-y-5 rounded-2xl border border-light-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Filters</h2>
        {hasActiveFilters(query) && (
          <Link
            href={hrefFor(clearAll(query))}
            className="text-sm font-medium text-brand hover:underline"
          >
            Clear all
          </Link>
        )}
      </div>

      <FilterPanel query={query} />
    </div>
  );
}