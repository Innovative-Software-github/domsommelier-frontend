'use client';

import React from 'react';
import { IOrderHistoryItem } from '@/services/orders/interfaces';
import { ProfileOrdersList } from '../ProfileOrdersList/ProfileOrdersList';
import { ProfileOrdersPagination } from '../ProfileOrdersPagination/ProfileOrdersPagination';

export interface IProfileOrdersContentProps {
  orders: IOrderHistoryItem[];
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

export const ProfileOrdersContent: React.FC<IProfileOrdersContentProps> = ({
  orders,
  totalPages,
  page,
  onPageChange,
}) => {
  return (
    <>
      <ProfileOrdersList orders={orders} />
      <ProfileOrdersPagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};
