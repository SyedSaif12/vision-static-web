"use client";

import Link from "next/link";
import { Menu, ShoppingCart, Tag, UserRound } from "lucide-react";
import { BaseImage } from "@/components";

/* MOBILE (< md) — compact top header: menu + logo + account + cart, neeche search */
export default function MobileHeader({
  searchSlot,
  isMount,
  cartCount,
  user,
  onMenuClick,
  onCartClick,
}) {
  return (
    <div className="border-b border-white/20 px-4 pb-3 pt-2">
      <div className="flex h-12 items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="-ml-2 rounded-lg p-2 active:bg-white/10"
          >
            <Menu size={26} />
          </button>

          <Link href="/" className="flex items-center gap-1 w-16 h-16">
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
            href={
              isMount && user?.role ? "/accounts/profile" : "/accounts/login"
            }
            aria-label="Account"
            className="rounded-lg p-2 active:bg-white/10"
          >
            <UserRound size={24} />
          </Link>

          <button
            onClick={onCartClick}
            aria-label="Cart"
            className="relative rounded-lg p-2 active:bg-white/10"
          >
            <ShoppingCart size={24} />
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
