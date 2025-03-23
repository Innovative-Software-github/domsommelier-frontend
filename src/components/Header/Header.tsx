'use client';

import React from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import { HeaderCatalogLinks } from '@/components/Header/HeaderCatalogLinks/HeaderCatalogLinks';
import { HeaderMainContent } from '@/components/Header/HeaderMainContent/HeaderMainContent';
import { HeaderTopContent } from '@/components/Header/HeaderTopContent/HeaderTopContent';
import cls from './Header.module.scss';
import { useMediaContext } from '../../hooks/useMediaQuery';
import { HeaderMobile } from './HeaderMobile/HeaderMobile';
import { useIsServer } from '../../hooks/useIsServer';

export interface IHeaderProps {
  showCatalogLinks?: boolean;
}

export const Header: React.FC<IHeaderProps> = ({ showCatalogLinks = true }) => {
  const isMobileAdaptive = useMediaContext() === 'mobile';
  const isServer = useIsServer();

  if (isMobileAdaptive && !isServer) {
    return (
      <ContentContainer>
        <HeaderMobile />
      </ContentContainer>
    );
  }

  return (
    <header className={cls.header}>
      <ContentContainer>
        <HeaderTopContent />
        <HeaderMainContent />
        {!!showCatalogLinks && <HeaderCatalogLinks />}
      </ContentContainer>
    </header>
  );
};
