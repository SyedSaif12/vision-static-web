import { getProducts } from "@/lib/product-query/fetch-api";
import { FilterPanel } from "./filter-panel";
import { MobileFilterSheet } from "./mobile-filter-sheet";
import { clearAll, hasActiveFilters, hrefFor } from "@/lib/product-query/query";

/** Badge ke liye: kitne filters lage hain (category nav hai, filter nahi) */
function activeCount(q) {
    return (
        (q.subCategory ? 1 : 0) +
        (q.name ? 1 : 0) +
        (q.minPrice !== undefined || q.maxPrice !== undefined ? 1 : 0) +
        Object.values(q.filters).reduce((n, v) => n + v.length, 0)
    );
}

export async function MobileFilters({ query }) {
    // Results wali same fetch hai, Next ek hi request chalata hai (memoized)
    const { total } = await getProducts(query);

    const noun =
        total === 1
            ? "product"
            : query.category
                ? query.category.replace(/-/g, " ")
                : "products";

    return (
        <MobileFilterSheet
            query={query}
            activeCount={activeCount(query)}
            showLabel={total === 0 ? "No results" : `Show ${total} ${noun}`}
            clearHref={hrefFor(clearAll(query))}
            canClear={hasActiveFilters(query)}
        >
            <FilterPanel query={query} openCount={2} />
        </MobileFilterSheet>
    );
}

export function MobileFiltersSkeleton() {
    return (
        <div
            aria-hidden
            className="h-[46px] w-32 animate-pulse rounded-xl bg-light-100 motion-reduce:animate-none"
        />
    );
}