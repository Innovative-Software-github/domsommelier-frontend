import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import {
  catalogRoutes,
  TProductType,
} from '../../../../../constants/routes/productsRoutes';

import cls from './Category.module.scss';

export interface ICategoryProps {
  productType: TProductType;
}

export const Category: React.FC<ICategoryProps> = ({ productType }) => {
  return (
    <nav className={cls.container}>
      <div className={cls.title}>Категории</div>
      <ul className={cls.links}>
        {Object.values(catalogRoutes).map(
          ({ label, href, productType: linkProductType, isPrimary }) => {
            if (!isPrimary) {
              return (
                <Link
                  key={label}
                  scroll={false}
                  className={clsx(cls.link, {
                    [cls.activeLink]: productType === linkProductType,
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
