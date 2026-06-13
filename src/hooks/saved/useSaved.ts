import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { addToSavedThunk, removeFromSavedThunk, clearSavedThunk } from '../../store/saved/actions';
import { savedIsLoadingSelector } from '../../store/saved/selectors';
import { TSavedProductId } from '../../services/saved/interfaces';
import { useAppDispatch } from '../../store/hooks';
import { useRequireCustomerId } from '../useRequireCustomerId';

export const useSaved = () => {
  const dispatch = useAppDispatch();
  const isSavedLoading = useSelector(savedIsLoadingSelector);
  const { requireCustomerId } = useRequireCustomerId();

  const [productLoadingStates, setProductLoadingStates] = useState<Map<TSavedProductId, boolean>>(
    new Map(),
  );

  const setProductLoading = useCallback((productId: TSavedProductId, isLoading: boolean) => {
    setProductLoadingStates((prev) => {
      const newMap = new Map(prev);
      if (isLoading) {
        newMap.set(productId, true);
      } else {
        newMap.delete(productId);
      }
      return newMap;
    });
  }, []);

  const addToSaved = useCallback(
    async (productId: TSavedProductId) => {
      const customerId = requireCustomerId();
      if (!customerId) {
        return null;
      }

      setProductLoading(productId, true);
      try {
        return await dispatch(addToSavedThunk({ customerId, productId })).unwrap();
      } catch (error) {
        console.error('Ошибка при добавлении товара в избранное:', error);
        throw error;
      } finally {
        setProductLoading(productId, false);
      }
    },
    [dispatch, requireCustomerId, setProductLoading],
  );

  const removeFromSaved = useCallback(
    async (productId: TSavedProductId) => {
      const customerId = requireCustomerId();
      if (!customerId) {
        return null;
      }

      setProductLoading(productId, true);
      try {
        return await dispatch(removeFromSavedThunk({ customerId, productId })).unwrap();
      } catch (error) {
        console.error('Ошибка при удалении товара из избранного:', error);
        throw error;
      } finally {
        setProductLoading(productId, false);
      }
    },
    [dispatch, requireCustomerId, setProductLoading],
  );

  const clearSaved = useCallback(async () => {
    const customerId = requireCustomerId();
    if (!customerId) {
      return null;
    }

    try {
      return await dispatch(clearSavedThunk(customerId)).unwrap();
    } catch (error) {
      console.error('Ошибка при очистке избранного:', error);
      throw error;
    }
  }, [dispatch, requireCustomerId]);

  return {
    addToSaved,
    removeFromSaved,
    clearSaved,
    isSavedLoading,
    productLoadingStates,
  };
};
