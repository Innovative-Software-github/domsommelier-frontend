import { IBaseProduct, TProductCard } from "../products/interfaces/base";
import { ICustomer } from "../customer/interfaces";

export type TCustomerId = ICustomer['id'];
export type TProductId = IBaseProduct<any, any>['id'];

export interface IBasketItem {
  product: TProductCard;
  quantity: number;
}

export interface IBasketBase {
  customerId: string;
  items: IBasketItem[];
  totalPrice: number;
  discount: number;
  discountedPrice: number;
}

export interface IGetBasketResponse extends IBasketBase {}
export interface IAddToBasketResponse extends IBasketBase {}
export interface IRemoveFromBasketResponse extends IBasketBase {}
