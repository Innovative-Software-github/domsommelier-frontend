import { createReducer } from '@reduxjs/toolkit';
import { ISavedBase } from '../../services/saved/interfaces';
import { IStoreItemState } from '../interfaces';
import { addPendingState, addRejectState, addFulfilledState } from '../utils';
import {
  getSavedRequest,
  addToSavedThunk,
  removeFromSavedThunk,
  clearSavedThunk,
} from './actions';

export interface ISavedReducer extends IStoreItemState {
  saved: ISavedBase | null;
}

export const initialSavedState: ISavedReducer = {
  saved: {
    customerId: '',
    items: [],
  },
  isLoading: false,
  error: null,
};

export const savedReducer = createReducer(initialSavedState, (builder) => {
  builder
    .addCase(getSavedRequest.pending, addPendingState)
    .addCase(getSavedRequest.rejected, addRejectState)
    .addCase(getSavedRequest.fulfilled, (state, { payload }) => {
      state.saved = payload ?? initialSavedState.saved;
      addFulfilledState(state);
    })

    .addCase(addToSavedThunk.pending, addPendingState)
    .addCase(addToSavedThunk.fulfilled, (state, { payload }) => {
      state.saved = payload;
      addFulfilledState(state);
    })
    .addCase(addToSavedThunk.rejected, addRejectState)

    .addCase(removeFromSavedThunk.pending, addPendingState)
    .addCase(removeFromSavedThunk.fulfilled, (state, { payload }) => {
      state.saved = payload;
      addFulfilledState(state);
    })
    .addCase(removeFromSavedThunk.rejected, addRejectState)

    .addCase(clearSavedThunk.pending, addPendingState)
    .addCase(clearSavedThunk.fulfilled, (state) => {
      state.saved = initialSavedState.saved;
      addFulfilledState(state);
    })
    .addCase(clearSavedThunk.rejected, addRejectState);
});

export default savedReducer;
