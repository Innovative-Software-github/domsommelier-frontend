'use client';

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';

import { useBasket } from '../../hooks/basket/useBasket';
import { TProductCard } from '../../services/products/interfaces/base';
import { basketItemsMapSelector } from '../../store/basket/selectors';

interface IProductCardWithBasketProps {
  option: TProductCard;
  className?: string;
}

export const ProductCardWithBasket = memo<IProductCardWithBasketProps>(({
  option,
  className,
}) => {
  const basketItemsMap = useSelector(basketItemsMapSelector);
  const { addToBasket, updateQuantity } = useBasket();

  const basketItem = basketItemsMap.get(option.id);
  const isInBasket = !!basketItem;
  const currentQuantity = basketItem?.quantity || 0;

  const handleAddToBasket = async (productId: string) => {
    await addToBasket(productId, 1);
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await updateQuantity(productId, quantity);
  };

  return (
    <ProductCard
      option={option}
      className={className}
      onAddToBasket={handleAddToBasket}
      onUpdateQuantity={handleUpdateQuantity}
      currentQuantity={currentQuantity}
      isInBasket={isInBasket}
    />
  );
});

ProductCardWithBasket.displayName = 'ProductCardWithBasket';
