import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  isAuthenticated: false,
  error: null,
};

const AuthCheckReducer = createReducer(initialState, {
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

export default AuthCheckReducer;
