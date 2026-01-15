"use client";
import React, { useState, useEffect } from "react";
import ArrowUps from "@/assets/ArrowUp.png";
import ArrowDowns from "@/assets/ArrowDown.png";
import whatsAppIcon from "@/assets/whatsappicon.svg";
// import ChatBox from "@/components/ChatBox";

import Image from "next/image";
import headerimage from "../assets/headerimage.png";
import Navbar from "@/components/Navbar";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      offer: "Experience innovation with cutting-edge technology. ",
      title: "Discover the Latest in Tech",
      imgSrc: headerimage,
    },
    {
      id: 2,
      offer: "Hurry up only few lefts!",
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      imgSrc: headerimage,
    },
    {
      id: 3,
      offer: "Exclusive Deal 40% Off",
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      imgSrc: headerimage,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderData.length]);

  // Manual next / prev
  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const goPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative bg-gray-100">
      <Navbar />

      {/* <ChatBox /> */}

      {/* Slider container */}
      <div
        className="
  relative overflow-hidden w-full max-w-none 
  h-[650px]      
  sm:h-[600px]   
  md:h-[650px]    
  rounded-b-[50px] md:rounded-b-[80px]"
      >
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {sliderData.map((slide, index) => (
            <div
              key={slide.id}
              className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#031057] py-8 md:px-14 px-5 rounded-b-[50px] md:rounded-b-[80px] min-w-full h-full relative"
            >
              {/* Text Section */}
              <div className="relative md:pl-8 mt-10 md:mt-0">
                <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold text-white sm:mt-44">
                  {slide.title}
                </h1>

                <p className="md:text-base text-white pb-1 mt-2">
                  {slide.offer}
                </p>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-5 mt-5">
                  <button onClick={goPrev}>
                    <Image
                      src={ArrowDowns}
                      alt="previous slide"
                      className="w-4 h-4 hover:scale-110 transition"
                    />
                  </button>

                  <button onClick={goNext}>
                    <Image
                      src={ArrowUps}
                      alt="next slide"
                      className="w-4 h-4 hover:scale-110 transition"
                    />
                  </button>
                </div>

                {/* WhatsApp Icon Below Arrows */}
                <div className="mt-20">
                  <Image
                    src={whatsAppIcon}
                    alt="WhatsApp"
                    className="w-20 h-20 cursor-pointer hover:scale-110 transition absolute left-0 bottom-[-100px]"
                  />
                </div>
              </div>

              {/* Image Section */}
              <div className="flex items-center flex-1 justify-center h-full mt-28">
                <Image
                  className="w-full max-w-[500px] md:max-w-[650px] h-auto"
                  src={slide.imgSrc}
                  alt={`Slide ${index + 1}`}
                />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
                {sliderData.map((_, dotIndex) => (
                  <div
                    key={dotIndex}
                    onClick={() => handleSlideChange(dotIndex)}
                    className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
                      currentSlide === dotIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderSlider;
