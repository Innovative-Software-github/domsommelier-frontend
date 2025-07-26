'use client';

import * as React from 'react';

import { ProductPhotoGallery } from './ProductPhotoGallery/ProductPhotoGallery';
import { ProductInformation } from './ProductInformation/ProductInformation';
import { ProductActionPanel } from './ProductActionPanel/ProductActionPanel';
import { useMediaContext } from '../../../../hooks/useMediaQuery';
import { ProductCartButton } from './ProductCartButton/ProductCartButton';
import cls from './ProductInformationContainer.module.scss';

export const ProductInformationContainer: React.FC = () => {
  const isTablet = useMediaContext(1000) === 'mobile';

  return (
    <div className={cls.container}>
      <ProductPhotoGallery />
      <ProductInformation />
      <ProductActionPanel />
      {isTablet && <ProductCartButton />}
    </div>
  );
};
