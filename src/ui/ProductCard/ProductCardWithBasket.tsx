'use client';

import React, { memo } from 'react';
import { ProductCard } from './ProductCard';
import { useProductBasket } from '../../hooks/basket/useProductBasket';
import { TProductCard } from '../../services/products/interfaces/base';

interface IProductCardWithBasketProps {
  option: TProductCard;
  className?: string;
}

export const ProductCardWithBasket = memo<IProductCardWithBasketProps>(({
  option,
  className,
}) => {
  const { isInBasket, currentQuantity, handleAddToBasket, handleQuantityChange } = useProductBasket(option.id);

  return (
    <ProductCard
      option={option}
      className={className}
      onAddToBasket={handleAddToBasket}
      onUpdateQuantity={(quantity) => handleQuantityChange(quantity)}
      currentQuantity={currentQuantity}
      isInBasket={isInBasket}
    />
  );
});

ProductCardWithBasket.displayName = 'ProductCardWithBasket';
