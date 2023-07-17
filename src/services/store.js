import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "../slices/tokensSlice";

export const store = configureStore({
  reducer: {
    wallet: tokensReducer,
  },
});