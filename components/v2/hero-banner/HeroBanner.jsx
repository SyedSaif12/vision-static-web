import React from "react";
import {
  Laptop,
  Smartphone,
  Refrigerator,
  Gamepad2,
  Headphones,
  Mouse,
  Watch,
  Camera,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const tileBase =
  "flex min-h-0 min-w-0 flex-col items-center justify-center rounded-2xl bg-white px-0.5 py-2 text-center transition duration-200 hover:-translate-y-1 hover:shadow-xl sm:px-2 sm:py-3";
const iconCls = "mb-1.5 h-6 w-6 text-brand sm:mb-3 sm:h-7 sm:w-7 xl:h-8 xl:w-8";
const labelCls =
  "font-heading text-[9px] font-bold leading-tight text-ink xs:text-[11px] sm:text-xs xl:text-sm";

const HeroBanner = () => {
  return (
    <section className="w-11/12 mx-auto py-5">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-brand-700 to-brand px-5 py-8 sm:px-8 sm:py-10 lg:h-[calc(100vh-220px)] lg:max-h-[720px] lg:min-h-[560px] lg:px-12 lg:py-10 xl:px-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:h-full lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* ================= LEFT ================= */}
          <div className="flex flex-col justify-center text-white">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] sm:text-xs">
              Pakistan&apos;s Managed Tech Marketplace
            </p>

            <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl 2xl:text-[64px]">
              Everything tech,
              <br />
              <span className="text-gold">under one roof.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
              Laptops to appliances, brand-new to Aitebar-certified refurb.
              Browse the whole range in one trusted place.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/products`}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-gold px-6 font-poppins text-sm font-bold text-ink shadow-lg transition hover:bg-gold-600 sm:h-14"
              >
                Shop all products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 font-poppins text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:h-14"
              >
                Talk to an expert
              </button>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="rounded-3xl border border-white/25 bg-white/10 p-3 backdrop-blur-sm sm:p-4 lg:h-full lg:max-h-[480px] xl:max-h-none">
            {/*
              Mobile / tablet : 4 cols x 3 rows (fixed row heights)
              Desktop (lg+)   : 4 cols x 4 rows
            */}
            <div className="grid grid-cols-4 grid-rows-[118px_82px_82px] gap-1 sm:grid-rows-[150px_104px_104px] sm:gap-2 md:gap-3 lg:h-full lg:grid-rows-4">
              {/* Laptops */}
              <div
                className={`${tileBase} col-span-2 col-start-1 row-span-1 row-start-1 lg:row-span-2`}
              >
                <Laptop className={iconCls} strokeWidth={1} />
                <span className={labelCls}>Laptops &amp; PCs</span>
              </div>

              {/* Mobiles */}
              <div
                className={`${tileBase} col-span-1 col-start-3 row-span-1 row-start-1 lg:row-span-2`}
              >
                <Smartphone className={iconCls} strokeWidth={1} />
                <span className={labelCls}>Mobiles</span>
              </div>

              {/* Appliances */}
              <div
                className={`${tileBase} col-span-1 col-start-4 row-span-1 row-start-1 lg:row-span-2`}
              >
                <Refrigerator className={iconCls} strokeWidth={1} />
                <span className={labelCls}>Appliances</span>
              </div>

              {/* Gaming */}
              <div
                className={`${tileBase} col-span-1 col-start-1 row-span-1 row-start-2 lg:row-start-3`}
              >
                <Gamepad2 className={iconCls} strokeWidth={1} />
                <span className={labelCls}>Gaming</span>
              </div>

              {/* Audio */}
              <div
                className={`${tileBase} col-span-1 col-start-2 row-span-1 row-start-2 lg:row-start-3`}
              >
                <Headphones className={iconCls} strokeWidth={1} />
                <span className={labelCls}>Audio</span>
              </div>

              {/* Accessories */}
              <div
                className={`${tileBase} col-span-2 col-start-3 row-span-1 row-start-2 lg:row-start-3`}
              >
                <Mouse className={iconCls} strokeWidth={1} />
                <span className={labelCls}>Accessories</span>
              </div>

              {/* Wearables */}
              <div
                className={`${tileBase} col-span-1 col-start-1 row-span-1 row-start-3 lg:row-start-4`}
              >
                <Watch className={iconCls} strokeWidth={1} />
                <span className={labelCls}>Wearables</span>
              </div>

              {/* Cameras */}
              <div
                className={`${tileBase} col-span-1 col-start-2 row-span-1 row-start-3 lg:row-start-4`}
              >
                <Camera className={iconCls} strokeWidth={1} />
                <span className={labelCls}>Cameras</span>
              </div>

              {/* 40+ */}
              <div className="col-span-2 col-start-3 row-span-1 row-start-3 flex min-h-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-gold to-[#ffe27a] px-3 text-center lg:row-start-4">
                <span className="font-heading text-2xl font-extrabold text-ink sm:text-3xl xl:text-4xl">
                  40+
                </span>
                <span className="mt-1 text-[11px] font-semibold leading-tight text-ink sm:text-xs">
                  categories &amp; growing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
