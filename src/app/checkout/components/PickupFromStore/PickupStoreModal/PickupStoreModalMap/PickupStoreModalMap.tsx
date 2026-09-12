'use client';

import React from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { MARKER_COLORS } from '../utils';
import cls from './PickupStoreModalMap.module.scss';
import { IWineStore } from '../../../../../../services/wine-stores/interfaces';
import { IStoreAvailability } from '../../../../../../services/basket/interfaces';

export interface IPickupStoreModalMapProps {
  stores: IWineStore[];
  selectedStoreId: number | null;
  availabilityByStore: Record<number, IStoreAvailability>;
  mapState: {
    center: [number, number];
    zoom: number;
  };
  onStoreSelect: (storeId: number) => void;
}

export const PickupStoreModalMap: React.FC<IPickupStoreModalMapProps> = ({
  stores,
  selectedStoreId,
  availabilityByStore,
  mapState,
  onStoreSelect,
}) => {
  const getPlacemarkOptions = (storeId: number) => {
    if (storeId === selectedStoreId) {
      return { preset: 'islands#circleIcon', iconColor: MARKER_COLORS.SELECTED };
    }

    // Та же логика недоступности, что и в списке (PickupStoreModalListItem) —
    // раньше карта красила такие винотеки как обычные, и клик по ним молча
    // ничего не делал без единой визуальной подсказки.
    const isUnavailable = availabilityByStore[storeId]?.available === false;

    return {
      preset: 'islands#circleIcon',
      iconColor: isUnavailable ? MARKER_COLORS.GRAY : MARKER_COLORS.BLACK,
    };
  };

  return (
    <div className={cls.mapContainer}>
      <YMaps>
        <Map
          height="100%"
          width="100%"
          state={mapState}
          modules={['control.ZoomControl', 'geoObject.addon.balloon']}
        >
          <ZoomControl options={{ position: { right: 10, top: 10 } }} />

          {stores.map((store) => (
            <Placemark
              key={store.id}
              geometry={[store.location.latitude, store.location.longitude]}
              options={getPlacemarkOptions(store.id)}
              properties={{
                balloonContentHeader: store.name,
              }}
              onClick={() => onStoreSelect(store.id)}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};
