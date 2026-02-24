import { createReducer } from '@reduxjs/toolkit';
import { loginAction, logoutAction, restoreSessionAction } from './actions';
import { tokenStorage } from '@/services/auth/tokenStorage';
import { IAuthState } from './interfaces';

const initialState: IAuthState = {
  customer: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginAction, (state, { payload }) => {
      tokenStorage.setToken(payload.token);
      tokenStorage.setCustomer(payload.customer);

      state.customer = payload.customer;
      state.isAuthenticated = true;
    })
    .addCase(logoutAction, (state) => {
      tokenStorage.clear();

      state.customer = null;
      state.isAuthenticated = false;
    })
    .addCase(restoreSessionAction, (state, { payload }) => {
      state.customer = payload;
      state.isAuthenticated = true;
    });
});
