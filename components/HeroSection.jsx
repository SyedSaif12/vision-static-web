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
      <div className="w-full bg-[#031057] min-h-[450px] md:min-h-[480px] rounded-b-[50px] md:rounded-b-[80px] flex flex-col items-center">
        {/* Spacer (flex-grow) */}
        <div className="flex-1 h-full w-full" />

        {/* Bottom content */}
        <div className=" flex-1 flex flex-col justify-center text-center h-1/2 px-5 md:px-10 pb-10">
          <h1 className="text-3xl md:text-5xl capitalize font-semibold text-white drop-shadow-lg mb-4">
            {title?.replace("-", " ")}
          </h1>

          <div className="flex justify-center text-xs md:text-sm">
            {steps
              .filter((step) => typeof step === "string" && step.trim() !== "")
              .map((item, idx, arr) => (
                <p
                  key={idx}
                  className="text-white capitalize my-5 font-semibold"
                >
                  {item?.replace("-", " ")}{" "}
                  {idx < arr.length - 1 && <span>&nbsp; &gt; &nbsp;</span>}
                </p>
              ))}
          </div>
          <p className="text-white text-sm md:text-lg">{offer}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
