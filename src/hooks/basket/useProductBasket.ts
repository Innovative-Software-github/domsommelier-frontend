import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useBasket } from './useBasket';
import { getProductQuantitySelector } from '../../store/basket/selectors';
import { TProductId } from '../../services/basket/interfaces';

export const useProductBasket = (productId: TProductId) => {
  const { addToBasket, updateQuantity, removeFromBasket, clearBasket, isBasketLoading, productLoadingStates } = useBasket();
  
  const currentQuantity = useSelector(state => getProductQuantitySelector(state, productId));
  const isInBasket = currentQuantity > 0;
  const isProductInBasketLoading = useMemo(
    () => productLoadingStates.get(productId) ?? false,
    [productLoadingStates, productId]
  );

  const handleAddToBasket = async () => {
    await addToBasket(productId, 1);
  };

  const handleQuantityChange = async (quantity: number) => {
    await updateQuantity(productId, quantity);
  };

  return {
    isInBasket,
    currentQuantity,
    removeFromBasket,
    clearBasket,
    handleAddToBasket,
    handleQuantityChange,
    isBasketLoading,
    isProductInBasketLoading
  };
};
