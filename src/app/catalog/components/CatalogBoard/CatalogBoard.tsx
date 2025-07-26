import * as React from 'react';

import cls from './CatalogBoard.module.scss';
import { ProductCard } from '../../../../ui/ProductCard/ProductCard';
import { productCardModelMock } from '../../../../constants/temporaryMocks';
import {
  productTypeLabels,
  TProductType,
} from '../../../../constants/productTypes';
import { FilterControllers } from './FilterControllers/FilterControllers';

export interface ICatalogBoardProps {
  productType: TProductType;
}

export const CatalogBoard: React.FC<ICatalogBoardProps> = ({ productType }) => {
  return (
    <section className={cls.container}>
      <h2 className={cls.title}>{productTypeLabels[productType]}</h2>
      <FilterControllers productType={productType} />
      <div className={cls.board}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCard
            key={i}
            className={cls.card}
            options={productCardModelMock}
          />
        ))}
      </div>
    </section>
  );
};
