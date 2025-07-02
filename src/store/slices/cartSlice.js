import { createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) => {
  state.find((cartItem) => cartItem.productId === action.payload.productId);
};

export const slice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCartItems(state, action) {
      // const existingIndex = findItemIndex(state, action);
      const existingItem = state.find(
        (item) => item.productId == action.payload.productId
      );
      if (existingItem) {
        return state.map((item) => {
          if (item.productId === existingItem.productId) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }
          return item;
        });
      }
      return [
        ...state,
        { ...action.payload, quantity: action.payload.quantity || 1 },
      ];
    },
    removeCartItems(state, action) {
      return state.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    increaseCartItems(state, action) {
      const existingItem = state.find(
        (item) => item.productId == action.payload.productId
      );
      if (existingItem) {
        return state.map((item) => {
          if (item.productId === existingItem.productId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
    },
    decreaseCartItems(state, action) {
      const existingItem = state.find(
        (item) => item.productId == action.payload.productId
      );
      if (existingItem) {
        return state
          .map((item) => {
            if (item.productId === existingItem.productId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter((item) => item.quantity > 0);
      }
    },
  },
});

export const {
  addCartItems,
  removeCartItems,
  increaseCartItems,
  decreaseCartItems,
} = slice.actions;
export default slice.reducer;
