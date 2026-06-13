import { createReducer } from '@reduxjs/toolkit';
import { ICheckoutState } from './interfaces';
import { checkoutThunk } from './actions';

const initialState: ICheckoutState = {
  isSubmitting: false,
  lastOrderId: null,
  error: null,
};

export const checkoutReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(checkoutThunk.pending, (state) => {
      state.isSubmitting = true;
      state.error = null;
    })
    .addCase(checkoutThunk.fulfilled, (state, { payload }) => {
      state.isSubmitting = false;
      state.lastOrderId = payload;
    })
    .addCase(checkoutThunk.rejected, (state, { payload }) => {
      state.isSubmitting = false;
      state.error = payload as string;
    });
});

export default checkoutReducer;
