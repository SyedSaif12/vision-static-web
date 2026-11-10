"use client";

import Link from "next/link";
import {
  LoaderCircle,
  LogOut,
  MapPin,
  Menu,
  ShoppingCart,
  Tag,
  UserRound,
} from "lucide-react";
import { BaseImage } from "@/components";

/* MOBILE (< md) — compact top header: menu + logo + account + cart, neeche search */
export default function MobileHeader({
  searchSlot,
  isMount,
  cartCount,
  user,
  isUserLoading,
  openMenu,
  openHover,
  closeHover,
  onLogout,
  onMenuClick,
  onCartClick,
}) {
  return (
    <div className="border-b border-white/20 px-4 pb-3 pt-2">
      <div className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="-ml-2 rounded-lg p-2 active:bg-white/10"
          >
            <Menu size={24} />
          </button>

          <Link href="/" className="flex items-center gap-1 w-14 h-14">
            <BaseImage
              src={"/images/logo-wegot.png"}
              alt={"wegot logo png"}
              fit="contain"
              className="w-full h-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href={"/why-us/why-wegot#store"}
            aria-label="Account"
            className="rounded-lg p-2 active:bg-white/10"
          >
            <MapPin size={22} />
          </Link>
          {isMount && user?.role ? (
            <div
              className="relative"
              onMouseEnter={() => openHover("user")}
              onMouseLeave={closeHover}
            >
              <h1 className="font-bold relative uppercase bg-gold-600 rounded-full flex justify-center items-center text-ink w-8 h-8">
                {!!user?.firstName && user?.firstName?.slice(0, 1)}
                {!!user?.lastName && user?.lastName?.slice(0, 1)}
              </h1>
              {openMenu === "user" && (
                <div className="absolute hover:cursor-pointer right-0 top-full z-50 w-32 pt-2">
                  <div className="rounded-lg bg-white py-2 px-4 !z-[9999] text-ink shadow-2xl">
                    <h3 className="capitalize font-semibold text-muted my-3 border-b border-muted">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <button
                      onClick={onLogout}
                      className="text-red flex justify-center items-center gap-3"
                    >
                      <span className="flex items-center gap-1">
                        <LogOut className="size-4" />
                        Logout
                      </span>
                      {isUserLoading && (
                        <LoaderCircle className="size-4 animate-spin" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={"/accounts/login"}
              aria-label="Account"
              className="rounded-lg p-2 active:bg-white/10"
            >
              <UserRound size={22} />
            </Link>
          )}
          <button
            onClick={onCartClick}
            aria-label="Cart"
            className="relative rounded-lg p-2 active:bg-white/10"
          >
            <ShoppingCart size={22} />
            <span
              suppressHydrationWarning
              className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-600 px-1 text-[11px] font-bold text-black"
            >
              {isMount ? cartCount : 0}
            </span>
          </button>
        </div>
      </div>

      {/* Search hamesha visible */}
      <div className="mt-1">{searchSlot}</div>
    </div>
  );
}
