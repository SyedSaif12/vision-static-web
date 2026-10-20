"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { BaseImage } from "@/components";
import { getReadableTextColor, formatPrice } from "@/lib/utils";
import CartButton from "../cart/CartButton";

const ProductCard = ({
  product,
  isWishlisted = false,
  onToggleWishlist, // (product) => void
  onAddToCart, // (product) => void
  className = "",
}) => {
  const {
    slug,
    brand,
    name,
    subtitle,
    image,
    rating,
    reviewCount,
    price,
    currency,
    tag, // { label: "NEW", color: "#1a56db" } | null
  } = product;

  const href = `/product/${slug}`;

  return (
    <article
      className={`group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-light-100 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {/* ---------- Image ---------- */}
      <div className="relative bg-light-200 p-3">
        <Link href={href} aria-label={name} className="block">
          <BaseImage
            src={image}
            alt={name}
            fit="contain"
            sizes="(min-width:1024px) 224px, (min-width:640px) 210px, 172px"
            className="aspect-[4/3] w-full"
            imgClassName="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Dynamic tag */}
        {tag?.label && (
          <span
            className="absolute left-3 top-3 rounded-md px-2 py-1 font-heading text-[10px] font-bold uppercase leading-none tracking-wide"
            style={{
              backgroundColor: tag.color || "#1a56db",
              color: getReadableTextColor(tag.color || "#1a56db"),
            }}
          >
            {tag.label}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Add to wishlist"
          aria-pressed={isWishlisted}
          onClick={() => onToggleWishlist?.(product)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:bg-white"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-red text-red" : "text-faint"
            }`}
          />
        </button>
      </div>

      {/* ---------- Body ---------- */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link href={href} className="block">
          {brand && (
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-faint">
              {brand}
            </p>
          )}
          <h3 className="mt-1 line-clamp-2 font-heading text-sm font-bold leading-snug text-ink sm:text-base">
            {name}
          </h3>
          {subtitle && (
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted sm:text-[13px]">
              {subtitle}
            </p>
          )}
        </Link>

        {/* Rating */}
        {rating ? (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i <= Math.round(rating)
                      ? "fill-gold text-gold"
                      : "fill-light-100 text-light-100"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted">
              {rating}
              {reviewCount ? ` (${reviewCount})` : ""}
            </span>
          </div>
        ) : null}

        {/* Price + cart (hamesha neeche) */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="font-heading text-sm font-extrabold text-ink sm:text-base">
            {formatPrice(price, currency)}
          </span>
          <CartButton product={product} />
          {/* <button
            type="button"
            aria-label={`Add ${name} to cart`}
            onClick={() => onAddToCart?.(product)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand transition hover:bg-brand hover:text-white sm:h-10 sm:w-10"
          >
            <ShoppingCart className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </button> */}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
