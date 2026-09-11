'use client';

import clsx from 'clsx';
import cls from './ProductCardRowPrice.module.scss';
import { useProductPrice } from '../../../hooks/useProductPrice';
import { TProductCard } from '../../../services/products/interfaces/base';

interface IProductCardRowPriceProps {
  price: TProductCard['price'];
  salePrice: TProductCard['salePrice'];
}

export const ProductCardRowPrice: React.FC<IProductCardRowPriceProps> = ({
  price,
  salePrice,
}) => {
  const { hasSale, currentPrice } = useProductPrice(price, salePrice);

  return (
    <div className={cls.priceSection}>
      <p className={cls.price}>{currentPrice} ₽</p>
      {hasSale && (
        <p className={cls.oldPrice}>{price} ₽</p>
      )}
    </div>
  );
};
