// components/ui/BaseImage.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

const fitClass = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

const BaseImage = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  fallbackClassName = "",
  fallbackIconClassName = "",
  fallback,
  fit = "contain",
  showSkeleton = true,
  sizes = "100vw",
  onError,
  onLoad,
  ...rest
}) => {
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // src badle to state reset
  useEffect(() => {
    setFailed(!src);
    setLoaded(false);
  }, [src]);

  // Hydration se pehle error ho chuka ho to onError miss ho jata hai, isliye check
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete) {
      if (el.naturalWidth === 0) setFailed(true);
      else setLoaded(true);
    }
  }, [src]);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-light-200 text-faint ${className} ${fallbackClassName}`}
      >
        {fallback ?? (
          <ImageOff
            className={`h-1/3 w-1/3 max-h-10 max-w-10 ${fallbackIconClassName}`}
            strokeWidth={1.5}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showSkeleton && !loaded && (
        <div className="absolute inset-0 animate-pulse bg-light-200" />
      )}

      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`${fitClass[fit]} transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setFailed(true);
          onError?.(e);
        }}
        {...rest}
      />
    </div>
  );
};

export default BaseImage;
