import { IStore } from '../interfaces';

export const isAuthenticatedSelector = (state: IStore) =>
  state.auth?.isAuthenticated ?? false;

export const authUserSelector = (state: IStore) => state.auth?.user ?? null;

