import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import CartDrawer from "./CartDrawer";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(null);
  const [count, setcount] = useState(1);
  const products = useSelector((state) => state.products.items);
  const [cartOpen, setCartOpen] = useState(false);

  const { id } = useParams();

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  const handleAddToCart = (e) => {
    dispatch(addToCart({ itemId: product._id, quantity: 1 }));
    setCartOpen(true);
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "RS";

  return (
    <div className="w-[full] h-[500px] bg-white shadow-sm hover:shadow-md transition rounded-2xl p-3 flex flex-col items-center cursor-pointer border border-gray-100">
      {/* Product Image with Premium Delivery Badge */}
      <div
        className="w-full h-[449px] relative flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden"
        onClick={() => {
          router.push("/product/" + product._id);
          scrollTo(0, 0);
        }}
      >
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

      <div
        className="w-full"
        onClick={() => {
          router.push("/product/" + product._id);
          scrollTo(0, 0);
        }}
      >
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

      <div
        className="flex items-center justify-center gap-2 mt-2"
        onClick={() => {
          router.push("/product/" + product._id);
          scrollTo(0, 0);
        }}
      >
        <p className="text-gray-400 line-through text-sm">
          {currency}
          {product.price}
        </p>
        <p className="text-black font-semibold">
          {currency}
          {product.offerPrice}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            router.push("/product/" + product._id);
            scrollTo(0, 0);
          }}
          className="mt-3 w-full border border-[#000DAF] text-[#000DAF] text-sm font-medium px-2 rounded-full hover:bg-blue-50 transition"
        >
          View Details
        </button>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

        <button
          onClick={(e) => {
            handleAddToCart();
          }}
          className="mt-3 w-full border border-[#000DAF] text-white text-sm font-medium px-2 rounded-full bg-[#000DAF]"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
