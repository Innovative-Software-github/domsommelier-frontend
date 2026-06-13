'use client';

import { useSelector } from 'react-redux';
import { savedProductsSelector } from '../../../../../store/saved/selectors';
import { BlockContainer } from '../../../../../ui/BlockContainer/BlockContainer';
import { SavedProductRow } from './SavedProductRow/SavedProductRow';
import cls from './SavedProductsList.module.scss';

export const SavedProductsList: React.FC = () => {
  const items = useSelector(savedProductsSelector);

  return (
    <BlockContainer className={cls.productsList}>
      {items.map((item) => (
        <SavedProductRow key={item.product.id} item={item} />
      ))}
    </BlockContainer>
  );
};
