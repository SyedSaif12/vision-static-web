import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./product/productSlice";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
import { categorySlice } from "./category/categorySlice";
import { subCategorySlice } from "./sub-category";
import { promotionSlice } from "./promotions";
import { bargainSlice } from "./bargain/bargainSlice";
import { checkoutSlice } from "./checkout/checkoutSlice";
import { popupSlice } from "./popup/popupSlice";
import { reviewSlice } from "./review/reviewSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [subCategorySlice.reducerPath]: subCategorySlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [promotionSlice.reducerPath]: promotionSlice.reducer,
    [bargainSlice.reducerPath]: bargainSlice.reducer,
    [checkoutSlice.reducerPath]: checkoutSlice.reducer,
    [popupSlice.reducerPath]: popupSlice.reducer,
    [reviewSlice.reducerPath]: reviewSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categorySlice.middleware)
      .concat(subCategorySlice.middleware)
      .concat(productSlice.middleware)
      .concat(promotionSlice.middleware)
      .concat(bargainSlice.middleware)
      .concat(checkoutSlice.middleware)
      .concat(popupSlice.middleware)
      .concat(reviewSlice.middleware),
});

export default store;
