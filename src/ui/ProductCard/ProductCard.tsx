'use client';

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import { formatWineDescription } from './utils';
import { ProductCardPrices } from './ProductCardPrices/ProductCardPrices';
import { ROUTES } from '../../constants/routes';
import { IProductCard } from '../../services/products/interfaces/base';
import cls from './ProductCard.module.scss';

interface IProductCardProps {
  options: IProductCard;
  className?: string;
}

export const ProductCard: React.FC<IProductCardProps> = ({
  options,
  className,
}) => {
  const { id, article, name, price, discount, productCountry, productCategoryName, productPhoto } =
    options;

  return (
    <article className={clsx(cls.card, className)}>
      <Link
        href={`${ROUTES.product}/${id}`}
        aria-label={`Перейти к странице товара «${name}»`}
        className={cls.link}
      >
        <div className={cls.imageWrapper}>
          <Image
            src={'/wineBottleCard.png'}
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
            current={price}
            old={discount}
            showOld={discount > 0}
          />

          <p className={cls.description}>
            {formatWineDescription(productCountry)}
          </p>
        </header>
      </Link>

      <Button
        aria-label={`Добавить «${name}» в корзину`}
        className={cls.button}
      >
        В корзину
      </Button>
    </article>
  );
};
