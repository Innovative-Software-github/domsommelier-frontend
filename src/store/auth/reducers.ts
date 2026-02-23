import { createReducer } from '@reduxjs/toolkit';
import { loginAction, logoutAction, restoreSessionAction } from './actions';
import { tokenStorage } from '@/services/auth/tokenStorage';
import { IAuthState } from './interfaces';

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginAction, (state, { payload }) => {
      tokenStorage.setToken(payload.token);
      tokenStorage.setUser(payload.user);

      state.user = payload.user;
      state.isAuthenticated = true;
    })
    .addCase(logoutAction, (state) => {
      tokenStorage.clear();

      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(restoreSessionAction, (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
    });
});

