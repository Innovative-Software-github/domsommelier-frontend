import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import {
  IGetSavedResponse,
  IAddToSavedResponse,
  IRemoveFromSavedResponse,
  TSavedCustomerId,
  TSavedProductId,
} from './interfaces';

/**
 * Грузится в RootLayout на каждой странице сайта (SSR-преднаполнение) — сбой
 * (сеть/таймаут) не должен ронять весь сайт, поэтому здесь фолбэк на null
 * (createSavedInitialState трактует null как "избранного ещё нет").
 */
export const getSaved = async (customerId?: TSavedCustomerId) => {
  if (!customerId) return null;

  try {
    return await customFetch<IGetSavedResponse>({
      path: ApiEndpoint.saved.getSaved(customerId),
      method: 'GET',
      withCredentials: true,
    });
  } catch (error) {
    console.warn('Failed to load saved:', error);
    return null;
  }
};

export const addToSaved = async (
  customerId: TSavedCustomerId,
  productId: TSavedProductId,
) => {
  return customFetch<IAddToSavedResponse>({
    path: ApiEndpoint.saved.addToSaved(customerId, productId),
    method: 'POST',
    withCredentials: true,
  });
};

export const removeFromSaved = async (
  customerId: TSavedCustomerId,
  productId: TSavedProductId,
) => {
  return customFetch<IRemoveFromSavedResponse>({
    path: ApiEndpoint.saved.removeFromSaved(customerId, productId),
    method: 'DELETE',
    withCredentials: true,
  });
};

export const clearSaved = async (customerId: TSavedCustomerId) => {
  return customFetch<null>({
    path: ApiEndpoint.saved.clearSaved(customerId),
    method: 'POST',
    withCredentials: true,
  });
};
