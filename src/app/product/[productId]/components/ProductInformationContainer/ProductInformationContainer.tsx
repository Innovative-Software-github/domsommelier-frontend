'use client';

import * as React from 'react';

import { ProductPhotoGallery } from './ProductPhotoGallery/ProductPhotoGallery';
import { ProductInformation } from './ProductInformation/ProductInformation';
import { ProductActionPanel } from './ProductActionPanel/ProductActionPanel';
import { useMediaContext } from '../../../../../hooks/useMediaQuery';
import { ProductCartButton } from './ProductCartButton/ProductCartButton';
import { TProduct } from '../../../../../services/products/interfaces/base';

import cls from './ProductInformationContainer.module.scss';

export interface IProductInformationContainerProps {
  product: TProduct;
}

export const ProductInformationContainer: React.FC<IProductInformationContainerProps> = ({ product }) => {
  const isTablet = useMediaContext(1000) === 'mobile';

  return (
    <div className={cls.container}> 
      <ProductPhotoGallery productPhoto={product.productPhoto} />

      <ProductInformation product={product} />

      <ProductActionPanel 
        productId={product.id}
        price={product.price} 
        discount={product.discount} 
      />

      {isTablet && (
        <ProductCartButton 
          productId={product.id}
          price={product.price} 
          discount={product.discount} 
        />
      )}
    </div>
  );
};
