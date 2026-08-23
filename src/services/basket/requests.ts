import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { IAddToBasketResponse, IGetBasketResponse, IRemoveFromBasketResponse, IStoreAvailability, TCustomerId, TProductId } from './interfaces';

// Используется и в RootLayout при SSR, и в getBasketRequest-thunk на клиенте
// (см. store/basket/actions.ts) — thunk сам ловит исключение через
// rejectWithValue, поэтому здесь ошибку не глушим, а пробрасываем. Фолбэк
// на сбой при SSR — забота вызывающей стороны (см. layout.tsx).
export const getBasket = async (customerId?: TCustomerId) => {
  if (!customerId) return null;

  return customFetch<IGetBasketResponse>({
    path: ApiEndpoint.basket.getBasket(customerId),
    method: 'GET',
    withCredentials: true,
  });
};

/** Доступность корзины по винотекам — для блокировки выбора точки без нужных товаров. */
export const getBasketStoreAvailability = async (customerId: TCustomerId) => {
  return customFetch<IStoreAvailability[]>({
    path: ApiEndpoint.basket.storeAvailability(customerId),
    method: 'GET',
    withCredentials: true,
    silentError: true,
  });
};

export const addToBasket = async (
  customerId: TCustomerId,
  productId: TProductId,
  quantity: number,
) => {
  return customFetch<IAddToBasketResponse>({
    path: ApiEndpoint.basket.addToBasket(customerId, productId, quantity),
    method: 'POST',
    withCredentials: true,
  });
};

export const removeFromBasket = async (
  customerId: TCustomerId, 
  productId: TProductId
) => {
  return customFetch<IRemoveFromBasketResponse>({
    path: ApiEndpoint.basket.removeFromBasket(customerId, productId),
    method: 'DELETE',
    withCredentials: true,
  });
};

export const clearBasket = async (customerId: TCustomerId) => {
  return customFetch<null>({
    path: ApiEndpoint.basket.clearBasket(customerId),
    method: 'DELETE',
    withCredentials: true,
  });
};
