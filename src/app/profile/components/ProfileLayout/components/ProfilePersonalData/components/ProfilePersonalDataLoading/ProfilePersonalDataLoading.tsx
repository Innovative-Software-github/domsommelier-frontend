'use client';

import React from 'react';
import { Spinner } from '@/ui/Spinner/Spinner';
import cls from './ProfilePersonalDataLoading.module.scss';

export const ProfilePersonalDataLoading: React.FC = () => {
  return (
    <div className={cls.container}>
      <Spinner size="m" />
    </div>
  );
};
