import { baseURL } from "@/redux/utils";
import SearchClientComponent from "./_component/searchClientComponent";
import HeroSection from "@/components/HeroSection";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/Skeleton";
import ShowAllSubCategories from "@/components/ShowAllSubCategories";

const page = async ({ params }) => {
  const { searching } = await params;
  const parseUrl = searching.replaceAll(/-/g, " ");
  const url = new URL(
    `${baseURL}products?searchQuery=${parseUrl}&paginate=false&orderBy=price&order=asc&chip=false`,
  );
  const data = await fetch(url, {
    cache: "no-store",
  });

  const response = await data.json();
  return (
    <>
      <div className="bg-gray-100">
        <HeroSection
          title={`Searching for ${parseUrl}`}
          offer={`We found the best matches for ${parseUrl}. Explore our collection below.`}
        />
        <div className="w-full mx-auto">
          <Suspense fallback={<ProductGridSkeleton />}>
            <SearchClientComponent products={response?.data?.list} total={response?.total} />
            <div className="w-11/12 lg:w-10/12 mx-auto">
              <ShowAllSubCategories />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default page;
