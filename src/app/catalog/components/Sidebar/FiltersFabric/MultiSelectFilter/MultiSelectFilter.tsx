'use client';

import * as React from 'react';

import cls from './MultiSelectFilter.module.scss';
import { Accordion } from '../../../../../../ui/Accordion/Accordion';
import { IFiltersState } from '../../utils';
import { Checkbox } from '../../../../../../ui/Checkbox/Checkbox';

export interface IMultiSelectFilterConfig {
  id: string;
  type: 'multi_select';
  name: string;
  options: { value: string; label: string }[];
}

export interface IMultiSelectFilterProps {
  filterConfig: IMultiSelectFilterConfig;
  filterState: any;
  isAccordionOpen?: boolean;
  onUpdateFilterArray: (value: any) => void;
}

export const MultiSelectFilter: React.FC<IMultiSelectFilterProps> = ({
  filterConfig,
  filterState = [],
  isAccordionOpen = false,
  onUpdateFilterArray,
}) => {
  const { id, name, options } = filterConfig;

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
            theme="gray"
            checked={filterState.includes(option.value)}
            onChange={() => handleToggle(option.value)}
          >
            {option.label}
          </Checkbox>
        ))}
      </aside>
    </Accordion>
  );
};
