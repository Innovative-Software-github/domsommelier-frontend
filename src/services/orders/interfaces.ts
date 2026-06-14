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
  totalAmount: number;
  items: IOrderedProduct[];
}

export interface IOrdersPage {
  content: IOrderHistoryItem[];
  totalPages: number;
  totalElements: number;
  number: number;
}
