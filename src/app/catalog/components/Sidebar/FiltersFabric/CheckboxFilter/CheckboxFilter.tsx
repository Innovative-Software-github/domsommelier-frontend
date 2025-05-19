'use client';

import * as React from 'react';
import cls from './CheckboxFilter.module.scss';

import { Checkbox } from '../../../../../../ui/Checkbox/Checkbox';

export interface ICheckboxFilterConfig {
  id: string;
  type: 'checkbox';
  name: string;
}

export interface ICheckboxFilterProps {
  filterState: boolean;
  filterConfig: ICheckboxFilterConfig;
  onUpdateFilterArray: (value: boolean) => void;
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
