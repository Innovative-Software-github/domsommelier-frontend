import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import {
  IGetSavedResponse,
  IAddToSavedResponse,
  IRemoveFromSavedResponse,
  TSavedCustomerId,
  TSavedProductId,
} from './interfaces';

export const getSaved = async (customerId?: TSavedCustomerId) => {
  if (!customerId) return null;

  return customFetch<IGetSavedResponse>({
    path: ApiEndpoint.saved.getSaved(customerId),
    method: 'GET',
    withCredentials: true,
  });
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
