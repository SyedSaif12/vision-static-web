export const dynamic = "force-dynamic";
import HeroSection from "@/components/HeroSection";
import { baseURL } from "@/redux/utils";
import React, { Suspense } from "react";
import FeaturedComponent from "./featuredComponent";
import { ProductGridSkeleton } from "@/components/Skeleton";
import ShowAllSubCategories from "@/components/ShowAllSubCategories";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";

const page = async () => {
  const products = await fetch(
    // fetch all featured products
    `${baseURL}products?isFeatured=true&chip=false&paginate=false`,
    {
      next: { revalidate: 60 },
    },
  );
  const responseProduct = await products.json();

  return (
    <>
      <div className="bg-gray-100">
        <HeroSection
          title={`View all featured Products`}
          offer={`Find all featured products related to in one place. `}
          steps={["home", "featured products"]}
        />
      </div>
      <div className="bg-gray-100">
        <Suspense fallback={<ProductGridSkeleton />}>
          <FeaturedComponent products={responseProduct?.data?.list} />
          <div className="w-11/12 lg:w-10/12 mx-auto">
            <ShowAllSubCategories />
          </div>
        </Suspense>
      </div>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default page;
