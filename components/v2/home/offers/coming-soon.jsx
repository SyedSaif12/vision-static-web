import { ProductShowcase } from "@/components";
import { getCollectionProducts } from "@/lib/fetchProducts";
import React from "react";

const ComingSoon = async () => {
  const comingSoon = await getCollectionProducts("coming-soon", 1);
  return (
    <>
      {comingSoon?.products?.length && (
        <ProductShowcase
          eyebrow={"COMING SOON"}
          title={"Upcoming Products"}
          tag={{ name: "COMING SOON", color: "#e5443b" }}
          description={
            "Price is announced on arrival. Leave your WhatsApp and email to hear first."
          }
          bgColor={"#1a56db"}
          ctaHref={`/products?isComingSoon=true`}
          products={comingSoon?.products}
        />
      )}
    </>
  );
};

export default ComingSoon;
