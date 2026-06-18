'use client'

import BaseCardCategory from "./BaseCardCategory";
import CategoryCardSkeleton from "./skeletons/CategoryCardSkeleton";
import { useCardCategoryWithImage } from "@/hooks/useCardCategoryWithImage";

const ShopByCategory = () => {
  const { isLoading, data } = useCardCategoryWithImage()

  const categories = Array.isArray(data)
    ? [...data]?.reverse().map((item) => item)
    : [];

  return (
    <>
      <div className="pt-10">
        <h2 className="text-2xl capitalize sm:text-3xl my-3 font-semibold">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-6">
          {
            isLoading ? (
              <CategoryCardSkeleton />
            ) : (
              Array.isArray(categories) &&
                categories.length > 0 ?
                categories.map((category, idx) => (
                  <BaseCardCategory
                    tile={category?.name}
                    imageUrl={
                      category.products?.[0]?.variants?.[0]?.image?.[0]?.fileUrl
                    }
                    key={category?.id}
                    url={`/${category?.name}`}
                  />
                )) : (
                  <p className="text-gray-500 col-span-full">No categories found.</p>
                )
            )
          }
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;
