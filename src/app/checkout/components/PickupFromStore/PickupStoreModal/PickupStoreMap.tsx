'use client';

import React, { useState } from 'react';
import cls from './PickupStoreMap.module.scss';
import { PickupStoreModalList } from './PickupStoreModalList/PickupStoreModalList';
import { PickupStoreModalMap } from './PickupStoreModalMap/PickupStoreModalMap';
import { MOCK_STORES, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, SELECTED_STORE_ZOOM } from './utils';
import { ISelectedStore } from '../PickupFromStore';

export interface IPickupStoreModalProps {
  selectedStore?: ISelectedStore;
  onStoreSelect: (store: ISelectedStore) => void;
}

export const PickupStoreModal: React.FC<IPickupStoreModalProps> = ({ 
  selectedStore,
  onStoreSelect 
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(
    selectedStore?.id || MOCK_STORES[0].id
  );
  const [mapState, setMapState] = useState({
    center: DEFAULT_MAP_CENTER,
    zoom: DEFAULT_MAP_ZOOM,
  });

  const handleStoreSelect = (storeId: string) => {
    setSelectedStoreId(storeId);
    
    const store = MOCK_STORES.find(s => s.id === storeId);
    if (store) {
      setMapState({
        center: store.coordinates as [number, number],
        zoom: SELECTED_STORE_ZOOM,
      });

      onStoreSelect({
        id: store.id,
        name: store.name,
        address: store.address,
        workingHours: store.workingHours,
      });
    }
  };

  return (
    <div className={cls.wrapper}>
      <PickupStoreModalList 
        selectedStoreId={selectedStoreId}
        onStoreSelect={handleStoreSelect}
      />
      <PickupStoreModalMap 
        selectedStoreId={selectedStoreId}
        mapState={mapState}
        onStoreSelect={handleStoreSelect}
      />
    </div>
  );
};