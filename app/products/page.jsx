import { Suspense } from "react";
import {
  PageHeader,
  BrandBar,
  FiltersSidebar,
  Results,
  BrandBarSkeleton,
  FiltersSkeleton,
  ResultsSkeleton,
} from "@/components/v2/products";
import { parseQuery, queryKey } from "@/lib/product-query/query";
import { PillsBar } from "@/components/v2/products/_components/pills-bar";
import { notFound } from "next/navigation";
import { getFilters } from "@/lib/product-query/fetch-api";
import { TagFilters } from "@/components/v2/products/_components/tag-filters";
import { CategoryBar } from "@/components/v2/products/_components/category-bar";
import {
  MobileFilters,
  MobileFiltersSkeleton,
} from "@/components/v2/products/_components/mobile-filters";

export async function generateMetadata({ searchParams }) {
  const q = parseQuery(await searchParams);
  const title = [q.subCategory, q.category ?? "Products"]
    .filter(Boolean)
    .join(" ");
  return { title: `${title} price in Pakistan` };
}

export default async function ProductsPage({ searchParams }) {
  // Next 16: searchParams Promise hai. URL ko yahin ek baar parse karte hain,
  // phir typed `query` neeche sab components ko jata hai.
  const query = parseQuery(await searchParams);

  const { notFound: missing } = await getFilters(
    query.category,
    query.subCategory,
  );
  if (missing) notFound();

  return (
    // <main className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-8">
    <main className="mx-auto w-11/12 mt-3 pt-3 pb-16 border-t border-t-gray-300 md:border-t-0">
      <PageHeader query={query} />

      <Suspense fallback={<BrandBarSkeleton />}>
        <TagFilters query={query} />
      </Suspense>

      <Suspense fallback={<BrandBarSkeleton />}>
        <CategoryBar query={query} />
      </Suspense>

      <Suspense fallback={<BrandBarSkeleton />}>
        <BrandBar query={query} />
      </Suspense>

      {query.subCategory && (
        <Suspense key={queryKey(query)} fallback={null}>
          <PillsBar query={query} />
        </Suspense>
      )}

      <div className="mt-6 lg:hidden">
        <Suspense fallback={<MobileFiltersSkeleton />}>
          <MobileFilters query={query} />
        </Suspense>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <Suspense fallback={<FiltersSkeleton />}>
            <FiltersSidebar query={query} />
          </Suspense>
        </aside>

        {/* key badla => naya skeleton; filters/brand bar remount nahi hote */}
        <Suspense key={queryKey(query)} fallback={<ResultsSkeleton />}>
          <Results query={query} />
        </Suspense>
      </div>
    </main>
  );
}
