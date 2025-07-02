import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addWishListItem(state, action) {
      return [...state, { ...action.payload }];
    },
    removeWishListItem(state, action) {
      return state.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
  },
});

export const { addWishListItem, removeWishListItem } = slice.actions;
export default slice.reducer;
