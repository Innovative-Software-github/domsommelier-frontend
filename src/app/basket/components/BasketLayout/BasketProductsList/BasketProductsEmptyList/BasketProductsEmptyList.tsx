'use client';

import { PRODUCT_TYPES_SEGMENTS, ROUTES } from "../../../../../../constants/routes";
import { Button } from "../../../../../../ui/Button/Button";
import cls from './BasketProductsEmptyList.module.scss';

export const BasketProductsEmptyList: React.FC = () => {
  return (
    <div className={cls.container}>
      <h1 className={cls.title}>В корзине пока ничего нет</h1>
      <p className={cls.description}>Вы можете ознакомиться с нашим каталогом и акциями.</p>
      <Button href={PRODUCT_TYPES_SEGMENTS.wine} className={cls.button}>В каталог</Button>
    </div>
  );
};
