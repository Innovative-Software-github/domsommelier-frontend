'use client';

import React from 'react';
import { IOrderHistoryItem } from '@/services/orders/interfaces';
import { ProfileOrdersEmpty } from '../ProfileOrdersEmpty/ProfileOrdersEmpty';
import { ProfileOrdersContent } from './components/ProfileOrdersContent/ProfileOrdersContent';
import { ProfileOrdersError } from './components/ProfileOrdersError/ProfileOrdersError';
import { ProfileOrdersLoading } from './components/ProfileOrdersLoading/ProfileOrdersLoading';
import cls from './ProfileOrders.module.scss';

export interface IProfileOrdersProps {
  orders: IOrderHistoryItem[];
  totalPages: number;
  page: number;
  isLoading: boolean;
  error: string | null;
  onPageChange: (page: number) => void;
}

export const ProfileOrders: React.FC<IProfileOrdersProps> = ({
  orders,
  totalPages,
  page,
  isLoading,
  error,
  onPageChange,
}) => {
  const hasOrders = !isLoading && !error && orders.length > 0;

  return (
    <div className={cls.section}>
      <h2 className={cls.sectionTitle}>Мои заказы</h2>

      {isLoading && <ProfileOrdersLoading />}
      {!isLoading && error && <ProfileOrdersError message={error} />}
      {!isLoading && !error && orders.length === 0 && <ProfileOrdersEmpty />}
      {hasOrders && (
        <ProfileOrdersContent
          orders={orders}
          totalPages={totalPages}
          page={page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
