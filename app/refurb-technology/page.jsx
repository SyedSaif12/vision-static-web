import { createPageMetadata } from "@/lib/seo";
import React from "react";
import RefurbishedPage from "./_components/RefurbishedPage";

export const metadata = createPageMetadata({
  title: "Certified Refurbished Technology in Pakistan",
  description:
    "Tested and certified refurbished laptops and tech devices with warranty and nationwide delivery at WeGot.",
  path: "/refurb-technology",
});

const page = () => {
  return <RefurbishedPage />;
};

export default page;
