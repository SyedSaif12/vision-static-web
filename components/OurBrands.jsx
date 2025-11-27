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
    <div className="w-full py-12 mt-10">
      <h2 className="text-center text-xl font-bold mb-6">Our Brands</h2>

      <Swiper
        slidesPerView={6}
        spaceBetween={10}
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
          1024: { slidesPerView: 6, spaceBetween: 30 },
        }}
      >
        {[hp, dell, samsung, asus, hp, dell, samsung].map((logo, i) => (
          <SwiperSlide key={i}>
            <Image
              src={logo}
              alt="brand logo"
              className="w-15 h-15 object-contain mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
