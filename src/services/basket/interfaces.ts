import { IBaseProduct, TProductCard } from "../products/interfaces/base";
import { ICustomer } from "../customer/interfaces";

export type TCustomerId = ICustomer['id'];
export type TProductId = IBaseProduct<any, any>['id'];

export interface IBasketItem {
  product: TProductCard;
  quantity: number;
  /** Цена за штуку с учётом акции — считает бэкенд. */
  unitEffectivePrice: number;
  /** unitEffectivePrice × quantity. */
  lineTotal: number;
}

/**
 * Все суммы считает бэкенд (BasketPriceCalculator) — фронт только отображает их
 * и никогда не умножает цены на проценты.
 */
export interface IBasketBase {
  customerId: string;
  items: IBasketItem[];
  /** Сумма позиций по прайсу, до скидок. */
  itemsTotal: number;
  /** Экономия за счёт акционных цен товаров. */
  saleDiscountAmount: number;
  /** Процент личной скидки клиента (0 — скидки нет). */
  personalDiscountPercent: number;
  /** Личная скидка в рублях. На акционные товары не начисляется. */
  personalDiscountAmount: number;
  promoDiscountPercent: number;
  promoDiscountAmount: number;
  totalDiscountAmount: number;
  /** Сумма к оплате. */
  payableTotal: number;
}

export interface IGetBasketResponse extends IBasketBase {}
export interface IAddToBasketResponse extends IBasketBase {}
export interface IRemoveFromBasketResponse extends IBasketBase {}

/** Доступность корзины в конкретной винотеке (для модалки выбора винотеки). */
export interface IStoreAvailability {
  wineStoreId: number;
  available: boolean;
  unavailableProducts: string[];
}
