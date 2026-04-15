"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

// Brand logos
import hp from "@/assets/hp-logo.svg";
import dell from "@/assets/dell-logo.svg";
import samsung from "@/assets/samsung-logo.svg";
import asus from "@/assets/asus-logo.svg";
import apple from "@/assets/apple-logo.svg";
import dyson from "@/assets/dyson-logo.svg";
import sony from "@/assets/sony-logo.svg";
import lenovo from "@/assets/lenovo-logo.svg";
import amd from "@/assets/amd-logo.svg";
import intel from "@/assets/intel-logo.svg";
import canon from "@/assets/canon-logo.svg";
import epson from "@/assets/epson-logo.svg";
import xiaomi from "@/assets/xiaomi-logo.svg";
import philips from "@/assets/philips-logo.svg";
import amazonKindle from "@/assets/amazon-kindle-logo.svg";

const logos = [
  {
    id: 1,
    logo: apple,
  },
  {
    id: 2,
    logo: dell,
  },
  {
    id: 3,
    logo: hp,
  },
  {
    id: 4,
    logo: samsung,
  },
  {
    id: 5,
    logo: asus,
  },
  {
    id: 6,
    logo: lenovo,
  },
  {
    id: 7,
    logo: dyson,
  },
  {
    id: 8,
    logo: sony,
  },
  {
    id: 9,
    logo: amazonKindle,
  },
  {
    id: 10,
    logo: amd,
  },
  {
    id: 11,
    logo: intel,
  },
  {
    id: 12,
    logo: canon,
  },
  {
    id: 13,
    logo: epson,
  },
  {
    id: 14,
    logo: xiaomi,
  },
  {
    id: 15,
    logo: philips,
  },
];

export default function OurBrands() {
  return (
    <div className="w-full mt-10">
      <div className="w-full h-full flex items-center">
        <h2 className="w-full text-2xl capitalize sm:text-3xl mb-10 font-semibold">
          Our Brands
        </h2>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={{
          430: { slidesPerView: 2, spaceBetween: 20 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
          1280: { slidesPerView: 6, spaceBetween: 30 },
        }}
      >
        {logos.length &&
          logos.map((item, i) => (
            <SwiperSlide content="center" key={item.id + i}>
              <div className="flex items-center justify-center h-24 w-full">
                <Image
                  src={item.logo}
                  alt="brand logo"
                  className="max-w-[220px] max-h-[120px] object-contain mx-auto"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
