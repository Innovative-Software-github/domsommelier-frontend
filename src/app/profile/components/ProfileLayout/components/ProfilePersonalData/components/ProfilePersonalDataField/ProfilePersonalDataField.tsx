'use client';

import React from 'react';
import cls from './ProfilePersonalDataField.module.scss';

export interface IProfilePersonalDataFieldProps {
  label: string;
  value: string;
  emptyText?: string;
  variant?: 'default' | 'email';
}

export const ProfilePersonalDataField: React.FC<IProfilePersonalDataFieldProps> = ({
  label,
  value,
  emptyText = 'Не указано',
  variant = 'default',
}) => {
  const isEmpty = !value;
  const displayValue = isEmpty ? emptyText : value;

  return (
    <div className={cls.row}>
      <span className={cls.label}>{label}</span>
      <span
        className={
          variant === 'email'
            ? cls.emailValue
            : `${cls.value} ${isEmpty ? cls.valueEmpty : ''}`
        }
      >
        {displayValue}
      </span>
    </div>
  );
};
