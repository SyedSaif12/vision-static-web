"use client";
import { useRef, useCallback } from "react";

export default function useDragScroll() {
  const ref = useRef(null);
  const state = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });

  const onPointerDown = useCallback((e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    state.current = {
      down: true,
      startX: e.clientX,
      scrollLeft: ref.current.scrollLeft,
      moved: false,
    };
  }, []);

  const onPointerMove = useCallback((e) => {
    const s = state.current;
    if (!s.down || !ref.current) return;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 5) s.moved = true;
    ref.current.scrollLeft = s.scrollLeft - dx;
  }, []);

  const end = useCallback(() => {
    state.current.down = false;
  }, []);

  // drag ke baad click ignore karne ke liye
  const onClickCapture = useCallback((e) => {
    if (state.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      state.current.moved = false;
    }
  }, []);

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: end,
      onPointerLeave: end,
      onClickCapture,
    },
  };
}
