import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addToBasketThunk,
  removeFromBasketThunk,
  clearBasketThunk,
} from '../../store/basket/actions';
import { basketIsLoadingSelector } from '../../store/basket/selectors';
import { TProductId } from '../../services/basket/interfaces';
import { useAppDispatch } from '../../store/hooks';
import { useRequireCustomerId } from '../useRequireCustomerId';

export const useBasket = () => {
  const dispatch = useAppDispatch();
  const isBasketLoading = useSelector(basketIsLoadingSelector);
  const { requireCustomerId } = useRequireCustomerId();

  const [productLoadingStates, setProductLoadingStates] = useState<Map<TProductId, boolean>>(new Map());

  const setProductLoading = useCallback((productId: TProductId, isLoading: boolean) => {
    setProductLoadingStates(prev => {
      const newMap = new Map(prev);
      if (isLoading) {
        newMap.set(productId, true);
      } else {
        newMap.delete(productId);
      }
      return newMap;
    });
  }, []);

  const addToBasket = useCallback(async (productId: TProductId, quantity: number = 1) => {
    const customerId = requireCustomerId();
    if (!customerId) {
      return null;
    }

    setProductLoading(productId, true);
    try {
      return await dispatch(addToBasketThunk({
        customerId,
        productId,
        quantity,
      })).unwrap();
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
      throw error;
    } finally {
      setProductLoading(productId, false);
    }
  }, [dispatch, requireCustomerId, setProductLoading]);

  const updateQuantity = useCallback(async (productId: TProductId, quantity: number) => {
    const customerId = requireCustomerId();
    if (!customerId) {
      return null;
    }

    setProductLoading(productId, true);
    try {
      if (quantity === 0) {
        return await dispatch(removeFromBasketThunk({
          customerId,
          productId,
        })).unwrap();
      }

      return await dispatch(addToBasketThunk({
        customerId,
        productId,
        quantity,
      })).unwrap();
    } catch (error) {
      console.error('Ошибка при обновлении количества товара:', error);
      throw error;
    } finally {
      setProductLoading(productId, false);
    }
  }, [dispatch, requireCustomerId, setProductLoading]);

  const removeFromBasket = useCallback(async (productId: TProductId) => {
    const customerId = requireCustomerId();
    if (!customerId) {
      return null;
    }

    try {
      return await dispatch(removeFromBasketThunk({
        customerId,
        productId,
      })).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
      throw error;
    }
  }, [dispatch, requireCustomerId]);

  const clearBasket = useCallback(async () => {
    const customerId = requireCustomerId();
    if (!customerId) {
      return null;
    }

    try {
      return await dispatch(clearBasketThunk(customerId)).unwrap();
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
      throw error;
    }
  }, [dispatch, requireCustomerId]);

  return {
    addToBasket,
    updateQuantity,
    removeFromBasket,
    clearBasket,
    isBasketLoading,
    productLoadingStates,
  };
};
