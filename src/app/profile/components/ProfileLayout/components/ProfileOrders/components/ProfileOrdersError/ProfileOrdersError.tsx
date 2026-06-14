'use client';

import React from 'react';
import cls from './ProfileOrdersError.module.scss';

export interface IProfileOrdersErrorProps {
  message: string;
}

export const ProfileOrdersError: React.FC<IProfileOrdersErrorProps> = ({ message }) => {
  return <p className={cls.text}>{message}</p>;
};
