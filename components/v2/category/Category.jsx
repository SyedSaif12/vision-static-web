import React from "react";
import ClientCategory from "./ClientCategory";

const categories = [
  { title: "Laptops", url: "/products?category=laptops", image: "/images/lap-silver.jpg" },
  { title: "Mobiles", url: "/products?category=mobiles", image: "/images/phone.jpg" },
  { title: "Gaming", url: "/products?category=gaming-console", image: "/images/console.jpg" },
  { title: "Tablets", url: "/products?category=tablets", image: "/images/tablet.jpg" },
  { title: "Printers", url: "/products?category=printers", image: "/images/printer.avif" },
  { title: "Wearables", url: "/products?category=watches", image: "/images/watch.jpg" },
  {
    title: "Dyson",
    url: "/products?subCategory=dyson",
    image: "/images/vacuum.jpg",
  },
  {
    title: "Accessories",
    url: "/products?category=accessories",
    image: "/images/mouse.jpg",
  },
  { title: "Computers", url: "/products?category=computers", image: "/images/computer.jpg" },
  { title: "Drives", url: "/products?category=drives", image: "/images/ssd.jpg" },
  {
    title: "LED Monitors",
    url: "/products?category=led-monitors",
    image: "/images/led.jpg",
  },
  {
    title: "Refurbished",
    url: "/products?tag=refurbished",
    image: "/images/lap-black.jpg",
  },
];

const Category = () => {
  return (
    <div>
      <ClientCategory categoryData={categories} />
    </div>
  );
};

export default Category;
