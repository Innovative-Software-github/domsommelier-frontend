import React from 'react';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import { Button } from '../../../../ui/Button/Button';
import styles from './EventEmptyList.module.scss';
import { ROUTES } from '@/constants/routes';

export interface IEventEmptyListProps {
  /** true — пустой список из-за выбранных даты/типа, а не потому что мероприятий нет вообще. */
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
}

export const EventEmptyList: React.FC<IEventEmptyListProps> = ({ hasActiveFilters, onResetFilters }) => {
  if (hasActiveFilters) {
    return (
      <ContentContainer className={styles.container}>
        <h2 className={styles.title}>На выбранные даты мероприятий нет</h2>
        <p className={styles.description}>Попробуйте выбрать другую дату или сбросить фильтр</p>
        <Button className={styles.button} onClick={onResetFilters}>
          Сбросить фильтр
        </Button>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer className={styles.container}>
      <h2 className={styles.title}>Мероприятий пока нет</h2>
      <p className={styles.description}>Следите за обновлениями — скоро появятся новые события</p>
      <Button href={ROUTES.catalog} className={styles.button}>
        В каталог
      </Button>
    </ContentContainer>
  );
};
