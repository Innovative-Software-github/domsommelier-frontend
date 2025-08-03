import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import {
  productTypeArray,
  productTypeLabels,
} from '../../../constants/productTypes';

import cls from './HeaderCatalogLinks.module.scss';
import { PRODUCT_TYPES_SEGMENTS } from '../../../constants/routes';

export const HeaderCatalogLinks = () => {
  return (
    <div className={cls.container}>
      {productTypeArray.map((type) => (
        <Link
          key={type}
          href={PRODUCT_TYPES_SEGMENTS[type]}
          className={clsx(cls.link, {
            // [cls.primaryLink]: catalogRoute.isPrimary,
          })}
        >
          {productTypeLabels[type]}
        </Link>
      ))}
    </div>
  );
};
