import React from "react";
import ClientNavbar from "./ClientNavbar";
import { getNavbar } from "@/lib/api";

const Navbar = async () => {
  const data = await getNavbar();
  return (
    <>
      <ClientNavbar categories={data?.data} />
    </>
  );
};

export default Navbar;

const bone = "animate-pulse rounded-xl bg-white/20";

export function NavbarSkeleton() {
  return (
    <header
      className="w-full bg-blue-600 text-white shadow-md"
      aria-busy="true"
      aria-label="Navbar Loading"
    >
      {/* Top Bar Skeleton */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs bg-black/10 border-b border-white/10">
        <div className={`h-3 w-36 ${bone}`} />
        <div className={`h-3 w-96 ${bone}`} />
        <div className={`h-3 w-20 ${bone}`} />
      </div>

      {/* Main Navbar Skeleton */}
      <div className="mx-auto flex w-11/12 items-center justify-between py-4">
        {/* Logo */}
        <div className={`h-8 w-32 rounded-lg bg-white/30 animate-pulse`} />

        {/* Search Bar Skeleton */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8 items-center bg-white/15 rounded-full p-1 animate-pulse">
          <div className="h-10 w-full rounded-full bg-white/10 px-4" />
          <div className="h-10 w-12 ml-2 rounded-full bg-yellow-300/60" />
        </div>

        {/* Right Side Icons / Links */}
        <div className="flex items-center gap-6">
          <div className={`hidden xl:block h-6 w-28 ${bone}`} />
          <div className={`hidden xl:block h-6 w-20 ${bone}`} />
          <div className={`hidden md:block h-6 w-24 ${bone}`} />
          <div className={`h-9 w-10 rounded-lg bg-white/30 animate-pulse`} />
        </div>
      </div>

      {/* Bottom Sub-Nav Skeleton */}
      <div className="border-t border-white/15 bg-blue-700/50 py-3">
        <div className="mx-auto flex w-11/12 items-center justify-between">
          {/* Left Categories/Links */}
          <div className="flex items-center gap-3 overflow-x-auto">
            <div
              className={`h-9 w-24 rounded-full bg-white/25 animate-pulse`}
            />
            <div
              className={`h-9 w-20 rounded-full bg-white/15 animate-pulse`}
            />
            <div
              className={`h-9 w-24 rounded-full bg-white/15 animate-pulse`}
            />
            <div
              className={`h-9 w-36 rounded-full bg-white/15 animate-pulse`}
            />
          </div>

          {/* Right Links & Expert Button */}
          <div className="hidden md:flex items-center gap-6">
            <div className={`h-5 w-24 ${bone}`} />
            <div className={`h-5 w-16 ${bone}`} />
            <div className="h-10 w-36 rounded-full bg-emerald-600/60 animate-pulse" />
          </div>
        </div>
      </div>
    </header>
  );
}
