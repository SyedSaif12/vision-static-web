import { PRODUCTS_PATH } from "@/lib/product-query/query";
import Link from "next/link";

const mappedQuery = {
  isFeatured: 'Featured',
  deals: 'Deals',
  isComingSoon: 'Coming Soon',
  'open-box': 'Open Box',
  refurbished: 'Refusbished',
  'new-arrivals': 'New Arrivals',
  'brand-new': 'Brand New',
  'used-products': 'Used Products'
}

export function PageHeader({ query }) {
  const activeFilterKey = Object.keys(mappedQuery).find(
    (key) => query[key] === 'true' || query[key] === true || query.tag === key
  );

  const filterLabel = activeFilterKey ? mappedQuery[activeFilterKey] : null;

  const title = query.category ?? "All products";
  const brand = query?.subCategory ?? "";
  return (
    <header className="pt-6">
      <nav
        aria-label="Breadcrumb"
        className="text-xs md:text-sm lg:text-base text-slate-500"
      >
        <Link href="/" className="hover:text-blue-700">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={PRODUCTS_PATH} className="hover:text-blue-700">
          Products
        </Link>
        {query.category && (
          <>
            <span className="mx-1.5">/</span>
            <span className="text-slate-800">{query.category}</span>
          </>
        )}
        {filterLabel && (
          <>
            <span className="mx-1.5">/</span>
            <span className="text-slate-800">{filterLabel}</span>
          </>
        )}
      </nav>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 capitalize">
        {title} {brand ?? ""} price in Pakistan
      </h1>
    </header>
  );
}
