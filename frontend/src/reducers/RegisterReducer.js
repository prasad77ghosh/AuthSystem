import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  isEmailSended: false,
  error: null,
};

const RegisterReducer = createReducer(initialState, {
  registerUserRequest: (state) => {
    state.loading = true;
    state.isEmailSended = false;
  },
  registerUserSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.isEmailSended = true;
  },
  registerUserFailure: (state, action) => {
    state.loading = false;
    state.data = null;
    state.isEmailSended = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default RegisterReducer;
