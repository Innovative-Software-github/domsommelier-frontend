'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import { QuantityButton } from '../QuantityButton/QuantityButton';
import { formatProductCardDescription } from './utils';
import { ProductCardPrices } from './ProductCardPrices/ProductCardPrices';
import { ROUTES } from '../../constants/routes';
import { TProductCard } from '../../services/products/interfaces/base';
import cls from './ProductCard.module.scss';

interface IProductCardProps {
  option: TProductCard;
  className?: string;
  currentQuantity: number;
  isInBasket: boolean;
  onAddToBasket: (productId: string) => void;
  onUpdateQuantity: (quantity: number) => void;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  option,
  className,
  onAddToBasket,
  onUpdateQuantity,
  currentQuantity = 0,
  isInBasket = false,
}) => {
  const { id, name, price, discount, productPhoto } = option;

  const handleAddToBasket = () => {
    onAddToBasket(id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(newQuantity);
  };

  return (
    <article className={clsx(cls.card, className)}>
      <Link
        href={`${ROUTES.product}/${id}`}
        target="_blank"
        aria-label={`Перейти к странице товара «${name}»`}
        className={cls.link}
      >
        <div className={cls.imageWrapper}>
          <Image
            src={productPhoto[0]?.url || '/wineBottleCard.png'}
            alt={name}
            fill
            className={cls.image}
            priority
            sizes="(max-width: 768px) 100vw, 305px"
          />
        </div>

        <header className={cls.header}>
          <h3 className={cls.title}>{name}</h3>

          <ProductCardPrices
            price={price}
            discount={discount}
          />

          <p className={cls.description}>
            {formatProductCardDescription(option)}
          </p>
        </header>
      </Link>

      {isInBasket ? (
        <QuantityButton
          value={currentQuantity}
          className={cls.quantityButton}
          onChange={handleQuantityChange}
        />
      ) : (
        <Button
          aria-label={`Добавить «${name}» в корзину`}
          className={cls.button}
          onClick={handleAddToBasket}
        >
          В корзину
        </Button>
      )}
    </article>
  );
};
