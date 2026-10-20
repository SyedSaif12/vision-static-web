"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  MapPin,
  UserRound,
  ShoppingCart,
  Tag,
  LoaderCircle,
  LogOut,
} from "lucide-react";

/* DESKTOP / TABLET — TOP NAVBAR (pehle jaisa hi, koi change nahi) */
export default function DesktopHeader({
  searchSlot,
  user,
  isMount,
  isUserLoading,
  cartCount,
  openMenu,
  openHover,
  closeHover,
  onLogout,
  onCartClick,
}) {
  return (
    <div className="relative w-11/12 mx-auto z-30 border-b border-white/20">
      <div className="flex min-h-[88px] items-center gap-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1 text-2xl font-extrabold tracking-tight"
        >
          WEGOT
          <Tag size={29} strokeWidth={3} className="fill-gold text-gold" />
        </Link>

        {/* Search */}
        {searchSlot}

        {/* Desktop actions */}
        <div className="ml-auto hidden shrink-0 items-center gap-6 lg:flex">
          <Link
            href="/corporate-procurement"
            className="flex items-center gap-3"
          >
            <BriefcaseBusiness size={25} />
            <span className="text-sm leading-5">
              <small className="block text-brand-50">Corporate</small>
              Procurement
            </span>
          </Link>

          <Link
            href="/why-us/why-wegot#store"
            className="flex items-center gap-3"
          >
            <MapPin size={25} />
            <span className="text-sm leading-5">
              <small className="block text-brand-50">Visit</small>
              Store
            </span>
          </Link>

          {isMount && user?.role ? (
            <div
              className="relative hidden lg:block"
              onMouseEnter={() => openHover("user")}
              onMouseLeave={closeHover}
            >
              <h1 className="font-bold relative uppercase bg-gold-600 rounded-full flex justify-center items-center text-ink w-10 h-10">
                {user?.firstName?.slice(0, 1)}
                {user?.lastName?.slice(0, 1)}
              </h1>

              {openMenu === "user" && (
                <div className="absolute hover:cursor-pointer left-0 top-full z-50 w-44 pt-2">
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
            <Link href="/accounts/login" className="flex items-center gap-3">
              <UserRound size={25} />
              <span className="text-sm leading-5">
                <small className="block text-brand-50">Sign in</small>
                Account
              </span>
            </Link>
          )}

          <button onClick={onCartClick} className="flex items-center gap-2">
            <ShoppingCart size={27} />
            <span className="text-sm leading-5">
              <small className="block relative text-brand-50">
                <strong
                  suppressHydrationWarning
                  className="absolute bg-gold-600 -left-4 text-xs text-black px-1 rounded-full "
                >
                  {isMount ? cartCount : 0}
                </strong>{" "}
                Your
              </small>
              Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
