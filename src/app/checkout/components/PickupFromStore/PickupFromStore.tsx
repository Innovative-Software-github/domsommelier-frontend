'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';
// Кнопка выбора/смены винотеки и модалка со списком/картой скрыты — сейчас
// в сети всего одна винотека, и открывать пользователю выбор незачем.
// Вместо этого ниже единственная винотека подставляется автоматически.
// Когда винотек снова станет несколько — раскомментировать импорты и блок
// разметки с Button/Backdrop/PickupStoreModal.
// import { Button } from '../../../../ui/Button/Button';
// import { IconType } from '../../../../ui/Icon/IconsMapping';
// import { Backdrop } from '../../../../ui/Backdrop/Backdrop';
// import { PickupStoreModal } from './PickupStoreModal/PickupStoreMap';
import cls from './PickupFromStore.module.scss';
import { PickupFromStoreList } from './PickupFromStoreList/PickupFromStoreList';
import { PickupFromStoreDate } from './PickupFromStoreDate/PickupFromStoreDate';
import { getWineStores } from '../../../../services/wine-stores/requests';
import { getBasketStoreAvailability } from '../../../../services/basket/requests';
import { useRequireCustomerId } from '../../../../hooks/useRequireCustomerId';
import { currentCitySelector } from '../../../../store/city/selectors';

export interface ISelectedStore {
  id: number;
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
  const { customerId } = useRequireCustomerId();
  const currentCity = useSelector(currentCitySelector);
  const [unavailableProducts, setUnavailableProducts] = React.useState<string[]>([]);

  const isStoreSelected = !!selectedStore;

  // Единственная винотека подставляется сама, без участия пользователя.
  // Доступность корзины в ней всё равно проверяем — если каких-то товаров
  // нет в наличии, показываем это под названием винотеки, а не молча
  // позволяем оформить заказ, который не удастся забрать целиком.
  React.useEffect(() => {
    if (selectedStore) return;

    let cancelled = false;

    getWineStores(0, 50, currentCity?.slug)
      .then((page) => {
        if (cancelled) return;

        const store = page.content[0];
        if (!store) return;

        onStoreSelect({
          id: store.id,
          name: store.name,
          address: store.address,
          workingHours: store.workingHours,
        });

        if (!customerId) return;

        getBasketStoreAvailability(customerId)
          .then((availabilityList) => {
            if (cancelled) return;
            const availability = availabilityList.find(
              (item) => item.wineStoreId === store.id,
            );
            setUnavailableProducts(
              availability?.available === false ? availability.unavailableProducts : [],
            );
          })
          .catch(() => {});
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, currentCity?.slug, selectedStore]);

  return (
    <BlockContainer>
      <h2 className={cls.title}>Самовывоз из винотеки</h2>

      <div className={cls.storeInformationContainer}>
        {isStoreSelected && (
          <div className={cls.storeInformation}>
            <h2 className={cls.storeName}>{selectedStore?.name}</h2>
            <p className={cls.address}>{selectedStore?.address}</p>
            <p className={cls.openingHours}>{selectedStore?.workingHours}</p>
            {unavailableProducts.length > 0 && (
              <p className={cls.unavailable}>
                Нет в наличии: {unavailableProducts.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* <Button
          variant={isStoreSelected ? 'darkOutlined' : 'default'}
          className={cls.button}
          rightIconType={IconType.ArrowRight_24}
          onClick={() => setIsModalOpen(true)}
        >
          {isStoreSelected ? 'Изменить винотеку' : 'Выбрать винотеку'}
        </Button> */}
      </div>

      {isStoreSelected && (
        <PickupFromStoreDate
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
      )}

      <PickupFromStoreList />

      {/* <Backdrop
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
      </Backdrop> */}
    </BlockContainer>
  );
};
