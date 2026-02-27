"use client";

import Image from "next/image";
import blankImage from "@/assets/blank_image.jpg";
import { useEffect, useState } from "react";

const SafeNextImage = ({ src, alt, className }, props) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
      <Image
      {...props}
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      loading="lazy"
      onError={() => setImgSrc(blankImage.src)}
    />
  );
};

export default SafeNextImage;
