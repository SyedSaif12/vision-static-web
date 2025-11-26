"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/redux/product/productSlice";

const HomeProducts = () => {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const router = useRouter();

  // Index for pagination-based slider
  const [startIndex, setStartIndex] = useState(0);

  const itemsPerPage = 4;

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

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
      <div className="flex items-center justify-between w-full">
        <h2 className="text-2xl font-semibold">Featured Products</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
          {/* View All BUTTON */}
          <button
            onClick={() => router.push("/all-products")}
            className="border border-[#5869F1] text-[#5869F1] rounded-full 
        w-full px-2 py-1 text-sm hover:bg-[#eef0ff]
        sm:w-auto sm:px-5 sm:py-1.5 sm:text-base"
          >
            View All
          </button>

          {/* ARROWS */}
          <div className="flex items-center gap-1 w-full sm:w-auto">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 pb-14 w-full">
        {products &&
          products
            .slice(startIndex, startIndex + itemsPerPage)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
      </div>
    </div>
  );
};

export default HomeProducts;
