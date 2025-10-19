import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlices/listAllUsers";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export default store;
