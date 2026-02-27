import { baseURL } from "@/redux/utils";
import BaseCardCategory from "./BaseCardCategory";

const ShopByCategory = async () => {
  const categoryData = await fetch(`${baseURL}category`, {
    cache: "no-store",
  });
  const responseData = await categoryData.json();
  const categories =
    Array.isArray(responseData.data) && responseData?.data?.map((item) => item);

  return (
    <>
      <div className="pt-10">
        <h2 className="text-2xl sm:text-3xl my-3 font-semibold">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-6">
          {!!categories &&
            Array.isArray(categories) &&
            categories.map((category, idx) => (
              <BaseCardCategory
                tile={category?.name}
                imageUrl={
                  category.products?.[0]?.variants?.[0]?.image?.[0]?.fileUrl
                }
                key={category?.id}
                url={`/${category?.name}`}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ShopByCategory;
