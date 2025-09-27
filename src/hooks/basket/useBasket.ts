import { useCallback } from 'react';
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
  const isLoading = useSelector(basketIsLoadingSelector);
  // TODO: Заменить customerId когда пояится регистрация
  const customerId = TEMP_CUSTOMER_ID;

  const addToBasket = useCallback(async (productId: TProductId, quantity: number = 1) => {
    if (!customerId) {
      throw new Error('Customer ID is not available');
    }

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
    }
  }, [dispatch, customerId]);

  const updateQuantity = useCallback(async (productId: TProductId, quantity: number) => {
    if (!customerId) {
      throw new Error('Customer ID is not available');
    }

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
    }
  }, [dispatch, customerId]);

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
    isLoading,
  };
};
