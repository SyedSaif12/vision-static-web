import Link from "next/link";
import React from "react";

const ProductsNotFound = () => {
  return (
    <div className="w-full h-[30rem] flex gap-5 flex-col justify-center items-center">
      {/* <h1 className="font-semibold text-7xl text-gray-500">404</h1> */}
      <h1 className="font-semibold text-3xl text-gray-500">No Results</h1>
      <Link
        className="bg-orange-500/80 px-8 py-2 hover:bg-orange-500 transition-colors rounded-full text-lg text-white"
        href="/"
      >
        Go to home
      </Link>
    </div>
  );
};

export default ProductsNotFound;
