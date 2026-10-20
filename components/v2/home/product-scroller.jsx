import { ProductCard } from "../products/_components/product-card";

export function ProductScroller({
  products,
  label,
}) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="min-w-0 snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
    >
      <ul className="flex gap-4">
        {products.map((p) => (
          <li key={p.id} className="w-[250px] shrink-0 snap-start sm:w-[270px]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
