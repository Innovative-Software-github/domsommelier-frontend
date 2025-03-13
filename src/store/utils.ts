import { PayloadAction } from '@reduxjs/toolkit';

import { TAPIError } from './interfaces';

export interface IStoreItemState {
  isLoading: boolean;
  error: TAPIError;
}

export const addPendingState = (draft: IStoreItemState) => {
  draft.isLoading = true;
  draft.error = null;
};

export const addRejectState = (
  draft: IStoreItemState,
  { payload }: PayloadAction<TAPIError>,
) => {
  draft.isLoading = false;
  draft.error = payload;
};

export const addFulfilledState = (draft: IStoreItemState) => {
  draft.isLoading = false;
  draft.error = null;
};

export const getLoadingState = (state: IStoreItemState) => ({
  isLoading: state.isLoading,
  error: state.error,
});
