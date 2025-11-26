"use client";
import { Search, MapPin, Menu, X, ChevronDown } from "lucide-react";
import visionTechIcon from "@/assets/visiontechicon.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  // MEGA MENU + ABOUT US DROPDOWN

  const MegaMenu = ({ title, alignRight, alignLeft }) => {
    //  ABOUT US CUSTOM SMALL MENU

    if (title === "About Us") {
      return (
        <div
          className={`
        absolute top-full 
        w-[950px] max-w-[95vw]
        bg-[#2B2B2B] text-white 
        py-10 px-14 z-50 shadow-2xl rounded-b-2xl
        ${alignLeft ? "left-0" : ""}
      `}
        >
          <div className="grid grid-cols-3 gap-20">
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/instalment" className="hover:text-red-400">
                    Instalment
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="hover:text-red-400">
                    Return Policy
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-red-400">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div></div>
            <div></div>
          </div>
        </div>
      );
    }

    // MEGA MENU FOR ALL OTHER ITEMS
    return (
      <div
        className={`
          absolute top-full 
          w-[950px] max-w-[95vw]
          bg-[#2B2B2B] text-white 
          py-10 px-14 z-50 
          shadow-2xl rounded-b-2xl
          ${
            alignRight
              ? "right-0"
              : alignLeft
              ? "left-0"
              : "left-1/2 -translate-x-1/2"
          }
        `}
      >
        <div className="grid grid-cols-3 gap-20">
          <div>
            <h3 className="font-bold text-lg mb-4">{title}</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Google",
                "Apple",
                "Samsung",
                "Huawei",
                "OPPO",
                "Xiaomi",
                "FitBit",
                "Haylou",
                "All Products",
              ].map((item, idx) => (
                <li key={idx} className="hover:text-red-400 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">{title}</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Google",
                "Apple",
                "Samsung",
                "Huawei",
                "OPPO",
                "Xiaomi",
                "FitBit",
                "Haylou",
                "All Products",
              ].map((item, idx) => (
                <li key={idx} className="hover:text-red-400 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div></div>
        </div>
      </div>
    );
  };

  /* Desktop menu items */
  const menuItems = [
    "About Us",
    "Apple Products",
    "Gaming Console",
    "Gaming Laptops",
    "Windows Laptops",
    "Accessories",
  ];

  return (
    <header className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
      <div className="bg-gradient-to-r from-[#001437] via-[#373A47] to-[#4A2C25] text-white shadow-lg rounded-2xl">
        {/* TOP BAR */}
        <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={visionTechIcon}
              alt="VisionTech Logo"
              className="w-30 h-30 object-contain cursor-pointer"
            />
          </Link>

          {/* Desktop Search */}
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
            className="hidden lg:flex items-center gap-2 bg-white text-blue-800 px-4 py-2 rounded-full font-medium"
          >
            <MapPin size={18} />
            Store Locator
          </Link>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center justify-center gap-10 py-3 text-sm font-medium">
          {menuItems.map((menu, i) => (
            <div key={i} className="relative group">
              <button className="flex items-center gap-1 cursor-pointer">
                {menu}
                <ChevronDown size={14} />
              </button>

              <div className="hidden group-hover:block pointer-events-auto">
                <MegaMenu
                  title={menu}
                  alignLeft={menu === "About Us" || menu === "Apple Products"}
                  alignRight={menu === "Accessories"}
                />
              </div>
            </div>
          ))}

          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* MOBILE MENU */}
        {open && (
          <div className="lg:hidden bg-[#001437]/90 text-white py-4 px-6 space-y-4 rounded-xl mt-2">
            {/* Search */}
            <div className="flex items-center bg-white rounded-full px-4 py-2">
              <Search className="text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search Product"
                className="w-full px-3 outline-none text-gray-700"
              />
            </div>

            {/* Locator */}
            <Link
              href="/store-locator"
              className="flex items-center gap-2 bg-white text-blue-800 px-4 py-2 rounded-full font-medium w-full justify-center"
            >
              <MapPin size={18} />
              Store Locator
            </Link>

            {/* Mobile Dropdowns */}
            {menuItems.map((item, idx) => (
              <div key={idx}>
                <button
                  className="w-full flex justify-between items-center py-3"
                  onClick={() =>
                    setMobileDropdown(mobileDropdown === item ? null : item)
                  }
                >
                  {item}
                  <ChevronDown
                    size={16}
                    className={`transition ${
                      mobileDropdown === item ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileDropdown === item && (
                  <div className="pl-4 py-2 space-y-1 text-sm opacity-90">
                    <p>Google</p>
                    <p>Apple</p>
                    <p>Samsung</p>
                    <p>Huawei</p>
                  </div>
                )}
              </div>
            ))}

            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </div>
        )}
      </div>
    </header>
  );
}
