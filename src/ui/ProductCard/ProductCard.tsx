'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import { QuantityButton } from '../QuantityButton/QuantityButton';
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconsMapping';
import { formatProductCardDescription } from './utils';
import { ProductCardPrices } from './ProductCardPrices/ProductCardPrices';
import { getProductUrl, ROUTES } from '../../constants/routes';
import { TProductCard } from '../../services/products/interfaces/base';
import cls from './ProductCard.module.scss';

interface IProductCardProps {
  option: TProductCard;
  className?: string;
  currentQuantity: number;
  isInBasket: boolean;
  isProductInBasketLoading: boolean;
  onAddToBasket: (productId: string) => void;
  onUpdateQuantity: (quantity: number) => void;
  isSaved?: boolean;
  isProductSavedLoading?: boolean;
  onToggleFavorite?: () => void;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  option,
  className,
  onAddToBasket,
  onUpdateQuantity,
  onToggleFavorite,
  currentQuantity = 0,
  isInBasket = false,
  isProductInBasketLoading,
  isSaved = false,
  isProductSavedLoading = false,
}) => {
  const { id, name, price, discount, productPhoto } = option;

  const handleAddToBasket = () => {
    onAddToBasket(id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(newQuantity);
  };

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleFavorite?.();
  };

  return (
    <article className={clsx(cls.card, className)}>
      <div className={cls.imageWrapper}>
        {onToggleFavorite && (
          <button
            type="button"
            aria-label={isSaved ? 'Удалить из избранного' : 'Добавить в избранное'}
            className={clsx(cls.favoriteButton, isSaved && cls.favoriteButtonActive)}
            onClick={handleToggleFavorite}
            disabled={isProductSavedLoading}
          >
            <Icon
              className={clsx(cls.heartIcon, isSaved && cls.heartIconActive)}
              type={IconType.Heart_24}
              width={24}
              height={24}
            />
          </button>
        )}
        <Link
          href={getProductUrl(id)}
          target="_blank"
          aria-label={`Перейти к странице товара «${name}»`}
          className={cls.imageLink}
        >
          <Image
            src={productPhoto[0]?.url || '/wineBottleCard.png'}
            alt={name}
            fill
            className={cls.image}
            priority
            sizes="(max-width: 768px) 100vw, 305px"
          />
        </Link>
      </div>

      <Link
        href={getProductUrl(id)}
        target="_blank"
        aria-label={`Перейти к странице товара «${name}»`}
        className={cls.link}
      >
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
          isLoading={isProductInBasketLoading}
        />
      ) : (
        <Button
          aria-label={`Добавить «${name}» в корзину`}
          className={cls.button}
          onClick={handleAddToBasket}
          isLoading={isProductInBasketLoading}
        >
          В корзину
        </Button>
      )}
    </article>
  );
};
