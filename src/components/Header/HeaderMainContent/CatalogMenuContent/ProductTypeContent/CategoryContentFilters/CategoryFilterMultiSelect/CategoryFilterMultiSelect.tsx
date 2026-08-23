import * as React from 'react';

import cls from './CategoryFilterMultiSelect.module.scss';
import { IMultiSelectFilterConfig } from '../../../../../../../app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces';
import Link from 'next/link';
import { PRODUCT_TYPES_SEGMENTS } from '../../../../../../../constants/routes';
import { stringifySearchParams } from '../../../../../../../utils/stringifySearchParams';

export interface ICategoryFilterMultiSelectProps {
  filter: IMultiSelectFilterConfig;
}

export const CategoryFilterMultiSelect: React.FC<
  ICategoryFilterMultiSelectProps
> = ({ filter }) => {
  return (
    <div className={cls.container}>
      <h3 className={cls.title}>{filter.name}</h3>
      <div className={cls.list}>
        {filter.options.map(({ label }) => {
          // Ключ — filter.field (не filter.id), значение — label (не value):
          // именно так каталог матчит фильтры из URL, см. FilterFactory.tsx
          // и MultiSelectFilter.tsx (сверяют по filterConfig.field / label).
          const searchString = stringifySearchParams({
            [filter.field]: [label],
          });

          return (
            <Link
              key={label}
              className={cls.listItem}
              href={`${
                PRODUCT_TYPES_SEGMENTS[filter.category]
              }?${searchString}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
