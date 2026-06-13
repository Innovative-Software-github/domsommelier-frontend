import { createSelector } from '@reduxjs/toolkit';
import { IStore } from '../interfaces';

const selectCheckoutState = (state: IStore) => state.checkout;

export const checkoutIsSubmittingSelector = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.isSubmitting,
);

export const checkoutErrorSelector = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.error,
);

export const checkoutLastOrderIdSelector = createSelector(
  [selectCheckoutState],
  (checkout) => checkout.lastOrderId,
);
