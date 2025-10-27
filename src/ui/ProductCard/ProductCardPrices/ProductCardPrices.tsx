import clsx from 'clsx';
import { useProductPrice } from '../../../hooks/useProductPrice';
import { TProductCard } from '../../../services/products/interfaces/base';
import cls from './ProductCardPrices.module.scss';

export interface IProductCardPrices {
  price: TProductCard['price'];
  discount?: TProductCard['discount'];
  className?: string;
}

export const ProductCardPrices: React.FC<IProductCardPrices> = ({
  price,
  discount,
  className,
}) => {
  const { hasDiscount, currentPrice } = useProductPrice(price, discount);

  return (
    <div className={clsx(cls.container, className)}>
      <span className={cls.price}>{currentPrice} ₽</span>
      {hasDiscount && <span className={cls.oldPrice}>{price} ₽</span>}
    </div>
  );
}