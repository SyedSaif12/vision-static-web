"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
  maxHeight = "80dvh",
  className = "",
}) {
  const [mounted, setMounted] = useState(false); // DOM me hai ya nahi
  const [show, setShow] = useState(false); // animation state
  const [dragY, setDragY] = useState(0);
  const startY = useRef(null);

  // open / close animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setShow(true)),
      );
      return () => cancelAnimationFrame(id);
    }
    setShow(false);
    const t = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(t);
  }, [open]);

  // body scroll lock + Escape key
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, onClose]);

  // swipe-down to close (handle / header par)
  const onPointerDown = (e) => {
    startY.current = e.clientY;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (startY.current === null) return;
    setDragY(Math.max(0, e.clientY - startY.current));
  };
  const onPointerUp = () => {
    if (startY.current === null) return;
    startY.current = null;
    if (dragY > 100) onClose?.();
    setDragY(0);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* sheet */}
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col rounded-t-3xl bg-white shadow-2xl ${
          dragY ? "" : "transition-transform duration-300 ease-out"
        } ${className}`}
        style={{
          maxHeight,
          transform: show ? `translateY(${dragY}px)` : "translateY(100%)",
        }}
      >
        {/* handle + header */}
        <div
          className="shrink-0 touch-none select-none px-5 pt-3"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-gray-300" />
          {(title || onClose) && (
            <div className="flex items-center justify-between pb-3">
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-slate-700"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* content: height auto, max tak pohanchy to scroll */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
