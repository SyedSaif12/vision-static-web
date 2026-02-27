"use client";
import { useFetchAllCategoryCards } from "@/hooks/useFetechAllCategoryCards";
import BaseCardCategory from "./BaseCardCategory";

const ShowAllSubCategories = () => {
  const { isLoading, data } = useFetchAllCategoryCards();
  const cardData =
    data?.data?.length > 0 &&
    data?.data?.map((item, idx) => ({
      title: item?.title,
      count: item?.count,
      image: item?.image,
      url: buildCategoryUrl(item?.query),
    }));

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 py-6">
        {!isLoading &&
          cardData?.length > 0 &&
          cardData?.map((item, idx) => (
            <BaseCardCategory
              key={idx}
              tile={item?.title}
              imageUrl={item?.image?.[0]?.fileUrl}
              url={item?.url}
              count={item?.count}
              isCountShow={true}
              isHighlight={false}
            />
          ))}
      </div>
    </div>
  );
};

export default ShowAllSubCategories;

function buildCategoryUrl(query) {
  const { category, subCategory, ...rest } = query;

  // base path
  let path = "";

  if (category) path += `/${category}`;
  if (subCategory) path += `/${subCategory}`;

  // query string
  const searchParams = new URLSearchParams();

  Object.entries(rest).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, value);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${path}?${queryString}` : path;
}
