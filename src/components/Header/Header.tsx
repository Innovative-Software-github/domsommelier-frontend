import React from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { HeaderCatalogLinks } from '@/components/Header/HeaderCatalogLinks/HeaderCatalogLinks';
import { HeaderMainContent } from '@/components/Header/HeaderMainContent/HeaderMainContent';
import { HeaderTopContent } from '@/components/Header/HeaderTopContent/HeaderTopContent';
import cls from './Header.module.scss';

export const Header = () => {
  return (
    <header className={cls.header}>
      <ContentContainer>
        <HeaderTopContent />
        <HeaderMainContent />
        <HeaderCatalogLinks />
      </ContentContainer>
    </header>
  );
};
