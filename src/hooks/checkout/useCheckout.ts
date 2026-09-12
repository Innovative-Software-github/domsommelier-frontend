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
import { ICheckoutData } from '../../store/checkout/interfaces';

export const useCheckout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSubmitting = useSelector(checkoutIsSubmittingSelector);
  const error = useSelector(checkoutErrorSelector);
  const { requireCustomerId } = useRequireCustomerId();

  const checkout = useCallback(
    async (wineStoreId: number, checkoutData: ICheckoutData) => {
      const customerId = requireCustomerId();
      if (!customerId) return;

      try {
        const orderId = await dispatch(
          checkoutThunk({ customerId, wineStoreId, checkoutData }),
        ).unwrap();

        // Переходим на страницу успеха сразу, как только заказ создан —
        // обновление корзины дальше ни на что не влияет для этой страницы
        // (только на счётчик в шапке), поэтому не ждём его: если оно упадёт
        // или просто выполнится чуть позже, это больше не блокирует переход
        // и не гонится с гардом "пустая корзина -> редирект на /basket" в
        // CheckoutLayout, который раньше мог сработать раньше, чем push.
        router.push(`${ROUTES.checkoutSuccess}?orderId=${orderId}`);
        dispatch(getBasketRequest(customerId));
      } catch {
        // Ошибка уже отражена в checkoutError через checkoutThunk.rejected
        // (см. store/checkout/reducers.ts) — здесь только не даём промису
        // остаться необработанным (handleSubmit не делает await/.catch).
      }
    },
    [dispatch, requireCustomerId, router],
  );

  return { checkout, isSubmitting, error };
};
