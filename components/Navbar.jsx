// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Menu,
//   X,
//   Search,
//   MapPin,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";
// import visionTechIcon from "@/assets/visiontechicon.png";
// import { menuData } from "@/components/menuData"; // Ensure path is correct

// export default function Navbar() {
//   const [openMobile, setOpenMobile] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   // Mobile menu mein categories open/close karne ke liye state
//   const [mobileMenuOpen, setMobileMenuOpen] = useState({});

//   const toggleMobileCategory = (category) => {
//     setMobileMenuOpen((prev) => ({
//       ...prev,
//       [category]: !prev[category],
//     }));
//   };

//   const handleMouseEnter = (menu) => setActiveDropdown(menu);
//   const handleMouseLeave = () => setActiveDropdown(null);

//   return (
//     // FIX 1: 'absolute' aur 'w-[90%]' hata diya. Ab ye full width aur sticky hai.
//     <nav className="absolute w-[90%] mx-auto left-0 right-0 top-6 z-50 shadow-md font-sans">
//       {/* --- TOP BAR: GRADIENT BACKGROUND --- */}
//       <div className="bg-gradient-to-r from-[#030E40] via-[#1a1f50] to-[#5C2D00] text-white">
//         {/* ROW 1: Logo & Search */}
//         <div className="container mx-auto px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
//           {/* Logo Section */}
//           <div className="flex items-center justify-between w-full lg:w-auto">
//             <Link href="/">
//               <Image
//                 src={visionTechIcon}
//                 alt="Vision Tech"
//                 className="w-28 lg:w-40 object-contain brightness-0 invert"
//               />
//             </Link>

//             {/* Mobile Toggle Button */}
//             <button
//               onClick={() => setOpenMobile(true)}
//               className="lg:hidden text-white p-1"
//             >
//               <Menu size={30} />
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="w-full lg:flex-1 max-w-3xl px-0 lg:px-8">
//             <div className="relative w-full">
//               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                 <Search size={20} />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search Product"
//                 className="w-full bg-white text-gray-800 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//               />
//             </div>
//           </div>

//           {/* Store Locator (Desktop Only) */}
//           <Link
//             href="/store-locator"
//             className="hidden lg:flex items-center gap-2 bg-white text-[#030E40] px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
//           >
//             <MapPin size={18} /> Store Locator
//           </Link>
//         </div>

//         {/* --- ROW 2: DESKTOP MENU --- */}
//         <div className="hidden lg:block border-t border-white/10 bg-black/10 relative">
//           <div className="container mx-auto px-4">
//             <ul className="flex flex-wrap items-center justify-center gap-6 py-3 text-sm font-medium tracking-wide">
//               {Object.entries(menuData).map(([key, menu]) => (
//                 <li
//                   key={key}
//                   className="group"
//                   onMouseEnter={() => handleMouseEnter(key)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <Link
//                     href={`/${key.toLowerCase().replace(/\s+/g, "-")}`}
//                     className={`flex items-center gap-1 py-2 hover:text-blue-300 transition-colors ${
//                       activeDropdown === key ? "text-blue-300" : ""
//                     }`}
//                   >
//                     {key}
//                     <ChevronDown
//                       size={14}
//                       className={`transition-transform duration-200 ${
//                         activeDropdown === key ? "rotate-180" : ""
//                       }`}
//                     />
//                   </Link>

//                   {/* DESKTOP MEGA MENU */}
//                   {activeDropdown === key && (
//                     <div className="absolute left-0 top-full w-full bg-[#222222] text-white shadow-2xl border-t border-gray-700 z-50">
//                       {menu.type === "mega" && (
//                         <div className="container mx-auto p-8 grid grid-cols-3 gap-10">
//                           {menu.columns.map((col, colIndex) => (
//                             <div key={colIndex}>
//                               <h3 className="text-lg font-bold mb-4 text-white border-b border-gray-600 pb-2">
//                                 {colIndex === 0 ? key : <span>&nbsp;</span>}
//                               </h3>
//                               <ul className="space-y-3">
//                                 {col.map((item, itemIndex) => (
//                                   <li key={itemIndex}>
//                                     <Link
//                                       href="#"
//                                       className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block text-[15px]"
//                                     >
//                                       {item}
//                                     </Link>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                       {menu.type === "simple" && (
//                         <div className="container mx-auto p-6">
//                           <ul className="w-64 space-y-3">
//                             {menu.items.map((item, i) => (
//                               <li key={i}>
//                                 <Link
//                                   href={item.link}
//                                   className="block text-gray-300 hover:text-white hover:translate-x-1 transition-transform"
//                                 >
//                                   {item.label}
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* --- MOBILE MENU SIDEBAR (Fixed & Clean) --- */}
//       {openMobile && (
//         <div className="fixed inset-0 z-[100] flex justify-end">
//           {/* Dark Overlay */}
//           <div
//             className="fixed inset-0 bg-black/60"
//             onClick={() => setOpenMobile(false)}
//           />

