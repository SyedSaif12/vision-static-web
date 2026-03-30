"use client";
import { useState } from "react";
import Image from "next/image";

export default function PromotionVideo({
  url = "https://www.youtube.com/embed/54Ej0JdngZI?si=jrXQfgO0BSwGZcX8",
}) {
  const [loadVideo, setLoadVideo] = useState(false);

  // URL se ID nikaalne ka logic
  const videoId = url.split("embed/")[1]?.split("?")[0] || "54Ej0JdngZI";

  // Thumbnail URL (High Quality)
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="w-full flex justify-center rounded-2xl z-50 overflow-hidden items-center h-64 md:h-96 bg-black relative">
      {!loadVideo ? (
        <div
          className="relative w-full h-full cursor-pointer group"
          onClick={() => setLoadVideo(true)}
        >
          <Image
            src={thumbnail}
            alt="Video Preview"
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Play Button Icon */}
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full"
          src={`${url}${url.includes("?") ? "&" : "?"}autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
