'use client';

import React from 'react';
import cls from './PickupStoreModalList.module.scss';
import { PickupStoreModalListItem } from './PickupStoreModalListItem/PickupStoreModalListItem';
import { MOCK_STORES } from '../utils';

interface PickupStoreModalListProps {
  selectedStoreId: string | null;
  onStoreSelect: (storeId: string) => void;
}

export const PickupStoreModalList: React.FC<PickupStoreModalListProps> = ({
  selectedStoreId,
  onStoreSelect,
}) => {
  return (
    <div className={cls.container}>
      {MOCK_STORES.map((store) => (
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

