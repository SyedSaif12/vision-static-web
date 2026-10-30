import React from "react";
import Link from "next/link";
import { BaseImage } from "@/components";

const ClientCategory = ({ categoryData: categories }) => {
  return (
    <section className="w-11/12 mx-auto py-3 lg:py-8">
      <div className="w-full mx-auto">
        {/* Top right pill (desktop only) */}
        <div className="mb-3 hidden justify-end lg:flex">
          <Link
            href="/categories"
            className="rounded-full border border-light-100 bg-white px-4 py-1 font-heading text-sm font-semibold text-brand shadow-sm transition hover:bg-brand-50"
          >
            View all categories ›
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-3 lg:grid-cols-[minmax(260px,235px)_1fr]">
          {/* ================= INTRO CARD ================= */}
          <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 to-brand p-3 text-white lg:flex-col lg:items-start lg:justify-center lg:gap-0 lg:p-4">
            {/* decorative squares (desktop) */}
            <div className="pointer-events-none absolute -right-6 -top-6 hidden grid-cols-2 gap-3 opacity-20 lg:grid">
              <span className="h-16 w-16 rounded-2xl border-2 border-white" />
              <span className="h-16 w-16 rounded-2xl border-2 border-white" />
              <span className="h-16 w-16 rounded-2xl border-2 border-white" />
              <span className="h-16 w-16 rounded-2xl border-2 border-white" />
            </div>

            <div className="relative">
              <p className="text-eyebrow text-gold">Start here</p>
              <h2 className="mt-1 font-heading text-xl font-extrabold leading-tight sm:text-2xl lg:mt-2 lg:text-3xl">
                Shop by
                <br className="lg:hidden" /> category
              </h2>
              <p className="mt-2 hidden max-w-[240px] text-base leading-7 text-white/90 lg:block">
                12 categories, 1,000+ genuine products. Pick one to start.
              </p>
            </div>

            <Link
              href="/categories"
              className="relative inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-gold px-4 font-heading text-xs font-bold text-ink shadow-md transition hover:bg-gold-600 sm:h-11 sm:text-sm lg:mt-3 lg:h-12 lg:px-3"
            >
              View all categories ›
            </Link>
          </div>

          {/* ================= CATEGORY GRID ================= */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3 md:grid-cols-6 lg:gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.url}
                className="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-light-100 bg-white px-1 py-2 text-center transition duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
              >
                <BaseImage
                  src={cat.image}
                  alt={cat.title}
                  sizes="(min-width:1024px) 72px, (min-width:640px) 56px, 40px"
                  className="h-9 w-9 shrink-0 xs:h-10 xs:w-10 sm:h-14 sm:w-14 lg:h-[72px] lg:w-[72px]"
                  imgClassName="transition-transform duration-200 group-hover:scale-105"
                  fit="contain"
                />
                <span className="mt-1.5 w-full truncate font-heading text-[10px] font-semibold text-ink xs:text-[11px] sm:mt-3 sm:text-sm">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientCategory;
