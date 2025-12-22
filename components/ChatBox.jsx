"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import chatIcon from "@/assets/chaticon.png";

export default function ChatBox() {
  const [isTawkLoaded, setIsTawkLoaded] = useState(false);

  // Tawk.to script load - TawkTo.js
  useEffect(() => {
    const propertyId = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID;

    if (!propertyId || !widgetId) return;

    if (window.Tawk_API) {
      setIsTawkLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    script.onload = () => setIsTawkLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Chat click handler
  const handleChatClick = () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    } else {
      const propertyId = process.env.NEXT_PUBLIC_TAWK_TO_PROPERTY_ID;
      const widgetId = process.env.NEXT_PUBLIC_TAWK_TO_WIDGET_ID;
      window.open(`https://tawk.to/chat/${propertyId}/${widgetId}`, "_blank");
    }
  };

  return (
    <button
      className="fixed bottom-6 right-6 z-[9999] rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
      onClick={handleChatClick}
      title="Start Chat"
    >
      {/* <Image
        src={chatIcon}
        alt="Chat with us"
        className="w-[200px] h-[200px] object-contain"
      /> */}
    </button>
  );
}