//           {/* Drawer */}
//           <div className="relative bg-white w-[85%] max-w-sm h-full shadow-2xl overflow-y-auto flex flex-col">
//             {/* Drawer Header */}
//             <div className="p-5 flex justify-between items-center border-b bg-gray-50 sticky top-0 z-10">
//               <span className="text-xl font-bold text-[#030E40]">Menu</span>
//               <button
//                 onClick={() => setOpenMobile(false)}
//                 className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
//               >
//                 <X size={20} className="text-gray-700" />
//               </button>
//             </div>

//             {/* Drawer Links */}
//             <div className="flex-1 p-4 space-y-1">
//               {Object.entries(menuData).map(([key, menu]) => (
//                 <div
//                   key={key}
//                   className="border-b border-gray-100 last:border-none"
//                 >
//                   <button
//                     onClick={() => toggleMobileCategory(key)}
//                     className="w-full font-semibold text-gray-800 py-3 flex justify-between items-center hover:text-blue-600"
//                   >
//                     {key}
//                     <ChevronDown
//                       size={18}
//                       className={`text-gray-400 transition-transform ${
//                         mobileMenuOpen[key] ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>

//                   {/* Mobile Accordion Content */}
//                   {mobileMenuOpen[key] && (
//                     <div className="pl-4 pb-3 text-sm text-gray-600 space-y-2 bg-gray-50/50 rounded-md mb-2">
//                       {menu.type === "simple"
//                         ? menu.items.map((i, idx) => (
//                             <Link
//                               key={idx}
//                               href={i.link}
//                               className="block py-1 hover:text-blue-500"
//                             >
//                               {i.label}
//                             </Link>
//                           ))
//                         : // Flatten mega menu columns for mobile
//                           menu.columns.flat().map((item, idx) => (
//                             <Link
//                               key={idx}
//                               href="#"
//                               className="block py-1 hover:text-blue-500"
//                             >
//                               {item}
//                             </Link>
//                           ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Bottom Links */}
//             <div className="p-4 bg-gray-50 border-t space-y-3">
//               <Link
//                 href="/faq"
//                 className="flex items-center gap-3 font-semibold text-gray-700"
//               >
//                 <span className="w-2 h-2 rounded-full bg-blue-500"></span> FAQ
//               </Link>
//               <Link
//                 href="/contact"
//                 className="flex items-center gap-3 font-semibold text-gray-700"
//               >
//                 <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
//                 Contact
//               </Link>
//               <Link
//                 href="/store-locator"
//                 className="flex items-center gap-3 font-semibold text-[#030E40] mt-4 p-3 bg-white border border-gray-200 rounded-lg justify-center shadow-sm"
//               >
//                 <MapPin size={18} /> Store Locator
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Search,
  MapPin,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import visionTechIcon from "@/assets/visiontechicon.png";
