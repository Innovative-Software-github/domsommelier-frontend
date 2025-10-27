'use client';

import clsx from 'clsx';
import cls from './ProductCardRowPrice.module.scss';
import { useProductPrice } from '../../../hooks/useProductPrice';
import { TProductCard } from '../../../services/products/interfaces/base';

interface IProductCardRowPriceProps {
  price: TProductCard['price'];
  discount: TProductCard['discount'];
}

export const ProductCardRowPrice: React.FC<IProductCardRowPriceProps> = ({
  price,
  discount,
}) => {
  const { hasDiscount, currentPrice } = useProductPrice(price, discount);

  return (
    <div className={cls.priceSection}>
      <p className={cls.price}>{currentPrice} ₽</p>
      {hasDiscount && (
        <p className={cls.oldPrice}>{price} ₽</p>
      )}
    </div>
  );
};
