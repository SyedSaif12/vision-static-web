"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
// import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import NewsLetter from "@/components/NewsLetter";
import Installments from "@/components/Installments";
import ProductDescription from "@/components/ProductDescription";
import HeroSection from "@/components/HeroSection";
import BargainDialog from "@/components/BargainDialog";

import React from "react";

const Product = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(productData._id));
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  return productData ? (
    <>
      <HeroSection />
      {/* <Navbar /> */}
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-2 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-white/10 border-2 mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt="alt"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-white/10 border-2 hover:border-orange-500/80"
                >
                  <Image
                    src={image}
                    alt="alt"
                    className="w-full h-auto object-cover mix-blend-multiply"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>
            {/* <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p>(4.5)</p>
            </div> */}
            <p className="text-gray-600 mt-3">{productData.description}</p>
            {/* <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${productData.price}
              </span>
            </p> */}
            <hr className="bg-gray-600 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium px-4 py-2">
                      Price
                    </td>
                    <td className="text-gray-800/50 px-4 py-2">PKR 45000</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium px-4 py-2">
                      Brand
                    </td>
                    <td className="text-gray-800/50 px-4 py-2">Generic</td>
                  </tr>

                  <tr>
                    <td className="text-gray-600 font-medium px-4 py-2">
                      Color
                    </td>
                    <td className="text-gray-800/50 px-4 py-2">Multi</td>
                  </tr>

                  <tr>
                    <td className="text-gray-600 font-medium px-4 py-2">
                      Availebility
                    </td>
                    <td className="text-gray-800/50 px-4 py-2">yes</td>
                  </tr>

                  <tr>
                    <td className="text-gray-600 font-medium px-4 py-2">
                      In-Stock
                    </td>
                    <td className="text-gray-800/50 px-4 py-2">instock</td>
                  </tr>

                  <tr>
                    <td className="text-gray-600 font-medium px-4 py-2">
                      Delvery Time
                    </td>
                    <td className="text-gray-800/50 px-4 py-2">4-5</td>
                  </tr>

                  <tr>
                    <td className="text-gray-600 font-medium px-4 py-2">
                      Category
                    </td>
                    <td className="text-gray-800/50 px-4 py-2">
                      {productData.category}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Installments Component Here */}
        <div className="-mt-8">
          <Installments />
        </div>

        {/* Center Bargain Button */}
        {/* <div className="flex justify-end mt-8">
          <button
            onClick={() => setOpenDialog(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-12 py-3 rounded-full shadow-md hover:bg-orange-600 transition w-[600px] justify-center"
          >
            <Image src={assets.bargain_icon} alt="icon" className="w-5 h-5" />
            Bargain on Price
          </button>
        </div> */}

        <div className="mt-10 pb-6">
          <ProductDescription />
        </div>

        {/* Dialog Box */}
        <BargainDialog open={openDialog} onClose={() => setOpenDialog(false)} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Product;
