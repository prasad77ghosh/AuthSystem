import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/LoginReducer";
import RegisterReducer from "./reducers/RegisterReducer";
import VerifyEmailReducer from "./reducers/VerifyEmailReducer";

const store = configureStore({
  reducer: {
    RegisterReducer,
    LoginReducer,
    VerifyEmailReducer,
  },
});

export default store;
