'use client';

import React, { useEffect, useState } from 'react';
import cls from './PickupStoreMap.module.scss';
import { PickupStoreModalList } from './PickupStoreModalList/PickupStoreModalList';
import { PickupStoreModalMap } from './PickupStoreModalMap/PickupStoreModalMap';
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, SELECTED_STORE_ZOOM } from './utils';
import { ISelectedStore } from '../PickupFromStore';
import { getWineStores } from '../../../../../services/wine-stores/requests';
import { IWineStore } from '../../../../../services/wine-stores/interfaces';
import { getBasketStoreAvailability } from '../../../../../services/basket/requests';
import { IStoreAvailability } from '../../../../../services/basket/interfaces';
import { useRequireCustomerId } from '../../../../../hooks/useRequireCustomerId';

export interface IPickupStoreModalProps {
  selectedStore?: ISelectedStore;
  onStoreSelect: (store: ISelectedStore) => void;
}

export const PickupStoreModal: React.FC<IPickupStoreModalProps> = ({
  selectedStore,
  onStoreSelect,
}) => {
  const { customerId } = useRequireCustomerId();
  const [stores, setStores] = useState<IWineStore[]>([]);
  const [availabilityByStore, setAvailabilityByStore] = useState<
    Record<number, IStoreAvailability>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(
    selectedStore?.id ?? null,
  );
  const [mapState, setMapState] = useState({
    center: DEFAULT_MAP_CENTER,
    zoom: DEFAULT_MAP_ZOOM,
  });

  useEffect(() => {
    Promise.all([
      getWineStores(),
      customerId
        ? getBasketStoreAvailability(customerId)
        : Promise.resolve([] as IStoreAvailability[]),
    ])
      .then(([page, availabilityList]) => {
        setStores(page.content);

        const map: Record<number, IStoreAvailability> = {};
        availabilityList.forEach((item) => {
          map[item.wineStoreId] = item;
        });
        setAvailabilityByStore(map);

        // Авто-выбор только среди доступных винотек
        if (selectedStoreId === null && page.content.length > 0) {
          const firstAvailable = page.content.find(
            (store) => map[store.id]?.available !== false,
          );
          setSelectedStoreId(firstAvailable ? firstAvailable.id : null);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  const handleStoreSelect = (storeId: number) => {
    // Не даём выбрать винотеку, в которой нет нужных товаров корзины
    if (availabilityByStore[storeId]?.available === false) {
      return;
    }

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
        availabilityByStore={availabilityByStore}
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
