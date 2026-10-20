import Link from "next/link";
import { getFilters } from "@/lib/product-query/fetch-api";
import { clearAll, hasActiveFilters, hrefFor } from "@/lib/product-query/query";
import { FilterGroup } from "./filter-group";
import { PriceFilter } from "./price-filter";

const titleFor = (key) =>
  key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase -> words
    .replace(/[_-]+/g, " ") // snake_case / kebab-case -> words
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export async function FiltersSidebar({ query }) {
  const { filters, price } = await getFilters(query.category, query.subCategory);

  // brands top bar me hain; baqi jitne groups backend de, sab khud render
  const groups = Object.entries(filters).filter(([key]) => key !== "brands");

  return (
    <div className="sticky top-4 space-y-6 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Filters</h2>
        {hasActiveFilters(query) && (
          <Link href={hrefFor(clearAll(query))} className="text-sm font-medium text-blue-700 hover:underline">
            Clear all
          </Link>
        )}
      </div>

      <PriceFilter query={query} range={price} />

      {groups.map(([key, options]) => (
        <FilterGroup
          key={key}
          paramKey={key}
          title={titleFor(key)}
          options={options}
          query={query}
        />
      ))}

      {!groups.length && !price && (
        <p className="text-sm text-slate-500">No filters available.</p>
      )}
    </div>
  );
}
