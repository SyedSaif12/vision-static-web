"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { NavSkeleton } from "./skeletons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useFetchedHeroPromotion } from "@/hooks/useFetchedHeroPromotion";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => <NavSkeleton />,
  ssr: false,
});

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { heroPromotions } = useFetchedHeroPromotion();
  const activeThemeColor =
    heroPromotions?.[currentSlide]?.themeColor || "#031057";

  const ActiveTextColor = 
     heroPromotions?.[currentSlide]?.titleColor || "#f7842a";

  const activeAppliedColorText =
  heroPromotions?.[currentSlide]?.appliedTitleColor || []

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
    <div className="relative bg-gray-100">
      {/* Dark wrapper includes Navbar + slider — no white gap, clean rounded bottom */}
      <div
        style={{ background: activeThemeColor || "#031057" }}
        className="
          relative transition-colors duration-700
          h-[590px] md:h-[650px]
          rounded-b-[50px] md:rounded-b-[80px]
          overflow-hidden
        "
      >
        <Navbar themeColor={activeThemeColor || "#031057"} />
        {/* Slider track wrapper */}
        <div
          className="
            relative overflow-hidden mt-10
            h-full
          "
        >
          {/* Track — all slides in a row, moved with translateX */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroPromotions?.map((slide) => (
              <div
                key={slide.id}
                className="
                relative min-w-full h-full
                flex flex-col
              "
              >
                <div className="flex-1 lg:hidden" />
                {/* ── Slide content ──
                  Mobile  : column — text on top, image below
                  Desktop : row    — text left, image right
              */}
                <div
                  className="
                  flex-1 flex
                  w-11/12
                  mx-auto
                  flex-col lg:flex-row
                  items-center justify-between
                  pt-4 pb-14
                  lg:pl-5
                  lg:py-0
                "
                >
                  {/* Text block */}
                  <div
                    className="
                    w-full lg:w-1/3
                    flex flex-col
                    items-center text-center
                    lg:items-start lg:text-left
                    lg:mt-28
                    
                    z-10
                  "
                  >
                    <div
                      className="
                      text-white font-bold
                      text-[22px] leading-[28px]
                      sm:text-[24px] sm:leading-[30px]
                      md:text-[28px] md:leading-[32px]
                      lg:text-[52px] lg:leading-[58px]
                      max-w-sm lg:max-w-lg
                    "
                    >
                      <ColoredTitle 
                      title={heroPromotions?.[currentSlide]?.title || ""}
                      appliedTitleColor={activeAppliedColorText}
                      titleColor={ActiveTextColor}
                      />
                    </div>
                    <p className="text-white/75 text-sm md:text-base mt-3 max-w-xs md:max-w-md">
                      {slide.offer}
                    </p>
                    <Link
                      href={slide.path}
                      className="text-black bg-white font-semibold mt-4 py-1 px-4 rounded-full "
                    >
                      Shop Now
                    </Link>
                  </div>

                  {/* Image — always visible (mobile + desktop) */}
                  <div
                    className="
                    w-full
                    h-full
                    flex items-center justify-center
                    flex-1
                    mt-3 lg:mt-24
                  "
                  >
                    <Image
                      src={slide?.image?.[0]?.fileUrl}
                      alt={slide.title}
                      width={700}
                      height={700}
                      className="h-full w-auto md:h-[300px] lg:h-[70%] object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Left arrow — absolute, vertically centered */}
                <button
                  onClick={goPrev}
                  className="
                  hidden
                  absolute left-3 sm:left-4 top-1/2 -translate-y-1/2
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-full
                  bg-white/10 hover:bg-white/25
                  md:flex items-center justify-center
                  text-white transition-all duration-200 active:scale-90
                  z-20
                "
                  aria-label="Previous"
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Right arrow */}
                <button
                  onClick={goNext}
                  className="
                  hidden
                  absolute right-3 sm:right-4 top-1/2 -translate-y-1/2
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-full
                  bg-white/10 hover:bg-white/25
                  md:flex items-center justify-center
                  text-white transition-all duration-200 active:scale-90
                  z-20
                "
                  aria-label="Next"
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {/* end slider track */}
        </div>
        {/* end dark wrapper */}
      </div>
    </div>
  );
};

export default HeaderSlider;

const ColoredTitle = ({ title, appliedTitleColor, titleColor }) => {
  if (!title) return null;

  const words = title.split(" ");

  const wordsToColor = Array.isArray(appliedTitleColor) ? appliedTitleColor : [];
  
 return (
    <h1>
      {words.map((word, index) => {
        const cleanWord = word.trim();

        const shouldColor = wordsToColor.some(
          (w) => w.toLowerCase() === cleanWord.toLowerCase()
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
