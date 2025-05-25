import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import {
  catalogRoutes,
  TDrinkType,
} from '../../../../../constants/routes/catalogRoutes';

import cls from './Category.module.scss';

export interface ICategoryProps {
  drinkType: TDrinkType;
}

export const Category: React.FC<ICategoryProps> = ({ drinkType }) => {
  return (
    <nav className={cls.container}>
      <div className={cls.title}>Категории</div>
      <ul className={cls.links}>
        {Object.values(catalogRoutes).map(
          ({ label, href, drinkType: linkDrinkType, isPrimary }) => {
            if (!isPrimary) {
              return (
                <Link
                  key={label}
                  scroll={false}
                  className={clsx(cls.link, {
                    [cls.activeLink]: drinkType === linkDrinkType,
                  })}
                  href={href}
                >
                  {label}
                </Link>
              );
            }
          },
        )}
      </ul>
    </nav>
  );
};
