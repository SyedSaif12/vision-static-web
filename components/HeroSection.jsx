"use client";
import React from "react";
import Navbar from "@/components/Navbar";

const HeroSection = ({
  title = "Discover the Latest in Tech",
  offer = "Experience innovation with cutting-edge technology.",
  steps = [],
}) => {
  return (
    <div className="relative bg-gray-100">
      {/*  Navbar placed exactly like */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="w-full bg-[#031057] min-h-[350px] md:min-h-[450px] rounded-b-[50px] md:rounded-b-[80px] flex flex-col items-center">
        {/* Spacer (flex-grow) */}
        <div className="flex-1 h-full w-full" />

        {/* Bottom content */}
        <div className=" flex-1 flex flex-col justify-center text-center h-1/2 px-5 md:px-10 pb-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-lg mb-4">
            {title}
          </h1>
          <p className="text-white md:text-lg">{offer}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
