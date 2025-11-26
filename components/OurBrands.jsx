"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

// Brand logos
import hp from "@/assets/hpicon.png";
import dell from "@/assets/dellicon.png";
import samsung from "@/assets/samsungicon.png";
import asus from "@/assets/asusicon.png";

export default function OurBrands() {
  return (
    <div className="w-full py-10 mt-10">
      <h2 className="text-center text-xl font-bold mb-6">Our Brands</h2>

      <Swiper
        slidesPerView={4}
        spaceBetween={40}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 20 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 30 },
        }}
      >
        {[hp, dell, samsung, asus, asus, asus, asus].map((logo, i) => (
          <SwiperSlide key={i}>
            <Image
              src={logo}
              alt="brand logo"
              className="w-30 h-30 object-contain mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
