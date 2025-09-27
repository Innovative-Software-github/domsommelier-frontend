import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { IAddToBasketRequest, IAddToBasketResponse, IGetBasketResponse, IRemoveFromBasketResponse, TCustomerId, TProductId } from './interfaces';

export const getBasket = async (customerId: TCustomerId) => {
  return customFetch<IGetBasketResponse>({
    path: ApiEndpoint.basket.getBasket(customerId),
    method: 'GET',
    withCredentials: true,
  });
};

export const addToBasket = async (
  customerId: TCustomerId, 
  productId: TProductId, 
  quantity: number,
) => {
  return customFetch<IAddToBasketResponse, IAddToBasketRequest>({
    path: ApiEndpoint.basket.addToBasket(customerId, productId),
    method: 'POST',
    withCredentials: true,
  }, { quantity });
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
