'use client';

import React from 'react';
import { Pagination } from '@/ui/Pagination/Pagination';
import cls from './ProfileOrdersPagination.module.scss';

export interface IProfileOrdersPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProfileOrdersPagination: React.FC<IProfileOrdersPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={cls.container}>
      <Pagination
        page={page}
        count={totalPages}
        siblingCount={1}
        boundaryCount={2}
        onChange={onPageChange}
      />
    </div>
  );
};
