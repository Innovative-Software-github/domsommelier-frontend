import * as React from 'react';

import cls from './CategoryContentFilters.module.scss';
import { IFilterConfig } from '../../../../../../app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces';
import { CategoryFilterRange } from './CategoryFilterRange/CategoryFilterRange';
import { CategoryFilterMultiSelect } from './CategoryFilterMultiSelect/CategoryFilterMultiSelect';

export interface ICategoryContentFiltersProps {
  filter: IFilterConfig;
}

export const CategoryContentFilters: React.FC<ICategoryContentFiltersProps> = ({
  filter,
}) => {
  return (
    <div className={cls.container}>
      {filter.type === 'range' && (
        <div className={cls.filter}>
          <CategoryFilterRange filter={filter} />
        </div>
      )}
      {filter.type === 'multi_select' && (
        <div className={cls.filter}>
          <CategoryFilterMultiSelect filter={filter} />
        </div>
      )}
    </div>
  );
};
