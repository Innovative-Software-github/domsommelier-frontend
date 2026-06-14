'use client';

import React from 'react';
import { ICustomer } from '@/services/customer/interfaces';
import { ProfilePersonalDataField } from '../ProfilePersonalDataField/ProfilePersonalDataField';
import cls from './ProfilePersonalDataView.module.scss';

export interface IProfilePersonalDataViewProps {
  customer: ICustomer | null;
  success: boolean;
}

export const ProfilePersonalDataView: React.FC<IProfilePersonalDataViewProps> = ({
  customer,
  success,
}) => {
  return (
    <>
      <ProfilePersonalDataField
        label="Имя"
        value={customer?.firstName ?? ''}
        emptyText="Не указано"
      />
      <ProfilePersonalDataField
        label="Фамилия"
        value={customer?.secondName ?? ''}
        emptyText="Не указана"
      />
      <ProfilePersonalDataField
        label="Отчество"
        value={customer?.middleName ?? ''}
        emptyText="Не указано"
      />
      {success && <p className={cls.feedbackText}>Данные успешно сохранены</p>}
    </>
  );
};
