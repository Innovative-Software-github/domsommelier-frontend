'use client';

import React from 'react';
import { ICustomer } from '@/services/customer/interfaces';
import { TProfileForm } from '../../utils';
import { ProfilePersonalDataContent } from './components/ProfilePersonalDataContent/ProfilePersonalDataContent';
import { ProfilePersonalDataHeader } from './components/ProfilePersonalDataHeader/ProfilePersonalDataHeader';
import { ProfilePersonalDataLoading } from './components/ProfilePersonalDataLoading/ProfilePersonalDataLoading';
import cls from './ProfilePersonalData.module.scss';

export interface IProfilePersonalDataProps {
  customer: ICustomer | null;
  form: TProfileForm;
  isLoading: boolean;
  isEditing: boolean;
  isSaving: boolean;
  error: string | null;
  loadError: string | null;
  success: boolean;
  onStartEdit: () => void;
  onFormChange: (field: keyof TProfileForm, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onRetryLoad: () => void;
}

export const ProfilePersonalData: React.FC<IProfilePersonalDataProps> = ({
  customer,
  form,
  isLoading,
  isEditing,
  isSaving,
  error,
  loadError,
  success,
  onStartEdit,
  onFormChange,
  onSave,
  onCancel,
  onRetryLoad,
}) => {
  return (
    <div className={cls.section}>
      <ProfilePersonalDataHeader
        isLoading={isLoading}
        isEditing={isEditing}
        onStartEdit={!loadError ? onStartEdit : undefined}
      />

      {isLoading ? (
        <ProfilePersonalDataLoading />
      ) : loadError ? (
        <div className={cls.loadError}>
          <p className={cls.loadErrorText}>{loadError}</p>
          <button className={cls.retryButton} onClick={onRetryLoad} type="button">
            Повторить
          </button>
        </div>
      ) : (
        <div className={cls.fieldGroup}>
          <ProfilePersonalDataContent
            customer={customer}
            form={form}
            isEditing={isEditing}
            isSaving={isSaving}
            error={error}
            success={success}
            onFormChange={onFormChange}
            onSave={onSave}
            onCancel={onCancel}
          />
        </div>
      )}
    </div>
  );
};
