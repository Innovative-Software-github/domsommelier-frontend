import { useSelector } from 'react-redux';
import { useBasket } from './useBasket';
import { basketItemsMapSelector } from '../../store/basket/selectors';
import { TProductId } from '../../services/basket/interfaces';

export const useProductBasket = (productId: TProductId) => {
  const { addToBasket, updateQuantity, removeFromBasket, clearBasket, isLoading } = useBasket();
  const basketItemsMap = useSelector(basketItemsMapSelector);
  
  const basketItem = basketItemsMap.get(productId);
  const isInBasket = !!basketItem;
  const currentQuantity = basketItem?.quantity || 0;

  const handleAddToBasket = () => {
    addToBasket(productId, 1);
  };

  const handleQuantityChange = (quantity: number) => {
    updateQuantity(productId, quantity);
  };

  return {
    isInBasket,
    currentQuantity,
    removeFromBasket,
    clearBasket,
    handleAddToBasket,
    handleQuantityChange,
    isLoading,
  };
};
