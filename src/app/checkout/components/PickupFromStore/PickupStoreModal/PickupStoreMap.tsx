'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { currentCitySelector } from '../../../../../store/city/selectors';

export interface IPickupStoreModalProps {
  selectedStore?: ISelectedStore;
  onStoreSelect: (store: ISelectedStore) => void;
}

export const PickupStoreModal: React.FC<IPickupStoreModalProps> = ({
  selectedStore,
  onStoreSelect,
}) => {
  const { customerId } = useRequireCustomerId();
  const currentCity = useSelector(currentCitySelector);
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

  const selectStore = (store: IWineStore, zoom: number) => {
    setSelectedStoreId(store.id);
    setMapState({
      center: [store.location.latitude, store.location.longitude],
      zoom,
    });
    onStoreSelect({
      id: store.id,
      name: store.name,
      address: store.address,
      workingHours: store.workingHours,
    });
  };

  useEffect(() => {
    let cancelled = false;

    const autoSelectFirstAvailable = (
      storesList: IWineStore[],
      availability: Record<number, IStoreAvailability>,
    ) => {
      if (selectedStoreId !== null || storesList.length === 0) return;

      // Строго available === true: если данных по винотеке нет вовсе,
      // авто-выбором её не считаем (раньше отсутствие данных трактовалось
      // как «доступна»).
      const firstAvailable = storesList.find(
        (store) => availability[store.id]?.available === true,
      );

      if (firstAvailable) {
        selectStore(firstAvailable, DEFAULT_MAP_ZOOM);
      }
    };

    // Список винотек — обязательные данные экрана, грузим независимо от
    // проверки доступности корзины: раньше оба запроса были объединены через
    // Promise.all, и падение необязательной (best-effort) доступности
    // роняло и список винотек тоже.
    getWineStores(0, 50, currentCity?.slug)
      .then((page) => {
        if (cancelled) return;
        setStores(page.content);

        const availabilityPromise = customerId
          ? getBasketStoreAvailability(customerId)
          : Promise.resolve([] as IStoreAvailability[]);

        availabilityPromise
          .then((availabilityList) => {
            if (cancelled) return;

            const map: Record<number, IStoreAvailability> = {};
            availabilityList.forEach((item) => {
              map[item.wineStoreId] = item;
            });
            setAvailabilityByStore(map);
            autoSelectFirstAvailable(page.content, map);
          })
          .catch((error) => {
            // Доступность не проверить — считаем её неизвестной и авто-выбор
            // не делаем вовсе, а не «всё доступно». Список винотек при этом
            // уже показан, выбрать можно вручную.
            console.error(error);
          });
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, currentCity?.slug]);

  const handleStoreSelect = (storeId: number) => {
    // Не даём выбрать винотеку, в которой точно нет нужных товаров корзины
    if (availabilityByStore[storeId]?.available === false) {
      return;
    }

    const store = stores.find((s) => s.id === storeId);
    if (store) {
      selectStore(store, SELECTED_STORE_ZOOM);
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
        availabilityByStore={availabilityByStore}
        mapState={mapState}
        onStoreSelect={handleStoreSelect}
      />
    </div>
  );
};
