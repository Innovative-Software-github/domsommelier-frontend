'use client';

import React from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { MOCK_STORES, MARKER_COLORS } from '../utils';
import cls from './PickupStoreModalMap.module.scss';

export interface IPickupStoreModalMapProps {
  selectedStoreId: string | null;
  mapState: {
    center: [number, number];
    zoom: number;
  };
  onStoreSelect: (storeId: string) => void;
}

export const PickupStoreModalMap: React.FC<IPickupStoreModalMapProps> = ({
  selectedStoreId,
  mapState,
  onStoreSelect,
}) => {

  const getPlacemarkOptions = (storeId: string) => {
    const isSelected = storeId === selectedStoreId;
    
    let iconColor = MARKER_COLORS.BLACK;

    if (isSelected) {
      iconColor = MARKER_COLORS.SELECTED;
    }

    return {
      preset: 'islands#circleIcon',
      iconColor: iconColor,
    };
  };

  return (
    <div className={cls.mapContainer}>
      <YMaps>
        <Map
          height='75vh'
          width='50vw'
          state={mapState}
          modules={['control.ZoomControl', 'geoObject.addon.balloon']}
        >
          <ZoomControl options={{ position: { right: 10, top: 10 } }} />
          
          {MOCK_STORES.map((store) => (
            <Placemark
              key={store.id}
              geometry={store.coordinates}
              options={getPlacemarkOptions(store.id)}
              properties={{
                balloonContentHeader: store.name
              }}
              onClick={() => onStoreSelect(store.id)}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

