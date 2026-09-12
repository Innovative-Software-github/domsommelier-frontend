'use client';

import React from 'react';
import { ExtendedInformation } from './ExtendedInformation/ExtendedInformation';

import cls from './ProductInformation.module.scss';
import { AccordionsInformation } from './AccordionsInformation/AccordionsInformation';
import { GeneralInformation } from './GeneralInformation/GeneralInformation';
import { TProduct } from '../../../../../../services/products/interfaces/base';

export interface IProductInformationProps {
  product: TProduct;
}

export const ProductInformation: React.FC<IProductInformationProps> = ({ product }) => {
  return (
    <div className={cls.container}>
      <h1 className={cls.title}>{product.name}</h1>

      <GeneralInformation product={product} />
      <ExtendedInformation product={product} />
      <AccordionsInformation product={product} />
    </div>
  );
};
