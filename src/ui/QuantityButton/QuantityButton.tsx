'use client'

import React from 'react';
import clsx from 'clsx';
import { Icon } from "../Icon/Icon";
import { IconType } from "../Icon/IconsMapping";
import cls from './QuantityButton.module.scss';
import { MAX_PRODUCT_QUANTITY } from '../../constants/constants';

export interface IQuantityButtonProps {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  step?: number;
  showLabel?: boolean;
  label?: string;
  className?: string;
  onChange: (value: number) => void;
}

export const QuantityButton: React.FC<IQuantityButtonProps> = ({
  value,
  onChange,
  min = 0,
  max = MAX_PRODUCT_QUANTITY,
  disabled = false,
  step = 1,
  showLabel = true,
  label = 'шт',
  className,
}) => {
  const handleDecrease = () => {
    if (disabled) return;

    const newValue = Math.max(min, value - step);

    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const handleIncrease = () => {
    if (disabled) return;

    const newValue = Math.min(max, value + step);

    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const isDecreaseDisabled = disabled || value <= min;
  const isIncreaseDisabled = disabled || value >= max;

  return (
    <div className={`${cls.container} ${className || ''}`}>
      <button 
        className={clsx(cls.operationButton, {
          [cls.disabled]: isDecreaseDisabled,
      })}
        onClick={handleDecrease}
        disabled={isDecreaseDisabled}
        aria-label="Уменьшить количество"
        type="button"
      >
        <Icon type={IconType.Minus_24} width={24} height={24} />
      </button>
      
      <span className={cls.currentQuantity}>
        {value}{showLabel ? ` ${label}` : ''}
      </span>
      
      <button 
        className={clsx(cls.operationButton,{
          [cls.disabled]: isIncreaseDisabled,
        })}
        onClick={handleIncrease}
        disabled={isIncreaseDisabled}
        aria-label="Увеличить количество"
        type="button"
      >
        <Icon type={IconType.Plus_24} width={24} height={24} />
      </button>
    </div>
  );
};