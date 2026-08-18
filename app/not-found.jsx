"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

function NotFound() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center relative justify-center">
        {/* <div className="absolute -mt-5"> */}
        <Navbar themeColor={"#031057"} />
        {/* </div> */}
        <h1 className="text-7xl text-black/40 font-bold">404</h1>
        <p className="text-black/40 mt-2">Page not found</p>
        <Link
          href={`/`}
          className={`mt-2 sm:mt-3 max-w-40 w-full border border-blue-700 text-white text-center text-sm font-medium p-1 sm:p-2 rounded-full transition-colors bg-blue-700`}
        >
          Back to home
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
