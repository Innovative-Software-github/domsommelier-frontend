import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import { IServerData } from './interfaces';
import { filtersConfig } from './filters/reducers';
import productCards from './products/reducers';
import basketReducer from './basket/reducers';
import savedReducer from './saved/reducers';
import { cityReducer } from './city/reducers';
import { authReducer } from './auth/reducers';
import checkoutReducer from './checkout/reducers';

export function createStore(preloadedState?: IServerData) {
  return configureStore({
    reducer: combineReducers({
      // TODO: переименовать редюсеры в одном стиле
      filtersConfig,
      productCards,
      basketReducer,
      savedReducer,
      city: cityReducer,
      auth: authReducer,
      checkout: checkoutReducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });
}
