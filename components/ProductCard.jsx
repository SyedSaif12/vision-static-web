import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "RS";

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product._id));
  };

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="w-[full] h-[500px] bg-white shadow-sm hover:shadow-md transition rounded-2xl p-3 flex flex-col items-center cursor-pointer border border-gray-100"
    >
      {/* Product Image with Premium Delivery Badge */}
      <div className="w-full h-[449px] relative flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
        <div className="absolute top-2 right-2">
          <span className="text-xs text-orange-500 border border-orange-300 bg-[#fdf0d7] px-3 py-0.5 rounded-full">
            Premium Delivery
          </span>
        </div>

        <Image
          src={product.image[0]}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain hover:scale-105 transition-transform"
        />
      </div>

      <p className="text-sm font-semibold w-full my-3">{product.name}</p>

      <div className="w-full">
        {/* ------------------------------------------------------------------------ */}
        <div className="flex pl-4 items-center">
          <span className="text-xl text-gray-400">&bull;</span>
          <div className="flex items-center">
            <p className="w-20 text-gray-400 text-sm ml-4">Model</p>
            <p>Apple M4 chip</p>
          </div>
        </div>
        <div className="flex pl-4 items-center">
          <span className="text-xl text-gray-400">&bull;</span>
          <div className="flex items-center">
            <p className="w-20 text-gray-400 text-sm ml-4">RAM</p>
            <p>16GB</p>
          </div>
        </div>
        <div className="flex pl-4 items-center">
          <span className="text-xl text-gray-400">&bull;</span>
          <div className="flex items-center">
            <p className="w-20 text-gray-400 text-sm ml-4">Dispaly</p>
            <p>13.6 inches retina</p>
          </div>
        </div>
        <div className="flex pl-4 items-center">
          <span className="text-xl text-gray-400">&bull;</span>
          <div className="flex items-center">
            <p className="w-20 text-gray-400 text-sm ml-4">Version</p>
            <p>Mac OS </p>
          </div>
        </div>
        {/* ------------------------------------------------------------------------- */}
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p className="text-gray-400 line-through text-sm">
          {currency}
          {product.price}
        </p>
        <p className="text-black font-semibold">
          {currency}
          {product.offerPrice}
        </p>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-3 w-full border border-blue-500 text-blue-600 text-sm font-medium py-2 rounded-full hover:bg-blue-50 transition"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
