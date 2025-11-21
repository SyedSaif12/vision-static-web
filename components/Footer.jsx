import React from "react";
import Image from "next/image";
import paypalIcon from "@/assets/paypalicon.png";
import visaIcon from "@/assets/visa.png";
import mastercardIcon from "@/assets/mastercardicon.png";
import discoverIcon from "@/assets/discovericon.png";
import amexIcon from "@/assets/amexicon.png";

// Social icons direct import
import facebookIcon from "@/assets/facebookicon.png";
import instaIcon from "../assets/instaicon.png";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-6 px-6 md:px-20 lg:px-32">
      {/* Newsletter Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between  pb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Sign Up To Our Newsletter.
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Be the first to hear about the latest offers.
          </p>
        </div>

        <div className="flex items-center mt-6 md:mt-0">
          <input
            type="email"
            placeholder="Your Email"
            className="bg-transparent border border-gray-400 rounded-md px-4 py-2 w-60 text-sm focus:outline-none focus:border-white text-white placeholder-gray-500"
          />
          <button className="ml-2 bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-medium px-5 py-2 rounded-full">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
        {/* Information */}
        <div>
          <h3 className="text-white font-semibold mb-4">Information</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>About Zip</li>
            <li>Privacy Policy</li>
            <li>Search</li>
            <li>Terms</li>
            <li>Orders and Returns</li>
            <li>Contact Us</li>
            <li>Advanced Search</li>
            <li>Newsletter Subscription</li>
          </ul>
        </div>

        {/* PC Parts */}
        <div>
          <h3 className="text-white font-semibold mb-4">PC Parts</h3>
          <ul className="space-y-2 text-sm">
            <li>CPUS</li>
            <li>Add On Cards</li>
            <li>Hard Drives (Internal)</li>
            <li>Graphic Cards</li>
            <li>Keyboards / Mice</li>
            <li>Cases / Power Supplies / Cooling</li>
            <li>RAM (Memory)</li>
            <li>Software</li>
            <li>Speakers / Headsets</li>
            <li>Motherboards</li>
          </ul>
        </div>

        {/* Laptops */}
        <div>
          <h3 className="text-white font-semibold mb-4">Laptops</h3>
          <ul className="space-y-2 text-sm">
            <li>Everyday Use Notebooks</li>
            <li>MSI Workstation Series</li>
            <li>MSI Prestige Series</li>
            <li>Tablets and Pads</li>
            <li>Netbooks</li>
            <li>Infinity Gaming Notebooks</li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-white font-semibold mb-4">Address</h3>
          <p className="text-sm leading-relaxed">
            Address: Shop# 29, Ground Floor, SAASI Arcade, Block-7, Clifton Near
            Sohny Sweets, Karachi, Pakistan.
          </p>
          <p className="text-sm mt-3">
            Phones: <span className="text-blue-400">(00) 1234 5678</span>
          </p>
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
              contact@visiontech.com.pk
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
          <Image src={facebookIcon} alt="facebook" width={22} height={22} />
          <Image src={instaIcon} alt="instagram" width={22} height={22} />
        </div>

        <div className="flex items-center gap-3">
          <Image src={paypalIcon} alt="paypal" width={45} height={30} />
          <Image src={visaIcon} alt="visa" width={45} height={30} />
          <Image src={mastercardIcon} alt="mastercard" width={45} height={30} />
          <Image src={amexIcon} alt="amex" width={45} height={30} />
          <Image src={discoverIcon} alt="discover" width={45} height={30} />
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">Copyright © 2020 Shop Pty. Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
