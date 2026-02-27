"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, MapPin, ChevronDown, ShoppingCart } from "lucide-react";
import visionTechIcon from "@/assets/visiontechicon.png";
import { useGetCategoriesQuery } from "@/redux/category/categorySlice";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { getCartCount } from "@/redux/cart/cartSlice";
import CartDrawer from "./CartDrawer";
import threelines from "../assets/threelines.svg";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { isLoading, currentData } = useGetCategoriesQuery({
    navbar: true,
  });

  const [openMobile, setOpenMobile] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState({});
  const [openmenu, setopenmenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useSelector(getCartCount);

  const toggleMobileCategory = (categoryId) => {
    setMobileMenuOpen((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  useEffect(() => {
    setCategoryData(currentData?.data);
  }, [currentData?.data]);

  useEffect(() => {
    const handleScroll = () => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeDropdown]);

  const handleMouseEnter = (categoryId) => setActiveDropdown(categoryId);
  const handleMouseLeave = () => setActiveDropdown(null);

  if (isLoading) return <Loading />;

  return (
    <>
      <nav className="absolute w-[90%] border-2 rounded-xl border-white/50 mx-auto left-0 right-0 top-6 z-50 shadow-md font-sans">
        {/* --- TOP BAR: GRADIENT BACKGROUND --- */}
        <div className="bg-gradient-to-r rounded-xl from-[#030E40] via-[#1a1f50] to-[#5C2D00] text-white">
          {/* ROW 1: Logo & Search */}
          <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Logo Section */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              <Link href="/">
                <Image
                  src={visionTechIcon}
                  alt="Vision Tech"
                  className="w-28 lg:w-40 object-contain brightness-0 invert"
                />
              </Link>

              {/* Mobile Toggle Button */}
              <div className="flex gap-2 lg:hidden">
                <Link href="" className="relative">
                  <div
                    onClick={() => setCartOpen(true)}
                    className="rounded-full bg-white p-2"
                  >
                    <ShoppingCart className="size-4 md:size-6 text-black" />
                  </div>
                  <CartDrawer
                    open={cartOpen}
                    onClose={() => setCartOpen(false)}
                  />

                  {/* Red Dot / Badge */}
                  {cartCount > 0 ? (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs size-4 md:size-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  ) : (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs size-4 md:size-5 flex items-center justify-center rounded-full">
                      {Number(0)}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => setOpenMobile(true)}
                  className="text-white p-1"
                >
                  <Menu className="size-6 md:size-8" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Store Locator (Desktop Only) */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Store Locator */}
              <Link
                href="/store-locator"
                className="flex items-center gap-2 bg-white text-[#030E40] px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                <MapPin size={18} /> Store Locator
              </Link>

              {/* Cart Icon */}
              <Link href="" className="relative">
                <div
                  onClick={() => setCartOpen(true)}
                  className="rounded-full bg-white p-2"
                >
                  <ShoppingCart className="size-25 text-black" />
                </div>
                <CartDrawer
                  open={cartOpen}
                  onClose={() => setCartOpen(false)}
                />

                {/* Red Dot / Badge */}
                {cartCount > 0 ? (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                ) : (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {Number(0)}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* --- ROW 2: DESKTOP MENU --- */}
          <div className="hidden lg:block border-t border-white/10 bg-black/10">
            <div className="container mx-auto px-4">
              {/* <ul className="flex flex-wrap items-center justify-center gap-6 py-3 text-sm font-medium tracking-wide"> */}
              <div className="flex justify-between gap-6 py-3 text-sm font-medium tracking-wide items-center">
                <div className="flex-1">
                  <button
                    className="flex w-28 items-center gap-1 bg-[#FF8415] px-4 py-1 rounded-full"
                    onClick={() => setopenmenu(true)}
                  >
                    <img src={threelines.src} alt="" className="w-4 h-4" />
                    <span>Menu</span>
                  </button>
                </div>
                <ul className="flex-2 flex text-xs xl:text-base flex-wrap justify-center gap-4 items-center">
                  {Array.isArray(categoryData) &&
                    categoryData?.length > 0 &&
                    categoryData
                      ?.slice()
                      ?.reverse()
                      ?.slice(0, 7)
                      ?.map((category) => (
                        <li
                          key={category?.id}
                          className="group"
                          onMouseEnter={() => handleMouseEnter(category?.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Link
                            href={`/${category?.name}`}
                            className={`flex items-center capitalize gap-1 py-2 hover:text-blue-300 transition-colors ${
                              activeDropdown === category?.id
                                ? "text-blue-300"
                                : ""
                            }`}
                          >
                            {category?.name?.replace("-", " ")}
                            {category?.subCategories &&
                              category?.subCategories.length > 0 && (
                                <ChevronDown
                                  size={14}
                                  className={`transition-transform duration-200 ${
                                    activeDropdown === category?.id
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              )}
                          </Link>
                        </li>
                      ))}
                  <li>
                    <Link href="/faq">Faq</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact us</Link>
                  </li>
                </ul>
                <div className="flex-1" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* DESKTOP MEGA MENU - OUTSIDE NAV, FULL WIDTH */}
      {activeDropdown && (
        <div
          // className="hidden w-11/12 mx-auto rounded-br-2xl rounded-bl-2xl lg:block absolute left-0 right-0 bg-[#222222] text-white shadow-2xl border-t border-gray-700 z-40"
          className="hidden w-11/12 mx-auto rounded-br-2xl rounded-bl-2xl lg:block absolute left-0 right-0 bg-gradient-to-br from-[#030E40] via-[#1a1f50] to-[#5C2D00] text-white shadow-2xl border-t border-gray-700 z-40"
          style={{ top: "calc(2rem + 7.5rem)", zIndex: 50 }}
          onMouseEnter={() => handleMouseEnter(activeDropdown)}
          onMouseLeave={handleMouseLeave}
        >
          {(() => {
            const activeCategory = categoryData?.find(
              (cat) => cat?.id === activeDropdown,
            );

            if (
              !activeCategory ||
              !activeCategory.subCategories ||
              activeCategory.subCategories.length === 0
            ) {
              return null;
            }

            // Split subcategories into columns (3 columns max)
            const subCategories = activeCategory.subCategories;
            const itemsPerColumn = Math.ceil(subCategories.length / 3);
            const columns = [];

            for (let i = 0; i < 3; i++) {
              const start = i * itemsPerColumn;
              const end = start + itemsPerColumn;
              const columnItems = subCategories.slice(start, end);
              if (columnItems.length > 0) {
                columns.push(columnItems);
              }
            }

            return (
              <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {columns.map((column, colIndex) => (
                  <div key={colIndex}>
                    <h3 className="text-lg capitalize font-bold mb-4 text-white border-b border-gray-600 pb-2">
                      {colIndex === 0 ? (
                        activeCategory.name
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </h3>
                    <ul className="space-y-3">
                      {column.map((subCat) => (
                        <li key={subCat.id}>
                          <Link
                            href={`/${activeCategory.name}/${subCat.name}`}
                            // className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block text-[15px]"
                            className="relative capitalize text-gray-300 hover:text-white transition-all inline-block text-[15px]
                            after:content-[''] after:absolute after:bottom-[-3px] after:right-0 
                            after:w-0 after:h-[2px] after:bg-white 
                            after:transition-all after:duration-300 
                            hover:after:w-full hover:after:left-0 hover:after:right-auto"
                          >
                            {subCat.name.replace("-", " ")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* --- MOBILE MENU SIDEBAR --- */}
      {openMobile && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setOpenMobile(false)}
          />

          {/* Drawer */}
          <div className="relative bg-white w-[85%] max-w-sm h-full shadow-2xl overflow-y-auto flex flex-col">
            {/* Drawer Header */}
            <div className="p-5 flex justify-between items-center border-b bg-gray-50 sticky top-0 z-10">
              <span className="text-xl font-bold text-[#030E40]">Menu</span>
              <button
                onClick={() => setOpenMobile(false)}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 p-4 space-y-1">
              {categoryData?.map((category) => (
                <div
                  key={category.id}
                  className="border-b border-gray-100 last:border-none"
                >
                  <button
                    onClick={() => toggleMobileCategory(category.id)}
                    className="w-full font-semibold capitalize text-gray-800 py-3 flex justify-between items-center hover:text-blue-600"
                  >
                    {category.name.replace("-", " ")}
                    {category.subCategories &&
                      category.subCategories.length > 0 && (
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-transform ${
                            mobileMenuOpen[category.name] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                  </button>

                  {/* Mobile Accordion Content */}
                  {mobileMenuOpen[category.id] &&
                    category.subCategories &&
                    category.subCategories.length > 0 && (
                      <div className="pl-4 pb-3 text-sm text-gray-600 space-y-2 bg-gray-50/50 rounded-md mb-2">
                        {category.subCategories.map((subCat) => (
                          <Link
                            key={subCat.id}
                            href={`/${category.name}/${subCat.name}`}
                            className="block py-1 capitalize hover:text-blue-500"
                            onClick={() => setOpenMobile(false)}
                          >
                            {subCat.name.replace("-", " ")}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Bottom Links */}
            <div className="p-4 bg-gray-50 border-t space-y-3">
              <Link
                href="/faq"
                className="flex items-center gap-3 font-semibold text-gray-700"
                onClick={() => setOpenMobile(false)}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> FAQ
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 font-semibold text-gray-700"
                onClick={() => setOpenMobile(false)}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                Contact
              </Link>
              <Link
                href="/store-locator"
                className="flex items-center gap-3 font-semibold text-[#030E40] mt-4 p-3 bg-white border border-gray-200 rounded-lg justify-center shadow-sm"
                onClick={() => setOpenMobile(false)}
              >
                <MapPin size={18} /> Store Locator
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE MENU SIDEBAR --- */}
      {openmenu && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setopenmenu(false)}
          />

          {/* Drawer */}
          <div
            className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl
      transform transition-transform duration-300 ease-in-out
      flex flex-col overflow-hidden
      ${openmenu ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Header */}
            <div className="bg-[#030E40] text-white p-10 rounded-b-3xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">Menu</h2>
                  <p className="text-sm opacity-80">
                    {categoryData?.length} items
                  </p>
                </div>
                <button
                  onClick={() => setopenmenu(false)}
                  className="w-10 h-10 rounded-full border border-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 overflow-y-scroll p-4 space-y-1">
              {categoryData?.map((category) => (
                <div
                  key={category.id}
                  className="border-b border-gray-100 last:border-none"
                >
                  <button
                    onClick={() => toggleMobileCategory(category.id)}
                    className="w-full font-semibold capitalize text-gray-800 py-3 flex justify-between items-center hover:text-blue-600"
                  >
                    {category.name.replace("-", " ")}
                    {category.subCategories &&
                      category.subCategories.length > 0 && (
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-transform ${
                            mobileMenuOpen[category.name] ? "rotate-180" : ""
                          }`}
                        />
                      )}
                  </button>

                  {/* Mobile Accordion Content */}
                  {mobileMenuOpen[category.id] &&
                    category.subCategories &&
                    category.subCategories.length > 0 && (
                      <div className="pl-4 pb-3 text-sm text-gray-600 space-y-2 bg-gray-50/50 rounded-md mb-2">
                        {category.subCategories.map((subCat) => (
                          <Link
                            key={subCat.id}
                            href={`/${category.name}/${subCat.name}`}
                            className="block py-1 capitalize hover:text-blue-500"
                            onClick={() => setOpenMobile(false)}
                          >
                            {subCat.name.replace("-", " ")}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
