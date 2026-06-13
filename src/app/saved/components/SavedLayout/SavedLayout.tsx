'use client';

import { useSelector } from 'react-redux';
import { ContentContainer } from '../../../../ui/ContentContainer/ContentContainer';
import { SavedProductsList } from './SavedProductsList/SavedProductsList';
import { SavedProductsEmptyList } from './SavedProductsEmptyList/SavedProductsEmptyList';
import { savedIsEmptySelector } from '../../../../store/saved/selectors';
import cls from './SavedLayout.module.scss';

export const SavedLayout: React.FC = () => {
  const isSavedEmpty = useSelector(savedIsEmptySelector);

  if (isSavedEmpty) {
    return (
      <ContentContainer className={cls.containerEmptyList}>
        <SavedProductsEmptyList />
      </ContentContainer>
    );
  }

  return (
    <ContentContainer className={cls.container}>
      <SavedProductsList />
    </ContentContainer>
  );
};
