'use client';

import React from 'react';
import clsx from 'clsx';

import { Spinner } from '../Spinner/Spinner';
import { TTheme } from '../../constants/theme';

import cls from './Input.module.scss';

const DISPLAY_NAME = 'input';

export type TInputTheme = TTheme | 'gray';

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  type?: string;
  theme?: TInputTheme;
  isLoading?: boolean;
  isDisabled?: boolean;
  elPrefix?: React.ReactNode;
  elSuffix?: React.ReactNode;
  errorText?: string;
  placeholder?: string;
  autoComplete?: string;

  className?: string;
  suffixClassName?: string;
  prefixClassName?: string;

  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  onPressEnter?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => {
    const {
      value,
      type,
      theme = 'redWine',
      isLoading,
      isDisabled,
      elPrefix,
      elSuffix,
      errorText,
      placeholder,
      autoComplete,
      className,
      suffixClassName,
      prefixClassName,
      onChange,
      onKeyDown,
      onPressEnter,
      ...nativeInputProps
    } = props;

    const isEmpty = React.useMemo(() => !value, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onPressEnter) {
        onPressEnter(e);
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    const renderPrefix = () =>
      elPrefix && (
        <div className={clsx(cls.prefix, prefixClassName)}>{elPrefix}</div>
      );

    const renderSuffix = () =>
      isLoading ? (
        <Spinner className={cls.loadingSpinner} size="m" />
      ) : (
        elSuffix && (
          <div className={clsx(cls.suffix, suffixClassName)}>{elSuffix}</div>
        )
      );

    return (
      <>
        <div
          data-theme={theme}
          className={clsx(cls.container, className, {
            [cls.error]: !!errorText,
            [cls.loading]: isLoading,
            [cls.disable]: isDisabled,
            [cls.dirty]: !isEmpty,
          })}
        >
          {renderPrefix()}
          <input
            {...nativeInputProps}
            ref={ref}
            placeholder={placeholder}
            type={type}
            className={cls.input}
            value={value}
            disabled={isDisabled || isLoading}
            autoComplete={autoComplete}
            onKeyDown={handleKeyDown}
            onChange={onChange}
          />
          {renderSuffix()}
        </div>
        {!!errorText && <p className={cls.errorText}>{errorText}</p>}
      </>
    );
  },
);

Input.displayName = DISPLAY_NAME;
