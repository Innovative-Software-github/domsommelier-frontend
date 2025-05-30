'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../Button/Button';
import { formatWineDescription } from './utils';
import { WineCardPrices } from './WineCardPrices/WineCardPrices';

import cls from './WineCard.module.scss';
import clsx from 'clsx';
import { routes } from '../../constants/routes/routes';

export interface IWineCardDescription {
  country: string;
  color: string;
  sweetness: string;
  displacement: string;
}

export interface IWineCardModel {
  id: string;
  imageLink: string;
  discountPrice: number;
  oldPrice: number;
  name: string;
  description: IWineCardDescription;
}

interface WineCardProps {
  wineOption: IWineCardModel;
  className?: string;
}

export const WineCard: React.FC<WineCardProps> = ({
  wineOption,
  className,
}) => {
  const { id, imageLink, discountPrice, oldPrice, name, description } =
    wineOption;

  const hasDiscount = discountPrice < oldPrice;

  return (
    <article className={clsx(cls.card, className)}>
      <Link
        href={`${routes.product.href}/${id}`}
        aria-label={`Перейти к странице товара «${name}»`}
        className={cls.link}
      >
        <div className={cls.imageWrapper}>
          <Image
            src={imageLink}
            alt={name}
            fill
            className={cls.image}
            priority
            sizes="(max-width: 768px) 100vw, 305px"
          />
        </div>

        <header className={cls.header}>
          <h3 className={cls.title}>{name}</h3>

          <WineCardPrices
            current={discountPrice}
            old={oldPrice}
            showOld={hasDiscount}
          />

          <p className={cls.description}>
            {formatWineDescription(description)}
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
