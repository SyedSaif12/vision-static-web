"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { onToggle, cartToggle } from "@/redux/golbal-toggle/globalToggleSlice";
import { addToCart, getCartCount } from "@/redux/cart/cartSlice";

const mapStock = {
  in_stock: true,
  out_stock: false,
  on_order: true,
  in_order: true,
  coming_soon: true,
  discontinue: false,
};

const CartButton = ({
  product,
  disabled,
  status = "in_stock",
  label = "Add to cart",
  quantity = 1,
  className = "",
  btnClassName = "",
}) => {
  const cartCount = useSelector(getCartCount);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);

  const isStatusAllowed =
    status in mapStock ? mapStock[status] : status === "in_stock";
  const isBtnDisabled = clicked || disabled || !isStatusAllowed;

  const handleAddToCart = () => {
    const addtocartitems = {
      id: product?.id,
      quantity: Math.max(1, Number(quantity) || 1),
      productTitle: product?.name,
      attributes: product?.specs,
      slug: product?.slug,
      oldPrice: product?.oldPrice,
      stockQuantity: product?.stockQuantity,
      price: product?.price,
      image: product?.image,
      warranty: product?.warranty,
      tag: product?.tag,
    };

    dispatch(addToCart(addtocartitems));
    setTimeout(() => {
      setClicked(false);
      dispatch(onToggle(true));
      dispatch(cartToggle(true));
    }, 1000);
  };

  return (
    <div className={className}>
      <button
        disabled={isBtnDisabled}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setClicked(true);
          handleAddToCart();
        }}
        className={`${btnClassName} w-full rounded-lg ${
          isBtnDisabled
            ? "cursor-not-allowed bg-gold/50 hover:bg-gold/50 text-ink/50"
            : "cursor-pointer bg-gold hover:bg-gold-600 text-ink"
        } px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2`}
      >
        {clicked ? (
          <span className="flex items-center justify-center gap-2">
            Adding
            <Loader2 size={18} className="animate-spin" />
          </span>
        ) : (
          label
        )}
      </button>
    </div>
  );
};

export default CartButton;
