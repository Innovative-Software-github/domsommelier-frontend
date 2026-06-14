'use client';

import React from 'react';
import { Button } from '@/ui/Button/Button';
import cls from './ProfilePersonalDataHeader.module.scss';

export interface IProfilePersonalDataHeaderProps {
  isLoading: boolean;
  isEditing: boolean;
  onStartEdit?: () => void;
}

export const ProfilePersonalDataHeader: React.FC<IProfilePersonalDataHeaderProps> = ({
  isLoading,
  isEditing,
  onStartEdit,
}) => {
  return (
    <div className={cls.header}>
      <h2 className={cls.title}>Личные данные</h2>
      {!isEditing && !isLoading && (
        <Button
          className={cls.actionButton}
          variant="outlined"
          height="H-42"
          onClick={onStartEdit}
        >
          Редактировать
        </Button>
      )}
    </div>
  );
};
