import BaseCardCategory from "@/components/BaseCardCategory";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductsNotFound from "@/components/ProductsNotFound";
import ShowAllProducts from "@/components/ShowAllProducts";
import ShowAllSubCategories from "@/components/ShowAllSubCategories";
import { baseURL } from "@/redux/utils";

export async function generateMetadata({ params }) {
  const { mainCategory } = await params;
  return {
    title: `${mainCategory?.replace(/^./, (c) => c.toUpperCase())} | Buy Online in Pakistan`,
    description:
      `Buy ${mainCategory} online in Pakistan at the best prices. Explore latest collections, trusted brands, and premium quality products with amazing deals.` ??
      "",
    alternates: {
      canonical: `/${mainCategory}`,
    },
    keywords: [`best ${mainCategory} price in pakistan`],
  };
}

const page = async ({ params }) => {
  const { mainCategory } = await params; // extract category
  const categoryData = await fetch(
    //fetch all categories form server
    `${baseURL}subCategory?name=${mainCategory}`,
    {
      next: { revalidate: 120 },
    },
  );
  const products = await fetch(
    // fetch all featured products
    `${baseURL}products?category=${mainCategory}&isFeatured=true&chip=false`,
    {
      next: { revalidate: 60 },
    },
  );
  const responseProduct = await products.json();
  const responseData = await categoryData.json();

  const categories =
    Array.isArray(responseData.data) && responseData?.data?.map((item) => item); // normalization categories
  return (
    <>
      <div className="bg-gray-100">
        <HeroSection
          title={`View all ${mainCategory.replace(/-/g, " ")}`}
          offer={`Find all products related to ${mainCategory.replace(/-/g, " ")} in one place. `}
          steps={["home", mainCategory.replace(/-/g, " ")]}
        />
        {/* <div className="max-w-11/12 mx-auto pt-10"> */}
        <div className="w-11/12 md:max-w-7xl mx-auto pt-10">
          <h2 className="text-2xl font-semibold">
            Shop by{" "}
            <span className="capitalize">{mainCategory.replace("-", " ")}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-6 pt-6">
            {/* passing all category data into category card commpoent */}
            {!!categories &&
              Array.isArray(categories) &&
              categories.map((category, idx) => (
                <BaseCardCategory
                  tile={category?.name}
                  imageUrl={
                    category?.products?.[0]?.variants?.[0]?.image?.[0]?.fileUrl
                  }
                  key={category?.id}
                  isCountShow={true}
                  count={category?.products?.length}
                  url={`/${mainCategory}/${category?.name}`}
                />
              ))}
          </div>
          <div>
            {/*  show all featured products using component  */}
            {responseProduct?.data?.list.length > 0 && (
              <ShowAllProducts
                headTitle={`Featured products ${mainCategory.replace(/-/g, " ")}`}
                products={responseProduct?.data?.list}
              />
            )}
            {responseProduct?.data?.list.length === 0 && <ProductsNotFound />}
            <ShowAllSubCategories />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default page;
