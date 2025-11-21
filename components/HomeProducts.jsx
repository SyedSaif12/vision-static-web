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

        <div className="flex items-center gap-4">
          {/* View All BUTTON */}
          <button
            onClick={() => router.push("/all-products")}
            className="border border-[#5869F1] px-5 py-1.5 rounded-full text-[#5869F1] hover:bg-[#eef0ff]"
          >
            View All
          </button>

          {/* ARROWS */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-9 h-9 flex items-center justify-center text-[#5869F1] text-xl font-bold hover:bg-[#eef0ff]"
              disabled={startIndex === 0}
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              disabled={startIndex + itemsPerPage >= products.length}
              className="w-9 h-9 flex items-center justify-center text-[#5869F1] text-xl font-bold hover:bg-[#eef0ff]"
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
