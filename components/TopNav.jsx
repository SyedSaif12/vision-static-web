"use client";
import InstaBlue from "@/assets/instabluecion.svg";
import FbBlue from "@/assets/fbblueicon.svg";
import Image from "next/image";
import React, { useState } from "react";

const TopNav = () => {
  // const [open, setOpen] = useState(false);

  return (
    <div className="text-white py-3 px-4 text-sm relative">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* LEFT + RIGHT CONTENT (HIDE ON MOBILE) */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="font-medium">callus:</span>
            <a
              href="tel:0012345678"
              className="text-black font-semibold hover:text-black transition-colors"
            >
              (00) 1234 5678
            </a>
          </div>

          {/* RIGHT SIDE ICONS (DESKTOP ONLY) */}
          <div className="hidden lg:flex items-center gap-4 text-black pr-14">
            <Image src={InstaBlue} alt="Instagram" className="w-5 h-5" />
            <Image src={FbBlue} alt="Facebook" className="w-5 h-5" />
          </div>

          {/* MOBILE HAMBURGER ONLY */}
          <span className="w-full lg:hidden text-black font-bold text-xs text-center">
            Visit our showroom in Street Address City Address, 1234
          </span>

          {/* CENTER TEXT — DESKTOP ONLY */}
          <div className="hidden lg:flex flex-row items-center gap-2 text-center absolute left-1/2 -translate-x-1/2">
            <span>Visit our showroom in</span>
            <span className="text-black">
              1234 Street Address City Address, 1234
            </span>
            <span>|</span>
            <a
              href="#contact"
              className="text-black underline transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {/* {open && (
          <div className="mt-3 lg:hidden flex flex-col bg-gray-100 p-4 rounded text-black text-center gap-3">
            // MOBILE PHONE NUMBER
            <div className="flex justify-center items-center gap-2">
              <span className="font-medium">callus:</span>
              <a
                href="tel:0012345678"
                className="text-black font-semibold hover:text-black transition-colors"
              >
                (00) 1234 5678
              </a>
            </div>

            // MOBILE SHOWROOM
            <span>Visit our showroom in</span>
            <span>1234 Street Address City Address, 1234</span>

            <a href="#contact" className="underline">
              Contact Us
            </a>

            // MOBILE ICONS
            <div className="flex justify-center gap-6 mt-2">
              <Image src={InstaBlue} alt="Instagram" className="w-6 h-6" />
              <Image src={FbBlue} alt="Facebook" className="w-6 h-6" />
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TopNav;
