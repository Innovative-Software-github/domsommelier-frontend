'use client';

import * as React from 'react';

import cls from './MultiSelectFilter.module.scss';
import { Accordion } from '../../../../../../../ui/Accordion/Accordion';
import { Checkbox } from '../../../../../../../ui/Checkbox/Checkbox';
import {
  IMultiSelectFilterConfig,
  TMultiSelectFilterValue,
} from '../interfaces';

export interface IMultiSelectFilterProps {
  isAccordionOpen?: boolean;
  filterConfig: IMultiSelectFilterConfig;
  filterState: TMultiSelectFilterValue;
  onUpdateFilterArray: (value: TMultiSelectFilterValue) => void;
}

export const MultiSelectFilter: React.FC<IMultiSelectFilterProps> = ({
  filterConfig,
  filterState = [],
  isAccordionOpen = false,
  onUpdateFilterArray,
}) => {
  const { name, options } = filterConfig;

  const handleToggle = (value: string) => {
    const next = filterState.includes(value)
      ? filterState.filter((v: string) => v !== value)
      : [...filterState, value];

    onUpdateFilterArray(next);
  };

  return (
    <Accordion
      title={name}
      className={cls.accordion}
      isDefaultOpen={isAccordionOpen}
    >
      <aside className={cls.container}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            theme="gray"
            checked={filterState.includes(option.label)}
            onChange={() => handleToggle(option.label)}
          >
            {option.label}
          </Checkbox>
        ))}
      </aside>
    </Accordion>
  );
};
