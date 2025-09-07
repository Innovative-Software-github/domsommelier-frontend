import * as React from 'react';

import cls from './CategoryFilterRange.module.scss';
import { IRangeFilterConfig } from '../../../../../../../app/catalog/[type]/components/FiltersPanel/FiltersFabric/interfaces';
import Link from 'next/link';
import { PRODUCT_TYPES_SEGMENTS } from '../../../../../../../constants/routes';
import { stringifySearchParams } from '../../../../../../../utils/stringifySearchParams';

export interface ICategoryFilterRangeProps {
  filter: IRangeFilterConfig;
}

export const CategoryFilterRange: React.FC<ICategoryFilterRangeProps> = ({
  filter,
}) => {
  return (
    <div className={cls.container}>
      <h3 className={cls.title}>{filter.name}</h3>
      <div className={cls.list}>
        {filter.steps.map(({ label, min, max }) => {
          const params: Record<string, any> = {};
          if (min !== null || max !== null) {
            params[filter.id] = [
              min !== null ? min : '',
              max !== null ? max : '',
            ];
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
