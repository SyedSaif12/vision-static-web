"use client";
import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    text: "My first order arrived today in perfect condition. From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch. Such great service. I look forward to shopping on your site in the future and would highly recommend it.",
    author: "Tama Brown",
  },
  {
    id: 2,
    text: "Excellent service! My package arrived on time and the quality is top-notch. Highly satisfied.",
    author: "Sarah Johnson",
  },
  {
    id: 3,
    text: "Amazing customer support and fast delivery. Would definitely shop here again.",
    author: "Michael Lee",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full bg-[#F5F7FF] py-16 rounded-3xl">
      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Quote Icon */}
        <div className="text-6xl text-black font-serif">“</div>

        {/* Testimonial Text */}
        <p className="text-gray-700 leading-relaxed mt-4 text-[15px]">
          {testimonials[index].text}
        </p>

        {/* Author */}
        <p className="text-right mt-6 text-sm text-gray-600">
          — {testimonials[index].author}
        </p>

        {/* Slider Dots */}
        <div className="flex items-center justify-center mt-6 space-x-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === i ? "bg-blue-600 w-3" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
