import * as React from 'react';
import clsx from 'clsx';

import cls from './Checkbox.module.scss';
import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import { TTheme } from '@/constants/theme';

export const DISPLAY_NAME = 'Checkbox';

export type TCheckboxTheme = TTheme | 'gray';
export type TCheckboxVariant = 'boxed' | 'rounded';

export interface ICheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  theme?: TCheckboxTheme;
  variant?: TCheckboxVariant;
  checkboxClassName?: string;
  labelClassName?: string;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  checked,
  theme = 'wineRed',
  variant = 'boxed',
  className,
  checkboxClassName,
  labelClassName,
  disabled,
  onChange,
  children,
  ...restProps
}) => (
  <label
    className={clsx(cls.container, className, {
      [cls.checked]: checked,
      [cls.disabled]: disabled,
    })}
    data-theme={theme}
    data-variant={variant}
  >
    <input
      {...restProps}
      disabled={disabled}
      {...(onChange ? { checked, onChange } : { defaultChecked: checked })}
      type="checkbox"
    />
    <span className={clsx(cls.checkbox, checkboxClassName)}>
      {variant === 'boxed' && (
        <Icon
          isScalable
          type={IconType.CheckboxArrow_10}
          className={cls.icon}
          width={10}
          height={10}
        />
      )}
      {variant === 'rounded' && <div className={cls.roundCheckboxItem} />}
    </span>

    {children && (
      <span className={clsx(cls.label, labelClassName)}>{children}</span>
    )}
  </label>
);

Checkbox.displayName = DISPLAY_NAME;
