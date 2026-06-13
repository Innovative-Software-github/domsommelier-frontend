import { customFetch } from '../config/customFetch';
import { ApiEndpoint } from '../config/apiEndpoints';
import { ICustomer } from './interfaces';

export const getProfile = () => {
  return customFetch<ICustomer>({
    path: ApiEndpoint.customer.getProfile,
    method: 'GET',
    withErrorHandling: false,
  });
};
