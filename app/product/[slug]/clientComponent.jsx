"use client";

import CartDrawer from "@/components/CartDrawer";
import HeroSection from "@/components/HeroSection";
import SafeNextImage from "@/components/NextImageComponent";
import handmoney from "@/assets/handmoney.svg";
import { formatPrice } from "@/helper/formatPrice";
import Image from "next/image";
import { useState } from "react";
import Installments from "@/components/Installments";
import ProductDescription from "@/components/ProductDescription";
import Seocontent from "@/components/Seo-content";
import PromotionVideo from "@/components/PromotionVideo";
import BargainDialog from "@/components/BargainDialog";
import Footer from "@/components/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import ShowAllSubCategories from "@/components/ShowAllSubCategories";
const ClientProductComponent = ({ product }) => {
  // State for main image, cart drawer, quantity, and bargain dialog
  const [mainImage, setMainImage] = useState(
    product?.image[0]?.fileUrl || null,
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const addtocartitems = {
      id: product?.id,
      quantity: count, // Use the count state
      productTitle: product?.productTitle,
      oldPrice: product?.oldPrice,
      price: product?.price,
      image: product?.image, // Fixed typo: was "imgae"
    };

    dispatch(addToCart(addtocartitems));
    setCartOpen(true);
  };

  return (
    <div>
      {/* Hero Section showing subcategory */}
      <HeroSection title={product?.products?.subCategory?.name} />

      <div className="px-6 md:px-16 lg:px-32 pt-14 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* IMAGE SECTION */}
          <div className="relative px-0 sm:px-6 lg:px-12">
            <div className="sticky top-12">
              <div className="rounded-lg h-96 relative overflow-hidden bg-white/10 border-2 mb-4">
                {/* Main product image */}
                <SafeNextImage
                  priority={true}
                  src={mainImage}
                  alt={product.productTitle}
                  className="w-full relative h-auto object-cover mix-blend-multiply"
                />
              </div>

              <div className="flex gap-2 sm:gap-4">
                {/* Thumbnails */}
                {product?.image.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setMainImage(image?.fileUrl)}
                      className="cursor-pointer size-[72px] sm:size-32 relative rounded-lg overflow-hidden bg-white/10 border-2 hover:border-orange-500/80"
                    >
                      <SafeNextImage
                        src={image?.fileUrl}
                        alt={image?.filename || product.productTitle}
                        className="w-full relative h-auto object-cover object-center mix-blend-multiply"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="flex flex-col">
            <h1 className="text-2xl track leading-7 sm:text-3xl font-medium text-gray-800 mb-4">
              {product?.productTitle}
            </h1>
            <div>
              <Seocontent content={product?.description} />
            </div>
            <hr className="my-6" />
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full self-center sm:w-11/12 md:max-w-72 space-y-5">
                {/* Price */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 font-medium">Price</p>
                  <p className="text-gray-600 font-medium">
                    PKR {formatPrice(product?.price)}
                  </p>
                </div>

                {/* Brand */}
                <div className="flex justify-between">
                  <p className="text-gray-600 font-medium">Brand</p>
                  <p className="text-[#000DAF] font-semibold">
                    {product?.products?.subCategory?.name}
                  </p>
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
                  <p className="text-gray-800/50">
                    {product?.products?.category?.name}
                    {/* Laptop */}
                  </p>
                </div>
              </div>
              <div className="button">
                {/* Bargain Button */}
                <div className="flex ">
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
            {/* CART CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
              <div className="w-full flex gap-6 justify-around md:justify-center items-center bg-white px-4 py-2 rounded">
                <button
                  onClick={() => setCount((c) => Math.max(c - 1, 1))}
                  className={`text-2xl font-bold ${
                    count <= 1
                      ? "text-gray-200 cursor-not-allowed"
                      : "text-black"
                  }`}
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  disabled={count >= 5}
                  onClick={() => setCount((c) => c + 1)}
                  className={`text-2xl font-bold ${
                    count >= 5
                      ? "text-gray-200 cursor-not-allowed"
                      : "text-black"
                  }`}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full text-md md:text-sm bg-[#000DAF] text-white px-10 py-2 rounded-full"
              >
                Add to Cart
              </button>
            </div>
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            {/* Add Installments Component Here */}
            <div className="">
              <Installments price={product?.price} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pb-6 w-full ">
        <ProductDescription
          description={product?.attributes}
          title={product?.productTitle}
        />
      </div>

      <div className="mt-10 pb-6">
        <Seocontent
          className="w-10/12 mx-auto md:ml-auto bg-white p-4 md:p-10 shadow-sm mt-10"
          content={product?.seoContent}
        />
      </div>

      <div>
        <Seocontent
          className="w-10/12 mx-auto md:ml-auto bg-white p-4 shadow-sm"
          content={product?.faq}
        />
      </div>

      <div className="mt-10 pb-6 px-6 md:px-16 lg:px-32">
        <PromotionVideo
          url={"https://www.youtube.com/embed/Aqzmm0RXslE?si=-w0uA0bVyVdKdfs_"}
        />
      </div>

      <div className="bg-gray-100">
        <div className="mt-10 pb-6 px-6 md:px-16 lg:px-32">
          <ShowAllSubCategories />
        </div>
      </div>

      {/* Dialog Box */}
      <BargainDialog
        id={product?.id}
        productName={product?.productTitle}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      <Footer />
    </div>
  );
};

export default ClientProductComponent;
