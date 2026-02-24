import { IStore } from '../interfaces';

export const isAuthenticatedSelector = (state: IStore) =>
  state.auth?.isAuthenticated ?? false;

export const authCustomerSelector = (state: IStore) =>
  state.auth?.customer ?? null;
