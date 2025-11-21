"use client";
import { Search, MapPin, Menu, X, ChevronDown } from "lucide-react";
import visionTechIcon from "@/assets/visiontechicon.png";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [appleOpen, setAppleOpen] = useState(false); // Mobile dropdown
  const [appleDesktopOpen, setAppleDesktopOpen] = useState(false); // Desktop dropdown
  const [aboutDesktopOpen, setAboutDesktopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false); // mobile

  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
      <div
        className="bg-gradient-to-r from-[#001437] via-[#373A47] to-[#4A2C25] 
      text-white shadow-lg rounded-2xl"
      >
        {/* TOP BAR */}
        <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={visionTechIcon}
              alt="VisionTech Logo"
              className="w-30 h-30 object-contain"
            />
          </div>

          <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-[40%] ml-auto mr-10">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search Product"
              className="w-full px-3 outline-none text-gray-700"
            />
          </div>

          {/* Store Locator */}
          <Link
            href="/store-locator"
            className="hidden md:flex items-center gap-2 bg-white text-blue-800 px-4 py-2 rounded-full font-medium"
          >
            <MapPin size={18} />
            Store Locator
          </Link>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden  text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center justify-center gap-10 py-3 text-sm font-medium bg-opacity-10 backdrop-blur">
          <div className="relative">
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setAboutDesktopOpen(!aboutDesktopOpen)}
            >
              About <ChevronDown size={14} />
            </button>

            {aboutDesktopOpen && (
              <div
                className="absolute left-0 mt-3 w-52 
      bg-gradient-to-b from-[#001437] via-[#00204A] to-[#4A2C25] 
      shadow-lg rounded-xl p-2 z-50"
              >
                {[
                  { title: "About Us", url: "/about-us" },
                  { title: "Instalment", url: "/instalment" },
                  { title: "Return Policy", url: "/return-policy" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <Link
                      href={item.url}
                      className="block py-2 px-3 hover:bg-white/10 rounded"
                    >
                      {item.title}
                    </Link>
                    <div className="border-b border-white/10" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Apple Dropdown (CLICK BASED) */}
          <div className="relative">
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setAppleDesktopOpen(!appleDesktopOpen)}
            >
              Apple Products <ChevronDown size={14} />
            </button>

            {appleDesktopOpen && (
              <div
                className="absolute left-0 mt-3 w-52 
                bg-gradient-to-b from-[#001437] via-[#00204A] to-[#4A2C25] 
                shadow-lg rounded-xl p-2 z-50"
              >
                {[
                  "Apple iMac",
                  "Apple iPad",
                  "Apple Mac Mini",
                  "Apple MacBooks",
                ].map((item, idx) => (
                  <div key={idx}>
                    <Link
                      href="/contact"
                      className="block py-2 px-3 hover:bg-white/10 rounded"
                    >
                      {item}
                    </Link>
                    <div className="border-b border-white/10" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <a href="#">Gaming Console</a>
          <a href="#">Gaming Laptops</a>
          <a href="#">Windows Laptops</a>
          <a href="#">Accessories</a>
          <a href="#">Faq</a>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-[#001437]/90 text-white backdrop-blur py-4 px-6 space-y-4 rounded-xl mt-2">
          {/* Mobile Search */}
          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search Product"
              className="w-full px-3 outline-none text-gray-700"
            />
          </div>
          <button className="flex items-center gap-2 bg-white text-blue-800 px-4 py-2 rounded-full font-medium w-full justify-center">
            <MapPin size={18} />
            Store Locator
          </button>

          <div className="flex flex-col gap-4 text-base border-t border-white/20 pt-4">
            <button
              className="flex items-center justify-between"
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              About <ChevronDown size={18} />
            </button>

            {aboutOpen && (
              <div className="ml-2 bg-[#001437]/80 rounded-md p-2 space-y-2 border border-white/10">
                {[
                  { title: "About Us", url: "/about-us" },
                  { title: "Instalment", url: "/instalment" },
                  { title: "Return Policy", url: "/return-policy" },
                ].map((item, idx) => (
                  <div key={idx}>
                    <Link href={item.url} className="block py-2">
                      {item.title}
                    </Link>
                    <div className="border-b border-white/20" />
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Apple Dropdown */}
            <button
              className="flex items-center justify-between"
              onClick={() => setAppleOpen(!appleOpen)}
            >
              Apple Products <ChevronDown size={18} />
            </button>

            {appleOpen && (
              <div className="ml-2 bg-[#001437]/80 rounded-md p-2 space-y-2 border border-white/10">
                {[
                  "Apple iMac",
                  "Apple iPad",
                  "Apple Mac Mini",
                  "Apple MacBooks",
                  "MacBook Air",
                  "MacBook Pro",
                  "Mac Mini",
                  "Apple Accessories",
                ].map((item, idx) => (
                  <div key={idx}>
                    <a href="#" className="block py-2">
                      {item}
                    </a>
                    <div className="border-b border-white/20" />
                  </div>
                ))}
              </div>
            )}

            <a href="#">Gaming Console</a>
            <a href="#">Gaming Laptops</a>
            <a href="#">Windows Laptops</a>
            <a href="#">Accessories</a>
            <a href="#">Faq</a>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
