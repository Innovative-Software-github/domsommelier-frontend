'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { QuantityButton } from '../QuantityButton/QuantityButton';
import { formatProductCardDescription } from '../ProductCard/utils';
import { ProductCardPrices } from '../ProductCard/ProductCardPrices/ProductCardPrices';
import { ROUTES } from '../../constants/routes';
import { TProductCard } from '../../services/products/interfaces/base';
import cls from './ProductCardRow.module.scss';
import { Button } from '../Button/Button';

interface IProductCardRowProps {
  option: TProductCard;
  className?: string;
  currentQuantity: number;
  isInBasket?: boolean;
  onAddToBasket?: (productId: string) => void;
  onUpdateQuantity: (quantity: number) => void;
}

export const ProductCardRow: React.FC<IProductCardRowProps> = ({
  option,
  className,
  onAddToBasket,
  onUpdateQuantity,
  currentQuantity = 0,
  isInBasket = false,
}) => {
  const { id, name, price, discount, productPhoto } = option;

  const handleAddToBasket = () => {
    onAddToBasket?.(id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(newQuantity);
  };

  return (
    <article className={clsx(cls.card, className)}>
      <div className={cls.imageSection}>
        <Link
          href={`${ROUTES.product}/${id}`}
          aria-label={`Перейти к странице товара «${name}»`}
          className={cls.imageLink}
        >
          <div className={cls.imageWrapper}>
            <Image
              src={productPhoto[0]?.url || '/wineBottleCard.png'}
              alt={name}
              fill
              className={cls.image}
              priority
              sizes="80px"
            />
          </div>
        </Link>
      </div>

      <div className={cls.contentSection}>
        <Link
          href={`${ROUTES.product}/${id}`}
          aria-label={`Перейти к странице товара «${name}»`}
          className={cls.contentLink}
        >
          <h3 className={cls.title}>{name}</h3>
          <p className={cls.description}>
            {formatProductCardDescription(option)}
          </p>
        </Link>
      </div>

      <div className={cls.quantitySection}>
        {isInBasket ? (
          <QuantityButton
            value={currentQuantity}
            onChange={handleQuantityChange}
            className={cls.quantityButton}
          />
        ) : (
          <Button
            aria-label={`Добавить «${name}» в корзину`}
            className={cls.addButton}
            onClick={handleAddToBasket}
          >
            В корзину
          </Button>
        )}
      </div>

      <div className={cls.priceSection}>
        <p className={cls.price}>{price} ₽</p>
      </div>
    </article>
  );
};
