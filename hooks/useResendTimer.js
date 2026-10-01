"use client";

import { useEffect, useState } from "react";

export default function useResendTimer(seconds = 60) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft]);

  const restart = () => {
    setTimeLeft(seconds);
    setRunning(true);
  };

  // 1. Minutes aur Seconds ko dynamically calculate karein
  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  // 2. Double digits format karne ke liye (e.g., 02:05)
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;

  const label = `${formattedMinutes}:${formattedSecs}`;

  return { timeLeft, running, restart, label };
}