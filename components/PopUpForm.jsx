"use client";
import React from "react";
import Image from "next/image";
import EnrollNow from "@/assets/enrollnow.png";

export default function PopUpForm() {
  return (
    <div className="w-full max-w-8x1 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
      {/* LEFT IMAGE PANEL */}
      <div className="w-full lg:w-[40%] h-full">
        <Image
          src={EnrollNow}
          alt="popup image"
          width={600}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="p-10 w-full lg:w-[60%]">
        <h2 className="text-3xl font-bold mb-6">
          Enroll Now for Latest Update
        </h2>

        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm">First Name</label>
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>

            <div>
              <label className="text-sm">Last Name</label>
              <input
                type="text"
                defaultValue="Doe"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>

            <div>
              <label className="text-sm">Phone Number</label>
              <input
                type="text"
                defaultValue="+1 012 3456 789"
                className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold block mb-2">
              Select Subject?
            </label>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {Array(4)
                .fill("General Inquiry")
                .map((label, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="subject"
                      className="accent-blue-600"
                    />
                    {label}
                  </label>
                ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Message</label>
            <textarea
              placeholder="Write your message.."
              className="w-full border-b border-gray-300 focus:border-black outline-none py-2 h-24 resize-none"
            ></textarea>
          </div>

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
