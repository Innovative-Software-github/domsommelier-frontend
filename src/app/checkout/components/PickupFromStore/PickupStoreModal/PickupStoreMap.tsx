'use client';

import React, { useEffect, useState } from 'react';
import cls from './PickupStoreMap.module.scss';
import { PickupStoreModalList } from './PickupStoreModalList/PickupStoreModalList';
import { PickupStoreModalMap } from './PickupStoreModalMap/PickupStoreModalMap';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, SELECTED_STORE_ZOOM } from './utils';
import { ISelectedStore } from '../PickupFromStore';
import { getWineStores } from '../../../../../services/wine-stores/requests';
import { IWineStore } from '../../../../../services/wine-stores/interfaces';

export interface IPickupStoreModalProps {
  selectedStore?: ISelectedStore;
  onStoreSelect: (store: ISelectedStore) => void;
}

export const PickupStoreModal: React.FC<IPickupStoreModalProps> = ({
  selectedStore,
  onStoreSelect,
}) => {
  const [stores, setStores] = useState<IWineStore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(
    selectedStore?.id ?? null,
  );
  const [mapState, setMapState] = useState({
    center: DEFAULT_MAP_CENTER,
    zoom: DEFAULT_MAP_ZOOM,
  });

  useEffect(() => {
    getWineStores()
      .then((page) => {
        setStores(page.content);
        if (selectedStoreId === null && page.content.length > 0) {
          setSelectedStoreId(page.content[0].id);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleStoreSelect = (storeId: number) => {
    setSelectedStoreId(storeId);

    const store = stores.find((s) => s.id === storeId);
    if (store) {
      setMapState({
        center: [store.location.latitude, store.location.longitude],
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

  if (isLoading) {
    return <div className={cls.wrapper}><p>Загрузка винотек...</p></div>;
  }

  return (
    <div className={cls.wrapper}>
      <PickupStoreModalList
        stores={stores}
        selectedStoreId={selectedStoreId}
        onStoreSelect={handleStoreSelect}
      />
      <PickupStoreModalMap
        stores={stores}
        selectedStoreId={selectedStoreId}
        mapState={mapState}
        onStoreSelect={handleStoreSelect}
      />
    </div>
  );
};
