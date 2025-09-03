'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import {
  productTypeArray,
  productTypeLabels,
  TProductType,
} from '../../../../../constants/productTypes';

import cls from './Category.module.scss';
import { PRODUCT_TYPES_SEGMENTS } from '../../../../../constants/routes';

export interface ICategoryProps {
  productType: TProductType;
}

export const Category: React.FC<ICategoryProps> = ({ productType }) => {
  return (
    <nav className={cls.container}>
      <div className={cls.title}>Категории</div>
      <ul className={cls.links}>
        {productTypeArray.map((type, index) => (
          <Link
            key={index}
            scroll={false}
            className={clsx(cls.link, {
              [cls.activeLink]: productType === type,
            })}
            href={PRODUCT_TYPES_SEGMENTS[type]}
          >
            {productTypeLabels[type]}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
