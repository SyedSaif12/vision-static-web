"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  getCartAmount,
} from "@/redux/cart/cartSlice";
import Image from "next/image";
import { useState } from "react";
import closeIcon from "@/assets/close.svg"; // ya koi close icon
import { products } from "@/assets/assets"; // agar aapke products local hain
import { useRouter } from "next/navigation";

export default function CartDrawer({ open, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const productsList = useSelector((state) => state.products.items);
  const totalAmount = useSelector(getCartAmount);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const router = useRouter();

  const handleQuantity = (id, type) => {
    const currentQty = cartItems[id];
    if (type === "inc")
      dispatch(updateCartQuantity({ itemId: id, quantity: currentQty + 1 }));
    else if (type === "dec" && currentQty > 1)
      dispatch(updateCartQuantity({ itemId: id, quantity: currentQty - 1 }));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[90%] sm:w-[450px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
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
        {Object.entries(cartItems).length === 0 && <p>Your cart is empty.</p>}

        {Object.entries(cartItems).map(([id, qty]) => {
          const product = productsList.find((p) => p._id === id);
          if (!product) return null;
          return (
            <div key={id} className="flex gap-4 items-center border-b pb-4">
              <div className="w-20 h-20 relative">
                <Image
                  src={product.image[0]}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-black">{product.name}</p>
                <p className="text-blue-700 font-semibold">
                  PKR {product.offerPrice}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleQuantity(id, "dec")}
                    className="px-2 py-1 border rounded text-black"
                  >
                    -
                  </button>
                  <span className="text-black">{qty}</span>
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
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-blue-700">PKR {totalAmount}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-full border border-[#000DAF] py-3 rounded-full font-medium text-[#000DAF]"
          >
            Continue Shopping
          </button>
          <button
            className="w-full bg-[#000DAF] text-white py-3 rounded-full font-medium px-2"
            onClick={() => router.push("/checkout")}
          >
            Checkout (PKR {totalAmount})
          </button>
        </div>
      </div>
    </div>
  );
}
