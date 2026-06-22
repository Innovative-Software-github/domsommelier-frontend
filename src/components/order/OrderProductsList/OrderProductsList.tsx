'use client';

import React from 'react';
import { ProductCardRow } from '@/ui/ProductCardRow/ProductCardRow';
import { TProductCard } from '@/services/products/interfaces/base';
import cls from './OrderProductsList.module.scss';

export interface IOrderDisplayItem {
  product: TProductCard;
  quantity: number;
  sum: number;
}

export interface IOrderProductsListProps {
  items: IOrderDisplayItem[];
}

export const OrderProductsList: React.FC<IOrderProductsListProps> = ({ items }) => {
  return (
    <div className={cls.list}>
      {items.map((item) => (
        <ProductCardRow
          key={item.product.id}
          className={cls.card}
          option={item.product}
          currentQuantity={item.quantity}
          readOnly
          lineTotal={item.sum}
        />
      ))}
    </div>
  );
};
