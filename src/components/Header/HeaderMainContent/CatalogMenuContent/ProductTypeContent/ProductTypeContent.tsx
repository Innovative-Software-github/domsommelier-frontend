import * as React from 'react';

import cls from './ProductTypeContent.module.scss';
import { TProductType } from '../../../../../constants/productTypes';
import { IFilterConfig } from '../../../../../app/catalog/components/Sidebar/interfaces';
import { ProductTypeColumn } from './ProductTypeColumn/ProductTypeColumn';

export interface IProductTypeContentProps {
  activeProductTypeKey: TProductType;
  getVisibleFiltersByKey: (key: TProductType) => IFilterConfig[];
}

export const ProductTypeContent: React.FC<IProductTypeContentProps> = ({
  activeProductTypeKey,
  getVisibleFiltersByKey,
}) => {
  const visibleFilters = getVisibleFiltersByKey(activeProductTypeKey);

  return (
    <div className={cls.content}>
      {visibleFilters.map((filter, key) => (
        <ProductTypeColumn
          key={key}
          filter={filter}
        />
      ))}
    </div>
  );
};
