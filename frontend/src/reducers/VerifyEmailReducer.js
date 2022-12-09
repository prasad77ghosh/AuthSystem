import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const VerifyEmailReducer = createReducer(initialState, {
  verifyEmailRequest: (state) => {
    state.loading = true;
  },
  verifyEmailSuccess: (state, action) => {
    state.loading = false;
    state.data = action.payload;
  },
  verifyEmailFailure: (state, action) => {
    state.loading = false;
    state.data = null;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});

export default VerifyEmailReducer;
