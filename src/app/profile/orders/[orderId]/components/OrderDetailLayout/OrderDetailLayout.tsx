'use client';

import React from 'react';
import Link from 'next/link';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Button } from '@/ui/Button/Button';
import { Spinner } from '@/ui/Spinner/Spinner';
import { ROUTES } from '@/constants/routes';
import { useOrderDetail } from '@/hooks/order/useOrderDetail';
import { OrderDetailInfoSection } from './components/OrderDetailInfoSection/OrderDetailInfoSection';
import { OrderDetailItemsSection } from './components/OrderDetailItemsSection/OrderDetailItemsSection';
import cls from './OrderDetailLayout.module.scss';

interface IOrderDetailLayoutProps {
  orderId: string;
}

export const OrderDetailLayout: React.FC<IOrderDetailLayoutProps> = ({ orderId }) => {
  const {
    order,
    displayItems,
    isLoading,
    error,
    reload,
    cancel,
    isCancelling,
    cancelError,
    cancelSuccess,
  } = useOrderDetail(orderId);

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
            <Button variant="outlined" height="H-42" onClick={reload}>
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
          onCancel={cancel}
        />

        <OrderDetailItemsSection
          items={displayItems}
          totalAmount={order.totalAmount}
        />
      </div>
    </ContentContainer>
  );
};
