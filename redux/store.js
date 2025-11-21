import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./product/productSlice";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
