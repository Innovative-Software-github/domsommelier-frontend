import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAuthModal } from '@/components/AuthModal/AuthModalContext';
import { authCustomerSelector } from '@/store/auth/selectors';

export const useRequireCustomerId = () => {
  const customerId = useSelector(authCustomerSelector)?.id;
  const { openAuthModal } = useAuthModal();

  const requireCustomerId = useCallback((): string | null => {
    if (customerId) {
      return customerId;
    }

    openAuthModal();
    return null;
  }, [customerId, openAuthModal]);

  return { customerId, requireCustomerId };
};
