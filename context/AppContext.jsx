"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart as addToCartAction,
  updateCartQuantity as updateCartQuantityAction,
  setCartItems as setCartItemsAction,
  getCartAmount as getCartAmountSelector,
} from "@/redux/cart/cartSlice";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(getCartAmountSelector);

  // Dummy states for user & products
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [isSeller, setIsSeller] = useState(true);

  // Redux dispatch functions
  const addToCart = (item) => {
    // item = { id, productTitle, price, oldPrice, image, etc. }
    dispatch(addToCartAction(item));
  };

  const updateCartQuantity = (itemId, quantity) => {
    dispatch(updateCartQuantityAction({ itemId, quantity }));
  };

  // Cart utils
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, item) => total + (item.quantity || 0),
      0,
    );
  };

  const getCartAmount = () => totalAmount;

  // Hydrate cart from localStorage on client
  useEffect(() => {
    const cart =
      JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_CART_KEY)) || {};
    dispatch(setCartItemsAction(cart));
  }, [dispatch]);

  const value = {
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    setUserData,
    products,
    setProducts,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
