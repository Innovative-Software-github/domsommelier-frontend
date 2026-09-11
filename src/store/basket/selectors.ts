import { createSelector } from '@reduxjs/toolkit';
import { IStore } from '../interfaces';

const selectBasketState = (state: IStore) => state.basketReducer;

export const basketSelector = createSelector(
  [selectBasketState],
  (basketState) => basketState.basket
);

export const basketProductsSelector = createSelector(
  [basketSelector],
  (basket) => basket?.items ?? [],
);

export const basketProductsMapSelector = createSelector(
  [basketProductsSelector],
  (items) => {
    const itemsMap = new Map();
    items.forEach((item) => {
      const productId = item.product?.id;

      if (productId) {
        itemsMap.set(productId, item);
      }
    });
    return itemsMap;
  },
);

export const isProductInBasketSelector = createSelector(
  [basketProductsMapSelector, (_, productId: string) => productId],
  (itemsMap, productId) => itemsMap.has(productId),
);

export const getProductQuantitySelector = createSelector(
  [basketProductsMapSelector, (_, productId: string) => productId],
  (itemsMap, productId) => itemsMap.get(productId)?.quantity || 0,
);

export const basketItemsTotalSelector = createSelector(
  [basketSelector],
  (basket) => basket?.itemsTotal ?? 0,
);

export const basketSaleDiscountSelector = createSelector(
  [basketSelector],
  (basket) => basket?.saleDiscountAmount ?? 0,
);

export const basketPersonalDiscountPercentSelector = createSelector(
  [basketSelector],
  (basket) => basket?.personalDiscountPercent ?? 0,
);

export const basketPersonalDiscountSelector = createSelector(
  [basketSelector],
  (basket) => basket?.personalDiscountAmount ?? 0,
);

export const basketPromoDiscountSelector = createSelector(
  [basketSelector],
  (basket) => basket?.promoDiscountAmount ?? 0,
);

export const basketPayableTotalSelector = createSelector(
  [basketSelector],
  (basket) => basket?.payableTotal ?? 0,
);

export const basketCustomerIdSelector = createSelector(
  [basketSelector],
  (basket) => basket?.customerId ?? '',
);

export const basketProductsCountSelector = createSelector(
  [basketProductsSelector],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const basketIsLoadingSelector = createSelector(
  [selectBasketState],
  (basketState) => basketState.isLoading
);

export const basketErrorSelector = createSelector(
  [selectBasketState],
  (basketState) => basketState.error
);

export const basketIsEmptySelector = createSelector(
  [basketProductsSelector],
  (items) => items.length === 0
);

export const basketProductByIdSelector = createSelector(
  [basketProductsSelector, (_, productId: string) => productId],
  (items, productId) => items.find(item => item.product.id === productId)
);
