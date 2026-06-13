'use client';

import React from 'react';
import cls from './PickupStoreModalList.module.scss';
import { PickupStoreModalListItem } from './PickupStoreModalListItem/PickupStoreModalListItem';
import { IWineStore } from '../../../../../../services/wine-stores/interfaces';

interface PickupStoreModalListProps {
  stores: IWineStore[];
  selectedStoreId: number | null;
  onStoreSelect: (storeId: number) => void;
}

export const PickupStoreModalList: React.FC<PickupStoreModalListProps> = ({
  stores,
  selectedStoreId,
  onStoreSelect,
}) => {
  return (
    <div className={cls.container}>
      {stores.map((store) => (
        <PickupStoreModalListItem
          key={store.id}
          store={store}
          isSelected={selectedStoreId === store.id}
          onClick={() => onStoreSelect(store.id)}
        />
      ))}
    </div>
  );
};
