import { configureStore } from "@reduxjs/toolkit";
import RegisterReducer from "./reducers/RegisterReducer";
import VerifyEmailReducer from "./reducers/VerifyEmailReducer";
import AuthReducer from "./reducers/AuthReducer";
import PasswordReducer from "./reducers/PasswordReducer";

const store = configureStore({
  reducer: {
    AuthReducer,
    RegisterReducer,
    VerifyEmailReducer,
    PasswordReducer,
  },
});

export default store;
