import * as React from 'react';
import clsx from 'clsx';

import {
  TSpinnerSize,
  dimensionBySize,
  radiusBySize,
  widthBySize,
} from './utils';

import cls from './Spinner.module.scss';

export { spinnerSize } from './utils';

interface ILoaderProps {
  className?: string;
  size?: TSpinnerSize;
}

export const Spinner: React.FC<ILoaderProps> = (props) => {
  const { className, size = 'm' } = props;

  const dimension = dimensionBySize[size];
  const radius = radiusBySize[size];
  const width = widthBySize[size];
  const position = dimension / 2;
  const style = { '--conf-spinner-radius': radius } as React.CSSProperties;

  return (
    <span className={clsx(cls.spinner, className)} style={style}>
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        stroke="currentColor"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={position}
          cy={position}
          r={radius}
          strokeWidth={width}
          stroke="inherit"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

Spinner.displayName = 'Spinner';
