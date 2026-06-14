'use client';

import React, { useEffect, useState } from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { getProfile, updateProfile } from '@/services/customer/requests';
import { ICustomer } from '@/services/customer/interfaces';
import { useProfileOrders } from '@/hooks/profile/useProfileOrders';
import { ProfilePersonalData } from './components/ProfilePersonalData/ProfilePersonalData';
import { ProfileOrders } from './components/ProfileOrders/ProfileOrders';
import cls from './ProfileLayout.module.scss';
import {
  EMPTY_PROFILE_FORM,
  getProfileFormFromCustomer,
  TProfileForm,
} from './utils';
import { useAppDispatch } from '@/store/hooks';
import { restoreSessionAction } from '@/store/auth/actions';
import { tokenStorage } from '@/services/auth/tokenStorage';

export const ProfileLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_PROFILE_FORM);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    orders,
    totalPages,
    page,
    isLoading: isOrdersLoading,
    error: ordersError,
    loadOrders,
    handlePageChange,
  } = useProfileOrders();

  const loadProfile = React.useCallback(() => {
    setIsProfileLoading(true);
    setProfileError(null);
    getProfile()
      .then((data) => {
        setCustomer(data);
        setForm(getProfileFormFromCustomer(data));
      })
      .catch(() => setProfileError('Не удалось загрузить профиль'))
      .finally(() => setIsProfileLoading(false));
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleFormChange = (field: keyof TProfileForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setProfileError(null);
    setSuccess(false);
    try {
      const updated = await updateProfile(form);
      setCustomer(updated);
      tokenStorage.setCustomer(updated);
      dispatch(restoreSessionAction(updated));
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setProfileError('Не удалось сохранить изменения');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (customer) {
      setForm(getProfileFormFromCustomer(customer));
    }
    setIsEditing(false);
    setProfileError(null);
  };

  return (
    <ContentContainer>
      <div className={cls.wrapper}>
        <ProfilePersonalData
          customer={customer}
          form={form}
          isLoading={isProfileLoading}
          isEditing={isEditing}
          isSaving={isSaving}
          error={!isEditing ? null : profileError}
          loadError={isProfileLoading ? null : (!customer ? profileError : null)}
          success={success}
          onStartEdit={() => setIsEditing(true)}
          onFormChange={handleFormChange}
          onSave={handleSave}
          onCancel={handleCancel}
          onRetryLoad={loadProfile}
        />

        <ProfileOrders
          orders={orders}
          totalPages={totalPages}
          page={page}
          isLoading={isOrdersLoading}
          error={ordersError}
          onPageChange={handlePageChange}
          onRetry={() => loadOrders(page)}
        />
      </div>
    </ContentContainer>
  );
};
