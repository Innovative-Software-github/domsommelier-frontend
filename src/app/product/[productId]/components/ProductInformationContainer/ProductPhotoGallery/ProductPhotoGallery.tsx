'use client';

import React from 'react';

import cls from './ProductPhotoGallery.module.scss';
import Image from 'next/image';

export const ProductPhotoGallery: React.FC = () => {
  return (
    <div className={cls.container}>
      <div className={cls.responsiveImageWrapper}>
        <Image
          className={cls.productImage}
          src="/wineBottle.png"
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
