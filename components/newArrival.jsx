"use client";
import React from "react";
import PlayStation from "@/assets/playstation.png";
import Speaker from "@/assets/speaker.png";
import NewCollection from "@/assets/newcollection.png";
import LaptopGucci from "@/assets/laptopgucci.png";
import Image from "next/image";

export default function NewArrival() {
  return (
    <section className="">
      <div className="w-full h-full flex items-center">
        <h2 className="w-full text-2xl sm:text-3xl my-10 font-semibold">
          New Arrival
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
        {/* Large Featured Card - Left */}
        <div className="lg:col-span-1 lg:row-span-2">
          <div className="relative bg-black rounded-3xl overflow-hidden h-[300px] sm:h-[450px] md:h-[570px] p-6 flex flex-col justify-end">
            <Image
              src={PlayStation}
              alt="PlayStation 5"
              fill
              className="object-cover md:object-contain opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative text-white max-w-sm p-2 sm:p-4">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-1 sm:mb-2">
                PlayStation 5
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-1 sm:mb-4">
                Black and White version of the PS5 coming out on sale.
              </p>
              <button className="text-white font-semibold hover:underline text-sm sm:text-base">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
          {/* New Collections Card */}
          <div className="sm:col-span-2">
            <div className="relative bg-black rounded-3xl overflow-hidden h-[200px] sm:h-[250px] md:h-[300px] p-6 flex items-end">
              <Image
                src={NewCollection}
                alt="New Collections"
                fill
                className="object-cover md:object-contain object-right opacity-90"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative text-white max-w-sm p-2 sm:p-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold sm:mb-2">
                  New Collections
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 sm:mb-4">
                  Featured woman collections that give you another vibe.
                </p>
                <button className="text-white font-semibold hover:underline text-sm sm:text-base">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Speakers & Laptop Cards Side by Side on All Screens */}
          <div className="w-full col-span-full grid grid-cols-2 gap-2 md:gap-4 justify-end">
            {/* Speakers Card */}
            <div>
              <div className="relative bg-black rounded-3xl overflow-hidden h-[200px] sm:h-[220px] md:h-[250px] p-6 flex flex-col justify-end">
                <Image
                  src={Speaker}
                  alt="Speakers"
                  fill
                  className="object-cover md:object-contain object-center opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative text-white text-start sm:p-4">
                  <h3 className="text-md sm:text-xl md:text-2xl font-semibold sm:mb-1">
                    Speakers
                  </h3>
                  <p className="text-[10px] sm:text-sm md:text-base text-gray-300 sm:mb-2">
                    Amazon wireless speakers
                  </p>
                  <button className="text-white font-semibold hover:underline text-[12px] sm:text-base">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Laptop Card */}
            <div>
              <div className="relative bg-black rounded-3xl overflow-hidden h-[200px] sm:h-[220px] md:h-[250px] p-6 flex flex-col justify-end">
                <Image
                  src={LaptopGucci}
                  alt="Laptop"
                  fill
                  className="object-cover md:object-contain object-center opacity-90"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative text-white sm:p-4">
                  <h3 className="text-md sm:text-xl md:text-2xl font-semibold sm:mb-1">
                    Laptop
                  </h3>
                  <p className="text-[10px] sm:text-sm md:text-base text-gray-300 sm:mb-2">
                    Branded Laptops
                  </p>
                  <button className="text-white font-semibold hover:underline text-[12px] sm:text-base">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* End Speakers & Laptop Side by Side */}
        </div>
      </div>
    </section>
  );
}
