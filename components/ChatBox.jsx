"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Script from "next/script"; // 🟢 Next.js ka recommended script handler

export default function ChatBox() {
  const { toggle } = useSelector((state) => state.toggle);
  const [isTawkReady, setIsTawkReady] = useState(false);

  const propertyId = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID;

  // 1. Redux toggle state (Cart Open/Close) ko Tawk.to ke sath sync karne ka effect
  useEffect(() => {
    if (!isTawkReady || !window.Tawk_API) return;

    if (toggle) {
      // Jab cart khule, chat box ko background se bhi mukammal gayab kar do
      if (typeof window.Tawk_API.hideWidget === "function") {
        window.Tawk_API.hideWidget();
      }
    } else {
      // Jab cart band ho, tab bhi default widget hidden rahe (kyunke tumhara apna custom button hai)
      if (typeof window.Tawk_API.hideWidget === "function") {
        window.Tawk_API.hideWidget();
      }
    }
  }, [toggle, isTawkReady]);

  // 2. Click Handler jo chat window ko bara karega
  const handleChatClick = () => {
    if (
      isTawkReady &&
      window.Tawk_API &&
      typeof window.Tawk_API.maximize === "function"
    ) {
      window.Tawk_API.maximize(); // Chat window ko open kar dega
    } else {
      window.open(`https://tawk.to/chat/${propertyId}/${widgetId}`, "_blank");
    }
  };

  if (!propertyId || !widgetId) return null;

  return (
    <>
      {/* 🟢 Next.js Recommended Way to Load Third-Party Scripts */}
      <Script
        src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
        strategy="lazyOnload" // Page load hone ke baad araam se load hoga, performance down nahi karega
        onLoad={() => {
          // Global object initialize karein
          window.Tawk_API = window.Tawk_API || {};

          // Jab Tawk.to poori tarah ready ho jaye
          window.Tawk_API.onLoad = function () {
            setIsTawkReady(true);
            window.Tawk_API.hideWidget(); // Pehle hi lamhe unka default bubble hide kar do
          };

          // IMPORTANT: Agar user chat window close (minimize) kare, toh unka default icon wapas na aaye
          window.Tawk_API.onChatMinimized = function () {
            window.Tawk_API.hideWidget();
          };
        }}
      />

      {/* 3. Tumhara Apna Custom Button UI */}
      {!toggle && (
        <button
          className="fixed bottom-0 right-0 z-[9999] w-16 h-16 flex justify-center items-center bg-[#1AA94E] m-5 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={handleChatClick}
          title="Start Chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            height="32px"
            width="32px"
            role="img"
            alt="Chat icon"
          >
            <title>Opens Chat</title>
            <path
              fill="white"
              d="M400 26.2c-193.3 0-350 156.7-350 350 0 136.2 77.9 254.3 191.5 312.1 15.4 8.1 31.4 15.1 48.1 20.8l-16.5 63.5c-2 7.8 5.4 14.7 13 12.1l229.8-77.6c14.6-5.3 28.8-11.6 42.4-18.7C672 630.6 750 512.5 750 376.2c0-193.3-156.7-350-350-350zm211.1 510.7c-10.8 26.5-41.9 77.2-121.5 77.2-79.9 0-110.9-51-121.6-77.4-2.8-6.8 5-13.4 13.8-11.8 76.2 13.7 147.7 13 215.3.3 8.9-1.8 16.8 4.8 14 11.7z"
            ></path>
          </svg>
        </button>
      )}
    </>
  );
}
