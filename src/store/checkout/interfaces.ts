export interface ICheckoutData {
  customerName: string;
  customerPhone: string;
  pickupDate: string;
  paymentMethod: string;
}

export interface ICheckoutThunkArgs {
  customerId: string;
  wineStoreId: number;
  checkoutData: ICheckoutData;
}

export interface ICheckoutState {
  isSubmitting: boolean;
  lastOrderId: string | null;
  error: string | null;
}
