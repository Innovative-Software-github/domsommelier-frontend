'use client';

import React from 'react';
import { Spinner } from '@/ui/Spinner/Spinner';
import cls from './ProfileOrdersLoading.module.scss';

export const ProfileOrdersLoading: React.FC = () => {
  return (
    <div className={cls.container}>
      <Spinner size="m" />
    </div>
  );
};
