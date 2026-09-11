'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getBasketRequest } from '@/store/basket/actions';
import { getSavedRequest } from '@/store/saved/actions';
import { useAppDispatch } from '@/store/hooks';
import { authCustomerSelector } from '@/store/auth/selectors';

/**
 * Карточки каталога открывают товар в новой вкладке, поэтому корзину и
 * избранное часто меняют в одной вкладке, а возвращаются в другую — со старым
 * состоянием в Redux: сердечки, кнопки «В корзину» и счётчики в шапке там врут.
 * Перечитываем обе коллекции каждый раз, когда вкладка снова становится видимой.
 */
export const useSyncCartOnFocus = () => {
  const dispatch = useAppDispatch();
  const customerId = useSelector(authCustomerSelector)?.id;

  useEffect(() => {
    if (!customerId) {
      return;
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(getBasketRequest(customerId));
        dispatch(getSavedRequest(customerId));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [customerId, dispatch]);
};
