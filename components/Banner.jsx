"use client";
import { useState, useEffect } from "react";
import { usePromotionsQuery } from "@/redux/promotions";
import Loading from "./Loading";
import SafeNextImage from "./NextImageComponent";

export default function Banner() {
  const { currentData } = usePromotionsQuery();
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  const images = Array.isArray(currentData?.data)
    ? currentData.data.flatMap((item, parentIndex) =>
        item.image.map((img, idx) => ({
          id: `${parentIndex}-${idx}`,
          fileUrl: img?.fileUrl,
          filename: img?.fileName,
          key: img?.key,
        })),
      )
    : [];

  const mobileimage = Array.isArray(currentData?.data)
    ? currentData.data.flatMap((item, parentIndex) =>
        item.mobileImage.map((img, idx) => ({
          id: `${parentIndex}-${idx}`,
          fileUrl: img?.fileUrl,
          filename: img?.fileName,
          key: img?.key,
        })),
      )
    : [];

  const finalImages = isMobile
    ? mobileimage.length > 0
      ? mobileimage
      : images // fallback
    : images;

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!finalImages?.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => {
        return Number((prev + 1) % finalImages?.length);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [finalImages?.length]);

  return (
    <div className="w-full pt-10">
      <div className="max-w-[1480px] mx-auto">
        {/* SLIDER */}
        <div className="h-44 lg:h-52 xl:h-72 relative overflow-hidden rounded-2xl">
          <div
            className="flex w-full h-full transition-transform duration-700"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {finalImages?.map((item) => (
              <div key={item.id} className="min-w-full h-full relative">
                <SafeNextImage
                  src={item.fileUrl}
                  alt={item.filename}
                  className="object-contain rounded-2xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* DOTS (Outside overflow container) */}
        <div className="flex items-center justify-center mt-4 space-x-2">
          {images?.map((_, i) => (
            <span
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
