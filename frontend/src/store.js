import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "./reducers/RegisterReducer";
import VerifyEmailReducer from "./reducers/VerifyEmailReducer";
import AuthReducer from "./reducers/AuthReducer";

const store = configureStore({
  reducer: {
    AuthReducer,
    RegisterReducer,
    VerifyEmailReducer,
  },
});

export default store;
