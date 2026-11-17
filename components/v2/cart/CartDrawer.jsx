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
import { ShoppingCart, Trash2Icon, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { clampOrderQuantity, getMaxOrderQuantity } from "@/lib/product-stock";

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
    const item = cartItems[id];
    if (!item?.product) return;

    const currentQty = item.quantity || 1;
    const stockQuantity = item.product.stockQuantity;

    const maxQty = getMaxOrderQuantity(stockQuantity);

    if (maxQty === 0) return;

    const nextQty =
      type === "inc"
        ? currentQty + 1
        : currentQty - 1;

    const safeQty = clampOrderQuantity(
      nextQty,
      stockQuantity
    );

    if (safeQty === currentQty) return;

    dispatch(
      updateCartQuantity({
        itemId: id,
        quantity: safeQty,
      })
    );
  };

  const handleViewCart = () => {
    dispatch(cartToggle(false));
    setTimeout(() => {
      router.push("/cart");
    }, 0);
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
      className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-xl z-[99999] transform transition-transform duration-300 ${openCart ? "translate-x-0" : "translate-x-full"
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

          const maxQty = getMaxOrderQuantity(
            product.stockQuantity
          );

          const isOutOfStock = maxQty === 0;

          const safeQty = isOutOfStock
            ? quantity
            : clampOrderQuantity(quantity, product.stockQuantity);

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
                    disabled={isOutOfStock || safeQty <= 1}
                    className="px-2 py-1 border rounded text-black"
                  >
                    -
                  </button>
                  <span className="text-black">{safeQty}</span>
                  <button
                    onClick={() => handleQuantity(id, "inc")}
                    disabled={isOutOfStock || safeQty >= maxQty}
                    className="px-2 py-1 border rounded text-black"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(id)}
                    className="text-red-600 ml-auto hover:bg-red w-10 h-10 flex justify-center items-center hover:text-white transition-colors duration-150 rounded-full"
                  >
                  <Trash2Icon className="w-5 h-5" />
                  </button>
                </div>
                {isOutOfStock ? (
                  <p className="mt-2 text-xs font-semibold text-red-600">
                    Out of stock
                  </p>
                ) : maxQty < 10 ? (
                  <p className="mt-2 text-xs text-red-600">
                    Only {maxQty} left in stock
                  </p>
                ) : null}
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
          <div className="w-full flex gap-2">

          <button
            className="w-full text-xs sm:text-base flex justify-center items-center gap-2 bg-primary text-white py-3 rounded-lg font-bold px-2"
            onClick={handleViewCart}
            >
            <ShoppingCart className="w-5 h-5" />
            View Cart
          </button>
          <button
            className="w-full text-xs sm:text-base bg-gold text-ink py-3 rounded-lg font-bold px-2"
            onClick={proceedToCheckOut}
            >
            Checkout
          </button>
            </div>
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
