import { ProductCard } from "./product-card";

export function ProductGrid({ products }) {
  return (
    <ul className="mt-5 grid grid-cols-2 gap-1.5 md:gap-4 sm:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < 3} />
        </li>
      ))}
    </ul>
  );
}
