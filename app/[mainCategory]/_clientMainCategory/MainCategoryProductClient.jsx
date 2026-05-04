"use client";
import FilterIcon from "@/assets/filtericon.svg";
import SortByIcon from "@/assets/sortbyicon.svg";
import CartDrawer from "@/components/CartDrawer";
import DrawerFilter from "@/components/DrawerFilter";
import ProductCard from "@/components/ProductCard";
import ProductsNotFound from "@/components/ProductsNotFound";
import { ProductGridSkeleton } from "@/components/Skeleton";
import SortByDrawer from "@/components/SortByDrawer";
import { useFetchProducts } from "@/hooks/useFetchProducts";

import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const MainCategoryProductClient = ({
  initialData = [],
  initialFilters = [],
  category,
  total,
  page: serverPage,
  limit,
  totalPage,
}) => {
  // ============================================
  // STATE — All State here
  // ============================================
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sort, setSort] = useState({ orderBy: "", order: "" });
  const [openFilter, setOpenFilter] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const {
    products,
    hasMore,
    setFilters,
    setSkip,
    setPage,
    isFetching,
    isLoading,
  } = useFetchProducts(category, '', initialData, total);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDataLoading = isLoading || isFetching;
  const showNotFound = isMounted && !isDataLoading && products.length === 0;

  // ============================================
  // FILTERS & SORT
  // ============================================
  const handleApplyFilters = (selectedFilter) => {
    setSkip(false);
    setPage(1);
    // setProducts([]);
    setFilters((prev) => ({ ...prev, ...selectedFilter }));
  };

  // ============================================
  // CLEAR FILTERS
  // ============================================
  const clearAllFilters = () => {
    setSkip(false);
    setFilters({});
    setSelectedFilters({});
    setSort({ orderBy: "", order: "" });
    setPage(1);
  };

  // ============================================
  // INFINITE SCROLL
  // ============================================
  const loadNextPage = () => {
    setSkip(false);
    setPage((prev) => prev + 1);
  };

  // ============================================
  // HELPER FLAGS
  // ============================================
  const hasAnyFilterSelected = Object.values(selectedFilters).some((value) =>
    Array.isArray(value) ? value.length > 0 : false,
  );
  const hasAnyFilterBySort = Boolean(sort.orderBy && sort.order);

  return (
    <div className="w-full">
      <div className="pt-8 flex items-start gap-4 flex-col flex-wrap">
        <div className="flex gap-4">
          <button
            onClick={() => setOpenFilter(true)}
            className={`flex items-center gap-1 md:gap-2 hover:cursor-pointer relative bg-white border ${hasAnyFilterSelected ? "border-orange-400 text-orange-400" : " border-blue-600 text-blue-700"} font-medium px-2 py-1 rounded-full md:px-6 md:py-3  shadow`}
          >
            <Image
              src={FilterIcon}
              alt="filter-icon"
              className="relative size-4 md:size-6"
            />
            <span className="text-xs md:text-base">Filters</span>
          </button>
          {/* sort filter drawer */}
          <button
            onClick={() => setSortOpen(true)}
            className={`flex items-center gap-1 md:gap-2 relative hover:cursor-pointer bg-white border ${hasAnyFilterBySort ? "border-orange-400 text-orange-400" : " border-blue-600 text-blue-700"} font-medium px-2 py-1 md:px-6 md:py-3 rounded-full shadow`}
          >
            <Image
              src={SortByIcon}
              alt="sort"
              className="relative size-4 md:size-6"
            />
            <span className="text-xs md:text-base">Sort By</span>
          </button>
        </div>
        {/* FILTER PILLS impliment */}
        {/* Dynamic pills */}
        <div className="flex items-center gap-3 flex-wrap">
          {Object.entries(selectedFilters).map(([filterType, values]) => {
            // Check karo ke ye array ya price object hai
            if (!values) return null;

            // Normal array filters (ram, storage, processor etc)
            if (Array.isArray(values) && values.length > 0) {
              return values.map((value, i) => (
                <div
                  key={filterType + i}
                  className="flex items-center gap-1 md:gap-3 border border-blue-700 text-blue-700 px-3 py-1 text-xs md:text-base md:px-6 md:py-2 rounded-full cursor-pointer"
                >
                  {value}
                </div>
              ));
            }

            return null;
          })}
          {/* show remove clear all button  */}
          {(hasAnyFilterSelected || hasAnyFilterBySort) && (
            <button
              onClick={clearAllFilters}
              className="bg-white border text-xs md:text-base border-blue-600 text-blue-700 font-medium px-3 py-1 md:px-6 md:py-3 rounded-full shadow"
            >
              Remove all Filters
            </button>
          )}
        </div>
      </div>
      {/* DRAWER */}
      <DrawerFilter
        data={initialFilters}
        open={openFilter}
        productCount={total || initialData?.length}
        onClose={() => setOpenFilter(false)}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        onApplyFilters={handleApplyFilters}
      />
      {/* SORT DRAWER */}
      <SortByDrawer
        sortOpen={sortOpen}
        sortOnClose={() => setSortOpen(false)}
        onApplySort={handleApplyFilters}
        sort={sort}
        setSort={setSort}
      />
      {/* products section start  */}
      <div className="flex flex-col items-start mx-auto">
        <div className="flex flex-col items-end pt-12">
          <p className="text-2xl font-medium">All products here</p>
          <div className="w-full h-0.5 bg-orange-600 rounded-full"></div>
        </div>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

        {/* all products show  */}
        <div className="w-full">
          {isDataLoading && products.length === 0 && <ProductGridSkeleton />}
          {products && products.length > 0 && (
            <InfiniteScroll
              loader={
                <div className="w-full py-8">
                  <ProductGridSkeleton />
                </div>
              }
              dataLength={products.length}
              next={loadNextPage}
              hasMore={hasMore}
              endMessage={
                <div className="w-full py-8">
                  <p className="text-center text-gray-500 font-medium text-lg">
                    You've seen all products!
                  </p>
                </div>
              }
            >
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-6">
                {products.map((product, idx) => {
                  return (
                    <ProductCard
                      key={product.id + idx}
                      product={product}
                      openCart={() => setCartOpen(true)}
                    />
                  );
                })}
              </div>
            </InfiniteScroll>
          )}
          {showNotFound && <ProductsNotFound />}
        </div>
      </div>
    </div>
  );
};

export default MainCategoryProductClient;
