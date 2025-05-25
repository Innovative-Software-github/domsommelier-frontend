import React from 'react';
import clsx from 'clsx';

import cls from './Breadcrumps.module.scss';
import { BreadcrumpsItem } from './BreadcrumpsItem';

export interface IBreadcrumpsOption {
  name: string;
  href?: string;
}

export interface IBreadcrumps {
  options: IBreadcrumpsOption[];
  separator?: React.ReactNode;
}

const DEFAULT_SEPARATOR = '|';

export const Breadcrumps: React.FC<IBreadcrumps> = ({
  options,
  separator = DEFAULT_SEPARATOR,
}) => {
  return (
    <nav className={cls.container} aria-label="breadcrumb">
      {options.map((option, index) => {
        const isLastItem = options.length - 1 === index;

        return (
          <BreadcrumpsItem
            key={option.name}
            option={option}
            separator={separator}
            isLastItem={isLastItem}
          />
        );
      })}
    </nav>
  );
};
