"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const HeroSection = ({
  title = "Discover the Latest in Tech",
  offer = "Experience innovation with cutting-edge technology.",
  steps = [],
  singlePage = false,
}) => {

  const validSteps = steps?.filter(
    (step) => step && typeof step.label === "string" && step.label.trim() !== ""
  ) || [];

  return (
    <div className="relative bg-gray-100">
      {/*  Navbar placed exactly like */}
      <Navbar />

      {/* HERO SECTION */}
      <div
        className={`w-full bg-[#031057] ${singlePage ? "min-h-[370px] md:min-h-[450px]" : "min-h-[450px] md:min-h-[480px]"} rounded-b-[50px] md:rounded-b-[80px] flex flex-col items-center`}
      >
        {/* Spacer (flex-grow) */}
        <div className="flex-1 h-full w-full" />

        {/* Bottom content */}
        <div className=" flex-1 flex flex-col justify-center text-center h-1/2 px-5 md:px-10 pb-10">
          <h2 className="text-3xl md:text-5xl capitalize font-semibold text-white drop-shadow-lg mb-4">
            {title?.replace("-", " ")}
          </h2>

          <div className="flex justify-center text-xs md:text-sm">
            {validSteps?.map((step, idx) => (
              <React.Fragment key={idx}>
                <Link
                  href={step.path}
                  className="text-white capitalize my-5 font-semibold hover:text-[#FF8415] transition-colors"
                >
                  {step.label}
                </Link>

                {idx < validSteps.length - 1 && (
                  <span className="text-white my-5 px-2">&gt;</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-white text-sm md:text-lg">{offer}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
