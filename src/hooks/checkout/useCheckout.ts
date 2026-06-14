'use client';

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkoutThunk } from '../../store/checkout/actions';
import { checkoutErrorSelector, checkoutIsSubmittingSelector } from '../../store/checkout/selectors';
import { useAppDispatch } from '../../store/hooks';
import { useRequireCustomerId } from '../useRequireCustomerId';
import { getBasketRequest } from '../../store/basket/actions';
import { ROUTES } from '../../constants/routes';

export const useCheckout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSubmitting = useSelector(checkoutIsSubmittingSelector);
  const error = useSelector(checkoutErrorSelector);
  const { requireCustomerId } = useRequireCustomerId();

  const checkout = useCallback(
    async (wineStoreId: number) => {
      const customerId = requireCustomerId();
      if (!customerId) return;

      try {
        const orderId = await dispatch(checkoutThunk({ customerId, wineStoreId })).unwrap();
        await dispatch(getBasketRequest(customerId));
        router.push(`${ROUTES.checkoutSuccess}?orderId=${orderId}`);
      } catch {
        // error записывается в Redux store через rejected action
      }
    },
    [dispatch, requireCustomerId, router],
  );

  return { checkout, isSubmitting, error };
};
