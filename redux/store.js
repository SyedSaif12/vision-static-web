import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import orderSlice from "./checkout/checkoutSlice";
import { bargainSlice } from "./bargain/bargainSlice";
import { popupSlice } from "./popup/popupSlice";
import { reviewSlice } from "./review/reviewSlice";
import globalToggleSlice from "./golbal-toggle/globalToggleSlice";
import { authApi } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    toggle: globalToggleSlice,
    orders: orderSlice,
    [bargainSlice.reducerPath]: bargainSlice.reducer,
    [popupSlice.reducerPath]: popupSlice.reducer,
    [reviewSlice.reducerPath]: reviewSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bargainSlice.middleware)
      .concat(popupSlice.middleware)
      .concat(reviewSlice.middleware)
      .concat(authApi.middleware),
});

export default store;
