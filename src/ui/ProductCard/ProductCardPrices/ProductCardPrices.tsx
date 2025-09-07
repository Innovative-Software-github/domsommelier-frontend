import { useProductPrice } from '../../../hooks/useProductPrice';
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
  const { hasDiscount, currentPrice } = useProductPrice(price, discount);

  return (
    <div className={cls.container}>
      <span className={cls.price}>{currentPrice} ₽</span>
      {hasDiscount && <span className={cls.oldPrice}>{price} ₽</span>}
    </div>
  );
}