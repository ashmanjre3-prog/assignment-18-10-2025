import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlices/listAllUsers";
import getOneUserReducer from "./userSlices/getOneUser";

const store = configureStore({
  reducer: {
    users: userReducer,
    userData: getOneUserReducer,
  },
});

export default store;
