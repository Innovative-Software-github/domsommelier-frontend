'use client';

import React from 'react';

import cls from './CatalogBoard.module.scss';
import { ProductCard } from '../../../../ui/ProductCard/ProductCard';
import {
  productTypeLabels,
  TProductType,
} from '../../../../constants/productTypes';
import { FilterControllers } from './FilterControllers/FilterControllers';
import { TProductCard } from '../../../../services/products/interfaces/base';

export interface ICatalogBoardProps {
  productType: TProductType;
  initialProductCards: TProductCard[];
}

export const CatalogBoard: React.FC<ICatalogBoardProps> = ({ productType, initialProductCards }) => {
  const [productCards, setProductCards] = React.useState<TProductCard[]>(initialProductCards);

  return (
    <section className={cls.container}>
      <h2 className={cls.title}>{productTypeLabels[productType]}</h2>
      <FilterControllers productType={productType} />
      <div className={cls.board}>
        {productCards.map((card) => (
          <ProductCard
            key={card.id}
            option={card}
            className={cls.card}
          />
        ))}
      </div>
    </section>
  );
};
