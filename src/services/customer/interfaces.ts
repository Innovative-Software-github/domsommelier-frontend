import type { UserRole } from '../auth/roles';

export interface ICustomer {
  id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  email: string;
  phone: string;
  role?: UserRole;
  /** Личная скидка в процентах, 0 — скидки нет. */
  discountPercent?: number | null;
}

