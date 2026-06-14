'use client';

import React, { useEffect, useState } from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { Pagination } from '@/ui/Pagination/Pagination';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/constants/routes';
import { getOrders } from '@/services/orders/requests';
import { IOrderHistoryItem } from '@/services/orders/interfaces';
import { OrderHistoryCard } from '@/app/profile/components/OrderHistoryCard/OrderHistoryCard';
import cls from './OrdersLayout.module.scss';

export const OrdersLayout: React.FC = () => {
  const [orders, setOrders] = useState<IOrderHistoryItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getOrders(page - 1, 10)
      .then((data) => {
        setOrders(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(() => setError('Не удалось загрузить список заказов'))
      .finally(() => setIsLoading(false));
  }, [page]);

  if (isLoading) {
    return (
      <ContentContainer>
        <div className={cls.wrapper}>
          <div className={cls.emptyContainer}>
            <p>Загрузка...</p>
          </div>
        </div>
      </ContentContainer>
    );
  }

  if (error) {
    return (
      <ContentContainer>
        <p className={cls.errorText}>{error}</p>
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
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </ContentContainer>
  );
};
