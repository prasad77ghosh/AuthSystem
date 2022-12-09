import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  isAuthenticated: false,
  error: null,
};

const LoginReducer = createReducer(initialState, {
  loginUserRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loginUserSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.isAuthenticated = true;
  },
  loginUserFailure: (state, action) => {
    state.loading = false;
    state.data = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});


export default LoginReducer;

