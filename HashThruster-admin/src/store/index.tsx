import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "./adminSlice"
import ProjectReducer from "./projectSlice"
import TokenReducer from "./tokenSlice"

// config the store
export const store = configureStore({
  reducer: {
    admin: AdminReducer,
    project: ProjectReducer,
    token: TokenReducer
  },
});
