import { configureStore } from "@reduxjs/toolkit";
import { productDetails } from "./productSlice";
import wishlistSlice from "./wishlistSlice";
import cartReducer from "./cartSlice";

const reducer = {
  cart: cartReducer,
  wishlist: wishlistSlice,
  productDetails,
};

export const store = configureStore({ reducer });
