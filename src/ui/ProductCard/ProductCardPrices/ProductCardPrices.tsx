import clsx from 'clsx';
import { useProductPrice } from '../../../hooks/useProductPrice';
import { TProductCard } from '../../../services/products/interfaces/base';
import cls from './ProductCardPrices.module.scss';

export interface IProductCardPrices {
  price: TProductCard['price'];
  salePrice?: TProductCard['salePrice'];
  className?: string;
}

export const ProductCardPrices: React.FC<IProductCardPrices> = ({
  price,
  salePrice,
  className,
}) => {
  const { hasSale, currentPrice } = useProductPrice(price, salePrice);

  return (
    <div className={clsx(cls.container, className)}>
      <span className={cls.price}>{currentPrice} ₽</span>
      {hasSale && <span className={cls.oldPrice}>{price} ₽</span>}
    </div>
  );
}