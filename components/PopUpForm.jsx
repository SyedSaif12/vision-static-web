"use client";
import React from "react";
import Image from "next/image";
import EnrollNow from "@/assets/enrollnow.png";

export default function PopUpForm() {
  return (
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
      {/* LEFT IMAGE */}
      <div className="w-full lg:w-[40%] h-full">
        <Image
          src={EnrollNow}
          alt="popup image"
          width={600}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="p-10 w-full lg:w-[55%]">
        <h2 className="text-3xl font-bold mb-10">
          Enroll Now for Latest Update
        </h2>

        <form className="space-y-10">
          {/* ROW 1 → Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                defaultValue="Doe@gmail.com"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
          </div>

          {/* ROW 2 → Phone + Product */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Which Product Are You Looking?
              </label>
              <input
                type="text"
                defaultValue="iPhone"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
          </div>

          {/* ROW 3 → Min + Max Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="text-sm font-medium">Min Price</label>
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Max Price</label>
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
