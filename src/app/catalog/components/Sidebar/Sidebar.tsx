import React from 'react';

import { Category } from './Category/Category';
import { TProductType } from '../../../../constants/productTypes';
import { FiltersPanel } from '../FiltersPanel/FiltersPanel';

import cls from './Sidebar.module.scss';

export interface ISidebarProps {
  productType: TProductType;
}

export const Sidebar: React.FC<ISidebarProps> = ({ productType }) => {
  return (
    <section className={cls.container}>
      <Category productType={productType} />
      <FiltersPanel productType={productType} />
    </section>
  );
};
