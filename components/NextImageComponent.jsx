// "use client";

// import Image from "next/image";
// import blankImage from "@/assets/blank_image.jpg";
// import { useEffect, useState } from "react";

// const SafeNextImage = ({ src = blankImage.src, alt, className, ...props }) => {
//   const [imgSrc, setImgSrc] = useState(src);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     setIsLoading(true);
//     if (typeof src === 'string') {
//       setImgSrc(encodeURI(src?.trim()));
//     } else if (src) {
//       setImgSrc(src);
//     } else {
//       setImgSrc(blankImage.src);
//     }
//   }, [src]);
//   const nativeImgSrc = typeof imgSrc === 'object' && imgSrc.src
//     ? imgSrc.src
//     : (typeof imgSrc === 'string' ? imgSrc : blankImage.src);

//   console.log(nativeImgSrc);

//   return (
//     <>
//       {isLoading ? (
//         <Image
//           {...props}
//           src={nativeImgSrc}
//           alt={alt}
//           fill={props.fill ?? true}
//           // sizes={props?.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"}
//           sizes={"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
//           className={`transition-opacity duration-500
//           ${isLoading ? "opacity-0" : "opacity-100"
//             }
//           ${className}`}
//           onLoad={() => setIsLoading(false)}
//           // priority
//           // fetchPriority="high"
//           onError={() => {
//             setImgSrc(blankImage.src);
//             setIsLoading(false);
//           }}
//         // unoptimized={true}
//         />
//       ) : (
//         <Image
//           {...props}
//           src={nativeImgSrc}
//           alt={alt}
//           fill={props.fill ?? true}
//           // sizes={props?.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"}
//           sizes={"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
//           className={`transition-opacity duration-500
//           ${isLoading ? "opacity-0" : "opacity-100"
//             }
//           ${className}`}
//           onLoad={() => setIsLoading(false)}
//           // priority
//           // fetchPriority="high"
//           onError={() => {
//             setImgSrc(blankImage.src);
//             setIsLoading(false);
//           }}
//         // unoptimized={true}
//         />
//       )}
//     </>
//   );
// };

// export default SafeNextImage;



"use client";

import Image from "next/image";
import blankImage from "@/assets/blank_image.jpg";
import { useState } from "react";

const SafeNextImage = ({ src, alt = "image", className = "", ...props }) => {
  const [errored, setErrored] = useState(false);

  const resolvedSrc =
    !src
      ? blankImage.src
      : typeof src === "string"
        ? src.trim()
        : src.src || blankImage.src;

  return (
    <Image
      {...props}
      src={errored ? blankImage.src : resolvedSrc}
      alt={alt}
      fill={props.fill ?? true}
      sizes={
        // props?.sizes ||
        "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      }
      // className={`object-cover ${className}`}
      className={`${className}`}
      onError={() => {
        // setImgSrc(blankImage.src);
        setErrored(true);
      }}
    />
  );
};

export default SafeNextImage;