import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addToBasketThunk,
  removeFromBasketThunk,
  clearBasketThunk,
} from '../../store/basket/actions';
import { basketIsLoadingSelector } from '../../store/basket/selectors';
import { TProductId } from '../../services/basket/interfaces';
import { TEMP_CUSTOMER_ID } from '../../app/layout';
import { useAppDispatch } from '../../store/hooks';

export const useBasket = () => {
  const dispatch = useAppDispatch();
  const isBasketLoading = useSelector(basketIsLoadingSelector);
  // TODO: Заменить customerId когда пояится регистрация
  const customerId = TEMP_CUSTOMER_ID;
  
  // Состояние загрузки для конкретных продуктов
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
    if (!customerId) {
      throw new Error('Customer ID is not available');
    }

    setProductLoading(productId, true);
    try {
      const result = await dispatch(addToBasketThunk({
        customerId,
        productId,
        quantity,
      })).unwrap();
      
      return result;
    } catch (error) {
      console.error('Ошибка при добавлении товара в корзину:', error);
      throw error;
    } finally {
      setProductLoading(productId, false);
    }
  }, [dispatch, customerId, setProductLoading]);

  const updateQuantity = useCallback(async (productId: TProductId, quantity: number) => {
    if (!customerId) {
      throw new Error('Customer ID is not available');
    }

    setProductLoading(productId, true);
    try {
      // Если количество 0, удаляем товар из корзины
      if (quantity === 0) {
        const result = await dispatch(removeFromBasketThunk({
          customerId,
          productId,
        })).unwrap();
        return result;
      }

      // Иначе обновляем количество через addToCartThunk
      const result = await dispatch(addToBasketThunk({
        customerId,
        productId,
        quantity,
      })).unwrap();
      
      return result;
    } catch (error) {
      console.error('Ошибка при обновлении количества товара:', error);
      throw error;
    } finally {
      setProductLoading(productId, false);
    }
  }, [dispatch, customerId, setProductLoading]);

  const removeFromBasket = useCallback(async (productId: TProductId) => {
    if (!customerId) {
      throw new Error('Customer ID is not available');
    }

    try {
      const result = await dispatch(removeFromBasketThunk({
        customerId,
        productId,
      })).unwrap();
      
      return result;
    } catch (error) {
      console.error('Ошибка при удалении товара из корзины:', error);
      throw error;
    }
  }, [dispatch, customerId]);

  const clearBasket = useCallback(async () => {
    if (!customerId) {
      throw new Error('Customer ID is not available');
    }

    try {
      const result = await dispatch(clearBasketThunk(customerId)).unwrap();
      return result;
    } catch (error) {
      console.error('Ошибка при очистке корзины:', error);
      throw error;
    }
  }, [dispatch, customerId]);

  return {
    addToBasket,
    updateQuantity,
    removeFromBasket,
    clearBasket,
    isBasketLoading,
    productLoadingStates,
  };
};
