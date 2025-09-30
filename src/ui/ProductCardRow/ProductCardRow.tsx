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
import { Icon } from '../Icon/Icon';
import { IconType } from '../Icon/IconsMapping';

interface IProductCardRowProps {
  option: TProductCard;
  className?: string;
  currentQuantity: number;
  isInBasket?: boolean;
  isFavorite?: boolean;
  onAddToBasket?: (productId: string) => void;
  onUpdateQuantity: (quantity: number) => void;
  onRemoveFromBasket?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
}

export const ProductCardRow: React.FC<IProductCardRowProps> = ({
  option,
  className,
  onAddToBasket,
  onUpdateQuantity,
  onRemoveFromBasket,
  onToggleFavorite,
  currentQuantity = 0,
  isInBasket = false,
  isFavorite = false,
}) => {
  const { id, name, price, discount, productPhoto } = option;

  const handleAddToBasket = () => {
    onAddToBasket?.(id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(newQuantity);
  };

  const handleRemoveFromBasket = () => {
    onRemoveFromBasket?.(id);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(id);
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

      <div className={cls.actionsSection}>
        <button
          className={cls.actionButton}
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Icon 
            type={IconType.Heart_24}
            width={24}
            height={24}
          />
        </button>
        <button
          className={cls.actionButton}
          onClick={handleRemoveFromBasket}
          aria-label="Удалить из корзины"
        >
          <Icon
            type={IconType.Cancel_24}
            width={24}
            height={24}
          />
        </button>
      </div>
    </article>
  );
};
