"use client";
import { useEffect, useState } from "react";

/** True only after the first client render – avoids hydration mismatches with persisted state. */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}
