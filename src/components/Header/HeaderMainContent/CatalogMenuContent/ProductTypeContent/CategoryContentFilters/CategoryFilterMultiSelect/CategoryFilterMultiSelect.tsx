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
        {filter.options.map(({ label, value }) => {
          const params: Record<string, any> = {};
          if (value !== null) {
            params[filter.id] = [value];
          }

          const searchString = stringifySearchParams(params);

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
