import * as React from 'react';

import cls from './ProductTypeContent.module.scss';
import { ProductCardWithBasket } from '../../../../../ui/ProductCard/ProductCardWithBasket';
import { TProductCard } from '../../../../../services/products/interfaces/base';

export interface IProductTypeContentProps {
  products: TProductCard[];
  isLoading: boolean;
}

export const ProductTypeContent: React.FC<IProductTypeContentProps> = ({
  products,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className={cls.grid}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={cls.skeletonCard}>
            <div className={cls.skeletonImage} />
            <div className={cls.skeletonLine} />
            <div className={cls.skeletonLineShort} />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <div className={cls.placeholder}>В этой категории пока нет товаров</div>;
  }

  return (
    <div className={cls.grid}>
      {products.map((product) => (
        <ProductCardWithBasket
          key={product.id}
          option={product}
          className={cls.card}
        />
      ))}
    </div>
  );
};
