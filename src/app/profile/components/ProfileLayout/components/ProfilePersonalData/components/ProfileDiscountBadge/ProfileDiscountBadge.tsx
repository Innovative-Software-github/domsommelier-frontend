'use client';

import React from 'react';
import cls from './ProfileDiscountBadge.module.scss';

export interface IProfileDiscountBadgeProps {
  /** Процент личной скидки клиента. 0 или undefined — блок не показывается. */
  percent?: number | null;
}

/**
 * Личная скидка клиента в профиле. Скидка применяется в корзине и только к товарам
 * без акционной цены — об этом говорим здесь, чтобы в корзине не было сюрприза.
 */
export const ProfileDiscountBadge: React.FC<IProfileDiscountBadgeProps> = ({ percent }) => {
  if (!percent || percent <= 0) {
    return null;
  }

  return (
    <div className={cls.badge}>
      <p className={cls.title}>
        Ваша персональная скидка — <span className={cls.percent}>{percent}%</span>
      </p>
      <p className={cls.hint}>
        Применяется автоматически в корзине, кроме товаров по акции.
      </p>
    </div>
  );
};
