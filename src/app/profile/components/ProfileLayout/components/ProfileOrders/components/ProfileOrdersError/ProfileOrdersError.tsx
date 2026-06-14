'use client';

import React from 'react';
import cls from './ProfileOrdersError.module.scss';

export interface IProfileOrdersErrorProps {
  message: string;
  onRetry?: () => void;
}

export const ProfileOrdersError: React.FC<IProfileOrdersErrorProps> = ({ message, onRetry }) => {
  return (
    <div>
      <p className={cls.text}>{message}</p>
      {onRetry && (
        <button className={cls.retryButton} onClick={onRetry} type="button">
          Повторить
        </button>
      )}
    </div>
  );
};
