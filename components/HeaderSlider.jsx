"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { NavSkeleton } from "./skeletons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useFetchedHeroPromotion } from "@/hooks/useFetchedHeroPromotion";
import SafeNextImage from "./NextImageComponent";
import "swiper/css";
import "swiper/css/pagination";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => <NavSkeleton />,
  ssr: false,
});

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { heroPromotions, isPromoLoading } = useFetchedHeroPromotion();
  const activeThemeColor =
    heroPromotions?.[currentSlide]?.themeColor || "#031057";

  const ActiveTextColor =
    heroPromotions?.[currentSlide]?.titleColor || "#f7842a";

  const activeAppliedColorText =
    heroPromotions?.[currentSlide]?.appliedTitleColor || [];

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroPromotions?.length);
  }, [heroPromotions]);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroPromotions?.length - 1 : prev - 1,
    );
  }, [heroPromotions]);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  return (
    <div className="w-full flex flex-col overflow-hidden lg:min-h-[75vh] xl:min-h-[90vh]">
      {/* Dark wrapper includes Navbar + slider — no white gap, clean rounded bottom */}
      <div className="relative">
        <Navbar themeColor={activeThemeColor || "#031057"} />
      </div>
      <div className="w-full h-36 lg:h-44 xl:h-40" />
      {/* ------------------------------------------------------------------- */}
      {isPromoLoading ? (
        <HeroPromotionsSkeleton />
      ) : (
        <div className="w-[90%] flex-1 mx-auto hidden xl:grid grid-cols-2 gap-3">
          <div className="bg-[#031057] w-full rounded-lg h-full flex flex-col gap-5 p-5">
            <div className="flex-1 relative">
              {heroPromotions?.[0]?.image?.[0]?.fileUrl && (
                <SafeNextImage
                  src={heroPromotions?.[0]?.image?.[0]?.fileUrl}
                  alt={heroPromotions?.[0]?.title ?? "dummy image"}
                  className={`object-contain`}
                />
              )}
            </div>
            <div className="flex-1 w-11/12 mx-auto flex flex-col gap-5 justify-center items-center">
              {/* content and button  */}
              <div
                className="
            text-white font-bold
              lg:text-6xl text-center
              "
              >
                <ColoredTitle
                  title={heroPromotions?.[0]?.title || ""}
                  appliedTitleColor={
                    heroPromotions?.[0]?.appliedTitleColor || []
                  }
                  titleColor={heroPromotions?.[0]?.titleColor}
                />
              </div>
              {/* <p className="
            text-white font-bold
              lg:text-xl text-center
              ">{heroPromotions?.[0]?.offer}</p> */}
              {heroPromotions?.[0]?.path && (
                <Link
                  href={heroPromotions?.[0]?.path}
                  className="text-black bg-white font-semibold mt-4 py-2 px-4"
                >
                  Shop Now
                </Link>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
            <div className="col-span-full overflow-hidden  rounded-lg bg-[#031057] flex p-1">
              <div className="flex-1 w-11/12 mx-auto flex flex-col justify-center gap-5 items-start p-3">
                {/* content and button  */}
                <div
                  className="
            text-white font-bold
              lg:text-4xl
              
              "
                >
                  <ColoredTitle
                    title={heroPromotions?.[1]?.title || ""}
                    appliedTitleColor={
                      heroPromotions?.[1]?.appliedTitleColor || []
                    }
                    titleColor={heroPromotions?.[1]?.titleColor}
                  />
                </div>
                {/* <p className="
            text-white font-bold
              lg:text-lg
              ">{heroPromotions?.[1]?.offer}</p> */}
                {heroPromotions?.[1]?.path && (
                  <Link
                    href={heroPromotions?.[1]?.path}
                    className="text-black bg-white font-semibold mt-3 py-1 px-3"
                  >
                    Shop Now
                  </Link>
                )}
              </div>
              <div className="flex-1 overflow-hidden relative">
                {heroPromotions?.[1]?.image?.[0]?.fileUrl && (
                  <SafeNextImage
                    src={heroPromotions?.[1]?.image?.[0]?.fileUrl}
                    alt={heroPromotions?.[1]?.title ?? "dummy image 2"}
                    className={`w-full h-full object-contain`}
                  />
                )}
              </div>
            </div>
            <div className="bg-[#031057]  rounded-lg w-full h-full flex flex-col gap-3 p-5">
              <div className="flex-1 relative">
                {heroPromotions?.[2]?.image?.[0]?.fileUrl && (
                  <SafeNextImage
                    src={heroPromotions?.[2]?.image?.[0]?.fileUrl}
                    alt={heroPromotions?.[2]?.title ?? "dummy image 3"}
                    className={`w-full h-full object-contain`}
                  />
                )}
              </div>
              <div className="flex-1 w-11/12 mx-auto flex flex-col gap-3 justify-center items-center">
                <div
                  className="
            text-white font-bold
              lg:text-xl text-center
              "
                >
                  <ColoredTitle
                    title={heroPromotions?.[2]?.title || ""}
                    appliedTitleColor={
                      heroPromotions?.[2]?.appliedTitleColor || []
                    }
                    titleColor={heroPromotions?.[2]?.titleColor}
                  />
                </div>
                {/* <p className="
            text-white font-bold
              lg:text-md text-center
              ">{heroPromotions?.[2]?.offer}</p> */}
                {heroPromotions?.[2]?.path && (
                  <Link
                    href={heroPromotions?.[2]?.path}
                    className="text-black bg-white font-semibold mt-3 py-1 px-3"
                  >
                    Shop Now
                  </Link>
                )}
              </div>
            </div>
            <div className="bg-[#031057]  rounded-lg w-full h-full flex flex-col gap-3 p-5">
              <div className="flex-1 relative">
                {heroPromotions?.[3]?.image?.[0]?.fileUrl && (
                  <SafeNextImage
                    src={heroPromotions?.[3]?.image?.[0]?.fileUrl}
                    alt={heroPromotions?.[3]?.title ?? "dummy image 3"}
                    className={`w-full h-full object-contain`}
                  />
                )}
              </div>
              <div className="flex-1 w-11/12 mx-auto flex flex-col gap-3 justify-center items-center">
                <div
                  className="
            text-white font-bold
              lg:text-xl text-center
              "
                >
                  <ColoredTitle
                    title={heroPromotions?.[3]?.title || ""}
                    appliedTitleColor={
                      heroPromotions?.[3]?.appliedTitleColor || []
                    }
                    titleColor={heroPromotions?.[3]?.titleColor}
                  />
                </div>
                {/* <p className="
            text-white font-bold
              lg:text-md text-center
              ">{heroPromotions?.[3]?.offer}</p> */}
                {heroPromotions?.[3]?.path && (
                  <Link
                    href={heroPromotions?.[3]?.path}
                    className="text-black bg-white font-semibold mt-3 py-1 px-3"
                  >
                    Shop Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slider track wrapper */}
      <div className="w-[90%] flex-1 overflow-hidden mx-auto xl:hidden">
        <Swiper
          key={isPromoLoading ? "data-loading" : "data-loaded"}
          slidesPerView={1.2}
          spaceBetween={16}
          observer={true} // Dynamic load par recalculate karega
          observeParents={true}
          resizeObserver={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1.25,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 1.25,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 1.25, // 1024px screen par bhi 25% agli slide dikhegi
              spaceBetween: 24,
            },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper !pb-12"
        >
          {Array.isArray(heroPromotions) && heroPromotions.length > 0
            ? heroPromotions?.map((slide, index) => (
                <SwiperSlide key={slide.id || index}>
                  <div
                    style={{ backgroundColor: slide?.themeColor || "#031057" }}
                    className="w-full p-5 flex flex-col justify-between gap-4 h-[420px] md:h-[480px] shadow-md"
                  >
                    {/* Image Box */}
                    <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
                      <SafeNextImage
                        src={slide?.image?.[0]?.fileUrl}
                        alt={slide?.title ?? "promotion image"}
                        className="object-contain"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col gap-3 items-center text-center flex-1 justify-center">
                      <div className="text-white font-bold text-xl md:text-2xl lg:text-4xl">
                        <ColoredTitle
                          title={slide?.title || ""}
                          appliedTitleColor={slide?.appliedTitleColor || []}
                          titleColor={slide?.titleColor}
                        />
                      </div>

                      {slide?.path && (
                        <Link
                          href={slide?.path}
                          className="text-black bg-white font-semibold py-2 px-5 text-sm hover:bg-gray-100 transition"
                        >
                          Shop Now
                        </Link>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div
                    style={{ backgroundColor: "#031057" }}
                    className="w-full p-5 flex flex-col justify-between gap-4 h-[420px] md:h-[480px] shadow-md rounded-2xl"
                  >
                    {/* Image Box Skeleton */}
                    <div className="w-full h-48 md:h-64 animate-pulse rounded-xl bg-slate-700/60" />

                    {/* Text & Button Skeleton */}
                    <div className="flex flex-col gap-3 items-center text-center flex-1 justify-center w-full">
                      <div className="w-3/4 h-6 animate-pulse bg-slate-700/60 rounded-md" />
                      <div className="w-1/2 h-4 animate-pulse bg-slate-700/40 rounded-md mt-1" />
                      <div className="w-28 h-9 animate-pulse bg-slate-600/60 rounded-md mt-2" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      {/* Track — all slides in a row, moved with translateX */}
      {/* ------------------------------------------------------------------- */}
    </div>
  );
};

export default HeaderSlider;

const ColoredTitle = ({ title, appliedTitleColor, titleColor }) => {
  if (!title) return null;

  const words = title.split(" ");

  const wordsToColor = Array.isArray(appliedTitleColor)
    ? appliedTitleColor
    : [];

  return (
    <h1>
      {words.map((word, index) => {
        const cleanWord = word.trim();

        const shouldColor = wordsToColor.some(
          (w) => w.toLowerCase() === cleanWord.toLowerCase(),
        );

        return (
          <span
            key={index}
            style={shouldColor ? { color: titleColor } : { color: "#ffffff" }}
            className="transition-colors duration-500"
          >
            {word}{" "}
          </span>
        );
      })}
    </h1>
  );
};

function HeroPromotionsSkeleton() {
  return (
    <div className="w-[90%] flex-1 mx-auto hidden xl:grid grid-cols-2 gap-3 animate-pulse">
      {/* 1. Left Main Banner Skeleton */}
      <div className="bg-[#031057]  rounded-lg w-full h-full flex flex-col gap-5 p-5">
        {/* Image Skeleton */}
        <div className="flex-1 min-h-[220px] bg-white/10 rounded-md" />

        {/* Content Skeleton */}
        <div className="flex-1 w-11/12 mx-auto flex flex-col gap-4 justify-center items-center">
          {/* Main Title Skeleton (6xl size match) */}
          <div className="w-3/4 h-10 bg-white/10 rounded-md" />
          <div className="w-1/2 h-8 bg-white/10 rounded-md" />

          {/* Button Skeleton */}
          <div className="w-28 h-10 bg-white/20 rounded mt-4" />
        </div>
      </div>

      {/* 2. Right Side Grid Skeleton */}
      <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
        {/* Top Horizontal Card Skeleton */}
        <div className="col-span-full overflow-hidden  rounded-lg bg-[#031057] flex p-1">
          <div className="flex-1 w-11/12 mx-auto flex flex-col justify-center gap-3 items-start p-3">
            {/* Title Skeleton (4xl size match) */}
            <div className="w-3/4 h-7 bg-white/10 rounded-md" />
            <div className="w-1/2 h-5 bg-white/10 rounded-md" />

            {/* Button Skeleton */}
            <div className="w-24 h-8 bg-white/20 rounded mt-3" />
          </div>

          {/* Side Image Skeleton */}
          <div className="flex-1 overflow-hidden relative bg-white/10 rounded-md m-2 min-h-[120px]" />
        </div>

        {/* Bottom Left Small Card Skeleton */}
        <div className="bg-[#031057]  rounded-lg w-full h-full flex flex-col gap-3 p-5">
          {/* Image Skeleton */}
          <div className="flex-1 min-h-[100px] bg-white/10 rounded-md" />

          {/* Content Skeleton */}
          <div className="flex-1 w-11/12 mx-auto flex flex-col gap-3 justify-center items-center">
            <div className="w-4/5 h-5 bg-white/10 rounded-md" />
            <div className="w-20 h-7 bg-white/20 rounded mt-3" />
          </div>
        </div>

        {/* Bottom Right Small Card Skeleton */}
        <div className="bg-[#031057] rounded-lg w-full h-full flex flex-col gap-3 p-5">
          {/* Image Skeleton */}
          <div className="flex-1 min-h-[100px] bg-white/10 rounded-md" />

          {/* Content Skeleton */}
          <div className="flex-1 w-11/12 mx-auto flex flex-col gap-3 justify-center items-center">
            <div className="w-4/5 h-5 bg-white/10 rounded-md" />
            <div className="w-20 h-7 bg-white/20 rounded mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
