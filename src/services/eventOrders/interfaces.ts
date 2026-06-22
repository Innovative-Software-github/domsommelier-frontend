export interface ICreateEventOrderRequest {
  name: string;
  phone: string;
  comment?: string;
}

/** Бэкенд возвращает UUID созданной заявки строкой. */
export type TCreateEventOrderResponse = string;
