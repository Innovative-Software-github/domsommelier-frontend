import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

import cls from './PaginationItem.module.scss';

export interface IPaginationItem extends PropsWithChildren {
  page: number;
  isAnimationDisabled: boolean;
  onClick: () => void;
}

export const PaginationItem: React.FC<IPaginationItem> = ({
  page,
  children,
  isAnimationDisabled,
  onClick,
}) => (
  <button
    className={clsx(cls.button, {
      [cls.active]: page === children,
      [cls.disabledTransition]: isAnimationDisabled,
    })}
    type="button"
    onClick={onClick}
  >
    <span className={cls.text}>
      {children}
    </span>
  </button>
);
