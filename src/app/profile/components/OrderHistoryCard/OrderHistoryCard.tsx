'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { getOrderUrl } from '@/constants/routes';
import { IOrderHistoryItem } from '@/services/orders/interfaces';
import {
  DEFAULT_STATUS_CLASS_KEY,
  STATUS_CLASS_KEYS,
  STATUS_LABELS,
  formatAmount,
  formatDate,
} from '@/app/profile/utils/orderUtils';
import cls from './OrderHistoryCard.module.scss';

export interface IOrderHistoryCardProps {
  order: IOrderHistoryItem;
  variant?: 'nested' | 'standalone';
}

export const OrderHistoryCard: React.FC<IOrderHistoryCardProps> = ({
  order,
  variant = 'nested',
}) => {
  const statusLabel = STATUS_LABELS[order.statusName] ?? order.statusName;
  const statusClassKey = STATUS_CLASS_KEYS[order.statusName] ?? DEFAULT_STATUS_CLASS_KEY;
  const statusClass = cls[statusClassKey as keyof typeof cls];

  return (
    <Link
      href={getOrderUrl(order.id)}
      className={clsx(cls.card, variant === 'standalone' && cls.cardStandalone)}
    >
      <div className={cls.left}>
        <span className={cls.orderId}>Заказ #{order.id.slice(0, 8).toUpperCase()}</span>
        <span className={cls.preview}>{order.previewText}</span>
        <div className={cls.meta}>
          <span className={`${cls.status} ${statusClass}`}>{statusLabel}</span>
          <span className={cls.date}>{formatDate(order.date)}</span>
        </div>
      </div>
      <div className={cls.right}>
        <span className={cls.amount}>{formatAmount(order.totalAmount)}</span>
        <span className={cls.arrow}>›</span>
      </div>
    </Link>
  );
};
