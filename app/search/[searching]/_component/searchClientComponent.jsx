"use client";
import ProductCard from "@/components/ProductCard";
import ProductsNotFound from "@/components/ProductsNotFound";

export default function SearchClientComponent({ products, total }) {
  return (
    <div className="w-11/12 md:max-w-7xl mx-auto pt-10">
      <h3 className="py-5 font-semibold text-lg">
        Showing results {total} items
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-6">
        {Array.isArray(products) && products.length > 0 ? (
          products?.map((product, idx) => (
            <ProductCard
              key={product.id + idx}
              product={product}
              openCart={() => setCartOpen(true)}
            />
          ))
        ) : (
          <div className="col-span-full">
            <ProductsNotFound />
          </div>
        )}
      </div>
    </div>
  );
}
