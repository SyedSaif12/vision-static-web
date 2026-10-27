"use client";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearCart } from "@/redux/cart/cartSlice";
import { placeOrder } from "@/redux/checkout/checkoutSlice";
import { ROUTES } from "../lib/constants";

/** Submits the order, then clears the cart and redirects. Guards against double submits. */
export function usePlaceOrder() {
  const dispatch = useDispatch();
  const router = useRouter();
  const inFlight = useRef(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [isPlaced, setIsPlaced] = useState(false);

  const submit = useCallback(
    async (payload) => {
      if (inFlight.current) return;
      inFlight.current = true;
      setIsPlacing(true);

      try {
        const response = await dispatch(placeOrder({ payload })).unwrap();
        toast.success(response?.message || "Order placed successfully", {
          position: "top-right",
        });
        setIsPlaced(true); // before clearCart so the empty-cart screen never flashes
        dispatch(clearCart());
        router.push(ROUTES.orderConfirmation);
      } catch (error) {
        inFlight.current = false;
        setIsPlacing(false);
        toast.error(
          error?.data?.message ||
            error?.message ||
            "Failed to place order. Please try again.",
        );
      }
    },
    [dispatch, router],
  );

  return { submit, isPlacing, isPlaced };
}
