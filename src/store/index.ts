import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { IServerData } from './interfaces';
import { filtersConfig } from './filters/reducers';
import productCards from './products/reducers';
import basketReducer from './basket/reducers';

export function createStore(preloadedState?: IServerData) {
  return configureStore({
    reducer: combineReducers({
      // TODO: переименовать редюсеры в одном стиле
      filtersConfig,
      productCards,
      basketReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });
}
