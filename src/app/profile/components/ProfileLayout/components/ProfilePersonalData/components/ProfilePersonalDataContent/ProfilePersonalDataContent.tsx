'use client';

import React from 'react';
import { ICustomer } from '@/services/customer/interfaces';
import { TProfileForm } from '../../../../utils';
import { ProfilePersonalDataField } from '../ProfilePersonalDataField/ProfilePersonalDataField';
import { ProfilePersonalDataForm } from '../ProfilePersonalDataForm/ProfilePersonalDataForm';
import { ProfilePersonalDataView } from '../ProfilePersonalDataView/ProfilePersonalDataView';

export interface IProfilePersonalDataContentProps {
  customer: ICustomer | null;
  form: TProfileForm;
  isEditing: boolean;
  isSaving: boolean;
  error: string | null;
  success: boolean;
  onFormChange: (field: keyof TProfileForm, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ProfilePersonalDataContent: React.FC<IProfilePersonalDataContentProps> = ({
  customer,
  form,
  isEditing,
  isSaving,
  error,
  success,
  onFormChange,
  onSave,
  onCancel,
}) => {
  return (
    <>
      <ProfilePersonalDataField
        label="Email"
        value={customer?.email ?? '—'}
        variant="email"
      />

      {isEditing ? (
        <ProfilePersonalDataForm
          form={form}
          error={error}
          isSaving={isSaving}
          onFormChange={onFormChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      ) : (
        <ProfilePersonalDataView customer={customer} success={success} />
      )}
    </>
  );
};
