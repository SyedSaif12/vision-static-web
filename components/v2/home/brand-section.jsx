import Link from "next/link";
import { BrandPromoCard } from "./brand-promo-card";
import { ProductScroller } from "./product-scroller";
import { brandHref } from "@/lib/product-query/fetch-api";

export const MAX_PRODUCTS_PER_SECTION = 12;

export function BrandSection({
  section,
  maxProducts = MAX_PRODUCTS_PER_SECTION,
}) {
  const category = section.category.name.toLowerCase();
  const subCategory = section.subCategory.name.toLowerCase();
  const products = section.products.slice(
    0,
    Math.min(maxProducts, MAX_PRODUCTS_PER_SECTION),
  );
  const headingId = `brand-section-${section.id}`;

  return (
    <section aria-labelledby={headingId} className="py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-[0.2em] text-blue-700 uppercase">
            {section.category.name}
          </p>
          <h2
            id={headingId}
            className="mt-3 text-3xl font-bold tracking-tight text-slate-900"
          >
            Shop {section.heading} {category}
          </h2>
          {section.description && (
            <p className="mt-3 text-base text-slate-600">
              {section.description}
            </p>
          )}
        </div>

        <Link
          href={brandHref(section)}
          className="shrink-0 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:border-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          All {section.heading} {category} <span aria-hidden>›</span>
        </Link>
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <BrandPromoCard section={section} />
        <ProductScroller
          products={products}
          label={`${section.heading} ${category}`}
        />
      </div>
    </section>
  );
}
