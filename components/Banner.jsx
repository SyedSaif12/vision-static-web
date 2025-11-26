"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SliderImage from "@/assets/bannerimages.png";

const images = [
  { id: 1, img: SliderImage },
  { id: 2, img: SliderImage },
  { id: 3, img: SliderImage },
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full pt-10">
      <div className="max-w-[1480px] mx-auto relative overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((item) => (
            <div key={item.id} className="min-w-full flex justify-center">
              <Image
                src={item.img}
                alt="Slide"
                width={1480}
                height={450}
                className="w-[1480px] max-w-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-4 space-x-2 pb-3">
          {images.map((_, i) => (
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
