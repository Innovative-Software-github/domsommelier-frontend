export interface ICheckoutThunkArgs {
  customerId: string;
  wineStoreId: number;
}

export interface ICheckoutState {
  isSubmitting: boolean;
  lastOrderId: string | null;
  error: string | null;
}
