"use client";

import { LoaderCircle, Search as Searching, X } from "lucide-react";
import Loader from '@/components/Loading'
import { useState } from "react";
import SafeNextImage from "./NextImageComponent";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import Link from "next/link";
import { formatPrice } from "@/helper/formatPrice";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [load, setLoad] = useState(false)
  const { search, setSearch, isLoading, isFetching, data } = useSearchQuery({
    delay: 500,
  });
  const isDataLoading = isLoading || isFetching;

  function onhandleEnter(e) {
    if (e.key === "Enter") {
      if (search.trim()) {
        setLoad(true)
        const parseUrl = search.replaceAll(/\s+/g, "-");
        router.push(`/search/${parseUrl}`);
      }
    }
  }

  if (load) {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:flex-1 relative max-w-3xl px-0 lg:px-8">
        <div className="relative w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Searching size={20} />
          </div>
          <input
            type="text"
            onKeyDown={onhandleEnter}
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
          <div className="w-full h-96 z-[99999] bg-white rounded top-1/2  absolute left-1/2 translate-y-7 -translate-x-1/2 ">
            <div className="w-full h-full overflow-y-scroll">
              <div className="flex w-full h-full flex-col py-2">
                {isDataLoading && (
                  <div className="w-full h-full flex items-center flex-col">
                    {
                      Array.from({ length: 6 }).map((_, i) => (
                        <div key={i + 1} className="w-full px-2 h-20 flex gap-2 items-center justify-between bg-gray-200 border-t border-gray-500 animate-pulse">
                          <div className="w-10 h-10 rounded-md bg-gray-500 animate-pulse"></div>
                          <div className="w-full h-full flex flex-col justify-center gap-2">
                            <div className="w-full h-4 bg-gray-500 animate-pulse rounded-full"></div>
                            <div className="w-1/2 h-1 bg-gray-500 animate-pulse rounded-full"></div>
                          </div>
                        </div>
                      ))
                    }

                  </div>
                )}
                {!isFetching &&
                  Array.isArray(data?.data?.list) &&
                  data?.data?.list?.length > 0 &&
                  data?.data?.list?.map(
                    (item, idx) =>
                      item && (
                        <Link
                          href={`/product/${item?.slug}`}
                          key={idx}
                          className="w-full text-black border-b-2 mb-2 px-3 h-14 flex items-center gap-2 hover:bg-[#FF8415] hover:text-white"
                        >
                          {/* Image */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 relative">
                            <SafeNextImage
                              src={item?.image?.[0]?.fileUrl}
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
                      ),
                  )}
                {!isFetching && data?.data?.list?.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1 className="text-black/30 text-3xl">No Results!</h1>
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  if (search.trim()) {
                    setLoad(true)
                    const parseUrl = search.replaceAll(/\s+/g, "-");
                    router.push(`/search/${parseUrl}`);
                  }
                }}
                className="w-full lg:hidden hover:cursor-pointer absolute bottom-0 bg-gray-300">
                <p className="py-1 px-4 text-blue-800 underline text-xs font-semibold">View All Results</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
