"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
import CartDrawer from "./CartDrawer";
// import { fetchProducts } from "@/redux/product/productSlice";

const HomeProducts = ({ products }) => {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);

  // Index for pagination-based slider
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 4;

  const nextSlide = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="flex flex-col pt-14 w-full">
      {/* HEADER + VIEW ALL + ARROWS */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
        <div className="w-full h-full flex items-center">
          <h2 className="w-full text-2xl sm:text-3xl my-4 sm:my-0 sm:mb-0 font-semibold">
            Featured Products
          </h2>
        </div>

        <div className="flex items-center justify-between gap-2 w-full sm:w-auto sm:ml-auto">
          {/* View All BUTTON */}
          <button
            onClick={() => router.push("/view-featured-products")}
            className="border border-[#5869F1] text-[#5869F1] rounded-full 
            w-28 sm:w-32 px-2 py-1 text-sm hover:bg-[#eef0ff]
            sm:px-5 sm:py-1.5 sm:text-base"
          >
            View All
          </button>

          {/* ARROWS */}
          <div className="flex w-28 sm:w-32 items-center gap-1">
            <button
              onClick={prevSlide}
              className="w-full h-8 flex items-center justify-center text-[#5869F1] 
          text-base font-bold hover:bg-[#eef0ff]
          sm:w-9 sm:h-9 sm:text-xl"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="w-full h-8 flex items-center justify-center text-[#5869F1] 
          text-base font-bold hover:bg-[#eef0ff]
          sm:w-9 sm:h-9 sm:text-xl"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID (only 4 per slide) */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-6 mt-6 py-5 md:py-10 w-full">
        {products &&
          products
            .slice(startIndex, startIndex + itemsPerPage)
            .map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                openCart={() => setCartOpen(true)}
              />
            ))}
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default HomeProducts;
