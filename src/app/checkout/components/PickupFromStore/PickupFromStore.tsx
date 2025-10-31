'use client';

import { BlockContainer } from '../../../../ui/BlockContainer/BlockContainer';
import { Button } from '../../../../ui/Button/Button';
import { IconType } from '../../../../ui/Icon/IconsMapping';
import cls from './PickupFromStore.module.scss';
import { PickupFromStoreList } from './PickupFromStoreList/PickupFromStoreList';

export const PickupFromStore = () => {
  return (
    <BlockContainer>
      <h2 className={cls.title}>Самовывоз из винотеки</h2>

      <Button className={cls.button} rightIconType={IconType.ArrowRight_24}>Выбрать винотеку</Button>

      <PickupFromStoreList />
    </BlockContainer>
  )
}