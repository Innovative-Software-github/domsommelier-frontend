import {
  AnyAction,
  Dispatch,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { IServerData, IStore, TAPIError } from './interfaces';

export function createStore(preloadedState?: IServerData) {
  return configureStore({
    reducer: combineReducers({}),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });
}

export type TAppStore = ReturnType<typeof createStore>;

export type TRootState = TAppStore['getState'];
export type TAppDispatch = ThunkDispatch<IStore, undefined, AnyAction> &
  Dispatch<AnyAction>;

export interface IAsyncThunkConfig {
  dispatch: TAppDispatch;
  state: IStore;
  rejectValue: TAPIError;
}
