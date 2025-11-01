'use client';

import React from 'react';
import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';
import { Button } from '../../../../ui/Button/Button';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import cls from './PickupFromStore.module.scss';
import { PickupFromStoreList } from './PickupFromStoreList/PickupFromStoreList';
import { Backdrop } from '../../../../ui/Backdrop/Backdrop';
import { PickupStoreMap } from './PickupStoreMap/PickupStoreMap';

export const PickupFromStore = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <BlockContainer>
      <h2 className={cls.title}>Самовывоз из винотеки</h2>

      <Button
        className={cls.button}
        rightIconType={IconType.ArrowRight_24}
        onClick={() => setIsModalOpen(true)}
      >
        Выбрать винотеку
      </Button>

      <PickupFromStoreList />

      <Backdrop
        isOpen={isModalOpen}
        withCancelIcon
        onClickCancelIcon={() => setIsModalOpen(false)}
        animation="center"
        titleClassName={cls.modalTitle}
        title="Выбор винотеки"
      >
        <PickupStoreMap />
      </Backdrop>
    </BlockContainer>
  )
}