import Link from "next/link";
import React from "react";
import arrowIcon from "@/assets/arrowicn.svg";
import SafeNextImage from "./NextImageComponent";
import blankImage from "@/assets/blank_image.jpg";

const BaseCardCategory = ({
  tile,
  url,
  count = 0,
  imageUrl,
  isCountShow = false,
  isHighlight = true,
}) => {
  return (
    <>
      <div className="w-full mx-auto pt-3 sm:pt-10">
        <Link
          href={url}
          className="rounded-2xl h-44 sm:h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col bg-white"
        >
          <div className="bg-white h-40 relative sm:h-56 flex items-center justify-center overflow-hidden m-2 rounded-lg">
            <SafeNextImage
              src={getCategoryImage(imageUrl)}
              alt={tile}
              className={
                "w-full h-full relative object-contain hover:scale-105 transition-transform duration-300"
              }
            />
          </div>
          {isHighlight ? (
            <div className="bg-[#D3E3FD] py-2 px-2 sm:px-4 flex items-center justify-between rounded-full mx-2 mb-2 sm:mx-3 sm:mb-4">
              <span className="w-[80px] sm:w-full truncate font-semibold capitalize text-blue-900 text-xs md:text-sm xl:text-base">
                {tile.replace("-", " ")}
              </span>
              {isCountShow ? (
                <h1 className="text-[#939495]">({count})</h1>
              ) : (
                <div className="size-5 sm:size-7 flex justify-center items-center p-1 rounded-full bg-white">
                  <img
                    src={arrowIcon.src}
                    alt="arrow icon"
                    className="w-full"
                  />
                </div>
              )}
            </div>
          ) : (
            <div
              className={`px-4 sm:py-2 sm:px-4 flex ${isHighlight ? "flex-row" : "flex-col"} items-center justify-between rounded-full mx-3 mb-2`}
            >
              <span className="font-semibold text-blue-900 text-sm sm:text-md">
                {tile.replace("-", " ")}
              </span>
              {isCountShow ? (
                <h1 className="text-gray-600 text-[13px] mt-1">
                  Items ({count})
                </h1>
              ) : (
                <img
                  src={arrowIcon.src}
                  alt="arrow icon"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              )}
            </div>
          )}
        </Link>
      </div>
    </>
  );
};

export default BaseCardCategory;

function getCategoryImage(imageUrl) {
  return imageUrl || blankImage;
}
