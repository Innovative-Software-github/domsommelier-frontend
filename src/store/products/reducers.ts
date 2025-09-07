import { createReducer } from '@reduxjs/toolkit';
import { TProductCard } from '../../services/products/interfaces/base';
import { getFilteredProductsRequest, setInitialProductCards } from './actions';
import { IStoreItemState } from '../interfaces';
import { addFulfilledState, addPendingState, addRejectState } from '../utils';

export type TStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IProductCardsState extends IStoreItemState {
  cards: TProductCard[];
  isInitiallyLoad: boolean;
}

const initialState: IProductCardsState = {
  cards: [],
  isInitiallyLoad: true,
  isLoading: false,
  error: null,
};

export const productCards = createReducer(initialState, (builder) => {
  builder
    .addCase(getFilteredProductsRequest.pending, (state) => addPendingState(state))
    .addCase(getFilteredProductsRequest.fulfilled, (state, { payload }) => {
      state.cards = payload;

      addFulfilledState(state);
    })
    .addCase(getFilteredProductsRequest.rejected, (state, { payload }) => {
      addRejectState(state, { payload, type: getFilteredProductsRequest.rejected.type });
    })
    .addCase(setInitialProductCards, (state, { payload }) => {
      state.cards = payload;
      state.isInitiallyLoad = true;
    });
});

export default productCards;
