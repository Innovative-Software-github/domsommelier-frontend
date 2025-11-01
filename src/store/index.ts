import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { IServerData } from './interfaces';
import { filtersConfig } from './filters/reducers';
import productCards from './products/reducers';
import basketReducer from './basket/reducers';
import { cityReducer } from './city/reducers';

export function createStore(preloadedState?: IServerData) {
  return configureStore({
    reducer: combineReducers({
      // TODO: переименовать редюсеры в одном стиле
      filtersConfig,
      productCards,
      basketReducer,
      city: cityReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });
}
