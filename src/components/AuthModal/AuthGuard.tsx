'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { isAuthenticatedSelector } from '@/store/auth/selectors';
import { useAuthModal } from '@/components/AuthModal/AuthModalContext';
import { ROUTES } from '@/constants/routes';

export const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { openAuthModal } = useAuthModal();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace(ROUTES.home);
    }
  }, [isAuthenticated, router, openAuthModal]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

