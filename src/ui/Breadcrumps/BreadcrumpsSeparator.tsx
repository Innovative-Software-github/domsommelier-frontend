import React from 'react';

import { IBreadcrumps } from './Breadcrumps';

import cls from './Breadcrumps.module.scss';

export interface IBreadcrumpsSeparator {
  separator: IBreadcrumps['separator'];
}

export const BreadcrumpsSeparator: React.FC<IBreadcrumpsSeparator> = ({
  separator,
}) => {
  return (
    <div role="presentation" className={cls.separator}>
      {separator}
    </div>
  );
};
