'use client';

import { ProductCardRow } from '../../../../../../ui/ProductCardRow/ProductCardRow';
import { useProductSaved } from '../../../../../../hooks/saved/useProductSaved';
import { useProductBasket } from '../../../../../../hooks/basket/useProductBasket';
import { ISavedItem } from '../../../../../../services/saved/interfaces';

export interface ISavedProductRowProps {
  item: ISavedItem;
}

export const SavedProductRow: React.FC<ISavedProductRowProps> = ({ item }) => {
  const { isSaved, handleToggleSaved, isProductSavedLoading } = useProductSaved(item.product.id);
  const { isInBasket, currentQuantity, handleAddToBasket, handleQuantityChange } =
    useProductBasket(item.product.id);

  return (
    <ProductCardRow
      option={item.product}
      isFavorite={isSaved}
      isFavoriteLoading={isProductSavedLoading}
      isInBasket={isInBasket}
      currentQuantity={currentQuantity}
      onToggleFavorite={handleToggleSaved}
      onAddToBasket={() => handleAddToBasket()}
      onUpdateQuantity={handleQuantityChange}
    />
  );
};
