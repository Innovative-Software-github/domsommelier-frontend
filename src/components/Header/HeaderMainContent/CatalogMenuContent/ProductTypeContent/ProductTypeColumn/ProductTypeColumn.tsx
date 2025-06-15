import * as React from 'react';

import cls from './ProductTypeColumn.module.scss';
import { CategoryContentFilters } from '../CategoryContentFilters/CategoryContentFilters';
import { IFilterConfig } from '../../../../../../app/catalog/components/Sidebar/interfaces';

export interface IProductTypeColumnProps {
  filter: IFilterConfig;
}

export const ProductTypeColumn: React.FC<IProductTypeColumnProps> = ({
  filter,
}) => {
  return (
    <div className={cls.column}>
      <CategoryContentFilters filter={filter} />
    </div>
  );
};
