"use client";
import FilterIcon from "@/assets/filtericon.svg";
import SortByIcon from "@/assets/sortbyicon.svg";
import DrawerFilter from "@/components/DrawerFilter";
import HeroSection from "@/components/HeroSection";
import { useRouter, usePathname } from "next/navigation";
import Pills from "@/components/Pills";
import ProductCard from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeleton";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductsNotFound from "@/components/ProductsNotFound";
import SortByDrawer from "@/components/SortByDrawer";
import CartDrawer from "@/components/CartDrawer";
import { useFetchProducts } from "@/hooks/useFetchProducts";

const ProductsClient = ({
  initialData = [],
  initialTotal = 0,
  initialChips = [],
  initialFilters = [],
  initialSelectedPills = "",
  category = "",
  subCategory = "",
  page: serverPage,
  limit,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  // ============================================
  // STATE — All State here
  // ============================================
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sort, setSort] = useState({ orderBy: "", order: "" });
  const [openFilter, setOpenFilter] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const {
    products,
    setProducts,
    hasMore,
    setHasMore,
    filters,
    setFilters,
    select,
    setSelect,
    skip,
    setSkip,
    page,
    setPage,
    isFetching,
    isLoading,
    totalProducts,
    setLimit,
    setReset,
  } = useFetchProducts(
    category,
    subCategory,
    initialData,
    initialTotal,
    initialSelectedPills,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDataLoading = isLoading || isFetching;
  const showNotFound = isMounted && !isDataLoading && products.length === 0;

  // ============================================
  // CHIPS - get all chips from server
  // ============================================
  const chipsData = useMemo(() => {
    return Array.isArray(initialChips)
      ? initialChips.map((item) => ({
          title: item.title,
          id: item.id,
          count: item.count,
        }))
      : [];
  }, [initialChips]);

  // Pill select/deselect
  const handlePillSelect = (pill) => {
    const newSelect = pill?.title || "";
    setSkip(false);
    setSelect(newSelect);
    setPage(1);

    const params = new URLSearchParams();
    if (newSelect) params.set("name", newSelect);
    router.push(`${pathname}?${params.toString()}`);
  };

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
    setSelect("");
    setPage(1);
    router.push(pathname);
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

  // ============================================
  // RENDER — old page.js JSX as it is
  // ============================================

  if (!isMounted) {
    return;
  }

  return (
    <>
      <div className=" bg-gray-100">
        <HeroSection
          title={`View all ${subCategory.replace(/-/g, " ")} ${category.replace(/-/g, " ")}`}
          offer={`Find all ${subCategory.replace(/-/g, " ")} products related to ${category.replace(/-/g, " ")} in one place. `}
          steps={[
            "home",
            category.replace(/-/g, " "),
            subCategory.replace(/-/g, " "),
            select.replace(/-/g, " "),
          ]}
        />
        <div className="w-11/12 md:max-w-7xl mx-auto pt-10">
          <Pills
            data={chipsData}
            select={select}
            setSelect={handlePillSelect}
          />

          {/* filter drawer here  */}

          <div className="pt-8 flex items-start gap-4 flex-col flex-wrap bg-gray-100">
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
              {(!!select || hasAnyFilterSelected || hasAnyFilterBySort) && (
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
            productCount={initialTotal || products?.length}
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
              {isDataLoading && products.length === 0 && (
                <ProductGridSkeleton />
              )}
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
      </div>
    </>
  );
};

export default ProductsClient;
