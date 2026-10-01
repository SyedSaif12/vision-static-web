import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./product/productSlice";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import orderSlice from "./checkout/checkoutSlice";
import { categorySlice } from "./category/categorySlice";
import { subCategorySlice } from "./sub-category";
import { promotionSlice } from "./promotions";
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
    [categorySlice.reducerPath]: categorySlice.reducer,
    [subCategorySlice.reducerPath]: subCategorySlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [promotionSlice.reducerPath]: promotionSlice.reducer,
    [bargainSlice.reducerPath]: bargainSlice.reducer,
    [popupSlice.reducerPath]: popupSlice.reducer,
    [reviewSlice.reducerPath]: reviewSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categorySlice.middleware)
      .concat(subCategorySlice.middleware)
      .concat(productSlice.middleware)
      .concat(promotionSlice.middleware)
      .concat(bargainSlice.middleware)
      .concat(popupSlice.middleware)
      .concat(reviewSlice.middleware)
      .concat(authApi.middleware),
});

export default store;
