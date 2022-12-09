import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: "",
  success: "",
  error: null,
};

const PasswordReducer = createReducer(initialState, {
  forgotPasswordRequest: (state) => {
    state.loading = true;
  },
  forgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgotPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //Reset Password
  resetPasswordRequest: (state) => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
  },
  resetPasswordFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default PasswordReducer;
