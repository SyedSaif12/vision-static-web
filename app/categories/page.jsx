import React from "react";
import ClientCategories from "./ClientCategories";
import { Breadcrumbs } from "@/components";
import { getNavbar } from "@/lib/api";

const Page = async () => {
  const data = await getNavbar();
  const categories =
    Array.isArray(data?.data) && data?.data?.length > 0 ? data?.data : [];

  return (
    <section className="border-t border-t-muted/20 bg-gray-50 pt-5 mt-2">
      <div className="w-11/12 mx-auto">
        {" "}
        <Breadcrumbs
          items={[
            { name: "home", href: "/" },
            { name: "categories", href: "/categories" },
          ]}
        />
        <div className="my-5">
          <h3 className="tracking-widest uppercase text-primary text-sm font-extrabold">
            Browse
          </h3>
          <h1 className="text-3xl md:text-4xl my-3 font-extrabold">
            All Categories
          </h1>
          <p className="text-faint text-lg md:text-xl">
            All {categories.length} categories, with the brands we stock in
            each. MacBooks are under Laptops, <br /> iPads under Tablets and
            iPads.
          </p>
        </div>
        {categories.length === 0 ? (
          <div className="w-96 mx-auto flex flex-col justify-center items-center my-5 min-h-96">
            <h2 className="text-5xl md:text-9xl font-extrabold text-faint">
              404
            </h2>
            <h3 className="text-faint text-xl">Categories not found</h3>
          </div>
        ) : (
          <div
            className="
        my-10
          columns-2
          gap-1
          md:gap-5
          sm:columns-2
          lg:columns-3
          xl:columns-5
        "
          >
            {[...categories]?.reverse()?.map((category) => (
              <ClientCategories key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
