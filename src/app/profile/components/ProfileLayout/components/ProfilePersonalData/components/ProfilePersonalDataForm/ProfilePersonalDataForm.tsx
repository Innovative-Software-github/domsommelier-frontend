'use client';

import React from 'react';
import { Input } from '@/ui/Input/Input';
import { Button } from '@/ui/Button/Button';
import { TProfileForm } from '../../../../utils';
import cls from './ProfilePersonalDataForm.module.scss';

export interface IProfilePersonalDataFormProps {
  form: TProfileForm;
  error: string | null;
  isSaving: boolean;
  onFormChange: (field: keyof TProfileForm, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfilePersonalDataForm: React.FC<IProfilePersonalDataFormProps> = ({
  form,
  error,
  isSaving,
  onFormChange,
  onSave,
  onCancel,
}) => {
  return (
    <>
      <Input
        theme="gray"
        placeholder="Имя"
        value={form.firstName}
        onChange={(e) => onFormChange('firstName', e.target.value)}
      />
      <Input
        theme="gray"
        placeholder="Фамилия"
        value={form.secondName}
        onChange={(e) => onFormChange('secondName', e.target.value)}
      />
      <Input
        theme="gray"
        placeholder="Отчество"
        value={form.middleName}
        onChange={(e) => onFormChange('middleName', e.target.value)}
      />
      {error && <p className={cls.feedbackText}>{error}</p>}
      <div className={cls.actions}>
        <Button className={cls.actionButton} height="H-42" onClick={onSave} isLoading={isSaving}>
          Сохранить
        </Button>
        <Button className={cls.actionButton} variant="darkOutlined" height="H-42" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </>
  );
};
