import { ICustomer } from '@/services/customer/interfaces';

export interface IAuthState {
  customer: Partial<ICustomer> | null;
  isAuthenticated: boolean;
}
