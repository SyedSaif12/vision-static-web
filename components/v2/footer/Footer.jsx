import React from "react";
import ClientFooter from "./ClientFooter";

const paymentMethods = [
  "COD",
  "VISA",
  "Master",
  "Bank",
  "Easypaisa",
  "Jazz Cash",
];

const linkGroups = [
  {
    id: "shop",
    title: "Shop",
    links: [
      { label: "Laptops", href: "/products?category=laptops" },
      { label: "Mobiles", href: "/products?category=mobiles" },
      { label: "Gaming", href: "/products?category=gaming-console" },
      { label: "Apple", href: "/products?category=apple" },
      { label: "Accessories", href: "/products?category=accessories" },
      { label: "Refurbished", href: "/products?tag=refurbished" },
    ],
  },
  {
    id: "support",
    title: "Support & Services",
    links: [
      { label: "Contact us", href: "/support-services/contact-us" },
      { label: "Repair services", href: "/repair" },
      { label: "Warranty claim", href: "/support-services/warranty-claim" },
      { label: "Visit Store", href: "/why-us/why-wegot#store" },
      { label: "Order procedure", href: "/why-us/order-procedure" },
    ],
  },
  {
    id: "wegot",
    title: "WeGot",
    links: [
      { label: "Why WeGot", href: "/why-us/why-wegot" },
      { label: "Return Policy", href: "/why-us/return-policy" },
      { label: "Privacy Policy", href: "/why-us/privacy-policy" },
      { label: "Instalment plan", href: "/instalment-plan" },
    ],
  },
];

const bottomLinks = [
  { label: "Privacy", href: "/why-us/privacy-policy" },
  { label: "Return policy", href: "/why-us/return-policy" },
  { label: "Order procedure", href: "/why-us/order-procedure" },
  { label: "Terms", href: "/terms" },
];

const Footer = () => {
  return (
    <div>
      <ClientFooter
        paymentMethods={paymentMethods}
        linkGroups={linkGroups}
        bottomLinks={bottomLinks}
      />
    </div>
  );
};

export default Footer;
