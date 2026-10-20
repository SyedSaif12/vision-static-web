import { ProductShowcase } from "@/components";
import { getCollectionProducts } from "@/lib/fetchProducts";
// import dayjs from "dayjs";
import React from "react";

const NewArrivals = async () => {
  // const newArrivalDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");
  const newArrival = await getCollectionProducts("new-arrivals", 1);
  return (
    <>
      {newArrival?.products?.length && (
        <ProductShowcase
          eyebrow={"JUST LANDED"}
          title={"New arrivals"}
          tag={{ name: "JUST IN", color: "#1a56db" }}
          description={"Fresh stock, straight from the latest shipments."}
          bgColor={"#1a56db"}
          ctaHref={`/products?tag=new-arrivals`}
          products={newArrival?.products}
        />
      )}
    </>
  );
};

export default NewArrivals;
