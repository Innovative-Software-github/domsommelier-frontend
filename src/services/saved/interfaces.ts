import { TProductCard } from '../products/interfaces/base';
import { ICustomer } from '../customer/interfaces';

export type TSavedCustomerId = ICustomer['id'];
export type TSavedProductId = string;

export interface ISavedItem {
  product: TProductCard;
}

export interface ISavedBase {
  customerId: string;
  items: ISavedItem[];
}

export interface IGetSavedResponse extends ISavedBase {}
export interface IAddToSavedResponse extends ISavedBase {}
export interface IRemoveFromSavedResponse extends ISavedBase {}
