import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";
import ShopByCategory from "@/components/ShopByCategory";
import NewArrival from "@/components/newArrival";
import PopupContactModal from "@/components/PopupContactModal";
import OurBrands from "@/components/OurBrands";
import PromotionVideo from "@/components/PromotionVideo";
import { baseURL } from "@/redux/utils";
import Reviews from "@/components/Reviews";
import ShowAllSubCategories from "@/components/ShowAllSubCategories";

export const revalidate = 86400; // 1 day

const Home = async () => {
  let loading = true;
  const productQuery = await fetch(`${baseURL}products?isFeatured=true`, {
    next: {
      tags: ["products"],
      revalidate: 86400,
    },
  });
  const product = await productQuery.json();

  if (!!product) {
    loading = false;
  }

  return (
    <>
      <HeaderSlider />

      <PopupContactModal />
      <div className="px-6 md:px-16 lg:px-32 bg-gray-100">
        <ShopByCategory />
        <Banner />
        {!!product?.data?.list?.length && (
          <HomeProducts products={product?.data?.list} />
        )}
        <OurBrands />
        <Reviews />
        <NewArrival />
        <ShowAllSubCategories />
        <PromotionVideo />
      </div>
      <NewsLetter className="bg-gray-100 pt-14" />
      <Footer />
    </>
  );
};

export default Home;
