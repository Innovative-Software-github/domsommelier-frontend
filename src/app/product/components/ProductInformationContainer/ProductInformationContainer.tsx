'use client';

import React from 'react';

import { ProductPhotoGallery } from './ProductPhotoGallery/ProductPhotoGallery';
import { ProductInformation } from './ProductInformation/ProductInformation';
import { ProductActionPanel } from './ProductActionPanel/ProductActionPanel';

import cls from './ProductInformationContainer.module.scss';

export const ProductInformationContainer: React.FC = () => {
  return (
    <div className={cls.container}>
      <ProductPhotoGallery />
      <ProductInformation />
      <ProductActionPanel />
    </div>
  );
};
