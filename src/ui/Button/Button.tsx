import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

import { IconType } from '../Icon/IconsMapping';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';

import cls from './Button.module.scss';

const DISPLAY_NAME = 'Button';

export type TButtonHeight = 'H-50' | 'H-48' | 'H-42' | 'H-38' | 'H-36';
export type TButtonVariant =
  | 'default'
  | 'outlined'
  | 'darkOutlined'
  | 'lightOutlined';

type TButtonHTMLAttributes = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
>;

export interface IButtonProps
  extends TButtonHTMLAttributes,
    React.PropsWithChildren {
  className?: string;
  variant?: TButtonVariant;
  height?: TButtonHeight;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIconType?: IconType;
  rightIconType?: IconType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      isLoading,
      isDisabled,
      variant = 'default',
      height = 'H-50',
      rightIconType,
      leftIconType,
      onClick,
      ...restProps
    } = props;

    const hasIcon = !!rightIconType || !!leftIconType;

    const spinner = isLoading ? <Spinner className={cls.spinner} /> : null;

    const rightIcon =
      (rightIconType && leftIconType && spinner) ||
      (rightIconType && !leftIconType && spinner) ||
      (rightIconType && (
        <Icon
          type={rightIconType}
          width={24}
          height={24}
          className={cls.icon}
        />
      ));

    const leftIcon =
      (!hasIcon && spinner) ||
      (leftIconType && !rightIconType && spinner) ||
      (leftIconType && (
        <Icon type={leftIconType} width={24} height={24} className={cls.icon} />
      ));

    return (
      <button
        type="button"
        {...restProps}
        className={clsx(cls.button, className)}
        ref={ref}
        data-variant={variant}
        data-height={height}
        disabled={isDisabled || isLoading}
        onClick={onClick}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);

Button.displayName = DISPLAY_NAME;
