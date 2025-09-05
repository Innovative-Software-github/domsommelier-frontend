import { TProductCard } from '../../../services/products/interfaces/base';
import cls from './ProductCardPrices.module.scss';

export interface IProductCardPrices {
  price: TProductCard['price'];
  discount?: TProductCard['discount'];
}

export const ProductCardPrices: React.FC<IProductCardPrices> = ({
  price,
  discount,
}) => {
  const hasDiscount = typeof discount === 'number' && discount > 0;
  const current = hasDiscount ? discount! : price;

  return (
    <div className={cls.container}>
      <span className={cls.price}>{current} ₽</span>
      {hasDiscount && <span className={cls.oldPrice}>{price} ₽</span>}
    </div>
  );
}