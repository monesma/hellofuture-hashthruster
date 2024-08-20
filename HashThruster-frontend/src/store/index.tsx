import { configureStore } from "@reduxjs/toolkit";
import hashconnectReducer from "./hashconnect"
import tokenReducer from "./tokenSlice";

export const store = configureStore({
  reducer: {
    hashconnect: hashconnectReducer,
    token: tokenReducer
  },
});

export type AppStore = ReturnType<typeof store.getState>;