import { IBaseProduct, TProductCard } from "../products/interfaces/base";

// TODO: сделать типизирование наследуясь от сущности user 
export type TCustomerId = string;
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
