"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  getCartAmount,
} from "@/redux/cart/cartSlice";
import Image from "next/image";
import closeIcon from "@/assets/close.svg";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/helper/formatPrice";
import { useEffect, useState } from "react";
import blankImage from "@/assets/blank_image.jpg";
import Link from "next/link";
import Loading from "./Loading";

export default function CartDrawer({ open, onClose }) {
  const [isClient, setIsClient] = useState(false);
  const [load, setLoad] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const [imageSrc, setImageSrc] = useState(blankImage);
  const totalAmount = useSelector(getCartAmount);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Jab tak client load na ho, loading ya empty div dikhayein

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantity = (id, type) => {
    const currentQty = cartItems[id]?.quantity || 0;
    if (type === "inc") {
      if (currentQty === 5) return;
      dispatch(updateCartQuantity({ itemId: id, quantity: currentQty + 1 }));
    } else if (type === "dec" && currentQty > 1) {
      dispatch(updateCartQuantity({ itemId: id, quantity: currentQty - 1 }));
    }
  };

  const proceedToCheckOut = () => {
    setTimeout(() => {
      router.push("/checkout");
    }, 0);
  };

  if (!isClient) {
    return null; // Ya loading spinner
  }

  if (load) {
    return (
      <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0">
        <Loading />;
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b">
        <h2 className="text-xl text-black font-bold">Shopping Cart</h2>
        <button onClick={onClose}>
          <Image src={closeIcon} alt="Close" width={25} height={25} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="overflow-y-auto h-[calc(100%-220px)] p-5 space-y-4">
        {Object.keys(cartItems).length === 0 && (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}

        {Object.entries(cartItems).map(([id, item]) => {
          const { product, quantity } = item;

          if (!product) return null;

          return (
            <div key={id} className="flex gap-4 items-center border-b pb-4">
              <div className="w-20 h-20 relative">
                <Image
                  src={product.image[0]?.fileUrl || imageSrc}
                  alt={product.productTitle || "Product"}
                  fill
                  onError={() => setImageSrc(blankImage)}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-black text-sm">
                  <Link
                    className="hover:text-blue-700 hover:underline"
                    href={`/product/${product?.slug}`}
                  >
                    {product.productTitle}
                  </Link>
                </p>
                <p className="text-blue-700 font-semibold">
                  PKR {formatPrice(product.price)}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleQuantity(id, "dec")}
                    className="px-2 py-1 border rounded text-black"
                  >
                    -
                  </button>
                  <span className="text-black">{quantity}</span>
                  <button
                    onClick={() => handleQuantity(id, "inc")}
                    className="px-2 py-1 border rounded text-black"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(id)}
                    className="text-red-600 underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-5 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-semibold text-black">Total:</span>
          <span className="font-bold text-blue-700">
            PKR {formatPrice(totalAmount)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-full text-xs sm:text-base border border-[#000DAF] py-3 rounded-full font-medium text-[#000DAF]"
          >
            Continue Shopping
          </button>
          <button
            className="w-full text-xs sm:text-base bg-[#000DAF] text-white py-3 rounded-full font-medium px-2"
            onClick={proceedToCheckOut}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
