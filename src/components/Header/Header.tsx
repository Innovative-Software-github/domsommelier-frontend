'use client';

import React from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { HeaderCatalogLinks } from '@/components/Header/HeaderCatalogLinks/HeaderCatalogLinks';
import { HeaderMainContent } from '@/components/Header/HeaderMainContent/HeaderMainContent';
import { HeaderTopContent } from '@/components/Header/HeaderTopContent/HeaderTopContent';
import cls from './Header.module.scss';
import { HeaderMobile } from './HeaderMobile/HeaderMobile';

export interface IHeaderProps {
  showCatalogLinks?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ showCatalogLinks = true }) => {
  return (
    <header className={cls.header}>
      <ContentContainer>
        <div className={cls.desktopOnly}>
          <HeaderTopContent />
          <HeaderMainContent />
          {showCatalogLinks && <HeaderCatalogLinks />}
        </div>

        <div className={cls.mobileOnly}>
          <HeaderMobile />
        </div>
      </ContentContainer>
    </header>
  );
};
