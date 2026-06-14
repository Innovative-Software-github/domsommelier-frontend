'use client';

import React from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Pagination } from '@/ui/Pagination/Pagination';
import { Button } from '@/ui/Button/Button';
import { Spinner } from '@/ui/Spinner/Spinner';
import { ROUTES } from '@/constants/routes';
import { useProfileOrders } from '@/hooks/profile/useProfileOrders';
import { OrderHistoryCard } from '@/app/profile/components/OrderHistoryCard/OrderHistoryCard';
import cls from './OrdersLayout.module.scss';

export const OrdersLayout: React.FC = () => {
  const { orders, totalPages, page, isLoading, error, loadOrders, handlePageChange } =
    useProfileOrders();

  if (isLoading) {
    return (
      <ContentContainer>
        <div className={cls.wrapper}>
          <div className={cls.loadingContainer}>
            <Spinner size="m" />
          </div>
        </div>
      </ContentContainer>
    );
  }

  if (error) {
    return (
      <ContentContainer>
        <div className={cls.errorContainer}>
          <p className={cls.errorText}>{error}</p>
          <button className={cls.retryButton} onClick={() => loadOrders(page)} type="button">
            Повторить
          </button>
        </div>
      </ContentContainer>
    );
  }

  if (orders.length === 0) {
    return (
      <ContentContainer>
        <div className={cls.emptyContainer}>
          <h2 className={cls.emptyTitle}>Заказов пока нет</h2>
          <p className={cls.emptyDescription}>Оформите первый заказ в нашем каталоге</p>
          <Button className={cls.emptyButton} href={ROUTES.catalog} height="H-42">
            В каталог
          </Button>
        </div>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <div className={cls.wrapper}>
        {orders.map((order) => (
          <OrderHistoryCard key={order.id} order={order} variant="standalone" />
        ))}

        {totalPages > 1 && (
          <div className={cls.pagination}>
            <Pagination
              page={page}
              count={totalPages}
              siblingCount={1}
              boundaryCount={2}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </ContentContainer>
  );
};
