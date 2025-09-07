'use client';

import React from 'react';

import cls from './ProductActionPanel.module.scss';
import { Button } from '../../../../../../ui/Button/Button';
import { Icon } from '../../../../../../ui/Icon/Icon';
import { IconType } from '../../../../../../ui/Icon/IconsMapping';

export const ProductActionPanel: React.FC = () => {
  return (
    <div className={cls.container}>
      <div className={cls.oldPrice}>2 489 ₽</div>
      <div className={cls.price}>2 364 ₽</div>
      <div className={cls.actions}>
        <Button className={cls.favoriteButton} variant="darkOutlined">
          <Icon className={cls.heartIcon} type={IconType.Heart_24} />
        </Button>
        <Button>В корзину</Button>
      </div>
      <div className={cls.delivery}>
        <div className={cls.deliveryText}>Способ получения</div>
        <div className={cls.deliveryAdress}>Самовывоз ул. Первая, д.2</div>
      </div>
    </div>
  );
};
