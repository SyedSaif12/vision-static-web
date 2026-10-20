import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, ChevronRight } from "lucide-react";
import { getReadableTextColor } from "@/lib/utils";
import { ProductCard } from "../products/_components/product-card";
import { getCollectionProducts } from "@/lib/fetchProducts";

const Refurbished = async () => {
    const refurbished = await getCollectionProducts("refurbished", 1)

    return (
        <div className="bg-primary-200 md:mt-20 mx-auto">
            <RefurbishedShowCase
             products={refurbished.products} />
        </div>
    )
}

export default Refurbished


const DEFAULT_FEATURES = [
    "Tested by Aitebaar Squad",
    "Video of your exact unit before dispatch",
    "3-month WeGot warranty, extend to 1 year",
    "65W charger included",
];

const RefurbishedShowCase = ({
    eyebrow = "CERTIFIED USED BY AITEBAAR SQUAD",
    title = "Refurbished, and actually trustworthy.",
    description = "Every used device is fully tested by Aitebaar Squad to one clear standard, and backed by warranty. The savings of used, without the guesswork.",
    bgColor = "#1053d4", // Default Vibrant Blue from Image
    ctaLabel = "View all refurbished",
    ctaHref = "/products?tag=refurbished",
    products = [],
    features = DEFAULT_FEATURES,
    maxItems = 12,
    tag = { name: "Certified", color: "#0F1830" },
    className = "",
}) => {
    const items = products.slice(0, maxItems);

    // Dynamic text coloring based on dark/light background
    const textColor = getReadableTextColor(bgColor);

    return (
        <section className={`w-full py-6 lg:py-10 ${className}`}>
            <div className="mx-auto w-11/12 my-2">

                {/* Top Right Desktop Link */}
                <div className="mb-4 hidden justify-end lg:flex">
                    <Link
                        href={ctaHref}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-50/20"
                    >
                        {ctaLabel}
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Main Section Box */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] lg:items-stretch">

                    {/* ================= LEFT INTRO CARD ================= */}
                    <div
                        className="relative flex flex-col justify-between overflow-hidden rounded-3xl shadow-sm"
                        style={{ color: textColor }}
                    >
                        {/* Subtle Gradient Overlay */}
                        <div className="pointer-events-none absolute inset-0" />

                        <div className="relative z-10">
                            {/* Eyebrow Badge */}
                            {eyebrow && (
                                <div className="mb-3 inline-block rounded-md bg-amber-400/20 px-2.5 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-300 border border-amber-400/30">
                                    {eyebrow}
                                </div>
                            )}

                            {/* Title */}
                            <h2 className="text-2xl font-black leading-tight sm:text-3xl xl:text-4xl">
                                {title}
                            </h2>

                            {/* Description */}
                            {description && (
                                <p className="mt-3 text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
                                    {description}
                                </p>
                            )}

                            {/* Checklist Features */}
                            {features && features.length > 0 && (
                                <div className="mt-6 space-y-2.5">
                                    {features.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm text-white">
                                                <Check className="h-3.5 w-3.5 stroke-[3]" />
                                            </span>
                                            <span className="opacity-95">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Bottom Buttons/Links inside Left Box */}
                        <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3 pt-2">
                            <button className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/25 border border-white/20">
                                <ShieldCheck className="h-4 w-4" />
                                Aitebaar certified
                            </button>

                            <Link
                                href={ctaHref}
                                className="inline-flex items-center gap-1 text-xs font-bold text-white opacity-90 transition hover:opacity-100 hover:underline underline-offset-4"
                            >
                                How we certify ›
                            </Link>
                        </div>
                    </div>

                    {/* ================= RIGHT PRODUCTS (Horizontal Scroll) ================= */}
                    <div className="relative min-w-0">
                        <div
                            className="
                flex gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain pb-4 pt-1 snap-x snap-mandatory
                [scrollbar-width:thin]
                [&::-webkit-scrollbar]:h-1.5
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:bg-slate-100
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-blue-300
              "
                        >
                            {items.map((product) => (
                                <div
                                    key={product.id || product._id}
                                    className="w-[210px] xs:w-[230px] sm:w-[250px] lg:w-[260px] shrink-0 snap-start"
                                >
                                    <ProductCard tag={tag} product={product} />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Mobile View All Button */}
                <div className="mt-4 flex justify-center lg:hidden">
                    <Link
                        href={ctaHref}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-6 py-2.5 text-xs font-bold text-white shadow-sm transition"
                    >
                        {ctaLabel}
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>

            </div>
        </section>
    );
};
