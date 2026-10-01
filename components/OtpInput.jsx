"use client";

import { useRef } from "react";

export default function OtpInput({ value = "", onChange, autoFocus }) {
  const refs = useRef([]);
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  const setDigit = (i, d) => {
    const next = [...digits];
    next[i] = d;
    onChange(next.join(""));
  };

  const handlePaste = (e, i) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    onChange(pasted.padEnd(6, "").slice(0, 6));

    // Focus last filled box (ya agar 6 se kam ho to next empty box)
    const nextIndex = Math.min(pasted.length, 5);
    refs.current[nextIndex]?.focus();
  };

  return (
    <div className="mb-2 flex justify-between gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          autoFocus={autoFocus && i === 0}
          value={d}
          maxLength={1}
          inputMode="numeric"
          className="aspect-square w-full max-w-[54px] rounded-xl border-[1.6px] border-slate-200 text-center font-heading text-xl font-extrabold outline-none focus:border-brand focus:ring-4 focus:ring-brand-50"
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "").slice(-1);
            setDigit(i, v);
            if (v && refs.current[i + 1]) refs.current[i + 1].focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i] && refs.current[i - 1]) {
              refs.current[i - 1].focus();
            }
          }}
          onPaste={(e) => handlePaste(e, i)}
        />
      ))}
    </div>
  );
}
