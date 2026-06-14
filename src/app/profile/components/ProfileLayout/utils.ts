import { ICustomer } from '@/services/customer/interfaces';

export type TProfileForm = Pick<ICustomer, 'firstName' | 'secondName' | 'middleName'>;

export const EMPTY_PROFILE_FORM: TProfileForm = {
  firstName: '',
  secondName: '',
  middleName: '',
};

export function getProfileFormFromCustomer(
  customer: Pick<ICustomer, 'firstName' | 'secondName' | 'middleName'>,
): TProfileForm {
  return {
    firstName: customer.firstName ?? '',
    secondName: customer.secondName ?? '',
    middleName: customer.middleName ?? '',
  };
}
