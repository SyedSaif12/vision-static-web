"use client";
import FilterIcon from "@/assets/filtericon.svg";
import SortByIcon from "@/assets/sortbyicon.svg";
import DrawerFilter from "@/components/DrawerFilter";
import HeroSection from "@/components/HeroSection";
import { useSearchParams, useRouter } from "next/navigation";
import Pills from "@/components/Pills";
import ProductCard from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeleton";
import { useFetchAllChips, useFetchProducts } from "@/hooks/useFetchProducts";
import Image from "next/image";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/components/Loading";
import ProductsNotFound from "@/components/ProductsNotFound";
import { PillsSkeleton } from "@/components/Pills";
import SortByDrawer from "@/components/SortByDrawer";
import CartDrawer from "@/components/CartDrawer";

//  client component for showing all products while using filters,
//   category, sub-category and product title

const page = ({ params }) => {
  const titleParams = useSearchParams();
  const router = useRouter();
  const nameTitle = titleParams.get("name"); //get product title for dynamic routing
  const [selectedFilters, setSelectedFilters] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [sort, setSort] = useState({ orderBy: "", order: "" });
  const [openFilter, setOpenFilter] = useState(false); // filter drawer open close model state
  const [sortOpen, setSortOnClose] = useState(false); // filter drawer for sort by open close model state

  const { subCategory, title } = use(params);
  const {
    isFetching,
    isLoading,
    select,
    hasMore,
    products,
    setFilters,
    setPage,
    setSelect,
    setReset,
    totalProducts,
  } = useFetchProducts(subCategory, title); // custom hook for fetch products
  const { loading, chips, filters } = useFetchAllChips(subCategory, title); // custom hooks for fetch chips as product title and filters

  const isDataLoading = isLoading || isFetching;

  const data = useMemo(() => {
    return chips?.data.chip
      ? chips?.data?.chip.map((item) => ({
          // all chips formated for rendering
          title: item.title,
          id: item.id,
          count: item.count,
        }))
      : [];
  }, [chips?.data.chip]);

  useEffect(() => {
    setReset(true);
    return () => {
      setReset(true);
    };
  }, [subCategory, title]);

  useEffect(() => {
    // routes handle
    setSelect(nameTitle);
    return () => {
      setReset(true);
      setPage(1);
    };
  }, [nameTitle, select]);

  const hasAnyFilterSelected = Object.values(selectedFilters).some((value) => {
    // if any filter apply then return in boolean
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === "number" && value !== null) {
      return value !== undefined || value !== undefined;
    }
    return false;
  });

  const hasAnyFilterBySort = Boolean(sort.orderBy && sort.order);

  const handleApplyFilters = (selectedFilter) => {
    setPage(1);
    // setFilters(selectedFilter);
    setFilters((filter) => ({ ...filter, ...selectedFilter }));
  };

  const loadNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const clearAllFilters = () => {
    // remove all filters and reset
    setReset(true);
    setFilters({});
    setSelectedFilters((prev) => (prev = {}));
    setSort({ orderBy: "", order: "" });
    const params = new URLSearchParams(titleParams.toString());

    if (params.has("name")) {
      params.delete("name");
      const queryString = params.toString();
      const url = queryString ? `?${queryString}` : window.location.pathname;
      router.push(url);
      setSelect("");
    }
  };

  return (
    <>
      <div className=" bg-gray-100">
        <HeroSection
          title={`View all ${title} ${subCategory}`}
          offer={`Find all ${title} products related to ${subCategory} in one place. `}
          steps={["home", subCategory, title, select]}
        />
        <div className="w-11/12 md:max-w-7xl mx-auto pt-10">
          {/* all title pills  */}
          {loading && <PillsSkeleton />}
          {!loading && data?.length > 0 && (
            <Pills data={data} select={select} setSelect={setSelect} />
          )}

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
                onClick={() => setSortOnClose(true)}
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
            data={filters}
            open={openFilter}
            productCount={totalProducts || products?.length}
            onClose={() => setOpenFilter(false)}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            onApplyFilters={handleApplyFilters}
          />
          {/* SORT DRAWER */}
          <SortByDrawer
            sortOpen={sortOpen}
            sortOnClose={() => setSortOnClose(false)}
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
              {isDataLoading && <ProductGridSkeleton />}
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
                    {products.map((product, idx) => (
                      <ProductCard
                        key={product.id + idx}
                        product={product}
                        openCart={() => setCartOpen(true)}
                      />
                    ))}
                  </div>
                </InfiniteScroll>
              )}
              {!isDataLoading && products && products?.length === 0 && (
                <ProductsNotFound />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
