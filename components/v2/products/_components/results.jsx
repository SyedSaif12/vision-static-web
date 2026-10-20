import Link from "next/link";
import { redirect } from "next/navigation";
import { getProducts } from "@/lib/product-query/fetch-api";
import {
  SORT_OPTIONS,
  clearAll,
  hasActiveFilters,
  hrefFor,
  withPatch,
} from "@/lib/product-query/query";
import { ActiveFilters } from "./active-filters";
import { Pagination } from "./pagination";
import { ProductGrid } from "./product-grid";
import { SortSelect } from "./sort-select";

export async function Results({ query }) {
  const result = await getProducts(query);

  // ?page=99 jaisa out-of-range URL -> aakhri valid page par bhej do
  if (result.total > 0 && query.page > result.totalPages) {
    redirect(hrefFor({ ...query, page: result.totalPages }));
  }

  const sortOptions = SORT_OPTIONS.map((o) => ({
    label: o.label,
    href: hrefFor(withPatch(query, { orderBy: o.orderBy, order: o.order })),
  }));
  const currentSort = SORT_OPTIONS.findIndex(
    (o) => o.orderBy === query.orderBy && o.order === query.order,
  );

  const from = (result.page - 1) * result.limit + 1;
  const to = Math.min(result.page * result.limit, result.total);

  return (
    <section aria-label="Product results" className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">{result.total}</strong>{" "}
          {result.total === 1 ? "product" : "products"}
        </p>
        <SortSelect
          options={sortOptions}
          value={sortOptions[Math.max(currentSort, 0)].href}
        />
      </div>

      <ActiveFilters query={query} />

      {result.products.length ? (
        <>
          <ProductGrid products={result.products} />
          <Pagination
            query={query}
            page={result.page}
            totalPages={result.totalPages}
            from={from}
            to={to}
            total={result.total}
          />
        </>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <h2 className="text-lg font-semibold text-slate-900">
            No Products Found!
          </h2>
          <p className="mt-1 text-sm text-slate-600">
           Try reducing the number of filters, or clear all the filters.

          </p>
          {hasActiveFilters(query) && (
            <Link
              href={hrefFor(clearAll(query))}
              className="mt-5 inline-block rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-300"
            >
              Clear all filters
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
