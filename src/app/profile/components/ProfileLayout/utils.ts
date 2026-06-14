import { ICustomer } from '@/services/customer/interfaces';

export type TProfileForm = Pick<ICustomer, 'firstName' | 'secondName' | 'middleName' | 'phone'>;

export const EMPTY_PROFILE_FORM: TProfileForm = {
  firstName: '',
  secondName: '',
  middleName: '',
  phone: '',
};

export function getProfileFormFromCustomer(
  customer: Pick<ICustomer, 'firstName' | 'secondName' | 'middleName' | 'phone'>,
): TProfileForm {
  return {
    firstName: customer.firstName ?? '',
    secondName: customer.secondName ?? '',
    middleName: customer.middleName ?? '',
    phone: customer.phone ?? '',
  };
}
