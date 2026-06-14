import { ICustomer } from './interfaces';

export function getCustomerDisplayName(
  customer: Partial<Pick<ICustomer, 'firstName' | 'secondName' | 'middleName'>>,
): string {
  return [customer.firstName, customer.middleName, customer.secondName]
    .filter((part) => part?.trim())
    .join(' ')
    .trim();
}
