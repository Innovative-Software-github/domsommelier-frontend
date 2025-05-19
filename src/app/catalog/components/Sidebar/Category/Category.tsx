import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import {
  catalogLinks,
  TDrinkType,
} from '../../../../../constants/catalogLinks';

import cls from './Category.module.scss';

export interface ICategoryProps {
  drinkType: TDrinkType;
}

export const Category: React.FC<ICategoryProps> = ({ drinkType }) => {
  return (
    <nav className={cls.container}>
      <div className={cls.title}>Категории</div>
      <ul className={cls.links}>
        {catalogLinks.map(
          ({ label, link, drinkType: linkDrinkType, isPrimary }) => {
            if (!isPrimary) {
              return (
                <Link
                  key={label}
                  scroll={false}
                  className={clsx(cls.link, {
                    [cls.activeLink]: drinkType === linkDrinkType,
                  })}
                  href={link}
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
