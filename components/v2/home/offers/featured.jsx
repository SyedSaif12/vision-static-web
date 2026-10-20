import { getCollectionProducts } from "@/lib/fetchProducts";
import React, { Suspense } from "react";
import { NewArrivalsSkeleton } from "../../products";
import { ProductShowcase } from "@/components";

const Featured = async () => {
  const featured = await getCollectionProducts("featured", 1);

  return (
    <>
      {/* <Suspense fallback={<NewArrivalsSkeleton />}> */}
      {featured?.products?.length && (
        <ProductShowcase
          eyebrow={"HANDEDPICKED"}
          title={"Featured products"}
          tag={{ name: "FEATURED", color: "#1a56db" }}
          description={
            "Our best sellers right now across laptops, phones, audio and Dyson."
          }
          bgColor={"#1a56db"}
          ctaHref={`/products?isFeatured=true`}
          products={featured?.products}
        />
      )}
      {/* </Suspense> */}
    </>
  );
};

export default Featured;
