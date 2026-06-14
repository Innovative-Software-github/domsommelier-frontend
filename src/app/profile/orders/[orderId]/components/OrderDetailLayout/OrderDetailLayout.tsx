'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Button } from '@/ui/Button/Button';
import { Spinner } from '@/ui/Spinner/Spinner';
import { ROUTES } from '@/constants/routes';
import { getOrderById, cancelOrder } from '@/services/orders/requests';
import { getProductById } from '@/services/products/requests';
import { IOrderFull } from '@/services/orders/interfaces';
import { mapOrderItemToProductCard } from '@/app/profile/utils/orderUtils';
import { IOrderDisplayItem } from './components/OrderProductsList/OrderProductsList';
import { OrderDetailInfoSection } from './components/OrderDetailInfoSection/OrderDetailInfoSection';
import { OrderDetailItemsSection } from './components/OrderDetailItemsSection/OrderDetailItemsSection';
import cls from './OrderDetailLayout.module.scss';

interface IOrderDetailLayoutProps {
  orderId: string;
}

export const OrderDetailLayout: React.FC<IOrderDetailLayoutProps> = ({ orderId }) => {
  const [order, setOrder] = useState<IOrderFull | null>(null);
  const [displayItems, setDisplayItems] = useState<IOrderDisplayItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);

  const loadOrder = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
    getOrderById(orderId)
      .then(async (orderData) => {
        const items = await Promise.all(
          orderData.items.map(async (item) => {
            try {
              const product = await getProductById(item.productId);
              return { product: mapOrderItemToProductCard(item, product), quantity: item.quantity, sum: item.sum };
            } catch {
              return { product: mapOrderItemToProductCard(item), quantity: item.quantity, sum: item.sum };
            }
          }),
        );
        setOrder(orderData);
        setDisplayItems(items);
      })
      .catch(() => setError('Не удалось загрузить заказ'))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleCancel = async () => {
    setIsCancelling(true);
    setCancelError(null);
    try {
      await cancelOrder(orderId);
      setOrder((prev) => (prev ? { ...prev, statusName: 'CANCELLED' } : prev));
      setCancelSuccess(true);
    } catch {
      setCancelError('Не удалось отменить заказ. Попробуйте ещё раз.');
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <ContentContainer>
        <div className={cls.pageLoadingContainer}>
          <Spinner size="m" />
        </div>
      </ContentContainer>
    );
  }

  if (error || !order) {
    return (
      <ContentContainer>
        <div className={cls.pageErrorContainer}>
          <p>{error ?? 'Заказ не найден'}</p>
          <div className={cls.errorActions}>
            <Button variant="outlined" height="H-42" onClick={loadOrder}>
              Повторить
            </Button>
            <Button variant="darkOutlined" height="H-42" href={ROUTES.profileOrders}>
              К списку заказов
            </Button>
          </div>
        </div>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <div className={cls.wrapper}>
        <Link href={ROUTES.profileOrders} className={cls.backLink}>
          ← К списку заказов
        </Link>

        <OrderDetailInfoSection
          order={order}
          cancelSuccess={cancelSuccess}
          isCancelling={isCancelling}
          cancelError={cancelError}
          onCancel={handleCancel}
        />

        <OrderDetailItemsSection
          items={displayItems}
          totalAmount={order.totalAmount}
        />
      </div>
    </ContentContainer>
  );
};
