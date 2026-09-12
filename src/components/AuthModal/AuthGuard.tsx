'use client';

import React from 'react';
import { useSelector } from 'react-redux';

import { isAuthenticatedSelector } from '@/store/auth/selectors';
import { useAuthModal } from '@/components/AuthModal/AuthModalContext';

export const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { openAuthModal } = useAuthModal();

  // Раньше здесь был router.replace(ROUTES.home) — неавторизованного молча
  // уводило на главную без единого объяснения, а openAuthModal был
  // задестрактурен и даже стоял в зависимостях, но не вызывался. Теперь
  // остаёмся на месте и показываем модалку входа: после успешного логина
  // isAuthenticated станет true и children отрендерятся как есть — например,
  // для чекаута это не сбрасывает прогресс оформления.
  React.useEffect(() => {
    if (!isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, openAuthModal]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

