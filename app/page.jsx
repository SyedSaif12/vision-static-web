import React, { Suspense } from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopNav from "@/components/TopNav";
import ShopByCategory from "@/components/ShopByCategory";
import NewArrival from "@/components/newArrival";
import TestimonialSlider from "@/components/TestimonialSlider";
import HeroSection from "@/components/HeroSection";
import PopupContactModal from "@/components/PopupContactModal";
import OurBrands from "@/components/OurBrands";
import PromotionVideo from "@/components/PromotionVideo";
import { baseURL } from "@/redux/utils";
import Loading from "@/components/Loading";
import WhatsAppContact from "@/components/WhatsAppContact";
import GoogleReviewsWidget from "google-reviews-widget";
import Reviews from "@/components/Reviews";
import ShowAllSubCategories from "@/components/ShowAllSubCategories";

const Home = async () => {
  let loading = true;
  const productQuery = await fetch(`${baseURL}products?isFeatured=true`, {
    cache: "no-store",
  });
  const product = await productQuery.json();

  if (!!product) {
    loading = false;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        {/* <TopNav /> */}
        {/* <Navbar /> */}
        <HeaderSlider />

        <PopupContactModal />
        {/* <ContactModal/> */}
        <div className="px-6 md:px-16 lg:px-32 bg-gray-100">
          <ShopByCategory />
          <Banner />
          <HomeProducts products={product?.data?.list} />
          <OurBrands />
          {/* <HomeProducts /> */}
          {/* <TestimonialSlider /> */}
          <Reviews />
          {/* <FeaturedProduct /> */}
          <NewArrival />
          <ShowAllSubCategories />
          <PromotionVideo />
          {/* <Banner /> */}
          {/* <NewsLetter /> */}
          {/* <HomeProducts /> */}
        </div>
        <NewsLetter className="bg-gray-100 pt-14" />
        <Footer />
        {/* <HeroSection /> */}
      </Suspense>
    </>
  );
};

export default Home;
