import React from 'react';
import cls from './PickupStoreModalListItem.module.scss';
import clsx from 'clsx';

export interface IPickupStoreModalListItemProps {
  // TODO:уточнить тип когда подключим к серверу
  store: any;
  isSelected: boolean;
  onClick: () => void;
}

export const PickupStoreModalListItem: React.FC<IPickupStoreModalListItemProps> = ({
  store,
  isSelected,
  onClick,
}) => {
  return (
    <button 
      className={clsx(cls.container, {
        [cls.selected]: isSelected,
      })}
      type="button"
      onClick={onClick}
    >
      <h2 className={cls.title}>{store.name}</h2>
      <p className={cls.address}>{store.address}</p>
      <p className={cls.openingHours}>{store.workingHours}</p>
    </button>
  );
};