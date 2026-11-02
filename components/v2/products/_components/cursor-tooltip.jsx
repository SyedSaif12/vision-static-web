"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const OFFSET = 16; // cursor se doori (px)
const PAD = 8; // screen ke kinare se doori (px)

/**
 * Wrapper: andar jo bhi children hon, un par hover karne se
 * tooltip mouse ke saath saath chalta hai.
 * Touch devices par tooltip nahi dikhta.
 */
export function CursorTooltip({ content, className = "", children }) {
  const tipRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Mouse ki position par tooltip rakho (re-render ke bagair, smooth)
  const place = (x, y) => {
    const el = tipRef.current;
    if (!el) return;
    const { offsetWidth: w, offsetHeight: h } = el;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let left = x + OFFSET;
    let top = y + OFFSET;

    // Screen se bahar jaye to doosri taraf flip karo
    if (left + w + PAD > vw) left = x - w - OFFSET;
    if (top + h + PAD > vh) top = y - h - OFFSET;

    el.style.transform = `translate3d(${Math.max(PAD, left)}px, ${Math.max(
      PAD,
      top,
    )}px, 0)`;
  };

  const handleEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    setOpen(true);
    // tooltip render hone ke baad position set karo
    requestAnimationFrame(() => place(e.clientX, e.clientY));
  };

  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    place(e.clientX, e.clientY);
  };

  const handleLeave = () => setOpen(false);

  return (
    <>
      <div
        className={className}
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {children}
      </div>

      {mounted &&
        open &&
        content &&
        createPortal(
          <div
            ref={tipRef}
            role="tooltip"
            className="pointer-events-none fixed left-0 top-0 z-[9999] w-max max-w-[300px] rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium leading-snug text-white shadow-lg"
            style={{ transform: "translate3d(-9999px,-9999px,0)" }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}