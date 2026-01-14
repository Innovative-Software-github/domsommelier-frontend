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
  const { isInBasket, currentQuantity, handleAddToBasket, handleQuantityChange, isProductInBasketLoading } = useProductBasket(option.id);

  return (
    <ProductCard
      option={option}
      className={className}
      currentQuantity={currentQuantity}
      isInBasket={isInBasket}
      onAddToBasket={handleAddToBasket}
      onUpdateQuantity={(quantity) => handleQuantityChange(quantity)}
      isProductInBasketLoading={isProductInBasketLoading}
    />
  );
});

ProductCardWithBasket.displayName = 'ProductCardWithBasket';
