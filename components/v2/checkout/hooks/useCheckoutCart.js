"use client";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartAmount,
  removeFromCart,
  updateCartQuantity,
} from "@/redux/cart/cartSlice";
import { MAX_ITEM_QTY } from "../lib/constants";
import { useHasMounted } from "./useHasMounted";

/** Cart data + actions shaped for the checkout UI. */
export function useCheckoutCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector(getCartAmount);
  const hasMounted = useHasMounted();

  const products = useMemo(
    () =>
      Object.entries(cartItems ?? {}).map(([id, item]) => ({
        id,
        ...item.product,
        qty: item.quantity,
      })),
    [cartItems],
  );

  const itemCount = useMemo(
    () => products.reduce((sum, p) => sum + p.qty, 0),
    [products],
  );

  const remove = useCallback(
    (id) => dispatch(removeFromCart(id)),
    [dispatch],
  );

  const changeQuantity = useCallback(
    (id, delta) => {
      const current = cartItems?.[id]?.quantity ?? 0;
      const next = current + delta;
      if (next < 1 || next > MAX_ITEM_QTY) return;
      dispatch(updateCartQuantity({ itemId: id, quantity: next }));
    },
    [cartItems, dispatch],
  );

  return { products, subtotal, itemCount, hasMounted, remove, changeQuantity };
}
