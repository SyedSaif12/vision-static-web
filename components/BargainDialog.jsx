"use client";
import React from "react";

const BargainDialog = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Bargain on Price
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          At VisionTech we challenge all the websites for the lowest price. We
          can ensure that we don't just meet the price but beat it for you. So
          go on right ahead, let us know the details and give us some hours.
          We'll get you a better rate and great price overall! Happy
          challenging! Love, VisionTech.
        </p>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full bg-gray-100 rounded-full px-5 py-3 text-gray-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Enter Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="w-full bg-gray-100 rounded-full px-5 py-3 text-gray-600 outline-none"
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">City</label>
            <select className="w-full bg-gray-100 rounded-full px-5 py-3 text-gray-500 outline-none">
              <option>Select your city</option>
              <option>Karachi</option>
              <option>Lahore</option>
              <option>Islamabad</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="Enter phone number (Format 0332-2861735)"
              className="w-full bg-gray-100 rounded-full px-5 py-3 text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={onClose}
            className="px-10 py-3 rounded-full border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            Cancel
          </button>

          <button className="px-10 py-3 rounded-full bg-blue-700 text-white font-medium hover:bg-blue-800 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BargainDialog;
