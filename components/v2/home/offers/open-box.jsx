import { ProductShowcase } from "@/components";
import { getCollectionProducts } from "@/lib/fetchProducts";
import React from "react";

const OpenBox = async () => {
  const openBox = await getCollectionProducts("open-box", 1);
  return (
    <>
      {openBox?.products?.length && (
        <ProductShowcase
          eyebrow={"NEW · LIMITED STOCK"}
          title={"Open Box Deals"}
          tag={{ name: "OPEN BOX", color: "#e9b400" }}
          description={
            "Box opened, product unused. Checked by Aitebaar Squad and sold with warranty, for less"
          }
          bgColor={"#1a56db"}
          ctaHref={`/products?tag=open-box`}
          products={openBox?.products}
        />
      )}
    </>
  );
};

export default OpenBox;
