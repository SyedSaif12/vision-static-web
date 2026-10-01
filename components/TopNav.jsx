"use client";
import InstaBlue from "@/assets/instabluecion.svg";
import FbBlue from "@/assets/fbblueicon.svg";
import Image from "next/image";

const TopNav = () => {
  return (
    <div className="w-[90%] mx-auto bg-white border-b border-gray-100 py-2 text-sm overflow-hidden">
      <div className="flex justify-between items-center">
        {/* PHONE — sirf desktop */}
        <a
          href="tel:+923260220581"
          className="hidden lg:block text-black font-semibold shrink-0 pr-8"
        >
          +92 326 022 0581
        </a>

        {/* MARQUEE */}
        <div className="flex-1 overflow-hidden">
          <div className="marquee-track flex whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-black px-10 whitespace-nowrap">
                We have a physical store in Karachi for pickup.{" "}
                <a
                  href="https://maps.google.com/?q=Vision+Tech,+Shop+29,+Ground+Floor,+SAASI+Arcade,+Block+7,+near+Sohny+Sweets,+Clifton,+Karachi,+75600,+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-blue-600 hover:text-blue-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  Vision Tech, Shop# 29, Ground Floor, SAASI Arcade, Block 7,
                  near Sohny Sweets, Clifton, Karachi
                </a>
                . Also have 1,000+ products online, but some are stored at our
                warehouse. Please WhatsApp us at{" "}
                <a
                  href="https://wa.me/923260220581"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-green-600 hover:text-green-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  +92 326 0220581
                </a>{" "}
                before visiting to confirm availability.
              </span>
            ))}
          </div>
        </div>

        {/* SOCIAL ICONS — sirf desktop */}
        <div className="hidden lg:flex items-center gap-4 shrink-0 pl-8">
          <a
            href="https://www.instagram.com/visiontech.official.pk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={InstaBlue} alt="Instagram" className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/VisionTech.official.pk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={FbBlue} alt="Facebook" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
