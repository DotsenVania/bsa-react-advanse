import { createReducer } from "@reduxjs/toolkit";
import { changeToken, auth, userData, registration, clearError } from "./actions";

const initialState = {
  presenceOfToken: false,
  loadingAuth: false,
  errorRegistration: false,
  errorAuth: false,
  error: false,
  userData: {},
  errorMessage: '',
  errorAuthMessage: ''
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeToken, (state, action) => {
    if (!action.payload) {
      return;
    }
    state.presenceOfToken = action.payload.status;
  });

  builder.addCase(auth.pending, (state) => {
    state.loadingAuth = true;
    state.errorAuth = false;
  });
  builder.addCase(auth.fulfilled, (state) => {
    state.loadingAuth = false;
    state.presenceOfToken = true;
    state.errorAuth = false;
  });
  builder.addCase(auth.rejected, (state, action) => {
    state.loadingAuth = false;
    state.errorAuth = true;
    if(!action.error.message) {
      return
    }
    state.errorAuthMessage = action.error.message;
  });

  builder.addCase(userData.pending, (state) => {
    state.loadingAuth = false;
    state.error = true;
  });
  builder.addCase(userData.fulfilled, (state, action) => {
    state.loadingAuth = false;
    state.userData = action.payload;
    state.error = true;
  });
  builder.addCase(userData.rejected, (state) => {
    state.loadingAuth = false;
    state.error = true;
  });

  builder.addCase(registration.pending, (state) => {
    state.loadingAuth = true;
    state.errorRegistration = false;
  });
  builder.addCase(registration.fulfilled, (state) => {
    state.loadingAuth = false;
    state.presenceOfToken = true;
    state.errorRegistration = false;
  });
  builder.addCase(registration.rejected, (state, action) => {
    state.loadingAuth = false;
    state.errorRegistration = true;
    if(!action.error.message) {
      return
    }
    state.errorMessage = action.error.message;
  });

  builder.addCase(clearError, (state) => {
    state.errorAuth = false;
    state.errorRegistration = false;
  })
});

export { reducer };