import { menuData } from "@/components/menuData";
import cart from "../assets/cart.svg";
import { useSelector } from "react-redux";
import { getCartCount } from "@/redux/cart/cartSlice";
import CartDrawer from "./CartDrawer";
import threelines from "../assets/threelines.svg";

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState({});
  const [openmenu, setopenmenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useSelector(getCartCount);

  const toggleMobileCategory = (category) => {
    setMobileMenuOpen((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

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

  const handleMouseEnter = (menu) => setActiveDropdown(menu);
  const handleMouseLeave = () => setActiveDropdown(null);

  return (
    <>
      <nav className="absolute w-[90%] mx-auto left-0 right-0 top-6 z-50 shadow-md font-sans">
        {/* --- TOP BAR: GRADIENT BACKGROUND --- */}
        <div className="bg-gradient-to-r from-[#030E40] via-[#1a1f50] to-[#5C2D00] text-white">
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
              <button
                onClick={() => setOpenMobile(true)}
                className="lg:hidden text-white p-1"
              >
                <Menu size={30} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="w-full lg:flex-1 max-w-3xl px-0 lg:px-8">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-full bg-white text-gray-800 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

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
                <Image
                  src={cart}
                  alt="Cart"
                  width={42}
                  height={42}
                  className="rounded-full bg-white p-2"
                  onClick={() => setCartOpen(true)}
                />
                <CartDrawer
                  open={cartOpen}
                  onClose={() => setCartOpen(false)}
                />

                {/* Red Dot / Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* --- ROW 2: DESKTOP MENU --- */}
          <div className="hidden lg:block border-t border-white/10 bg-black/10">
            <div className="container mx-auto px-4">
              <ul className="flex flex-wrap items-center justify-center gap-6 py-3 text-sm font-medium tracking-wide">
                <button
                  className="flex items-center gap-1 bg-[#FF8415] px-4 py-1 rounded-full"
                  onClick={() => setopenmenu(true)}
                >
                  <img src={threelines.src} alt="" className="w-4 h-4" />
                  <span>Menu</span>
                </button>

                {Object.entries(menuData).map(([key, menu]) => (
                  <li
                    key={key}
                    className="group"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${key.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`flex items-center gap-1 py-2 hover:text-blue-300 transition-colors ${
                        activeDropdown === key ? "text-blue-300" : ""
                      }`}
                    >
                      {key}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === key ? "rotate-180" : ""
                        }`}
                      />
                    </Link>
                  </li>
                ))}
                <Link href="/faq">
                  <h1>Faq</h1>
                </Link>
                <Link href="/contact">
                  <h1>Contact us</h1>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* DESKTOP MEGA MENU - OUTSIDE NAV, FULL WIDTH */}
      {activeDropdown && (
        <div
          // className="hidden w-11/12 mx-auto rounded-br-2xl rounded-bl-2xl lg:block fixed left-0 right-0 bg-[#222222] text-white shadow-2xl border-t border-gray-700 z-40"
          className="hidden w-11/12 mx-auto rounded-br-2xl rounded-bl-2xl lg:block absolute left-0 right-0 bg-[#222222] text-white shadow-2xl border-t border-gray-700 z-40"
          style={{ top: "calc(2rem + 7.5rem)", zIndex: 50 }}
          onMouseEnter={() => handleMouseEnter(activeDropdown)}
          onMouseLeave={handleMouseLeave}
        >
          {menuData[activeDropdown]?.type === "mega" && (
            <div className="container mx-auto p-8 grid grid-cols-3 gap-10">
              {menuData[activeDropdown].columns.map((col, colIndex) => (
                <div key={colIndex}>
                  <h3 className="text-lg font-bold mb-4 text-white border-b border-gray-600 pb-2">
                    {colIndex === 0 ? activeDropdown : <span>&nbsp;</span>}
                  </h3>
                  <ul className="space-y-3">
                    {col.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href="#"
                          className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block text-[15px]"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {menuData[activeDropdown]?.type === "simple" && (
            <div className="container mx-auto p-6">
              <ul className="w-64 space-y-3">
                {menuData[activeDropdown].items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="block text-gray-300 hover:text-white hover:translate-x-1 transition-transform"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
              {Object.entries(menuData).map(([key, menu]) => (
                <div
                  key={key}
                  className="border-b border-gray-100 last:border-none"
                >
                  <button
                    onClick={() => toggleMobileCategory(key)}
                    className="w-full font-semibold text-gray-800 py-3 flex justify-between items-center hover:text-blue-600"
                  >
                    {key}
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform ${
                        mobileMenuOpen[key] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Accordion Content */}
                  {mobileMenuOpen[key] && (
                    <div className="pl-4 pb-3 text-sm text-gray-600 space-y-2 bg-gray-50/50 rounded-md mb-2">
                      {menu.type === "simple"
                        ? menu.items.map((i, idx) => (
                            <Link
                              key={idx}
                              href={i.link}
                              className="block py-1 hover:text-blue-500"
                            >
                              {i.label}
                            </Link>
                          ))
                        : menu.columns.flat().map((item, idx) => (
                            <Link
                              key={idx}
                              href="#"
                              className="block py-1 hover:text-blue-500"
                            >
                              {item}
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
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> FAQ
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-3 font-semibold text-gray-700"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                Contact
              </Link>
              <Link
                href="/store-locator"
                className="flex items-center gap-3 font-semibold text-[#030E40] mt-4 p-3 bg-white border border-gray-200 rounded-lg justify-center shadow-sm"
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
      ${openmenu ? "translate-x-0" : "translate-x-full"}
      flex flex-col overflow-y-auto`}
          >
            {/* Header */}
            <div className="bg-[#030E40] text-white p-10 rounded-b-3xl sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">Menu</h2>
                  <p className="text-sm opacity-80">12 items</p>
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
            <div className="flex-1 p-4 space-y-1">
              {Object.entries(menuData).map(([key, menu]) => (
                <div
                  key={key}
                  className="border-b border-gray-100 last:border-none"
                >
                  <button
                    onClick={() => toggleMobileCategory(key)}
                    className="w-full font-semibold text-black py-3 flex justify-between items-center hover:text-blue-600"
                  >
                    {key}
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform ${
                        mobileMenuOpen[key] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Accordion Content */}
                  {mobileMenuOpen[key] && (
                    <div className="pl-4 pb-3 text-sm text-black space-y-2 bg-gray-50/50 rounded-md mb-2">
                      {menu.type === "simple"
                        ? menu.items.map((i, idx) => (
                            <Link
                              key={idx}
                              href={i.link}
                              className="block py-1 hover:text-blue-500"
                            >
                              {i.label}
                            </Link>
                          ))
                        : menu.columns.flat().map((item, idx) => (
                            <Link
                              key={idx}
                              href="#"
                              className="block py-1 hover:text-blue-500"
                            >
                              {item}
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
