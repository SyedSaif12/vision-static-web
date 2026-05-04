import React, { useEffect, useState } from "react";
import blankImage from "@/assets/blank_image.jpg";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import { formatPrice } from "@/helper/formatPrice";
import SafeNextImage from "./NextImageComponent";
import Loader from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const ProductCard = ({ product, openCart }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    const addtocartitems = {
      id: product?.id,
      quantity: count, // Use the count state
      productTitle: product?.productTitle,
      slug: product?.slug,
      oldPrice: product?.oldPrice,
      price: product?.price,
      image: product?.image, // Fixed typo: was "imgae"
    };

    dispatch(addToCart(addtocartitems));
    setTimeout(() => {
      setClicked(false);
      openCart();
    }, 1000);
  };

  const currency = process.env.NEXT_PUBLIC_CURRENCY || "PKR";
  const [imgSrc, setImgSrc] = useState(getProductImage(product));

  useEffect(() => {
    setImgSrc(getProductImage(product));
  }, [product]);
  const specificationsEntire = Object.entries(product?.attributes).filter(
    (item) => {
      return item[1] !== "N/A" && item[1] !== "" && item[0] !== "";
    },
  );
  const specification = specificationsEntire
    .slice(0, 4)
    .map(([key, value]) => ({
      key: key.replace(/_/g, " "),
      value,
    }));

  if (load) {
    return (
      <div className="w-screen h-screen absolute top-0 left-0 right-0 bottom-0">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full h-[480px] md:h-[500px] bg-white shadow-sm hover:shadow-md transition rounded-2xl p-3 flex flex-col items-center justify-between cursor-pointer border border-gray-100">
      {/* Product Image with Premium Delivery Badge */}
      <div className="w-full max-h-[449px] min-h-[170px] relative flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
        {product?.isFeatured && (
          <div className="absolute z-40 top-2 right-2">
            <span className="text-xs text-orange-500 border border-orange-300 bg-[#fdf0d7] px-3 py-0.5 rounded-full">
              Featured Product
            </span>
          </div>
        )}
        <div className="w-full h-full flex-1 relative flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
          <SafeNextImage
            src={imgSrc}
            alt={product.productTitle}
            className={
              "object-contain relative hover:scale-105 transition-transform"
            }
          />
        </div>
      </div>

      <div className="w-11/12 my-3 relative group cursor-pointer">
        <p
          onClick={() => {
            setLoad(true);
            router.push(`/product/${product.slug}`);
          }}
          className="text-sm font-semibold hover:text-blue-500 hover:underline line-clamp-2"
        >
          {product.productTitle?.replaceAll(/-/g, ' ')}
        </p>

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-normal z-50 pointer-events-none">
          {product.productTitle?.replaceAll(/-/g, ' ')}
        </div>
      </div>

      <div className="w-full">
        {!!specification &&
          specification.map((item, index) => (
            <div key={index} className="flex sm:pl-1 items-center">
              <span className="text-xl hidden sm:block text-gray-400">
                &bull;
              </span>
              <div className="flex flex-row justify-center items-center">
                <p className="truncate w-[60px] sm:w-[110px] capitalize text-gray-400 group text-xs sm:text-sm relative font-medium sm:ml-4">
                  {item?.key}
                  <span className="absolute capitalize -bottom-5 lg:whitespace-nowrap !text-white !bg-black z-50 px-1 sm:px-2 !text-[10px] tracking-wider hidden group-hover:block transition-all">
                    {item?.key}
                  </span>
                </p>
                <p className="w-[60px] sm:w-[110px] capitalize truncate text-xs sm:text-sm font-medium relative group">
                  {String(item?.value)
                    ? (String(item?.value).toLowerCase() ?? "coming soon")
                    : "coming soon"}
                  <span className="absolute capitalize -bottom-5 lg:whitespace-nowrap -translate-x-1/2 !text-white !bg-black z-50 px-2 !text-[10px] tracking-wide hidden group-hover:block transition-all">
                    {String(item?.value).toLowerCase()}
                  </span>
                </p>
              </div>
            </div>
          ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        {product.price > 0 ? (
          <>
            {/* Old Price sirf tab dikhao jab wo current price se zyada ho */}
            {product.oldPrice > product.price && (
              <p className="text-gray-400 line-through text-[12px]">
                {currency} {formatPrice(product.oldPrice)}
              </p>
            )}

            <p className="text-black font-semibold text-[14px]">
              {currency} {formatPrice(product.price)}
            </p>
          </>
        ) : (
          <p className="text-gray-400 text-[13px]">Coming Soon</p>
        )}
      </div>
      {product.price > 0 && (
        <div className="w-11/12 flex flex-col sm:flex-row sm:gap-4">
          <Link
            onClick={() => setLoad(true)}
            className="mt-2 sm:mt-3 w-full border border-[#000DAF] text-[#000DAF] text-sm text-center font-medium p-1 sm:p-2 rounded-full hover:bg-blue-50 transition"
            href={`/product/${product.slug}`}
          >
            View
          </Link>

          <button
            disabled={clicked}
            onClick={(e) => {
              e.preventDefault();
              setClicked(true);
              handleAddToCart();
            }}
            className={`mt-2 sm:mt-3 w-full border ${clicked ? "border-orange-500" : "border-blue-700"} text-white text-sm font-medium p-1 sm:p-2 rounded-full transition-colors ${clicked ? "bg-orange-500" : "bg-blue-700"}`}
          >
            {clicked ? (
              <span className="flex items-center justify-center gap-2">
                Added
                <Loader2 size={18} className="animate-spin" />
              </span>
            ) : (
              "Add Cart"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

function getProductImage(product) {
  // agar image array hai
  if (Array.isArray(product?.image)) {
    const first = product?.image[0]?.fileUrl;
    if (typeof first === "string" && first.startsWith("http")) {
      return first;
    }
  }

  // fallback
  return blankImage;
}
