"use client";

import { useEffect, useState } from "react";
import arrowIcon from "@/assets/arrowicn.svg";
import blankImage from "@/assets/blank_image.jpg";
import SafeNextImage from "../NextImageComponent";

export default function CategoryCardSkeleton({ cardCount = 15 }) {
    // --- States ---

    return (
        <>
            {
                Array.from({ length: cardCount }).map((_, idx) => (
                    <div key={idx+1} className="w-full animate-pulse mx-auto pt-3 sm:pt-10">
                        <div
                            className="rounded-2xl h-44 sm:h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col bg-white"
                        >
                            <div className="bg-white h-40 relative sm:h-56 flex items-center justify-center overflow-hidden m-2 rounded-lg">
                                <SafeNextImage
                                    src={blankImage}
                                    alt={'card-skeleton'}
                                    className={
                                        "w-full h-full relative object-contain hover:scale-105 transition-transform duration-300"
                                    }
                                />
                            </div>
                            <div className="bg-[#D3E3FD] py-2 px-2 sm:px-4 flex items-center justify-between rounded-full mx-2 mb-2 sm:mx-3 sm:mb-4">
                                <span className="w-[70px] h-3 sm:w-9/12 bg-blue-900 rounded-full">

                                </span>
                                <div className="size-5 sm:size-7 flex justify-center items-center p-1 rounded-full bg-white">
                                    <img
                                        src={arrowIcon.src}
                                        alt="arrow icon"
                                        className="w-full"
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                ))
            }
        </>
    );
}
