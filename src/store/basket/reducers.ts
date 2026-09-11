import { createReducer } from '@reduxjs/toolkit';
import { IBasketBase } from '../../services/basket/interfaces';
import { IStoreItemState } from '../interfaces';
import { addPendingState, addRejectState, addFulfilledState } from '../utils';
import {
  getBasketRequest,
  addToBasketThunk,
  removeFromBasketThunk,
  clearBasketThunk,
} from './actions';

export interface IBasketReducer extends IStoreItemState {
  basket: IBasketBase | null;
}

export const initialBasketState: IBasketReducer = {
  basket: {
    customerId: '',
    items: [],
    itemsTotal: 0,
    saleDiscountAmount: 0,
    personalDiscountPercent: 0,
    personalDiscountAmount: 0,
    promoDiscountPercent: 0,
    promoDiscountAmount: 0,
    totalDiscountAmount: 0,
    payableTotal: 0,
  },
  isLoading: false,
  error: null,
};

export const basketReducer = createReducer(initialBasketState, (builder) => {
  builder
    .addCase(getBasketRequest.pending, addPendingState)
    .addCase(getBasketRequest.rejected, addRejectState)
    .addCase(getBasketRequest.fulfilled, (state, { payload }) => {
      state.basket = payload ?? initialBasketState.basket;
      addFulfilledState(state);
    })
    
    .addCase(addToBasketThunk.pending, addPendingState)
    .addCase(addToBasketThunk.fulfilled, (state, { payload }) => {
      state.basket = payload;
      addFulfilledState(state);
    })
    .addCase(addToBasketThunk.rejected, addRejectState)
    
    .addCase(removeFromBasketThunk.pending, addPendingState)
    .addCase(removeFromBasketThunk.fulfilled, (state, { payload }) => {
      state.basket = payload;
      addFulfilledState(state);
    })
    .addCase(removeFromBasketThunk.rejected, addRejectState)
    
    .addCase(clearBasketThunk.pending, addPendingState)
    .addCase(clearBasketThunk.fulfilled, (state) => {
      state.basket = initialBasketState.basket;
      addFulfilledState(state);
    })
    .addCase(clearBasketThunk.rejected, addRejectState);
});

export default basketReducer;
