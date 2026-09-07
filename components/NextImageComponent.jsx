"use client";

import Image from "next/image";
import blankImage from "@/assets/blank_image.jpg";
import { useEffect, useState } from "react";

const SafeNextImage = ({ src = blankImage, alt, className }, props) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    if (typeof src === 'string') {
      setImgSrc(encodeURI(src?.trim()));
    } else if (src) {
      setImgSrc(src);
    } else {
      setImgSrc(blankImage);
    }
  }, [src]);
  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-400 dark:bg-zinc-400 animate-pulse z-10" />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        fill
        sizes={props?.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"}
        className={`transition-opacity duration-500
          ${
            isLoading ? "opacity-0" : "opacity-100"
          }
          ${className}`}
        onLoad={() => setIsLoading(false)}
        // priority
        // fetchPriority="high"
        onError={() => {
          setImgSrc(blankImage);
          setIsLoading(false);
        }}
      // unoptimized={true}
      />
    </>
  );
};

export default SafeNextImage;
