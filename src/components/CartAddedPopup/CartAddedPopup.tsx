'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import { ROUTES, getProductUrl } from '@/constants/routes';
import { formatPrice } from '@/utils/formatPrice';
import { useCartAddedPopup } from './CartAddedPopupContext';

import cls from './CartAddedPopup.module.scss';

/**
 * Плашка «Добавлено в корзину» у иконки корзины в шапке. Показывает только
 * тот товар, который только что добавили (см. useBasket.addToBasket),
 * и прячется сама — см. CartAddedPopupContext.
 */
export const CartAddedPopup: React.FC = () => {
  const { addedItem, isVisible, hideAddedProduct } = useCartAddedPopup();

  // Рендерим только после первого добавления и не убираем из разметки при
  // скрытии — иначе плашка исчезала бы рывком, а не растворялась плавно.
  if (!addedItem) {
    return null;
  }

  const { product, quantity, unitEffectivePrice } = addedItem;

  return (
    <div
      className={clsx(cls.popup, { [cls.visible]: isVisible })}
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        className={cls.closeButton}
        aria-label="Закрыть уведомление"
        onClick={hideAddedProduct}
      >
        <Icon type={IconType.Cancel_24} width={14} height={14} />
      </button>

      <div className={cls.status}>
        <span className={cls.checkIcon}>
          <Icon type={IconType.CheckboxArrow_10} width={10} height={10} />
        </span>
        Добавлено в корзину
      </div>

      <Link
        href={getProductUrl(product.id)}
        className={cls.product}
        onClick={hideAddedProduct}
      >
        <div className={cls.imageWrapper}>
          <Image
            src={product.productPhoto[0]?.url || '/wineBottleCard.png'}
            alt={product.name}
            fill
            sizes="52px"
            className={cls.image}
          />
        </div>
        <div className={cls.info}>
          <p className={cls.name}>{product.name}</p>
          <p className={cls.meta}>
            {quantity} × {formatPrice(unitEffectivePrice)} ₽
          </p>
        </div>
      </Link>

      <Link href={ROUTES.basket} className={cls.cartButton} onClick={hideAddedProduct}>
        Перейти в корзину
      </Link>
    </div>
  );
};
