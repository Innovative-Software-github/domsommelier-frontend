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
}

export const OrderDetailItemsSection: React.FC<IOrderDetailItemsSectionProps> = ({
  items,
  totalAmount,
}) => {
  return (
    <div className={cls.section}>
      <h2 className={cls.sectionTitle}>Состав заказа</h2>

      <OrderProductsList items={items} />

      <div className={cls.totalRow}>
        <span className={cls.totalLabel}>Итого</span>
        <span className={cls.totalAmount}>{formatAmount(totalAmount)}</span>
      </div>
    </div>
  );
};
