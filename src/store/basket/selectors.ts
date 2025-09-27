import { createSelector } from '@reduxjs/toolkit';
import { IStore } from '../interfaces';

const selectBasketState = (state: IStore) => state.basketReducer;

export const basketSelector = createSelector(
  [selectBasketState],
  (basketState) => basketState.basket
);

export const basketItemsSelector = createSelector(
  [basketSelector],
  (basket) => basket.items
);

// Мемоизированный селектор для Map товаров в корзине
export const basketItemsMapSelector = createSelector(
  [basketItemsSelector],
  (items) => {
    const itemsMap = new Map();
    items.forEach(item => {
      itemsMap.set(item.product.id, item);
    });
    return itemsMap;
  }
);

// Быстрая проверка наличия товара в корзине
export const isProductInBasketSelector = createSelector(
  [basketItemsMapSelector, (_, productId: string) => productId],
  (itemsMap, productId) => itemsMap.has(productId)
);

// Получение количества товара в корзине
export const getProductQuantitySelector = createSelector(
  [basketItemsMapSelector, (_, productId: string) => productId],
  (itemsMap, productId) => itemsMap.get(productId)?.quantity || 0
);

export const basketTotalPriceSelector = createSelector(
  [basketSelector],
  (basket) => basket.totalPrice
);

export const basketDiscountSelector = createSelector(
  [basketSelector],
  (basket) => basket.discount
);

export const basketDiscountedPriceSelector = createSelector(
  [basketSelector],
  (basket) => basket.discountedPrice
);

export const basketCustomerIdSelector = createSelector(
  [basketSelector],
  (basket) => basket.customerId
);

export const basketItemsCountSelector = createSelector(
  [basketItemsSelector],
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
  [basketItemsSelector],
  (items) => items.length === 0
);

export const basketItemByIdSelector = createSelector(
  [basketItemsSelector, (_, productId: string) => productId],
  (items, productId) => items.find(item => item.product.id === productId)
);
