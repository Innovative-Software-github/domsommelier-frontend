'use client';

import React from 'react';
import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';
import { Button } from '../../../../ui/Button/Button';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import cls from './PickupFromStore.module.scss';
import { PickupFromStoreList } from './PickupFromStoreList/PickupFromStoreList';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';
import { PickupStoreModal } from './PickupStoreModal/PickupStoreMap';
import { PickupFromStoreDate } from './PickupFromStoreDate/PickupFromStoreDate';

// TODO: Подключить правильный интерфейс когда будем доставать магазины с сервера
export interface ISelectedStore {
  id: string;
  name: string;
  address: string;
  workingHours: string;
}

interface PickupFromStoreProps {
  selectedStore?: ISelectedStore;
  selectedDate?: Date;
  onStoreSelect: (store: ISelectedStore) => void;
  onDateSelect: (date: Date) => void;
}

export const PickupFromStore: React.FC<PickupFromStoreProps> = ({
  selectedStore,
  selectedDate,
  onStoreSelect,
  onDateSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const isStoreSelected = !!selectedStore;

  const handleStoreSelect = (store: ISelectedStore) => {
    onStoreSelect(store);
    setIsModalOpen(false);
  };

  return (
    <BlockContainer>
      <h2 className={cls.title}>Самовывоз из винотеки</h2>

      <div className={cls.storeInformationContainer}>
        {isStoreSelected && (
          <div className={cls.storeInformation}>
            <h2 className={cls.storeName}>{selectedStore?.name}</h2>
            <p className={cls.address}>{selectedStore?.address}</p>
            <p className={cls.openingHours}>{selectedStore?.workingHours}</p>
          </div>
        )}

        <Button
          variant={isStoreSelected ? 'darkOutlined' : 'default'}
          className={cls.button}
          rightIconType={IconType.ArrowRight_24}
          onClick={() => setIsModalOpen(true)}
        >
          {isStoreSelected ? 'Изменить винотеку' : 'Выбрать винотеку'}
        </Button>
      </div>

      {isStoreSelected && (
        <PickupFromStoreDate
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
      )}

      <PickupFromStoreList />

      <Backdrop
        isOpen={isModalOpen}
        withCancelIcon
        onClickCancelIcon={() => setIsModalOpen(false)}
        animation="center"
        titleClassName={cls.modalTitle}
        title="Выбор винотеки"
      >
        <PickupStoreModal
          selectedStore={selectedStore}
          onStoreSelect={handleStoreSelect}
        />
      </Backdrop>
    </BlockContainer>
  );
};
