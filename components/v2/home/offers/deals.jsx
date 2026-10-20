import { ProductShowcase } from "@/components";
import { getCollectionProducts } from "@/lib/fetchProducts";
import { getDeals } from "@/lib/product-query/fetch-api";
import React from "react";

const Deals = async () => {
  const results = await Promise.allSettled([
    getCollectionProducts("deals", 1),
    getDeals(),
  ]);

  const [dealsResult, dealsData] = results;

  const eidDeals =
    dealsResult.status === "fulfilled" ? dealsResult.value : null;

  const deals = dealsData.status === "fulfilled" ? dealsData.value : null;

  return (
    <>
      {eidDeals?.products?.length && (
        <ProductShowcase
          eyebrow={deals?.eyeBrow ?? "LIMITED TIME"}
          title={deals?.heading ?? "Eid deals"}
          tag={null}
          description={
            deals?.description ??
            "Big savings on the gadgets everyone wants this Eid."
          }
          bgColor={"#1a56db"}
          ctaHref={`/products?tag=deals`}
          products={eidDeals?.products}
        />
      )}
    </>
  );
};

export default Deals;
