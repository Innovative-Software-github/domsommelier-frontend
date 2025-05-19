'use client';

import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import clsx from 'clsx';
import cls from './RangeSlider.module.scss';
import Tooltip from 'rc-tooltip';

export interface CustomRangeSliderProps {
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Текущее значение слайдера */
  value: [number, number];
  /** Колбэк при изменении */
  onChange: (value: [number, number]) => void;
  /** Шаг */
  step?: number;
  /** Дополнительный className */
  className?: string;
}

export const RangeSlider: React.FC<CustomRangeSliderProps> = ({
  min = 0,
  max = 100,
  value,
  onChange,
  step = 1,
  className,
}) => {
  return (
    <div className={clsx(cls.wrapper, className)}>
      <Slider
        range
        allowCross={false}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(val) => onChange(val as [number, number])}
        railStyle={{ backgroundColor: '#D9D9D9', height: 2 }}
        trackStyle={[
          { backgroundColor: '#242424', height: 2, borderRadius: 0 },
        ]}
        handleStyle={[
          {
            width: 2,
            height: 10,
            backgroundColor: '#242424',
            border: 'none',
            borderRadius: 0,
            marginTop: -4,
            transform: 'none',
            opacity: 1,
          },
          {
            width: 2,
            height: 10,
            backgroundColor: '#242424',
            border: 'none',
            borderRadius: 0,
            marginTop: -4,
            transform: 'none',
            opacity: 1,
          },
        ]}
      />
    </div>
  );
};
