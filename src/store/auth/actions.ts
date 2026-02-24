import { createAction } from '@reduxjs/toolkit';
import { ICustomer } from '@/services/customer/interfaces';

export const loginAction = createAction<{
  token: string;
  customer: Partial<ICustomer>;
}>('auth/login');

export const logoutAction = createAction('auth/logout');

export const restoreSessionAction = createAction<Partial<ICustomer>>(
  'auth/restoreSession',
);
