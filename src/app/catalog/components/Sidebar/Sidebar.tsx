'use client';

import React from 'react';

import { Category } from './Category/Category';
import { TDrinkType } from '../../../../constants/routes/catalogRoutes';

import cls from './Sidebar.module.scss';
import { FiltersPanel } from '../FiltersPanel/FiltersPanel';

export interface ISidebarProps {
  drinkType: TDrinkType;
}

export const Sidebar: React.FC<ISidebarProps> = ({ drinkType }) => {
  return (
    <section className={cls.container}>
      <Category drinkType={drinkType} />
      <FiltersPanel />
    </section>
  );
};
