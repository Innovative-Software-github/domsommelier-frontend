'use client';

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getBasketRequest } from '@/store/basket/actions';
import { getSavedRequest } from '@/store/saved/actions';
import { useAppDispatch } from '@/store/hooks';
import { authCustomerSelector } from '@/store/auth/selectors';

export const useSyncCartOnAuth = () => {
  const dispatch = useAppDispatch();
  const customerId = useSelector(authCustomerSelector)?.id;
  const syncedCustomerIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!customerId || customerId === syncedCustomerIdRef.current) {
      return;
    }

    syncedCustomerIdRef.current = customerId;
    dispatch(getBasketRequest(customerId));
    dispatch(getSavedRequest(customerId));
  }, [customerId, dispatch]);
};
