import React from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import CallIcon from "@/assets/callicon.png";
import LocationIcon from "@/assets/locationicon.png";
import TwitterIcon from "@/assets/twitericon.png";

export default function ContactPage() {
  return (
    <>
      <HeroSection />

      <div className="min-h-screen w-full bg-gray-100 p-6 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
          {/* LEFT PANEL */}
          <div className="bg-[#0A1A54] text-white p-10 relative w-full lg:w-[40%]">
            <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
            <p className="text-sm mb-10">Say something to start a live chat!</p>

            {/* Contact Info List */}
            <div className="flex flex-col gap-8">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <Image src={CallIcon} alt="phone" className="w-6 h-6" />
                <p>(00) 1234 5678</p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <span className="text-xl">✉️</span>
                <p>contact@visiontech.com.pk</p>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <Image src={LocationIcon} alt="location" className="w-6 h-6" />
                <p>
                  Shop# 29, Ground Floor, SAASI Arcade, Block-7, Clifton Near
                  Sohny Sweets, Karachi, Pakistan.
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 absolute bottom-10 left-10">
              <Image
                src={TwitterIcon}
                alt="twitter"
                className="w-6 h-6 cursor-pointer"
              />
              <span className="text-xl cursor-pointer">📷</span>
              <span className="text-xl cursor-pointer">📷</span>
            </div>

            {/* Background Circles */}
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-800 rounded-full opacity-40"></div>
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-blue-900 rounded-full opacity-40"></div>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-10 w-full lg:w-[70%]">
            <form className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm ">First Name</label>
                  <input
                    type="text"
                    className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm ">Email</label>
                  <input
                    type="email"
                    className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Phone Number</label>
                  <input
                    type="text"
                    defaultValue="+1 012 3456 789"
                    className="w-full border-b border-gray-300 focus:border-black outline-none py-2"
                  />
                </div>
              </div>

              {/* Subject */}
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

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-gray-300">
                  Message
                </label>
                <textarea
                  placeholder="Write your message.."
                  className="w-full border-b border-gray-300 focus:border-black outline-none py-2 h-24 resize-none"
                ></textarea>
              </div>

              {/* Submit */}
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
      </div>
    </>
  );
}
