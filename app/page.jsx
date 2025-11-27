"use client";
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopNav from "@/components/TopNav";
import ShopByCategory from "@/components/ShopByCategory";
import NewArrival from "@/components/newArrival";
import TestimonialSlider from "@/components/TestimonialSlider";
import HeroSection from "@/components/HeroSection";
import PopupContactModal from "@/components/PopupContactModal";
import OurBrands from "@/components/OurBrands";

const Home = () => {
  return (
    <>
      {/* <TopNav /> */}
      {/* <Navbar /> */}
      <HeaderSlider />

      <PopupContactModal />
      {/* <ContactModal/> */}
      <div className="px-6 md:px-16 lg:px-32 bg-gray-100">
        <ShopByCategory />
        <Banner />
        <HomeProducts />

        <OurBrands />
        {/* <HomeProducts /> */}
        <TestimonialSlider />
        {/* <FeaturedProduct /> */}
        <NewArrival />
        {/* <Banner /> */}
        {/* <NewsLetter /> */}
        {/* <HomeProducts /> */}
      </div>
      {/* <NewsLetter /> */}
      {/* <Footer /> */}
      {/* <HeroSection /> */}
    </>
  );
};

export default Home;
