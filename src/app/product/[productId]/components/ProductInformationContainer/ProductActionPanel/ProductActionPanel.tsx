'use client';

import React from 'react';
import clsx from 'clsx';

import cls from './ProductActionPanel.module.scss';
import { Button } from '../../../../../../ui/Button/Button';
import { Icon } from '../../../../../../ui/Icon/Icon';
import { IconType } from '../../../../../../ui/Icon/IconsMapping';
import { QuantityButton } from '../../../../../../ui/QuantityButton/QuantityButton';
import { useProductPrice } from '../../../../../../hooks/useProductPrice';
import { useProductBasket } from '../../../../../../hooks/basket/useProductBasket';
import { useProductSaved } from '../../../../../../hooks/saved/useProductSaved';
import { useNearestStore } from '../../../../../../hooks/useNearestStore';
import { Spinner } from '../../../../../../ui/Spinner/Spinner';

export interface IProductActionPanelProps {
  productId: string;
  price: number;
  discount?: number | null;
}

export const ProductActionPanel: React.FC<IProductActionPanelProps> = ({
  productId,
  price,
  discount,
}) => {
  const { hasDiscount, currentPrice } = useProductPrice(price, discount);
  const { isInBasket, currentQuantity, handleAddToBasket, handleQuantityChange } = useProductBasket(productId);
  const { isSaved, handleToggleSaved, isProductSavedLoading } = useProductSaved(productId);
  const { store: nearestStore, isLoading: isNearestStoreLoading } = useNearestStore();

  return (
    <div className={cls.container}>
      {hasDiscount && <div className={cls.oldPrice}>{price} ₽</div>}
      <div className={cls.price}>{currentPrice} ₽</div>
      <div className={cls.actions}>
        <Button
          className={clsx(cls.favoriteButton, {
            [cls.favoriteButtonSaved]: isSaved,
          }) }
          variant="darkOutlined"
          onClick={handleToggleSaved}
          isDisabled={isProductSavedLoading}
        >
          {isProductSavedLoading ? (
            <Spinner className={cls.spinner} size="l" />
          ) : (
          <Icon
            className={clsx(cls.heartIcon, isSaved && cls.heartIconActive)}
            type={IconType.Heart_24}
            />
          )}
        </Button>
        
        {isInBasket ? (
          <QuantityButton
            theme="white"
            value={currentQuantity}
            onChange={handleQuantityChange}
            className={cls.quantityButton}
          />
        ) : (
          <Button onClick={handleAddToBasket}>
            В корзину
          </Button>
        )}
      </div>
      {!isNearestStoreLoading && (
        <div className={cls.delivery}>
          <div className={cls.deliveryText}>Способ получения</div>
          <div className={cls.deliveryAdress}>
            {nearestStore
              ? `Самовывоз ${nearestStore.address || nearestStore.name}`
              : 'Уточните адрес винотеки при оформлении заказа'}
          </div>
        </div>
      )}
    </div>
  );
};
