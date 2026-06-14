'use client';

import React from 'react';
import { IOrderHistoryItem } from '@/services/orders/interfaces';
import { OrderHistoryCard } from '@/app/profile/components/OrderHistoryCard/OrderHistoryCard';
import cls from './ProfileOrdersList.module.scss';

export interface IProfileOrdersListProps {
  orders: IOrderHistoryItem[];
}

export const ProfileOrdersList: React.FC<IProfileOrdersListProps> = ({ orders }) => {
  return (
    <div className={cls.list}>
      {orders.map((order) => (
        <OrderHistoryCard key={order.id} order={order} />
      ))}
    </div>
  );
};
