'use client';

import React from 'react';
import cls from './PickupStoreModalList.module.scss';
import { PickupStoreModalListItem } from './PickupStoreModalListItem/PickupStoreModalListItem';
import { IWineStore } from '../../../../../../services/wine-stores/interfaces';
import { IStoreAvailability } from '../../../../../../services/basket/interfaces';

interface PickupStoreModalListProps {
  stores: IWineStore[];
  selectedStoreId: number | null;
  availabilityByStore: Record<number, IStoreAvailability>;
  onStoreSelect: (storeId: number) => void;
}

export const PickupStoreModalList: React.FC<PickupStoreModalListProps> = ({
  stores,
  selectedStoreId,
  availabilityByStore,
  onStoreSelect,
}) => {
  return (
    <div className={cls.container}>
      {stores.map((store) => {
        const availability = availabilityByStore[store.id];
        const isUnavailable = availability?.available === false;

        return (
          <PickupStoreModalListItem
            key={store.id}
            store={store}
            isSelected={selectedStoreId === store.id}
            disabled={isUnavailable}
            unavailableProducts={availability?.unavailableProducts ?? []}
            onClick={() => onStoreSelect(store.id)}
          />
        );
      })}
    </div>
  );
};
