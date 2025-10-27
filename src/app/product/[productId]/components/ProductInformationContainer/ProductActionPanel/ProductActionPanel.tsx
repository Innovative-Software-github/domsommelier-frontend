'use client';

import React from 'react';

import cls from './ProductActionPanel.module.scss';
import { Button } from '../../../../../../ui/Button/Button';
import { Icon } from '../../../../../../ui/Icon/Icon';
import { IconType } from '../../../../../../ui/Icon/IconsMapping';
import { QuantityButton } from '../../../../../../ui/QuantityButton/QuantityButton';
import { useProductPrice } from '../../../../../../hooks/useProductPrice';
import { useProductBasket } from '../../../../../../hooks/basket/useProductBasket';

export interface IProductActionPanelProps {
  productId: string;
  price: number;
  discount?: number | null;
}

export const ProductActionPanel: React.FC<IProductActionPanelProps> = ({
  productId,
  price,
  discount,
}) => {
  const { hasDiscount, currentPrice } = useProductPrice(price, discount);
  const { isInBasket, currentQuantity, handleAddToBasket, handleQuantityChange } = useProductBasket(productId);

  return (
    <div className={cls.container}>
      {hasDiscount && <div className={cls.oldPrice}>{price} ₽</div>}
      <div className={cls.price}>{currentPrice} ₽</div>
      <div className={cls.actions}>
        <Button className={cls.favoriteButton} variant="darkOutlined">
          <Icon className={cls.heartIcon} type={IconType.Heart_24} />
        </Button>
        
        {isInBasket ? (
          <QuantityButton
            theme="white"
            value={currentQuantity}
            onChange={handleQuantityChange}
            className={cls.quantityButton}
          />
        ) : (
          <Button onClick={handleAddToBasket}>
            В корзину
          </Button>
        )}
      </div>
      <div className={cls.delivery}>
        <div className={cls.deliveryText}>Способ получения</div>
        <div className={cls.deliveryAdress}>Самовывоз ул. Первая, д.2</div>
      </div>
    </div>
  );
};
