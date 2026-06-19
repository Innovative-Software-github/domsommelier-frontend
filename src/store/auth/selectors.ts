import { IStore } from '../interfaces';
import { isAdmin } from '@/services/auth/roles';

export const isAuthenticatedSelector = (state: IStore) =>
  state.auth?.isAuthenticated ?? false;

export const authCustomerSelector = (state: IStore) =>
  state.auth?.customer ?? null;

export const isAdminSelector = (state: IStore) =>
  isAdmin(state.auth?.customer?.role);
