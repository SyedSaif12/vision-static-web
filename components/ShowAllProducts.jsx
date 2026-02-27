"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const ShowAllProducts = ({ headTitle, products }) => {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <div className="mt-14">
        <p className="text-xl md:text-3xl font-medium">{headTitle}</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 mt-6 py-5 md:py-10 w-full">
          {Array.isArray(products) ? (
            products?.map((product, idx) => (
              <ProductCard
                key={idx}
                product={product}
                openCart={() => setCartOpen(true)}
              />
            ))
          ) : (
            <div className="col-span-full flex justify-center flex-col my-14">
              <h1 className=" text-3xl my-5 font-semibold text-gray-500 text-center">
                Products Not Found!
              </h1>
              <Link
                href={"/"}
                className="px-5 py-3 rounded-full my-5 bg-blue-600 text-center text-white"
              >
                Return to home
              </Link>
            </div>
          )}
        </div>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </>
  );
};

export default ShowAllProducts;
