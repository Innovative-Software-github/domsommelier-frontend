import { createReducer } from '@reduxjs/toolkit';
import { IBasketBase } from '../../services/basket/interfaces';
import { IStoreItemState } from '../interfaces';
import { addPendingState, addRejectState, addFulfilledState } from '../utils';
import { getBasketRequest, addToCartThunk, removeFromCartThunk, clearCartThunk } from './actions';

export interface IBasketReducer extends IStoreItemState {
  basket: IBasketBase;
}

const initialState: IBasketReducer = {
  basket: {
    customerId: '',
    items: [],
    totalPrice: 0,
    discount: 0,
    discountedPrice: 0,
  },
  isLoading: false,
  error: null,
};

export const basketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getBasketRequest.pending, addPendingState)
    .addCase(getBasketRequest.rejected, addRejectState)
    .addCase(getBasketRequest.fulfilled, (state, { payload }) => {
      state.basket = payload
      addFulfilledState(state);
    })
    
    .addCase(addToCartThunk.pending, addPendingState)
    .addCase(addToCartThunk.fulfilled, (state, { payload }) => {
      state.basket = payload;
      addFulfilledState(state);
    })
    .addCase(addToCartThunk.rejected, addRejectState)
    
    .addCase(removeFromCartThunk.pending, addPendingState)
    .addCase(removeFromCartThunk.fulfilled, (state, { payload }) => {
      state.basket = payload;
      addFulfilledState(state);
    })
    .addCase(removeFromCartThunk.rejected, addRejectState)
    
    .addCase(clearCartThunk.pending, addPendingState)
    .addCase(clearCartThunk.fulfilled, (state) => {
      state = initialState;
      addFulfilledState(state);
    })
    .addCase(clearCartThunk.rejected, addRejectState);
});

export default basketReducer;
