'use client';

import React from 'react';
import { IOrderFull } from '@/services/orders/interfaces';
import {
  DEFAULT_STATUS_CLASS_KEY,
  STATUS_CLASS_KEYS,
  STATUS_LABELS,
  formatDate,
} from '@/app/profile/utils/orderUtils';
import { OrderCancelBlock } from '../OrderCancelBlock/OrderCancelBlock';
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

        {order.pickupAddress && (
          <>
            <span className={cls.metaLabel}>Самовывоз из</span>
            <span className={cls.metaValue}>{order.pickupAddress}</span>
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
