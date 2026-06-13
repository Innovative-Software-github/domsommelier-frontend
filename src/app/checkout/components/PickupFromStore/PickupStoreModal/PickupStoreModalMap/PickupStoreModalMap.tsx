'use client';

import React from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { MARKER_COLORS } from '../utils';
import cls from './PickupStoreModalMap.module.scss';
import { IWineStore } from '../../../../../../services/wine-stores/interfaces';

export interface IPickupStoreModalMapProps {
  stores: IWineStore[];
  selectedStoreId: number | null;
  mapState: {
    center: [number, number];
    zoom: number;
  };
  onStoreSelect: (storeId: number) => void;
}

export const PickupStoreModalMap: React.FC<IPickupStoreModalMapProps> = ({
  stores,
  selectedStoreId,
  mapState,
  onStoreSelect,
}) => {
  const getPlacemarkOptions = (storeId: number) => ({
    preset: 'islands#circleIcon',
    iconColor: storeId === selectedStoreId ? MARKER_COLORS.SELECTED : MARKER_COLORS.BLACK,
  });

  return (
    <div className={cls.mapContainer}>
      <YMaps>
        <Map
          height="75vh"
          width="50vw"
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
