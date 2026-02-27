"use client";
import { useState, useEffect } from "react";
import { usePromotionsQuery } from "@/redux/promotions";
import Loading from "./Loading";
import SafeNextImage from "./NextImageComponent";

export default function Banner() {
  const { currentData } = usePromotionsQuery();
  const imagesData =
    Array.isArray(currentData?.data) &&
    currentData?.data?.flatMap((item) => item.image);

  const images = Array.isArray(imagesData)
    ? imagesData?.map((item, idx) => ({
        id: idx + 1,
        fileUrl: item.fileUrl,
        filename: item.fileName,
        key: item.key,
      }))
    : [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => {
        return Number((prev + 1) % images?.length);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [images?.length]);

  return (
    <div className="w-full pt-10">
      <div className="max-w-[1480px] mx-auto">
        {/* SLIDER */}
        <div className="h-48 sm:h-72 relative overflow-hidden rounded-2xl">
          <div
            className="flex w-full h-full transition-transform duration-700"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images?.map((item) => (
              <div key={item.id} className="min-w-full h-full relative">
                <SafeNextImage
                  src={item.fileUrl}
                  alt={item.filename}
                  className="object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DOTS (Outside overflow container) */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          {images?.map((_, i) => (
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
