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
              href="tel:+923260220581"
              className="text-black font-semibold hover:text-black transition-colors"
            >
              +92 326 022 0581
            </a>
          </div>

          {/* RIGHT SIDE ICONS (DESKTOP ONLY) */}
          <div className="hidden lg:flex items-center gap-4 text-black pr-14">
            <a
              href="https://www.instagram.com/visiontech.official.pk/"
              target="_blank"
            >
              <Image src={InstaBlue} alt="Instagram" className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/VisionTech.official.pk"
              target="_blank"
            >
              <Image src={FbBlue} alt="Facebook" className="w-5 h-5" />
            </a>
          </div>

          {/* MOBILE HAMBURGER ONLY */}
          <span className="w-full lg:hidden text-black font-bold text-xs text-center">
            {/* Visit our showroom in Street Address City Address, 1234 */}
            Shop# 29, Ground Floor, SAASI Arcade, Block-7, Clifton Near Sohny
            Sweets, Karachi, Pakistan.
          </span>

          {/* CENTER TEXT — DESKTOP ONLY */}
          <div className="hidden lg:flex flex-row items-center gap-2 text-center absolute left-1/2 -translate-x-1/2">
            <span>Visit our showroom in</span>
            <span className="text-black">
              {/* 1234 Street Address City Address, 1234 */}
              Shop# 29, Ground Floor, SAASI Arcade, Block-7, Clifton Near Sohny
              Sweets, Karachi, Pakistan.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
