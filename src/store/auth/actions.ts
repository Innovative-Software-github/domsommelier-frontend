import { createAction } from '@reduxjs/toolkit';
import { IAuthUser } from './interfaces';

export const loginAction = createAction<{ token: string; user: IAuthUser }>(
  'auth/login',
);

export const logoutAction = createAction('auth/logout');

export const restoreSessionAction = createAction<IAuthUser>(
  'auth/restoreSession',
);

