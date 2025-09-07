'use client';

import * as React from 'react';
import cls from './RangeFilter.module.scss';

import { Accordion } from '../../../../../../../ui/Accordion/Accordion';
import { FilledInput } from '../../../../../../../ui/FilledInput/FilledInput';
import { Checkbox } from '../../../../../../../ui/Checkbox/Checkbox';
import { isNumber } from '../../../../../../../utils/isNumber';
import { IRangeFilterConfig, TRangeFilterValue } from '../interfaces';

export type TValueStep = {
  min: number | null;
  max: number | null;
  label: string;
};

export interface IRangeFilterProps {
  isAccordionOpen?: boolean;
  filterState: TRangeFilterValue;
  filterConfig: IRangeFilterConfig;
  onUpdateFilterArray: (value: TRangeFilterValue) => void;
}

export const RangeFilter: React.FC<IRangeFilterProps> = ({
  filterState = [null, null],
  isAccordionOpen = false,
  filterConfig,
  onUpdateFilterArray,
}) => {
  const { name, min, max, unit = '', steps } = filterConfig;

  const [minValue, maxValue] = filterState;

  return (
    <Accordion
      title={name}
      className={cls.accordion}
      isDefaultOpen={isAccordionOpen}
    >
      <aside className={cls.container}>
        <div className={cls.inputContainer}>
          <FilledInput
            elPrefix="от"
            placeholder={`${min.toLocaleString()} ${unit}`}
            value={minValue?.toString() || ''}
            onChange={(event) => {
              let localValue = Number(event.target.value);
              if (localValue > max) localValue = max;
              if (isNumber(localValue)) {
                onUpdateFilterArray([localValue || null, maxValue]);
              }
            }}
          />
          <FilledInput
            elPrefix="до"
            placeholder={`${max.toLocaleString()} ${unit}`}
            value={maxValue?.toString() || ''}
            onChange={(event) => {
              let localValue = Number(event.target.value);
              if (localValue > max) localValue = max;
              if (isNumber(localValue)) {
                onUpdateFilterArray([minValue, localValue || null]);
              }
            }}
          />
        </div>

        <div className={cls.checkboxContainer}>
          {steps.map((step) => (
            <Checkbox
              key={step.label}
              variant="rounded"
              theme="gray"
              checked={
                minValue === (step.min ?? null) &&
                maxValue === (step.max ?? null)
              }
              onChange={() =>
                onUpdateFilterArray([step.min ?? null, step.max ?? null])
              }
            >
              {step.label}
            </Checkbox>
          ))}
        </div>
      </aside>
    </Accordion>
  );
};
