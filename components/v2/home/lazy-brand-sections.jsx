"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { loadBrandSections } from "./actions";
import { BrandSectionsSkeleton } from "./skeleton";

export function LazyBrandSections({ rootMargin = "400px" } ) {
  const hostRef = useRef(null);
  const started = useRef(false);
  const [content, setContent] = useState(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    if (started.current) return;
    started.current = true;
    setFailed(false);
    try {
      setContent(await loadBrandSections());
    } catch {
      started.current = false;
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      void load();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void load();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [load, rootMargin]);

  return (
    <div ref={hostRef}>
      {content ??
        (failed ? (
          <div className="mx-auto w-11/12 py-16 text-center">
            <p className="text-sm text-slate-600">Can't Load brand section.</p>
            <button
              type="button"
              onClick={() => load()}
              className="mt-4 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-300"
            >
              try again
            </button>
          </div>
        ) : (
          <BrandSectionsSkeleton />
        ))}
    </div>
  );
}
