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
import handmoney from "@/assets/handmoney.png";
import React from "react";
import CartDrawer from "@/components/CartDrawer";
import Seocontent from "@/components/Seo-content";
import PromotionVideo from "@/components/PromotionVideo";

const Product = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setcount] = useState(1);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  const handleAddToCart = () => {
    if (count > 0) {
      dispatch(addToCart({ itemId: productData._id, quantity: count }));
      setcount(0);
      setCartOpen(true);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  return productData ? (
    <>
      <HeroSection title={productData.category} />
      {/* <Navbar /> */}
      <div className="pt-14 space-y-2 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 sm:px-6 md:px-10 lg:px-24">
          <div className="relative px-0 sm:px-6 lg:px-12">
            <div className="sticky top-12">
              {/* Main Image */}
              <div className="rounded-lg overflow-hidden bg-white border-2 mb-4">
                <Image
                  src={mainImage || productData.image[0]}
                  alt="alt"
                  className="w-full h-auto object-cover mix-blend-multiply"
                  width={1280}
                  height={720}
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {productData.image.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setMainImage(image)}
                    className="cursor-pointer rounded-lg overflow-hidden bg-white border-2 hover:border-orange-500"
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
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full max-w-72 space-y-5">
                {/* Price */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Price</p>
                  <p className="text-gray-600 font-medium">PKR 45000</p>
                </div>

                {/* Brand */}
                <div className="flex justify-between">
                  <p className="text-gray-600 font-medium">Brand</p>
                  <p className="text-[#000DAF] font-semibold">Generic</p>
                </div>

                {/* Stock */}
                <div className="flex justify-between">
                  <p className="text-gray-600 font-medium">In-Stock</p>
                  <p className="text-[#2EAE6F] font-semibold">In stock</p>
                </div>

                {/* Delivery Time */}
                <div className="flex justify-between">
                  <p className="text-gray-600 font-medium">Delivery Time</p>
                  <p className="text-gray-800 font-semibold">4-5 Days</p>
                </div>

                {/* Category */}
                <div className="flex justify-between">
                  <p className="text-gray-600 font-medium">Category</p>
                  <p className="text-gray-800/50">{productData.category}</p>
                </div>
              </div>
              <div className="button">
                {/* Bargain Button */}
                <div className="flex">
                  <button
                    onClick={() => setOpenDialog(true)}
                    className="w-full sm:w-auto md:px-2 md:text-xs sm:py-2 lg:py-2 bg-orange-500 text-white py-2 text-sm px-6 rounded-full shadow-md hover:bg-orange-600 transition flex items-center justify-center gap-2"
                  >
                    <Image src={handmoney} alt="icon" className="w-5 h-5" />
                    Bargain on Price
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-8 items-center mt-4">
              <div className="flex gap-8 bg-white py-2 px-4">
                <h1
                  className="text-gray-600 cursor-pointer"
                  onClick={() => setcount((prev) => Math.max(prev - 1, 0))}
                >
                  -
                </h1>
                <h1 className="">{count}</h1>
                <h1
                  className="text-gray-600 cursor-pointer"
                  onClick={() => setcount((prev) => prev + 1)}
                >
                  +
                </h1>
              </div>
              <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
              <button
                className="bg-[#000DAF] sm:py-2 sm:px-20 md:px-10 px-3 py-2  text-white rounded-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
            {/* Add Installments Component Here */}
            <div className="">
              <Installments />
            </div>
          </div>
        </div>

        <div className="mt-10 pb-6 ">
          <ProductDescription />
        </div>

        <div className="mt-10 pb-6">
          <Seocontent />
        </div>

        <div className="mt-10 pb-6 px-6 md:px-16 lg:px-32">
          <PromotionVideo />
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
