import * as React from 'react';
import clsx from 'clsx';

import cls from './Checkbox.module.scss';
import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';
import { TTheme } from '@/constants/theme';

export const DISPLAY_NAME = 'Checkbox';

export interface ICheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> {
  theme?: TTheme;
  checkboxClassName?: string;
  labelClassName?: string;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  checked,
  theme = 'wineRed',
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
  >
    <input
      {...restProps}
      disabled={disabled}
      {...(onChange ? { checked, onChange } : { defaultChecked: checked })}
      type="checkbox"
    />
    <span className={clsx(cls.checkbox, checkboxClassName)}>
      <Icon
        isScalable
        type={IconType.CheckboxArrow_10}
        className={cls.icon}
        width={10}
        height={10}
      />
    </span>

    {children && (
      <span className={clsx(cls.label, labelClassName)}>{children}</span>
    )}
  </label>
);

Checkbox.displayName = DISPLAY_NAME;
