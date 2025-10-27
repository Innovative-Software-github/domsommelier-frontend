import { useSelector } from 'react-redux';
import { useBasket } from './useBasket';
import { getProductQuantitySelector } from '../../store/basket/selectors';
import { TProductId } from '../../services/basket/interfaces';

export const useProductBasket = (productId: TProductId) => {
  const { addToBasket, updateQuantity, removeFromBasket, clearBasket, isLoading } = useBasket();
  
  const currentQuantity = useSelector(state => getProductQuantitySelector(state, productId));
  const isInBasket = currentQuantity > 0;

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
