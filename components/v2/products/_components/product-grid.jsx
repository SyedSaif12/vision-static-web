import { ProductCard } from "./product-card";

export function ProductGrid({ products }) {
  return (
    <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < 3} />
        </li>
      ))}
    </ul>
  );
}
