"use client";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  getCartAmount,
} from "@/redux/cart/cartSlice";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { onToggle, cartToggle } from "@/redux/golbal-toggle/globalToggleSlice";
import { BaseImage } from "@/components";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { data } = useSelector((state) => state.user);
  const { openCart } = useSelector((state) => state.toggle);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(getCartAmount);
  const dispatch = useDispatch();
  const router = useRouter();

  const onClose = () => {
    dispatch(cartToggle(false));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantity = (id, type) => {
    const currentQty = cartItems[id]?.quantity || 0;
    if (type === "inc") {
      if (currentQty >= 10) return;
      dispatch(updateCartQuantity({ itemId: id, quantity: currentQty + 1 }));
    } else if (type === "dec" && currentQty > 1) {
      dispatch(updateCartQuantity({ itemId: id, quantity: currentQty - 1 }));
    }
  };

  const proceedToCheckOut = () => {
    dispatch(cartToggle(false));
    setTimeout(() => {
      if (!data?.role) {
        router.push("/accounts/login");
        return;
      }
      router.push("/checkout");
    }, 0);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-xl z-[99999] transform transition-transform duration-300 ${
        openCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b">
        <h2 className="text-xl text-black font-bold">Shopping Cart</h2>
        <button
          onClick={() => {
            dispatch(onToggle(false));
            onClose();
          }}
        >
          <X />
        </button>
      </div>

      {/* Cart Items */}
      <div className="overflow-y-auto h-[calc(100%-240px)] p-5 space-y-4">
        {Object.keys(cartItems).length === 0 && (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}

        {Object.entries(cartItems).map(([id, item]) => {
          const { product, quantity } = item;

          if (!product) return null;

          return (
            <div key={id} className="flex gap-4 items-center border-b pb-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <BaseImage
                  src={product?.image}
                  alt={product?.productTitle || "Product"}
                  className="h-full w-full rounded-lg"
                  imgClassName="rounded-lg"
                  fit="contain"
                  sizes="80px"
                  showSkeleton
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-black text-sm">
                  <Link
                    onClick={() => {
                      dispatch(cartToggle(false));
                    }}
                    className="hover:text-blue-700 hover:underline"
                    href={`/products/${product?.slug}`}
                  >
                    {product.productTitle}
                  </Link>
                </p>
                <p className="text-blue-700 font-semibold">
                  {formatPrice(product.price)}
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
      <div className="p-4 border-t">
        <div className="flex justify-between mb-1">
          <span className="font-semibold text-black">Total:</span>
          <span className="font-bold text-black">
            {formatPrice(totalAmount)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            className="w-full text-xs sm:text-base bg-gold text-ink py-3 rounded-lg font-bold px-2"
            onClick={proceedToCheckOut}
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => {
              dispatch(onToggle(false));
              dispatch(cartToggle(false));
              onClose();
            }}
            className="w-full text-xs text-center sm:text-base border border-muted/50 py-3 rounded-md font-bold text-black"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
