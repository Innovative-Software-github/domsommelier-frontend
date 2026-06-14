'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/constants/routes';
import { getOrderById, cancelOrder } from '@/services/orders/requests';
import { getProductById } from '@/services/products/requests';
import { IOrderFull } from '@/services/orders/interfaces';
import {
  DEFAULT_STATUS_CLASS_KEY,
  STATUS_CLASS_KEYS,
  STATUS_LABELS,
  formatAmount,
  formatDate,
  mapOrderItemToProductCard,
} from '@/app/profile/utils/orderUtils';
import {
  IOrderDisplayItem,
  OrderProductsList,
} from './components/OrderProductsList/OrderProductsList';
import cls from './OrderDetailLayout.module.scss';

interface IOrderDetailLayoutProps {
  orderId: string;
}

export const OrderDetailLayout: React.FC<IOrderDetailLayoutProps> = ({ orderId }) => {
  const [order, setOrder] = useState<IOrderFull | null>(null);
  const [displayItems, setDisplayItems] = useState<IOrderDisplayItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    getOrderById(orderId)
      .then(async (orderData) => {
        const items = await Promise.all(
          orderData.items.map(async (item) => {
            try {
              const product = await getProductById(item.productId);
              return {
                product: mapOrderItemToProductCard(item, product),
                quantity: item.quantity,
                sum: item.sum,
              };
            } catch {
              return {
                product: mapOrderItemToProductCard(item),
                quantity: item.quantity,
                sum: item.sum,
              };
            }
          }),
        );

        setOrder(orderData);
        setDisplayItems(items);
      })
      .catch(() => setError('Заказ не найден'))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  const handleCancel = async () => {
    setIsCancelling(true);
    setCancelError(null);
    try {
      await cancelOrder(orderId);
      setOrder((prev) => prev ? { ...prev, statusName: 'CANCELLED' } : prev);
      setShowCancelConfirm(false);
    } catch {
      setCancelError('Не удалось отменить заказ. Попробуйте ещё раз.');
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <ContentContainer>
        <div className={cls.pageErrorContainer} style={{ color: '#242424' }}>
          Загрузка...
        </div>
      </ContentContainer>
    );
  }

  if (error || !order) {
    return (
      <ContentContainer>
        <div className={cls.pageErrorContainer}>{error ?? 'Заказ не найден'}</div>
      </ContentContainer>
    );
  }

  const statusLabel = STATUS_LABELS[order.statusName] ?? order.statusName;
  const statusClassKey = STATUS_CLASS_KEYS[order.statusName] ?? DEFAULT_STATUS_CLASS_KEY;
  const statusClass = cls[statusClassKey as keyof typeof cls];
  const canCancel = order.statusName === 'NEW';

  return (
    <ContentContainer>
      <div className={cls.wrapper}>
        <Link href={ROUTES.profileOrders} className={cls.backLink}>
          ← К списку заказов
        </Link>

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

          {canCancel && (
            <div className={cls.cancelBlock}>
              {!showCancelConfirm ? (
                <Button
                  className={cls.cancelButton}
                  variant="darkOutlined"
                  height="H-42"
                  onClick={() => setShowCancelConfirm(true)}
                >
                  Отменить заказ
                </Button>
              ) : (
                <div className={cls.cancelConfirm}>
                  <p className={cls.cancelWarning}>
                    Вы уверены? После отмены восстановить заказ будет невозможно.
                  </p>
                  <div className={cls.cancelActions}>
                    <Button
                      className={cls.confirmButton}
                      height="H-42"
                      onClick={handleCancel}
                      isLoading={isCancelling}
                    >
                      Да, отменить
                    </Button>
                    <Button
                      className={cls.confirmButton}
                      variant="darkOutlined"
                      height="H-42"
                      onClick={() => {
                        setShowCancelConfirm(false);
                        setCancelError(null);
                      }}
                    >
                      Оставить
                    </Button>
                  </div>
                  {cancelError && (
                    <p className={`${cls.feedbackText} ${cls.errorText}`}>{cancelError}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={cls.section}>
          <h2 className={cls.sectionTitle}>Состав заказа</h2>

          <OrderProductsList items={displayItems} />

          <div className={cls.totalRow}>
            <span className={cls.totalLabel}>Итого</span>
            <span className={cls.totalAmount}>{formatAmount(order.totalAmount)}</span>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};
