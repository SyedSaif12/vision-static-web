import React, { useEffect, useState, useTransition } from "react";
import blankImage from "@/assets/blank_image.jpg";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import { formatPrice } from "@/helper/formatPrice";
import SafeNextImage from "./NextImageComponent";
import Loader from "@/components/Loading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { onToggle } from "@/redux/golbal-toggle/globalToggleSlice";

const mapStock = {
  in_stock: true,
  out_stock: false,
  in_order: true,
};

const ProductCard = ({ product, openCart }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const productUrl = `/product/${product.slug}`;

  const handleNavigation = (e) => {
    e.preventDefault();
    startTransition(() => {
      router.push(productUrl);
    });
  };

  const handleAddToCart = () => {
    const addtocartitems = {
      id: product?.id,
      quantity: count,
      productTitle: product?.productTitle,
      slug: product?.slug,
      oldPrice: product?.oldPrice,
      price: product?.price,
      image: product?.image,
    };

    dispatch(addToCart(addtocartitems));
    setTimeout(() => {
      setClicked(false);
      dispatch(onToggle(true));
      openCart();
    }, 1000);
  };

  const currency = process.env.NEXT_PUBLIC_CURRENCY || "PKR";
  const [imgSrc, setImgSrc] = useState(getProductImage(product));

  useEffect(() => {
    setImgSrc(getProductImage(product));
  }, [product]);

  const specificationsEntire = Object.entries(product?.attributes).filter(
    (item) => item[1] !== "N/A" && item[1] !== "" && item[0] !== "",
  );
  const specification = specificationsEntire
    .slice(0, 4)
    .map(([key, value]) => ({
      key: key.replace(/_/g, " "),
      value,
    }));

  return (
    <div className="w-full h-[480px] md:h-[500px] bg-white shadow-sm hover:shadow-md transition rounded-2xl p-3 flex flex-col items-center justify-between cursor-pointer border border-gray-100 relative">
      {/* Pending overlay — navigation ke dauran pura card cover kare */}
      {isPending && (
        <div className="absolute inset-0 z-50 bg-white/60 rounded-2xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-[5px] border-t-orange-600 border-gray-300"></div>
        </div>
      )}

      {/* Product Image with Premium Delivery Badge */}
      <div className="w-full max-h-[449px] min-h-[170px] relative flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
        {(product?.isFeatured || !mapStock[product?.status]) && (
          <div className="absolute z-40 top-2 right-2">
            <span
              className={`text-xs ${mapStock[product?.status] ? "text-orange-500 border-orange-300 bg-[#fdf0d7]" : "text-red-500 border-red-500 bg-red-100"} border capitalize px-3 py-0.5 rounded-full`}
            >
              {mapStock[product?.status]
                ? "Featured Product"
                : product?.status?.replaceAll(/_/g, " ")}
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
          onClick={handleNavigation}
          className="text-sm font-semibold hover:text-blue-500 hover:underline line-clamp-2"
        >
          {product?.productTitle
            ?.replaceAll(/-/g, " ")
            ?.toLowerCase()
            ?.replace(/^./, (char) => char.toUpperCase())}
        </p>

        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-normal z-50 pointer-events-none">
          {product?.productTitle
            ?.replaceAll(/-/g, " ")
            ?.toLowerCase()
            ?.replace(/^./, (char) => char.toUpperCase())}
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

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2">
        {product.price > 0 ? (
          <>
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
            onClick={handleNavigation}
            className={`mt-2 sm:mt-3 w-full border border-[#000DAF] text-[#000DAF] text-sm text-center font-medium p-1 sm:p-2 rounded-full hover:bg-blue-50 transition ${isPending ? "opacity-70 pointer-events-none" : ""}`}
            href={productUrl}
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
  if (Array.isArray(product?.image)) {
    const first = product?.image[0]?.fileUrl;
    if (typeof first === "string" && first.startsWith("http")) {
      return encodeURI(first);
    }
  }
  return blankImage;
}