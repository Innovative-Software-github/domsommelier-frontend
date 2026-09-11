'use client';

import React from 'react';
import { formatAmount } from '@/utils/order';
import {
  IOrderDisplayItem,
  OrderProductsList,
} from '@/components/order/OrderProductsList/OrderProductsList';
import cls from './OrderDetailItemsSection.module.scss';

export interface IOrderDetailItemsSectionProps {
  items: IOrderDisplayItem[];
  totalAmount: number;
  /** Снапшот скидок заказа. У заказов до внедрения скидок этих полей нет — строки скрываются. */
  itemsTotal?: number | null;
  saleDiscountAmount?: number | null;
  personalDiscountPercent?: number | null;
  personalDiscountAmount?: number | null;
}

export const OrderDetailItemsSection: React.FC<IOrderDetailItemsSectionProps> = ({
  items,
  totalAmount,
  itemsTotal,
  saleDiscountAmount,
  personalDiscountPercent,
  personalDiscountAmount,
}) => {
  const hasDiscounts = Boolean(saleDiscountAmount) || Boolean(personalDiscountAmount);

  return (
    <div className={cls.section}>
      <h2 className={cls.sectionTitle}>Состав заказа</h2>

      <OrderProductsList items={items} />

      {hasDiscounts && (
        <div className={cls.discountRows}>
          {itemsTotal != null && (
            <div className={cls.discountRow}>
              <span className={cls.discountLabel}>Товары</span>
              <span className={cls.discountValue}>{formatAmount(itemsTotal)}</span>
            </div>
          )}
          {Boolean(saleDiscountAmount) && (
            <div className={cls.discountRow}>
              <span className={cls.discountLabel}>Скидка по акции</span>
              <span className={cls.discountValueRed}>- {formatAmount(saleDiscountAmount!)}</span>
            </div>
          )}
          {Boolean(personalDiscountAmount) && (
            <div className={cls.discountRow}>
              <span className={cls.discountLabel}>
                Ваша скидка {personalDiscountPercent}%
              </span>
              <span className={cls.discountValueRed}>- {formatAmount(personalDiscountAmount!)}</span>
            </div>
          )}
        </div>
      )}

      <div className={cls.totalRow}>
        <span className={cls.totalLabel}>Итого</span>
        <span className={cls.totalAmount}>{formatAmount(totalAmount)}</span>
      </div>
    </div>
  );
};
