'use client';

import { ProductCardRow } from '../../../../../../ui/ProductCardRow/ProductCardRow';
import { useProductSaved } from '../../../../../../hooks/saved/useProductSaved';
import { useProductBasket } from '../../../../../../hooks/basket/useProductBasket';
import { IBasketItem } from '../../../../../../services/basket/interfaces';

export interface IBasketProductRowProps {
  product: IBasketItem;
}

export const BasketProductRow: React.FC<IBasketProductRowProps> = ({ product }) => {
  const { isSaved, handleToggleSaved, isProductSavedLoading } = useProductSaved(product.product.id);
  const {
    isInBasket,
    currentQuantity,
    handleQuantityChange,
    removeFromBasket,
  } = useProductBasket(product.product.id);

  return (
    <ProductCardRow
      option={product.product}
      isInBasket={isInBasket}
      isFavorite={isSaved}
      isFavoriteLoading={isProductSavedLoading}
      currentQuantity={currentQuantity}
      onUpdateQuantity={handleQuantityChange}
      onRemoveFromBasket={() => removeFromBasket(product.product.id)}
      onToggleFavorite={handleToggleSaved}
    />
  );
};
