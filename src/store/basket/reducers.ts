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
  basket: IBasketBase;
}

export const initialBasketState: IBasketReducer = {
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

export const basketReducer = createReducer(initialBasketState, (builder) => {
  builder
    .addCase(getBasketRequest.pending, addPendingState)
    .addCase(getBasketRequest.rejected, addRejectState)
    .addCase(getBasketRequest.fulfilled, (state, { payload }) => {
      state.basket = payload
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
      state = initialBasketState;
      addFulfilledState(state);
    })
    .addCase(clearBasketThunk.rejected, addRejectState);
});

export default basketReducer;
