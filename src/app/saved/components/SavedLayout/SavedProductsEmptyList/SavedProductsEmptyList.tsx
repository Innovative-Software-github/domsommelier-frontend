'use client';

import { PRODUCT_TYPES_SEGMENTS } from '../../../../../constants/routes';
import { Button } from '../../../../../ui/Button/Button';

import cls from './SavedProductsEmptyList.module.scss';

export const SavedProductsEmptyList: React.FC = () => {
  return (
    <div className={cls.container}>
      <h1 className={cls.title}>В избранном пока ничего нет</h1>
      <p className={cls.description}>Вы можете ознакомиться с нашим каталогом и добавить понравившиеся товары.</p>
      <Button href={PRODUCT_TYPES_SEGMENTS.wine} className={cls.button}>В каталог</Button>
    </div>
  );
};
