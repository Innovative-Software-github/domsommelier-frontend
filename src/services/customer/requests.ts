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

export const updateProfile = (data: Partial<Pick<ICustomer, 'firstName' | 'secondName' | 'middleName' | 'phone'>>) => {
  return customFetch<ICustomer>({
    path: ApiEndpoint.customer.updateProfile,
    method: 'PUT',
    withCredentials: true,
  }, data);
};
