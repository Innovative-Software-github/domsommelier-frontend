import React from 'react';
import { Icon } from '../../Icon/Icon';
import { IconType } from '../../Icon/IconsMapping';
import clsx from 'clsx';

import cls from './PaginationButton.module.scss';

export interface IPaginationButton {
  variant: 'previous' | 'next';
  disabled: boolean;
  onClick: () => void;
}

export const PaginationButton: React.FC<IPaginationButton> = ({
  variant,
  disabled,
  onClick,
}) => {
  const iconType = variant === 'previous' ? IconType.ArrowRight_24 : IconType.ArrowRight_24;

  return (
    <button
      className={clsx(cls.button, {
        [cls.rotate]: variant === 'previous',
      })}
      data-side={variant}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon type={iconType} width={24} height={24} />
    </button>
  );
};
