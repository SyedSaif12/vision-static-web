"use client";

import Link from "next/link";
import { ChevronDown, MessageCircle } from "lucide-react";
import { getCategoryHref, getSubCategoryHref } from "@/lib/utils";
import { supportLinks, whyLinks } from "./nav-config";

/* DESKTOP / TABLET — SECOND NAVBAR (Shop mega menu, Support, Why Us) */
export default function DesktopNav({
  sortedCategories,
  openMenu,
  setOpenMenu,
  openHover,
  closeHover,
  closeAll,
}) {
  return (
    <nav className="relative z-20 bg-primary">
      <div className="flex w-11/12 mx-auto min-h-[69px] items-center justify-between gap-3 border-b border-white/20">
        <div className="flex items-center gap-2">
          {/* ===== SHOP (full-width mega menu) ===== */}
          <div onMouseEnter={() => openHover("shop")} onMouseLeave={closeHover}>
            <button
              onClick={() => setOpenMenu(openMenu === "shop" ? null : "shop")}
              aria-expanded={openMenu === "shop"}
              className={`flex shrink-0 items-center gap-2 rounded-full border border-surface/50 px-5 py-3 text-sm font-semibold transition ${
                openMenu === "shop" ? "bg-surface/20" : "hover:bg-surface/10"
              }`}
            >
              Shop
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openMenu === "shop" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenu === "shop" && (
              <div className="absolute top-full z-40 max-h-[calc(100dvh-200px)] w-[91%] mx-auto overflow-y-auto overscroll-contain rounded-b-3xl border border-brand-50 bg-white text-ink shadow-2xl">
                <div className="px-5 py-6 md:px-8">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-brand-50 pb-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <h2 className="text-base font-bold">Shop by category</h2>
                      <span className="text-sm text-faint">
                        Brands under each category
                      </span>
                    </div>

                    <Link
                      href="/categories"
                      onClick={closeAll}
                      className="text-sm font-semibold text-brand hover:underline"
                    >
                      View all categories ›
                    </Link>
                  </div>

                  <div className="columns-2 gap-x-6 sm:columns-3 lg:columns-4 xl:columns-6">
                    {sortedCategories.map((category) => (
                      <section
                        key={category.id}
                        className="mb-7 inline-block w-full border border-transparent hover:border-gray-300 p-2 rounded-lg break-inside-avoid align-top"
                      >
                        <Link
                          href={getCategoryHref(category.name)}
                          onClick={closeAll}
                          className="mb-3 block hover:translate-x-4 transition-transform duration-300 break-words text-[15px] font-bold capitalize hover:text-brand"
                        >
                          {category.name?.replaceAll("-", " ")}
                        </Link>

                        <ul className="space-y-2.5">
                          {category.subCategories
                            ?.slice(0, 7)
                            .map((subCategory) => (
                              <li key={subCategory.id}>
                                <Link
                                  href={getSubCategoryHref(
                                    category.name,
                                    subCategory.name,
                                  )}
                                  onClick={closeAll}
                                  className="block break-words text-sm hover:translate-x-3 duration-300 capitalize text-faint transition-all hover:text-brand"
                                >
                                  {subCategory.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/products?tag=deals"
            className="hidden rounded-full border border-surface/40 px-5 py-3 text-sm font-semibold hover:bg-surface/10 sm:block"
          >
            Deals
          </Link>

          <Link
            href="/products?tag=refurbished"
            className="hidden rounded-full border border-surface/40 px-5 py-3 text-sm font-semibold hover:bg-surface/10 md:block"
          >
            Refurbished
          </Link>

          {/* ===== SUPPORT & SERVICES ===== */}
          <div
            className="relative hidden xl:block"
            onMouseEnter={() => openHover("support")}
            onMouseLeave={closeHover}
          >
            <span className="flex items-center gap-2 rounded-full border border-surface/40 px-5 py-3 text-sm font-semibold hover:bg-surface/10">
              Support & Services
              <ChevronDown
                size={15}
                className={`transition-transform ${
                  openMenu === "support" ? "rotate-180" : ""
                }`}
              />
            </span>

            {openMenu === "support" && (
              <div className="absolute left-0 top-full z-40 w-60 pt-2">
                <div className="rounded-2xl bg-white p-2 text-ink shadow-2xl">
                  {supportLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="block rounded-lg px-4 py-2.5 text-sm hover:bg-slate-100"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right-side navigation */}
        <div className="hidden items-center gap-7 text-sm lg:flex">
          <Link href="/instalment-plan" className="hover:text-brand-50">
            Instalment Plan
          </Link>

          {/* ===== WHY US ===== */}
          <div
            className="relative"
            onMouseEnter={() => openHover("why")}
            onMouseLeave={closeHover}
          >
            <Link
              href="/why-us/why-wegot"
              className="flex items-center gap-1 hover:text-brand-50"
            >
              Why Us
              <ChevronDown
                size={15}
                className={`transition-transform ${
                  openMenu === "why" ? "rotate-180" : ""
                }`}
              />
            </Link>

            {openMenu === "why" && (
              <div className="absolute right-0 top-full z-40 w-52 pt-3">
                <div className="rounded-2xl bg-white p-2 text-ink shadow-2xl">
                  {whyLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="block rounded-lg px-4 py-2.5 text-sm hover:bg-slate-100"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            // href="/support-services/contact-us"
            href="https://api.whatsapp.com/send/?phone=923260220581&text=Hi+WeGot%2C+I+want+to+shop+with+an+expert.&type=phone_number&app_absent=0"
            target="_blank"
            className="flex shrink-0 items-center gap-2 rounded-full bg-green px-5 py-3 font-semibold text-white hover:bg-green/80"
          >
            <MessageCircle size={18} />
            Shop with Expert
          </Link>
        </div>

        {/* Smaller-screen quick link (tablet) */}
        <Link
          href="/support-services/contact-us"
          className="flex shrink-0 items-center gap-2 rounded-full bg-green px-3 py-2.5 text-xs font-semibold lg:hidden"
        >
          <MessageCircle size={17} />
          <span className="hidden sm:inline">Shop with Expert</span>
          <span className="sm:hidden">Expert</span>
        </Link>
      </div>
    </nav>
  );
}
