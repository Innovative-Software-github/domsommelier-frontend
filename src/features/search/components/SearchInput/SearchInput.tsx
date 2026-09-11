'use client';

import React from 'react';

import { Input, TInputTheme } from '@/ui/Input/Input';
import { Icon } from '@/ui/Icon/Icon';
import { IconType } from '@/ui/Icon/IconsMapping';

import cls from './SearchInput.module.scss';

export interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  theme?: TInputTheme;
}

const DEFAULT_PLACEHOLDER = 'Поиск по каталогу';

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = DEFAULT_PLACEHOLDER,
  autoFocus = false,
  className,
  theme = 'gray',
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value.trim();

    if (text) {
      onSubmit(text);
    }
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <Input
      ref={inputRef}
      className={className}
      theme={theme}
      value={value}
      placeholder={placeholder}
      aria-label={placeholder}
      enterKeyHint="search"
      elPrefix={<Icon type={IconType.Search_24} width={24} height={24} />}
      elSuffix={
        value && (
          <button
            type="button"
            className={cls.clearButton}
            aria-label="Очистить поиск"
            onClick={handleClear}
          >
            <Icon type={IconType.Cancel_24} width={20} height={20} />
          </button>
        )
      }
      onChange={(event) => onChange(event.currentTarget.value)}
      onPressEnter={handleSubmit}
    />
  );
};
