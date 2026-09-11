export interface ICheckoutResponse {
  orderId: string;
}

export interface IOrderHistoryItem {
  id: string;
  date: string;
  totalAmount: number;
  statusName: string;
  previewText: string;
}

export interface IOrderedProduct {
  productId: string;
  name: string;
  article: string;
  quantity: number;
  price: number;
  sum: number;
}

export interface IOrderFull {
  id: string;
  date: string;
  statusName: string;
  pickupAddress: string;
  /** Сумма к оплате — после всех скидок. */
  totalAmount: number;
  /** Снапшот скидок на момент оформления. У заказов до внедрения скидок — undefined. */
  itemsTotal?: number | null;
  saleDiscountAmount?: number | null;
  personalDiscountPercent?: number | null;
  personalDiscountAmount?: number | null;
  items: IOrderedProduct[];
  customerPhone?: string;
  customerName?: string;
  pickupDate?: string;
  paymentMethod?: string;
  storeName?: string;
  storeAddress?: string;
  storePhone?: string;
  storeWorkingHours?: string;
}

export interface IOrdersPage {
  content: IOrderHistoryItem[];
  totalPages: number;
  totalElements: number;
  number: number;
}
