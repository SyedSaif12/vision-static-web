import Link from "next/link";
import { hrefFor, selectBrand, toggleFilter, withPatch, } from "@/lib/product-query/query";
import { formatPrice } from "@/lib/utils";

export function ActiveFilters({ query }) {
  const chips = [];

  if (query.subCategory) {
    chips.push({ label: query.subCategory, href: hrefFor(selectBrand(query, undefined)) });
  }
  for (const [key, values] of Object.entries(query.filters)) {
    for (const v of values) {
      chips.push({ label: v, href: hrefFor(toggleFilter(query, key, v)) });
    }
  }
  if (query.minPrice !== undefined) {
    chips.push({ label: `Min ${formatPrice(query.minPrice)}`, href: hrefFor(withPatch(query, { minPrice: undefined })) });
  }
  if (query.maxPrice !== undefined) {
    chips.push({ label: `Max ${formatPrice(query.maxPrice)}`, href: hrefFor(withPatch(query, { maxPrice: undefined })) });
  }

  if (!chips.length) return null;

  return (
    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
      {chips.map((c) => (
        <li key={c.label}>
          <Link
            href={c.href}
            scroll={false}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 capitalize hover:bg-blue-100"
          >
            {c.label}
            <span aria-hidden>×</span>
            <span className="sr-only">remove filter</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
