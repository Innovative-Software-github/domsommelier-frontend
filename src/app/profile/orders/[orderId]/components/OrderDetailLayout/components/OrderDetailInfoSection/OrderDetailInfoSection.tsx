'use client';

import React from 'react';
import { IOrderFull } from '@/services/orders/interfaces';
import {
  DEFAULT_STATUS_CLASS_KEY,
  STATUS_CLASS_KEYS,
  STATUS_LABELS,
  formatDate,
  formatPickupDate,
  PAYMENT_METHOD_LABELS,
} from '@/utils/order';
import { OrderCancelBlock } from '@/components/order/OrderCancelBlock/OrderCancelBlock';
import cls from './OrderDetailInfoSection.module.scss';

export interface IOrderDetailInfoSectionProps {
  order: IOrderFull;
  cancelSuccess: boolean;
  isCancelling: boolean;
  cancelError: string | null;
  onCancel: () => void;
}

export const OrderDetailInfoSection: React.FC<IOrderDetailInfoSectionProps> = ({
  order,
  cancelSuccess,
  isCancelling,
  cancelError,
  onCancel,
}) => {
  const statusLabel = STATUS_LABELS[order.statusName] ?? order.statusName;
  const statusClassKey = STATUS_CLASS_KEYS[order.statusName] ?? DEFAULT_STATUS_CLASS_KEY;
  const statusClass = cls[statusClassKey as keyof typeof cls];
  const canCancel = order.statusName === 'NEW';

  return (
    <div className={cls.section}>
      <div className={cls.statusRow}>
        <span className={cls.orderId}>
          Заказ #{order.id.slice(0, 8).toUpperCase()}
        </span>
        <span className={`${cls.status} ${statusClass}`}>{statusLabel}</span>
      </div>

      <div className={cls.metaGrid}>
        <span className={cls.metaLabel}>Дата оформления</span>
        <span className={cls.metaValue}>{formatDate(order.date)}</span>

        {order.pickupDate && (
          <>
            <span className={cls.metaLabel}>Дата самовывоза</span>
            <span className={cls.metaValue}>{formatPickupDate(order.pickupDate)}</span>
          </>
        )}

        {order.pickupAddress && (
          <>
            <span className={cls.metaLabel}>Самовывоз из</span>
            <span className={cls.metaValue}>{order.pickupAddress}</span>
          </>
        )}

        {order.customerName && (
          <>
            <span className={cls.metaLabel}>Имя</span>
            <span className={cls.metaValue}>{order.customerName}</span>
          </>
        )}

        {order.customerPhone && (
          <>
            <span className={cls.metaLabel}>Телефон</span>
            <span className={cls.metaValue}>{order.customerPhone}</span>
          </>
        )}

        {order.paymentMethod && (
          <>
            <span className={cls.metaLabel}>Оплата</span>
            <span className={cls.metaValue}>
              {PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}
            </span>
          </>
        )}
      </div>

      {cancelSuccess && (
        <p className={cls.cancelSuccessText}>Заказ успешно отменён.</p>
      )}

      {canCancel && (
        <OrderCancelBlock
          isCancelling={isCancelling}
          cancelError={cancelError}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};
