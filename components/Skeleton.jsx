"use client";

import { useEffect } from "react";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      {/* Premium Delivery Badge Skeleton */}
      <div className="flex justify-center mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Product Image Skeleton */}
      <div className="flex justify-center mb-4">
        <div className="h-48 w-48 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      {/* Product Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />

      {/* Product Specifications Skeleton */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse ml-auto" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse ml-auto" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto" />
        </div>
      </div>

      {/* Price Skeleton */}
      <div className="flex items-center gap-2 justify-center mb-4">
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* View Details Button Skeleton */}
      <div className="h-12 bg-gray-200 rounded-full animate-pulse" />
    </div>
  );
}

// Grid Layout ke liye multiple skeletons
export function ProductGridSkeleton({ count = 2 }) {
  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width < 640)
        count = 2; // mobile
      else if (width < 1024)
        count = 4; // tablet
      else count = 12; // desktop
    };

    updateCount(); // initial
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
