import { TCustomerId, TProductId } from "../../services/basket/interfaces";

export interface IAddToCartThunkArgs {
  customerId: TCustomerId;
  productId: TProductId;
  quantity?: number;
}

export interface IRemoveFromCartThunkArgs {
  customerId: TCustomerId;
  productId: TProductId;
}
