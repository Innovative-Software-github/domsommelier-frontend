import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';

export const checkoutBasket = async (customerId: string, wineStoreId: number): Promise<string> => {
  return customFetch<string>({
    path: ApiEndpoint.orders.checkout(customerId, wineStoreId),
    method: 'POST',
    withCredentials: true,
  });
};
