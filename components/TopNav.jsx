"use client";
import React, { useState } from "react";

const TopNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-white py-3 px-4 text-sm relative">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Left Side - Phone Number */}
          <div className="flex items-center gap-2">
            <span className="font-medium">callus:</span>
            <a
              href="tel:0012345678"
              className="text-black font-semibold hover:text-black transition-colors"
            >
              (00) 1234 5678
            </a>
          </div>

          {/* TOGGLE BUTTON (1025px سے نیچے شو ہوگا) */}
          <button
            className="lg:hidden text-black font-bold text-xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          {/* Center Part - Only show on large screen */}
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

        {/* DROPDOWN FOR MOBILE */}
        {open && (
          <div className="mt-3 lg:hidden flex flex-col bg-gray-100 p-3 rounded text-black text-center gap-1">
            <span>Visit our showroom in</span>
            <span>1234 Street Address City Address, 1234</span>
            <a href="#contact" className="underline">
              Contact Us
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
