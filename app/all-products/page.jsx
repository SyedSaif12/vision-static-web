"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import DrawerFilter from "@/components/DrawerFilter";
import Image from "next/image";
import FilterIcon from "@/assets/filtericon.png";
import SortByIcon from "@/assets/sortbyicon.png";

import { useSelector } from "react-redux";
import Pells from "@/components/Pells";

export default function AllProducts() {
  const products = useSelector((state) => state.products.items);

  const [openFilter, setOpenFilter] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([
    {
      id: 1,
      name: "Macbook M4 chip",
      total: 46,
    },
    {
      id: 2,
      name: "HP Drives",
      total: 83,
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    colors: [],
    price: [700, 2100],
  });

  const removeFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      colors: [],
      price: [700, 2100],
    });
  };

  const handleApplyFilters = () => {
    console.log("Filters Applied:", selectedFilters);
  };

  return (
    <div className="bg-gray-100">
      <HeroSection />
      {/* <div className="w-11/12 mx-auto flex flex-wrap justify-evenly my-10 gap-6"> */}
      <div className="w-11/12 mx-auto grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 my-10 gap-6">
        {!!subCategoryData &&
          subCategoryData.map((subCategory) => (
            <Pells key={subCategory.id} data={subCategory} />
          ))}
      </div>
      {/* TOP FILTER BAR */}

      <div className="px-6 md:px-16 lg:px-32 pt-8 flex items-center gap-4 flex-wrap bg-gray-100">
        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-2 bg-white border border-blue-600 text-blue-700 font-medium px-6 py-3 rounded-full shadow"
        >
          <Image src={FilterIcon} alt="filter" className="w-5 h-5" />
          <span>Filters</span>
        </button>

        <button className="flex items-center gap-2 bg-white border border-blue-600 text-blue-700 font-medium px-6 py-3 rounded-full shadow">
          <Image src={SortByIcon} alt="sort" className="w-5 h-5" />
          <span>Sort By</span>
        </button>

        {/* FILTER PILLS */}
        <div className="flex items-center gap-3 flex-wrap">
          {selectedFilters.categories.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-blue-700 text-blue-700 px-6 py-2 rounded-full cursor-pointer"
            >
              {item}
              <span onClick={() => removeFilter("categories", item)}>✕</span>
            </div>
          ))}

          {selectedFilters.colors.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-blue-700 text-blue-700 px-6 py-2 rounded-full cursor-pointer"
            >
              {item}
              <span onClick={() => removeFilter("colors", item)}>✕</span>
            </div>
          ))}

          {/* Price pill only if user changes */}
          {Array.isArray(selectedFilters.price) &&
            (selectedFilters.price[0] !== 700 ||
              selectedFilters.price[1] !== 2100) && (
              <div className="flex items-center gap-3 border border-blue-700 text-blue-700 px-6 py-2 rounded-full cursor-pointer">
                PKR {selectedFilters.price[0]} – PKR {selectedFilters.price[1]}
                <span
                  onClick={() =>
                    setSelectedFilters((p) => ({
                      ...p,
                      price: [700, 2100],
                    }))
                  }
                >
                  ✕
                </span>
              </div>
            )}
        </div>

        {(selectedFilters.categories.length > 0 ||
          selectedFilters.colors.length > 0 ||
          selectedFilters.price[0] !== 700 ||
          selectedFilters.price[1] !== 2100) && (
          <button
            onClick={clearAllFilters}
            className="bg-white border border-blue-600 text-blue-700 font-medium px-6 py-3 rounded-full shadow"
          >
            Remove all Filters
          </button>
        )}
      </div>

      {/* DRAWER */}
      <DrawerFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onApplyFilters={handleApplyFilters}
      />

      {/* PRODUCTS */}
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 bg-gray-100">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All products here</p>
          <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12 pb-14 w-full">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
