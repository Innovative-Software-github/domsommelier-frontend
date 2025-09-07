'use client';

import React from 'react';
import Image from 'next/image';

import { TProduct } from '../../../../../../services/products/interfaces/base';

import cls from './ProductPhotoGallery.module.scss';

export interface IProductPhotoGalleryProps {
  productPhoto: TProduct['productPhoto'];
}

export const ProductPhotoGallery: React.FC<IProductPhotoGalleryProps> = ({ productPhoto }) => {
  // TODO: add photo gallery
  const photo = productPhoto[0];

  return (
    <div className={cls.container}>
      <div className={cls.responsiveImageWrapper}>
        <Image
          className={cls.productImage}
          src={photo?.url || '/wineBottle.png'}
          alt="Фотография продукта"
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 60vw, 470px"
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
};
