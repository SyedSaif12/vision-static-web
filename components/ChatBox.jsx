"use client";
import { useState } from "react";
import Script from "next/script";

export default function ChatBox() {
  const [isTawkLoaded, setIsTawkLoaded] = useState(false);

  const propertyId = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID;

  const handleChatClick = () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    } else {
      window.open(`https://tawk.to/chat/${propertyId}/${widgetId}`, "_blank");
    }
  };

  if (!propertyId || !widgetId) return null;

  return (
    <>
      {/* 1. Script Optimization */}
      <Script
        src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
        strategy="lazyOnload"
        onLoad={() => setIsTawkLoaded(true)}
      />

      {/* 2. Button UI */}
      <button
        className="fixed bottom-6 right-6 z-[9999] rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
        onClick={handleChatClick}
        title="Start Chat"
      ></button>
    </>
  );
}
