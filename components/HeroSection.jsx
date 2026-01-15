"use client";
import React from "react";
import Navbar from "@/components/Navbar";

const HeroSection = ({
  title = "Discover the Latest in Tech",
  offer = "Experience innovation with cutting-edge technology.",
}) => {
  return (
    <div className="relative bg-gray-100">
      {/*  Navbar placed exactly like */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="w-full bg-[#031057] min-h-[350px] md:min-h-[450px] py-20 md:py-32 rounded-b-[50px] md:rounded-b-[80px] flex items-center justify-center pt-32">
        <div className="text-center px-5 md:px-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-lg mb-4 pt-10">
            {title}
          </h1>
          <p className="text-white md:text-lg">{offer}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
