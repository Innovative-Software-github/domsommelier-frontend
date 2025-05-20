'use client';

import * as React from 'react';
import cls from './CheckboxFilter.module.scss';

import { Checkbox } from '../../../../../../ui/Checkbox/Checkbox';
import { ICheckboxFilterConfig, TCheckboxFilterValue } from '../../interfaces';

export interface ICheckboxFilterProps {
  filterState: TCheckboxFilterValue;
  filterConfig: ICheckboxFilterConfig;
  onUpdateFilterArray: (value: TCheckboxFilterValue) => void;
}

export const CheckboxFilter: React.FC<ICheckboxFilterProps> = ({
  filterState,
  filterConfig,
  onUpdateFilterArray,
}) => {
  const { name } = filterConfig;

  return (
    <aside className={cls.container}>
      <Checkbox
        checked={filterState}
        theme="gray"
        onChange={(event) => onUpdateFilterArray(event.target.checked)}
      >
        {name}
      </Checkbox>
    </aside>
  );
};
