'use client';

import React from 'react';
import cls from './GeneralInformation.module.scss';
import { TProduct } from '../../../../../../../services/products/interfaces/base';
import { getGeneralInformationData } from './utils';

export interface IGeneralInformationProps {
  product: TProduct;
}

export const GeneralInformation: React.FC<IGeneralInformationProps> = ({ product }) => {
  const generalInformationData = getGeneralInformationData(product);

  return (
    <div className={cls.container}>
      {generalInformationData.map(({ property, result }) => (
        <div className={cls.block}>
          <span className={cls.property}>{`${property}:`}</span>
          <span className={cls.result}>{result}</span>
        </div>
      ))}
    </div>
  );
};
