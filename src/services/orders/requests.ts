import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { IOrderFull, IOrdersPage } from './interfaces';

export const checkoutBasket = async (customerId: string, wineStoreId: number): Promise<string> => {
  return customFetch<string>({
    path: ApiEndpoint.orders.checkout(customerId, wineStoreId),
    method: 'POST',
    withCredentials: true,
  });
};

export const getOrders = (page = 0, size = 10): Promise<IOrdersPage> => {
  return customFetch<IOrdersPage>({
    path: ApiEndpoint.orders.list(page, size),
    method: 'GET',
    withCredentials: true,
  });
};

export const getOrderById = (orderId: string): Promise<IOrderFull> => {
  return customFetch<IOrderFull>({
    path: ApiEndpoint.orders.getById(orderId),
    method: 'GET',
    withCredentials: true,
  });
};

export const cancelOrder = (orderId: string): Promise<void> => {
  return customFetch<void>({
    path: ApiEndpoint.orders.cancel(orderId),
    method: 'POST',
    withCredentials: true,
  });
};
