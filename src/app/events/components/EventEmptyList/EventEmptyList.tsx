import React from 'react';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import { Button } from '../../../../ui/Button/Button';
import styles from './EventEmptyList.module.scss';
import { ROUTES } from '@/constants/routes';

export const EventEmptyList = () => {
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
