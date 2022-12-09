import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  data: {},
  error: null,
};

const LogoutReducer = createReducer(initialState, {
  logoutRequest: (state) => {
    state.loading = true;
  },
  logoutSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },

  logoutFailure: (state, action) => {
    state.loading = false;
    state.data = null;
    state.error = action.payload;
  },
  clearError: (state) => {
    state.error = null;
  },
});

export default LogoutReducer;
