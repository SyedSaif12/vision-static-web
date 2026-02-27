"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import googleIcon from "@/assets/googleIcon.svg";

import "swiper/css";
import { Star } from "lucide-react";
import { useGetReviewsQuery } from "@/redux/review/reviewSlice";
import Link from "next/link";

function ReviewCard({ review }) {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-indigo-500",
  ];

  // Function to pick a color based on string (for consistency)
  const getColor = (name) => {
    if (!name) return colors[0];
    const charCode = name.charCodeAt(0); // first letter char code
    return colors[charCode % colors.length];
  };
  return (
    <div className="break-inside-avoid rounded-2xl border bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          {review?.image?.length > 0 && review?.image?.[0]?.fileUrl ? (
            <Image
              src={review?.image?.[0]?.fileUrl}
              alt={review?.fullName}
              fill
              className="object-cover"
            />
          ) : (
            <span
              className={`size-full uppercase flex justify-center items-center text-white font-bold ${getColor(
                review?.fullName,
              )}`}
            >
              {review?.fullName?.slice(0, 1)}
            </span>
          )}
        </div>

        <div className="flex-1">
          <p className="text-base capitalize font-semibold">
            {review?.fullName}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(review?.date).toLocaleDateString("en-US")}
          </p>
        </div>
        <div className="relative size-6 rounded-full overflow-hidden">
          <Image
            src={googleIcon}
            alt="google-svg-icon"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Stars */}
      <Stars rating={review?.ratings} />

      {/* Text with 4-line clamp + scroll */}
      <div className="max-h-[6rem] overflow-y-auto pr-1 text-sm text-gray-600 leading-relaxed thin-scroll">
        {review?.content}
      </div>
      {review?.link && review?.link?.length > 0 && (
        <Link
          className="font-semibold text-sm text-blue-500 underline"
          href={review?.link}
          target="_blank"
        >
          View On Google
        </Link>
      )}
    </div>
  );
}

export default function GoogleReviews() {
  const { currentData } = useGetReviewsQuery();
  const reviews = currentData?.data;

  return (
    <div className="w-full py-12 mt-10">
      <div className="w-full h-full flex items-center">
        <h2 className="w-full text-2xl sm:text-3xl mb-10 font-semibold">
          Customer Reviews
        </h2>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1280: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {Array.isArray(reviews) &&
          reviews?.map((review, i) => (
            <SwiperSlide key={review?.id}>
              <ReviewCard key={review?.id} review={review} />
            </SwiperSlide>
          ))}
      </Swiper>
      <style jsx global>{`
        .thin-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .thin-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 9999px;
        }

        .thin-scroll {
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
}

function Stars({ rating }) {
  return (
    <div className="text-2xl mb-2 flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "opacity-100" : "opacity-30"}>
          <Star size={20} fill="orange" strokeWidth={0} />
        </span>
      ))}
    </div>
  );
}
