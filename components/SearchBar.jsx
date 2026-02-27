"use client";

import { LoaderCircle, Search as Searching, X } from "lucide-react";

import { useEffect } from "react";
import SafeNextImage from "./NextImageComponent";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import Link from "next/link";
import { formatPrice } from "@/helper/formatPrice";

const SearchBar = () => {
  const { search, setSearch, isLoading, isFetching, data } = useSearchQuery({
    delay: 500,
  });
  const isDataLoading = isLoading || isFetching;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSearch("");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-full lg:flex-1 relative max-w-3xl px-0 lg:px-8">
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Searching size={20} />
          </div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search Products"
            className="w-full bg-white text-gray-800 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          {search.length > 0 && (
            <div
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 hover:cursor-pointer -translate-y-1/2"
            >
              <X size={20} className="text-black" />
            </div>
          )}
        </div>
        {search.length > 2 && (
          <div className="w-full h-96 z-[99999] overflow-hidden bg-white rounded top-1/2  absolute left-1/2 translate-y-7 -translate-x-1/2 ">
            <div className="flex w-full h-full flex-col py-2">
              {isDataLoading && (
                <div className="w-full h-full flex justify-center items-center">
                  <LoaderCircle
                    size={80}
                    className="animate-spin text-black/50"
                  />
                </div>
              )}
              {!isFetching &&
                Array.isArray(data?.data?.list) &&
                data?.data?.list?.length > 0 &&
                data?.data?.list?.map((item, idx) => (
                  <Link
                    href={`/product/${item?.slug}`}
                    key={idx}
                    className="w-full text-black border-b-2 mb-2 px-3 h-14 flex items-center gap-2 hover:bg-[#FF8415] hover:text-white"
                  >
                    {/* Image */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 relative">
                      <SafeNextImage
                        src={item?.image?.[0].fileUrl}
                        alt={"product-key"}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <h1 className="truncate text-xs sm:text-sm font-semibold">
                        {item?.productTitle}
                      </h1>
                      <span className="flex-1 text-xs font-semibold text-black/50">
                        price:{" "}
                        {(item?.newPrice || item?.oldPrice) > 0
                          ? formatPrice(item?.newPrice || item?.oldPrice)
                          : "Comming Soon"}
                      </span>
                    </div>
                  </Link>
                ))}
              {!isFetching && data?.data?.list?.length === 0 && (
                <div className="w-full h-full flex items-center justify-center">
                  <h1 className="text-black/30 text-3xl">No Results!</h1>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
