import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";

console.log();
export const store = configureStore({
  reducer: {
    cartState: cartReducer,
  },
});
