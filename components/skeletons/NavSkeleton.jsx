"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";

export default function NavSkeleton() {
  // --- States ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setActiveDropdown(null);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="absolute w-[90%] mx-auto left-0 right-0 top-6 z-50">
        <div className="bg-gradient-to-r from-[#030E40] to-[#5C2D00] text-white rounded-xl shadow-md">
          {/* ROW 1: Logo, Search, Cart */}
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <div className="w-20 h-8 md:w-32 md:h-20 bg-gray-300/20 animate-pulse rounded" />{" "}
              {/* Placeholder Logo */}
            </Link>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:block flex-1 mx-10">
              <div className="w-full h-10 p-2 rounded-full bg-gray-300/40 animate-pulse"></div>
            </div>

            {/* Icons Section */}
            <div className="flex items-center gap-4 size-10 bg-gray-300/40 animate-pulse rounded-full"></div>
          </div>

          {/* ROW 2: Desktop Navigation Links */}
          <div className="hidden lg:flex border-t border-white/10 bg-black/10 px-6 py-3">
            <ul className="flex mx-auto gap-8 text-sm">
              <li className="w-20 h-5 bg-gray-300/40 animate-pulse rounded-full"></li>
              <li className="w-20 h-5 bg-gray-300/40 animate-pulse rounded-full"></li>
              <li className="w-20 h-5 bg-gray-300/40 animate-pulse rounded-full"></li>
              <li className="w-20 h-5 bg-gray-300/40 animate-pulse rounded-full"></li>
              <li className="w-20 h-5 bg-gray-300/40 animate-pulse rounded-full"></li>
              <li className="w-20 h-5 bg-gray-300/40 animate-pulse rounded-full"></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
