import * as React from 'react';

import cls from './ProductTypeContent.module.scss';
import { ProductCardWithBasket } from '../../../../../ui/ProductCard/ProductCardWithBasket';
import { TProductCard } from '../../../../../services/products/interfaces/base';

export interface IProductTypeContentProps {
  product: TProductCard | null;
  isLoading: boolean;
}

export const ProductTypeContent: React.FC<IProductTypeContentProps> = ({
  product,
  isLoading,
}) => {
  return (
    <div className={cls.content}>
      {isLoading && <div className={cls.placeholder}>Загрузка…</div>}

      {!isLoading && product && (
        <ProductCardWithBasket option={product} className={cls.card} />
      )}

      {!isLoading && !product && (
        <div className={cls.placeholder}>В этой категории пока нет товаров</div>
      )}
    </div>
  );
};
