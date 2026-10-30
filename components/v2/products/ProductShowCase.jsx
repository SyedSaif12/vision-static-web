// components/sections/ProductShowcase.jsx
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { getReadableTextColor } from "@/lib/utils";
import { ProductCard } from "./_components/product-card";
// import ProductCard from "./ProductCard";

const MAX_PRODUCTS = 12;

const ProductShowcase = ({
  eyebrow, // "HANDPICKED"
  title, // "Featured products"
  description, // "Our best sellers right now..."
  bgColor = "#1a56db", // admin se aaya hua hex
  ctaLabel = "View all products ›",
  ctaHref = "/products",
  products = [],
  maxItems = MAX_PRODUCTS,
  tag = { name: "Coming Soon", color: "#e5443b" },
  onAddToCart,
  onToggleWishlist,
  className = "",
}) => {
  const items = products.slice(0, maxItems);
  if (!items.length) return null;

  const textColor = getReadableTextColor(bgColor);
  const isDarkBg = textColor === "#ffffff";

  return (
    <section className={`w-11/12 mx-auto py-6 lg:py-8 ${className}`}>
      <div className="">
        {/* Top right pill (desktop) */}
        <div className="mb-3 hidden justify-end lg:flex">
          <Link
            href={ctaHref}
            className="rounded-full border border-light-100 bg-white px-4 py-2 font-heading text-sm font-semibold text-brand shadow-sm transition hover:bg-brand-50"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[minmax(223px,223px)_minmax(0,1fr)]">
          {/* ================= INTRO CARD ================= */}
          <div
            className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl p-4 sm:p-6 lg:flex-col lg:items-start lg:justify-center lg:gap-0 lg:p-7"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {/* soft gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-black/15" />

            {/* decoration (desktop) */}
            <Star
              aria-hidden
              className="pointer-events-none absolute -right-6 -top-6 hidden h-32 w-32 opacity-10 lg:block"
              strokeWidth={1.5}
            />

            <div className="relative">
              {eyebrow && (
                <p
                  className="text-eyebrow"
                  style={{ color: isDarkBg ? "#ffcf24" : "#8a6a00" }}
                >
                  {eyebrow}
                </p>
              )}
              <h2 className="mt-1 font-heading text-xl font-extrabold leading-tight sm:text-2xl lg:mt-3 lg:text-3xl">
                {title}
              </h2>
              {description && (
                <p className="mt-4 hidden max-w-[240px] text-input leading-tight opacity-90 lg:block">
                  {description}
                </p>
              )}
            </div>

            <Link
              href={ctaHref}
              className="relative inline-flex h-8 shrink-0 items-center justify-center rounded-xl bg-gold px-4 font-heading text-xs font-bold text-ink shadow-md transition hover:bg-gold-600 sm:h-11 sm:text-sm lg:mt-6 lg:h-10 lg:px-5"
            >
              {ctaLabel}
            </Link>
          </div>

          {/* ================= PRODUCTS (horizontal scroll) ================= */}
          <div
            className="
              flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-3 sm:gap-4
              [scrollbar-width:thin]
              [&::-webkit-scrollbar]:h-1.5
              [&::-webkit-scrollbar-track]:rounded-full
              [&::-webkit-scrollbar-track]:bg-light-100
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-brand/30
            "
          >
            {items.map((product) => (
              <div
                key={product.id}
                className="w-[172px] shrink-0 snap-start xs:w-[180px] sm:w-[210px] lg:w-[224px]"
              >
                <ProductCard tag={tag} product={product} />
                {/* <ProductCard 
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
