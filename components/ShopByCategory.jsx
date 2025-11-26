"use client";

import React from "react";
import testicon from "@/assets/testicon.png";
import arrowIcon from "@/assets/arrowicn.svg";
import Link from "next/link";

const ShopByCategory = () => {
  const categories = [
    { name: "Laptops" },
    { name: "Tablets" },
    { name: "Phones" },
    { name: "HotDeals" },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-10">
      <h2 className="text-2xl font-semibold">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {categories.map((category, index) => (
          <Link
            href={`/all-products?category=${category.name}`}
            key={index}
            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col bg-white"
          >
            <div className="bg-white h-48 sm:h-56 flex items-center justify-center overflow-hidden m-4 rounded-lg">
              <img
                src={testicon.src}
                alt={category.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="bg-[#D3E3FD] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between rounded-full mx-3 mb-4">
              <span className="font-semibold text-blue-900 text-sm sm:text-base">
                {category.name}
              </span>
              <img
                src={arrowIcon.src}
                alt="arrow icon"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
