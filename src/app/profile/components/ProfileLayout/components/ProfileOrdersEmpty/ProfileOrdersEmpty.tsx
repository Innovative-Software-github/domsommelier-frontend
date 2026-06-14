'use client';

import React from 'react';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/constants/routes';
import cls from './ProfileOrdersEmpty.module.scss';

export const ProfileOrdersEmpty: React.FC = () => {
  return (
    <div className={cls.container}>
      <p className={cls.text}>Заказов пока нет</p>
      <Button className={cls.button} href={ROUTES.catalog} height="H-42">
        В каталог
      </Button>
    </div>
  );
};
