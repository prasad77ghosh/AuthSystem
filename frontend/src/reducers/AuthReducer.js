import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  isAuthenticated: false,
  error: null,
};

const AuthReducer = createReducer(initialState, {
  //login user
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

  //logout user
  logoutUserSuccess: (state, action) => {
    state.loading = false;
    state.data = null;
    state.isAuthenticated = false;
  },
  logoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  //load user
  authCheckRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  authCheckSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
    state.isAuthenticated = true;
  },
  authCheckFailure: (state, action) => {
    state.loading = false;
    state.data = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default AuthReducer;
