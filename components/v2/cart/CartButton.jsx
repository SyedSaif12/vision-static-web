"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { onToggle, cartToggle } from "@/redux/golbal-toggle/globalToggleSlice";
import { addToCart, getCartCount } from "@/redux/cart/cartSlice";

const mapStock = {
  in_stock: true,
  out_stock: false,
  in_order: true,
};

const CartButton = ({
  product,
  disabled,
  quantity = 1,
  className = "",
  btnClassName = "",
}) => {
  const cartCount = useSelector(getCartCount);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const handleAddToCart = () => {
    const addtocartitems = {
      id: product?.id,
      quantity: Math.max(1, Number(quantity) || 1),
      productTitle: product?.name,
      attributes: product?.specs,
      slug: product?.slug,
      oldPrice: product?.oldPrice,
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
        disabled={clicked || disabled}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setClicked(true);
          handleAddToCart();
        }}
        className={`${btnClassName} w-full rounded-lg ${clicked || disabled ? "cursor-not-allowed" : "cursor-pointer"} bg-gold px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2`}
      >
        {clicked ? (
          <span className="flex items-center justify-center gap-2">
            Adding
            <Loader2 size={18} className="animate-spin" />
          </span>
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );
};

export default CartButton;
