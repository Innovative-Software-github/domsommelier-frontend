'use client';

import React from 'react';

import cls from './ProductPhotoGallery.module.scss';
import Image from 'next/image';

export const ProductPhotoGallery: React.FC = () => {
  return <div className={cls.container}>
    <Image className={cls.productImage} width={470} height={525} src='/wineBottle.png' alt="Фотография продукта" />
  </div>;
};
