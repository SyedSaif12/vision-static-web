"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import laptopsImage from "../assets/laptops-image.svg";
import playstationImage from "../assets/playstation-image.svg";
import dysonImage from "../assets/dyson-image.svg";
import accesoriesImage from "../assets/accesories-image.svg";

const sliderData = [
  {
    id: 1,
    offer: "Experience innovation with cutting-edge technology.",
    title: "Discover the Latest in Tech",
    imgSrc: laptopsImage,
  },
  {
    id: 2,
    offer: "Experience innovation with cutting-edge technology.",
    title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    imgSrc: playstationImage,
  },
  {
    id: 3,
    offer: "Exclusive Deal 40% Off",
    title: "Discover the Latest in Tech",
    imgSrc: accesoriesImage,
  },
  {
    id: 4,
    offer: "Exclusive Deal 40% Off",
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    imgSrc: dysonImage,
  },
];

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  return (
    <div className="relative bg-gray-100">
      {/* Dark wrapper includes Navbar + slider — no white gap, clean rounded bottom */}
      <div
        className="
          relative bg-[#031057]
          h-[540px] md:h-[590px]
          rounded-b-[50px] md:rounded-b-[80px]
          overflow-hidden
        "
      >
        <Navbar />

        {/* Slider track wrapper */}
        <div
          className="
            relative overflow-hidden mt-10
            h-[480px] sm:h-[500px] md:h-[560px] lg:h-[560px]
          "
        >
          {/* Track — all slides in a row, moved with translateX */}
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderData.map((slide) => (
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
                  flex-col lg:flex-row
                  items-center justify-between
                  px-10 sm:px-14 md:px-20
                  pt-4 pb-14
                  lg:py-0
                "
                >
                  {/* Text block */}
                  <div
                    className="
                    w-full lg:w-1/2
                    flex flex-col
                    items-center text-center
                    lg:items-start lg:text-left
                    lg:mt-28
                    mt-4
                    z-10
                  "
                  >
                    <h1
                      className="
                      text-white font-bold
                      text-[18px] leading-[24px]
                      sm:text-[24px] sm:leading-[30px]
                      md:text-[28px] md:leading-[32px]
                      max-w-sm lg:max-w-lg
                    "
                    >
                      {slide.title}
                    </h1>
                    <p className="text-white/75 text-sm md:text-base mt-3 max-w-xs md:max-w-md">
                      {slide.offer}
                    </p>
                  </div>

                  {/* Image — always visible (mobile + desktop) */}
                  <div
                    className="
                    w-full lg:w-1/2
                    flex items-center justify-center
                    flex-1
                    mt-4 lg:mt-24
                  "
                  >
                    <Image
                      src={slide.imgSrc}
                      alt={slide.title}
                      className="
                      w-[240px] sm:w-[260px] md:w-[300px] lg:w-[460px]
                      h-auto object-contain drop-shadow-2xl
                    "
                      priority
                    />
                  </div>
                </div>

                {/* Left arrow — absolute, vertically centered */}
                <button
                  onClick={goPrev}
                  className="
                  absolute left-3 sm:left-4 top-1/2 -translate-y-1/2
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-full
                  bg-white/10 hover:bg-white/25
                  flex items-center justify-center
                  text-white transition-all duration-200 active:scale-90
                  z-20
                "
                  aria-label="Previous"
                >
                  <svg
                    width="18"
                    height="18"
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
                  absolute right-3 sm:right-4 top-1/2 -translate-y-1/2
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-full
                  bg-white/10 hover:bg-white/25
                  flex items-center justify-center
                  text-white transition-all duration-200 active:scale-90
                  z-20
                "
                  aria-label="Next"
                >
                  <svg
                    width="18"
                    height="18"
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

                {/* Dot indicators */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                  {sliderData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: currentSlide === i ? "24px" : "10px",
                        height: "10px",
                        background:
                          currentSlide === i
                            ? "white"
                            : "rgba(255,255,255,0.35)",
                      }}
                    />
                  ))}
                </div>
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
