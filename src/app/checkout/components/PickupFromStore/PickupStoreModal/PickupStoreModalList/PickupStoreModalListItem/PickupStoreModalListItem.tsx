import React from 'react';
import cls from './PickupStoreModalListItem.module.scss';
import clsx from 'clsx';
import { IWineStore } from '../../../../../../../services/wine-stores/interfaces';

export interface IPickupStoreModalListItemProps {
  store: IWineStore;
  isSelected: boolean;
  disabled?: boolean;
  unavailableProducts?: string[];
  onClick: () => void;
}

export const PickupStoreModalListItem: React.FC<IPickupStoreModalListItemProps> = ({
  store,
  isSelected,
  disabled = false,
  unavailableProducts = [],
  onClick,
}) => {
  return (
    <button
      className={clsx(cls.container, {
        [cls.selected]: isSelected,
        [cls.disabled]: disabled,
      })}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      <h2 className={cls.title}>{store.name}</h2>
      <p className={cls.address}>{store.address}</p>
      <p className={cls.openingHours}>{store.workingHours}</p>
      {disabled && (
        <p className={cls.unavailable}>
          {unavailableProducts.length > 0
            ? `Нет в наличии: ${unavailableProducts.join(', ')}`
            : 'Нужных товаров нет в этой винотеке'}
        </p>
      )}
    </button>
  );
};
