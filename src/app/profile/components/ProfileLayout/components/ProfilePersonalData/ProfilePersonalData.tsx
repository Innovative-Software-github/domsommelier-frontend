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
  success: boolean;
  onStartEdit: () => void;
  onFormChange: (field: keyof TProfileForm, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfilePersonalData: React.FC<IProfilePersonalDataProps> = ({
  customer,
  form,
  isLoading,
  isEditing,
  isSaving,
  error,
  success,
  onStartEdit,
  onFormChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className={cls.section}>
      <ProfilePersonalDataHeader
        isLoading={isLoading}
        isEditing={isEditing}
        onStartEdit={onStartEdit}
      />

      {isLoading ? (
        <ProfilePersonalDataLoading />
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
