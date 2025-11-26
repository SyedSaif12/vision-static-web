"use client";
import Image from "next/image";
import chatIcon from "@/assets/chaticon.png";

export default function ChatBox() {
  return (
    <button className="fixed bottom-6 right-6 z-[9999] rounded-full">
      <Image
        src={chatIcon}
        alt="Chat Icon"
        className="w-[200px] h-[200px] object-contain"
      />
    </button>
  );
}
