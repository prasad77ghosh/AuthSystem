import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./reducers/LoginReducer";
import RegisterReducer from "./reducers/RegisterReducer";
import VerifyEmailReducer from "./reducers/VerifyEmailReducer";
import AuthCheckReducer from "./reducers/AuthCheckReducer";
import LogoutReducer from "./reducers/LogoutReducer";

const store = configureStore({
  reducer: {
    RegisterReducer,
    LoginReducer,
    VerifyEmailReducer,
    AuthCheckReducer,
    LogoutReducer,
  },
});

export default store;
