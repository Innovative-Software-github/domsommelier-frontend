import { TSavedCustomerId, TSavedProductId } from '../../services/saved/interfaces';

export interface IAddToSavedThunkArgs {
  customerId: TSavedCustomerId;
  productId: TSavedProductId;
}

export interface IRemoveFromSavedThunkArgs {
  customerId: TSavedCustomerId;
  productId: TSavedProductId;
}
