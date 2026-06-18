"use client";

import Image from "next/image";
import blankImage from "@/assets/blank_image.jpg";
import { useEffect, useState } from "react";

const SafeNextImage = ({ src = blankImage, alt, className }, props) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    if (typeof src === 'string') {
      setImgSrc(encodeURI(src?.trim()));
    } else if (src) {
      setImgSrc(src);
    } else {
      setImgSrc(blankImage);
    }
  }, [src]);
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      priority
      onError={() => setImgSrc(blankImage)}
      fetchPriority="high"
    />
  );
};

export default SafeNextImage;
