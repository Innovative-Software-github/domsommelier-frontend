import React from 'react';
import { ContentContainer } from '@/ui/ContentContainer/ContentContainer';
import cls from './HeaderMobile.module.scss';
import Image from 'next/image';
import { SearchInput } from '@/features/search/components/SearchInput/SearchInput';
import { Icon } from '../../../ui/Icon/Icon';
import { IconType } from '../../../ui/Icon/IconsMapping';
import { MobileMenu } from './MobileMenu/MobileMenu';

export const HeaderMobile: React.FC = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  return (
    <header className={cls.header}>
      <ContentContainer className={cls.container}>
        <Image
          src="/mobileLogotype.png"
          alt="Логотип на мобильные устройства"
          width={72}
          height={72}
        />
        <SearchInput
          className={cls.input}
          value={query}
          onChange={setQuery}
          onSubmit={() => {}}
          theme="wineRed"
        />

        <button
          type="button"
          className={cls.burgerMenuButton}
          onClick={() => setIsBurgerMenuOpen(true)}
        >
          <Icon type={IconType.Hamburger_24} width={24} height={24} />
        </button>
      </ContentContainer>
      <MobileMenu
        isOpen={isBurgerMenuOpen}
        onClose={() => setIsBurgerMenuOpen(false)}
      />
    </header>
  );
};
