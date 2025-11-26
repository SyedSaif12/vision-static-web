"use client";
import { useEffect, useState } from "react";
import PopUpForm from "@/components/PopUpForm";

export default function PopupContactModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("popup_shown");

    if (!shown) {
      setOpen(true);
      sessionStorage.setItem("popup_shown", "true");
    }
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm 
      flex items-center justify-center z-[9999]"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative 
        w-full max-w-6xl 
        max-h-[100vh] flex flex-col bg-white rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-10 right-10 text-3xl text-black z-50"
        >
          ×
        </button>

        <div className="flex-grow overflow-y-auto p-6">
          <div className="flex h-full">
            <PopUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
