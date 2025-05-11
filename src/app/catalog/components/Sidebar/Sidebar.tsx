import React from 'react';

import cls from './Sidebar.module.scss';
import { Category } from '../Category/Category';
import { TDrinkType } from '../../../../constants/catalogLinks';

export interface ISidebarProps {
  drinkType: TDrinkType;
}

export const Sidebar: React.FC<ISidebarProps> = ({ drinkType }) => {
  return (
    <section className={cls.container}>
      <Category drinkType={drinkType} />
    </section>
  );
};
