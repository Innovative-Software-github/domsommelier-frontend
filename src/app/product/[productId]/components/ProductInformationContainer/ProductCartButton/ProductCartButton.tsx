'use client';

import React from 'react';
import { useProductPrice } from '../../../../../../hooks/useProductPrice';
import { Button } from '../../../../../../ui/Button/Button';
import { QuantityButton } from '../../../../../../ui/QuantityButton/QuantityButton';
import { useProductBasket } from '../../../../../../hooks/basket/useProductBasket';
import cls from './ProductCartButton.module.scss';

export interface IProductCartButtonProps {
  productId: string;
  price: number;
  discount?: number | null;
}

export const ProductCartButton: React.FC<IProductCartButtonProps> = ({
  productId,
  price,
  discount,
}) => {
  const { currentPrice } = useProductPrice(price, discount);
  const { isInBasket, currentQuantity, handleAddToBasket, handleQuantityChange } = useProductBasket(productId);

  return (
    <div className={cls.container}>
      {isInBasket ? (
        <QuantityButton
          value={currentQuantity}
          className={cls.quantityButton}
          onChange={handleQuantityChange}
        />
      ) : (
        <Button className={cls.buyButton} onClick={handleAddToBasket}>
          <p>В корзину</p>
          <p>{currentPrice} ₽</p>
        </Button>
      )}
      <div className={cls.delivery}>
        Способ получения: Самовывоз ул. Первая, д.2
      </div>
    </div>
  );
};