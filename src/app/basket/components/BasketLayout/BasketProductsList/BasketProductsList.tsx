'use client';

import { useSelector } from 'react-redux';
import { basketProductsSelector } from '../../../../../store/basket/selectors';
import cls from './BasketProductsList.module.scss';
import { BlockContainer } from '../../../../../ui/BlockContainer/BlockContainer';
import { BasketProductRow } from './BasketProductRow/BasketProductRow';

export const BasketProductsList: React.FC = () => {
  const products = useSelector(basketProductsSelector);

  return (
    <BlockContainer className={cls.productsList}>
      {products.map((product) => (
        <BasketProductRow
          key={product.product.id}
          product={product}
        />
      ))}
    </BlockContainer>
  );
};
