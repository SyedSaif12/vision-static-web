"use client";

import React from "react";
import Image from "next/image";
import paypalIcon from "@/assets/paypalicon.svg";
import visaIcon from "@/assets/visa.svg";
import mastercardIcon from "@/assets/mastercardicon.svg";
import discoverIcon from "@/assets/discovericon.svg";
import amexIcon from "@/assets/amexicon.svg";

// Social icons direct import
import facebookIcon from "@/assets/facebookicon.svg";
import instaIcon from "../assets/instaicon.svg";
import Link from "next/link";
import { useGetCategoriesQuery } from "@/redux/category/categorySlice";

const Footer = () => {
  const { currentData } = useGetCategoriesQuery({
    navbar: true,
  });

  const mainCategory =
    Array.isArray(currentData?.data) &&
    currentData?.data?.map((category) => {
      return {
        id: category?.id,
        catName: category?.name?.replace(/-/g, " "),
        route: `/${category?.name}`,
      };
    });

  const subCategory = [];
  const getLaptopId =
    mainCategory && mainCategory?.find((cat) => cat?.catName === "laptops");
  const targetId = getLaptopId?.id;

  currentData?.data?.forEach((cat) => {
    if (cat?.id === targetId && Array.isArray(cat?.subCategories)) {
      cat?.subCategories?.forEach((sub) => {
        subCategory.push({
          id: sub?.id,
          subName: sub?.name?.replace(/-/g, " "),
          route: `/${cat?.name}/${sub?.name}`,
        });
      });
    }
  });

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-6 px-6 md:px-20 lg:px-32">
      {/* Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
        {/* Information */}
        <div>
          <h3 className="text-white font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li>
              {" "}
              <Link
                className="hover:text-blue-500 hover:cursor-pointer"
                href="/about-us"
              >
                About Us
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="hover:text-blue-500 hover:cursor-pointer"
                href="/contact"
              >
                Contact Us
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="hover:text-blue-500 hover:cursor-pointer"
                href="/return-policy"
              >
                Return Policy
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="hover:text-blue-500 hover:cursor-pointer"
                href="/installment"
              >
                Installment Plan
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="hover:text-blue-500 hover:cursor-pointer"
                href="/store-locator"
              >
                Store Location
              </Link>
            </li>
          </ul>
        </div>

        {/* PC Parts */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            {Array.isArray(mainCategory) &&
              mainCategory?.map((category) => {
                return (
                  <li key={category?.id}>
                    <Link
                      href={category?.route}
                      className="hover:text-blue-500 capitalize hover:cursor-pointer"
                    >
                      {category?.catName}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Laptops */}
        <div>
          <h3 className="text-white font-semibold mb-4">Laptops</h3>
          <ul className="space-y-2 text-sm">
            {Array.isArray(subCategory) &&
              subCategory?.map((category) => {
                return (
                  <li key={category?.id}>
                    <Link
                      href={category?.route}
                      className="hover:text-blue-500 capitalize hover:cursor-pointer"
                    >
                      {category?.subName}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-white font-semibold mb-4">Address</h3>
          <p className="text-sm leading-relaxed">
            Address: Shop# 29, Ground Floor, SAASI Arcade, Block-7, Clifton Near
            Sohny Sweets, Karachi, Pakistan.
          </p>
          <div className="text-sm mt-3 flex flex-col">
            <p>Phones:</p>{" "}
            <p className="flex gap-2">
              <span className="text-blue-400">03312405800</span>
              <span className="text-blue-400">03260220581</span>
            </p>
          </div>
          <p className="text-sm mt-2">
            We are open: Monday–Saturday: <br />
            9:00 AM – 5:30 PM
          </p>
          <p className="text-sm mt-2">
            E-mail:{" "}
            <a
              href="mailto:contact@visiontech.com.pk"
              className="text-blue-400"
            >
              contact@visiontechpk.com
            </a>
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-700 my-8" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/VisionTech.official.pk"
            target="_blank"
          >
            <Image src={facebookIcon} alt="facebook" width={22} height={22} />
          </a>
          <a
            href="https://www.instagram.com/visiontech.official.pk/"
            target="_blank"
          >
            <Image src={instaIcon} alt="instagram" width={22} height={22} />
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Image src={paypalIcon} alt="paypal" width={45} height={30} />
          <Image src={visaIcon} alt="visa" width={45} height={30} />
          <Image src={mastercardIcon} alt="mastercard" width={45} height={30} />
          <Image src={amexIcon} alt="amex" width={45} height={30} />
          <Image src={discoverIcon} alt="discover" width={45} height={30} />
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">Copyright © 2026 vision tech.</p>
      </div>
    </footer>
  );
};

export default Footer;
