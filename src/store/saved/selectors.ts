import { createSelector } from '@reduxjs/toolkit';
import { IStore } from '../interfaces';

const selectSavedState = (state: IStore) => state.savedReducer;

export const savedSelector = createSelector(
  [selectSavedState],
  (savedState) => savedState.saved,
);

export const savedProductsSelector = createSelector(
  [savedSelector],
  (saved) => saved?.items ?? [],
);

export const savedProductsMapSelector = createSelector(
  [savedProductsSelector],
  (items) => {
    const map = new Map<string, true>();
    items.forEach((item) => map.set(item.product.id, true));
    return map;
  },
);

export const isProductSavedSelector = createSelector(
  [savedProductsMapSelector, (_: IStore, productId: string) => productId],
  (map, productId) => map.has(productId),
);

export const savedProductsCountSelector = createSelector(
  [savedProductsSelector],
  (items) => items.length,
);

export const savedIsEmptySelector = createSelector(
  [savedProductsSelector],
  (items) => items.length === 0,
);

export const savedIsLoadingSelector = createSelector(
  [selectSavedState],
  (savedState) => savedState.isLoading,
);

export const savedErrorSelector = createSelector(
  [selectSavedState],
  (savedState) => savedState.error,
);
