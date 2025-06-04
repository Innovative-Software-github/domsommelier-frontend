import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { catalogRoutes } from '../../../constants/routes/productsRoutes';

import cls from './HeaderCatalogLinks.module.scss';

export const HeaderCatalogLinks = () => {
  return (
    <div className={cls.container}>
      {Object.values(catalogRoutes).map((catalogRoute) => (
        <Link
          key={catalogRoute.label}
          href={catalogRoute.href}
          className={clsx(cls.link, {
            [cls.primaryLink]: catalogRoute.isPrimary,
          })}
        >
          {catalogRoute.label}
        </Link>
      ))}
    </div>
  );
};
