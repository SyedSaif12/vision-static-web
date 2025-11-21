"use client";
import React from "react";
import PlayStation from "@/assets/playstation.png";
import Speaker from "@/assets/speaker.png";
import NewCollection from "@/assets/newcollection.png";
import LaptopGucci from "@/assets/laptopgucci.png";
import Image from "next/image";

export default function NewArrival() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold mb-6">New Arrival</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Featured Card - Left */}
        <div className="lg:col-span-1 lg:row-span-2">
          <div className="bg-black rounded-3xl overflow-hidden h-full flex flex-col justify-between p-8 relative">
            {/* Product Image Area */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <Image
                src={PlayStation}
                alt="PlayStation 5"
                className="h-64 w-auto"
              />
            </div>

            {/* Content */}
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">PlayStation 5</h2>
              <p className="text-sm text-gray-300 mb-6">
                Black and White version of the PS5 coming out on sale.
              </p>
              <button className="text-white font-semibold hover:underline">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - 3 Cards Stacked */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 auto-rows-max">
          {/* New Collections Card - Top */}
          <div className="sm:col-span-2">
            <div className="bg-black rounded-3xl overflow-hidden p-8 flex items-center justify-between gap-8">
              <div className="text-white flex-1">
                <h3 className="text-2xl font-bold mb-2">New Collections</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Featured woman collections that give you another vibe.
                </p>
                <button className="text-white font-semibold hover:underline">
                  Shop Now
                </button>
              </div>
              <div className="flex-1">
                <Image
                  src={NewCollection}
                  alt="New Collections"
                  className="h-40 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Speakers Card - Middle */}
          <div>
            <div className="bg-black rounded-3xl overflow-hidden p-8 h-full flex flex-col justify-between">
              <div className="flex-1 flex items-center justify-center mb-4">
                <Image src={Speaker} alt="Speakers" className="h-32 w-auto" />
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-1">Speakers</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Amazon wireless speakers
                </p>
                <button className="text-white font-semibold hover:underline">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Laptop Card - Bottom */}
          <div>
            <div className="bg-black rounded-3xl overflow-hidden p-8 h-full flex flex-col justify-between">
              <div className="flex-1 flex items-center justify-center mb-4">
                <Image src={LaptopGucci} alt="Laptop" className="h-32 w-auto" />
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-1">Laptop</h3>
                <p className="text-sm text-gray-400 mb-4">
                  GUCCI INTENSE OUD EDP
                </p>
                <button className="text-white font-semibold hover:underline">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
