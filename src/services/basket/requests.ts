import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { IAddToBasketResponse, IGetBasketResponse, IRemoveFromBasketResponse, IStoreAvailability, TCustomerId, TProductId } from './interfaces';

/**
 * Грузится в RootLayout на каждой странице сайта (SSR-преднаполнение) — сбой
 * (сеть/таймаут) не должен ронять весь сайт, поэтому здесь фолбэк на null
 * (createBasketInitialState трактует null как "корзины ещё нет").
 */
export const getBasket = async (customerId?: TCustomerId) => {
  if (!customerId) return null;

  try {
    return await customFetch<IGetBasketResponse>({
      path: ApiEndpoint.basket.getBasket(customerId),
      method: 'GET',
      withCredentials: true,
    });
  } catch (error) {
    console.warn('Failed to load basket:', error);
    return null;
  }
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
